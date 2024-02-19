import { gql } from "@apollo/client";

import { createApolloClient } from "@/client/client";
import { TEvent } from "@/types/events";
import { processPublicEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { ReactElement, useEffect, useState } from "react";
import { EventsCard, EventsCardFull } from "@/components/cards";
import { useRouter } from "next/router";
import { Modal } from "@/components/Modal";

interface EventsProps {
  events: TEvent[];
  eventsMap: {
    [k: string]: string;
  }; // events map for relation display
}

export default function EventsPublic({ events, eventsMap }: EventsProps) {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<TEvent>();

  useEffect(() => {
    if (
      events &&
      router.query.eventId &&
      typeof router.query.eventId === "string" &&
      /^\d+$/.test(router.query.eventId) // check if can convert to number
    ) {
      setSelectedEvent(
        events.filter((e) => e.id === Number(router.query.eventId))[0]
      );
    }
  }, [events, router.query.eventId]);

  console.log(events);
  console.log(eventsMap);
  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <ul className="space-y-8">
        {selectedEvent && (
          <Modal
            isOpen={!!router.query.eventId}
            onClose={() => router.push("/events-public")}
          >
            <EventsCardFull
              event={selectedEvent}
              eventsMap={eventsMap}
              onClose={() => router.push("/events-public")}
            />
          </Modal>
        )}
        {events &&
          eventsMap &&
          events.map((event, i) => (
            <li key={`${event.id}-${i}`}>
              <EventsCard event={event} />
            </li>
          ))}
      </ul>
    </main>
  );
}

EventsPublic.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query<{ sampleEvents: TEvent[] }>({
    query: gql`
      query {
        sampleEvents {
          id
          name
          event_type
          permission
          start_time
          end_time
          description
          speakers {
            name
          }
          public_url
          private_url
          related_events
        }
      }
    `,
  });

  const processedEvents = processPublicEvents(data.sampleEvents);
  const eventsMap = Object.fromEntries(
    processedEvents.map((event: TEvent) => [event.id, event.name])
  );

  return {
    props: {
      events: processedEvents,
      eventsMap: eventsMap,
    },
  };
}
