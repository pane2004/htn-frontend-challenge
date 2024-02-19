import { gql } from "@apollo/client";

import { createApolloClient } from "@/client/client";
import { TEvent } from "@/types/events";
import { processPublicEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { ReactElement } from "react";
import { EventsCard } from "@/components/cards";

interface EventsProps {
  events: TEvent[];
  eventsMap: Map<Number, String>; // events map for relation display
}

export default function EventsPublic({ events, eventsMap }: EventsProps) {
  console.log(events);
  console.log(eventsMap);
  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <ul className="space-y-8">
        {events &&
          eventsMap &&
          events.map((event, i) => (
            <li key={`${event.id}-${i}`}>
              <EventsCard event={event}/>
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
