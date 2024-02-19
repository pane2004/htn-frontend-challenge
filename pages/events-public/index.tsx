import { gql } from "@apollo/client";

import { createApolloClient } from "@/client/client";
import { TEvent } from "@/types/events";
import { processPublicEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { ReactElement } from "react";
import { H3 } from "@/components/Text";
import { MdAccountCircle } from "react-icons/md";

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
            <li
              key={`${event.id}-${i}`}
              className="flex flex-row"
            >
              <div>
              <div>
                Jan 12, 2023
              </div>
              <div>
                3:30-12:30
              </div>
              </div>
              <div className="w-4 border-l-2 border-t-2 border-b-2 border-white mr-4"/>
              <div className="flex-grow border-2 border-white max-w-2xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10">
                <div className="flex justify-end items-center h-8 pr-2 space-x-2 border-b-2 border-white bg-gradient-to-r from-blue-600 to-cyan-500">
                  <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
                  <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
                  <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
                </div>
                <div className="p-8 space-y-4">
                  <div className="space-y-2">
                    <H3>{event.name}</H3>
                    <div className="flex flex-row gap-2 inline-block mr-2">
                      <MdAccountCircle size={24} />
                      <ul>
                        {event.speakers.map((speaker, j) => (
                          <li
                            key={`${speaker.name}-${j}`}
                            className="inline-block mr-2"
                          >
                            <span>{speaker.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <span className="line-clamp-3">{event.description}</span>
                </div>
              </div>
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
