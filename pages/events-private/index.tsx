import { ReactElement } from "react";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/client/client";
import { EventsProps, TEvent } from "@/types/events";
import { processPrivateEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { EventsList } from "@/sections/eventsDisplay";
import { GetServerSidePropsContext } from "next";

export default function EventsPrivate({ events, eventsMap }: EventsProps) {
  return <EventsList events={events} eventsMap={eventsMap} />;
}

EventsPrivate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
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

  const processedEvents = processPrivateEvents(data.sampleEvents);
  const eventsMap = Object.fromEntries(
    processedEvents.map((event: TEvent) => [event.id, event.name])
  );

  return {
    props: {
      events: processedEvents,
      eventsMap: eventsMap,
      messages: (await import(`@/locales/${locale}`)).default
    },
  };
}
