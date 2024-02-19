import { gql } from "@apollo/client";

import { createApolloClient } from "@/client/client";
import { TEvent } from "@/types/events";
import { processPublicEvents } from "@/utils/eventClean";

interface EventsProps {
  events: TEvent[];
  eventsMap: Map<Number, String>; // events map for relation display
}

export default function Events({ events, eventsMap }: EventsProps) {
  console.log(events);
  console.log(eventsMap);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>hi</div>
    </main>
  );
}

export async function getServerSideProps() {
  const client = createApolloClient();
  const { data } = await client.query({
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
