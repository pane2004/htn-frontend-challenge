import { ReactElement } from "react";
import { gql } from "@apollo/client";
import { createApolloClient } from "@/client/client";
import { EventsProps, TEvent } from "@/types/events";
import { parseCookies, processPrivateEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { EventsList } from "@/sections/eventsDisplay";
import { GetServerSidePropsContext } from "next";
import { SAVED_EVENTS } from "@/constants/cookies";

export default function MyEvents({ events, eventsMap }: EventsProps) {
  if (events === null)
    return (
      <div>
        <span>Make sure cookies are enabled!</span>
      </div>
    );
  return <EventsList events={events} eventsMap={eventsMap} />;
}

MyEvents.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  // get the user cookies, and filter the returned events based on their saved list
  const cookies = parseCookies(context.req);

  if (!cookies)
    return {
      props: {
        events: null,
        eventsMap: null,
      },
    };

  let savedEvents: number[] = [];
  if (cookies[SAVED_EVENTS]) {
    try {
      savedEvents = (await JSON.parse(cookies[SAVED_EVENTS])) || [];
    } catch (error) {
      console.error("Error parsing SAVED_EVENTS cookie:", error);
      return {
        props: {
          events: null,
          eventsMap: null,
        },
      };
    }
  }

  const processedEvents = processPrivateEvents(data.sampleEvents).filter((e) =>
    savedEvents.includes(e.id)
  );

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
