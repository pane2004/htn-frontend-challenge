import { createApolloClient } from "@/client/client";
import { EventsProps, TEvent, TEventType } from "@/types/events";
import { processPrivateEvents, searchEvents } from "@/utils/eventClean";
import { DashboardLayout } from "@/layouts/dashboard";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { EventsCard, EventsCardFull } from "@/components/cards";
import { useRouter } from "next/router";
import { Modal } from "@/components/Modal";
import { EVENT_TYPES } from "@/constants/filters";
import { SearchBar } from "@/components/SearchBar";
import { FilterAccordion } from "@/components/Buttons";

export function EventsList({ events, eventsMap }: EventsProps) {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<TEvent>();
  const [localEvents, setLocalEvents] = useState<TEvent[]>();
  const [filters, setFilters] = useState<TEventType[]>(EVENT_TYPES);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isPublic: boolean = useMemo(() => {
    if (router.asPath) {
      return router.asPath.includes("events-public");
    }
    return false;
  }, [router.asPath]);
  const isMine: boolean = useMemo(() => {
    if (router.asPath) {
      return router.asPath.includes("mine");
    }
    return false;
  }, [router.asPath]);

  const handleSearch = () => {
    if (localEvents) {
      setLocalEvents(searchEvents(localEvents, searchQuery));
    }
  };

  // handle event selection changes
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

  // handle filter changes
  useEffect(() => {
    if (events) {
      setLocalEvents(
        events.filter((e) => filters?.includes(e.event_type)) || []
      );
    }
  }, [filters]);

  return (
    <main className={`flex flex-col items-center justify-between p-24`}>
      <ul className="space-y-8">
        {selectedEvent && (
          <Modal
            isOpen={!!router.query.eventId}
            onClose={() =>
              router.push(isPublic ? "/events-public" : "/events-private")
            }
          >
            <EventsCardFull
              event={selectedEvent}
              eventsMap={eventsMap}
              isPublic={isPublic}
              onClose={() =>
                router.push(isPublic ? "/events-public" : "/events-private")
              }
            />
          </Modal>
        )}
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex-grow">
            <SearchBar
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              searchQuery={searchQuery}
              resetSearch={() => {
                setLocalEvents(events);
              }}
            />
          </div>
          <div className="flex-grow">
            <FilterAccordion filters={filters} setFilters={setFilters} />
          </div>
        </div>
        {localEvents &&
          eventsMap &&
          localEvents.map((event, i) => (
            <li key={`${event.id}-${i}`}>
              <EventsCard event={event} isPublic={isPublic} mine={isMine} setLocalEvents={setLocalEvents}/>
            </li>
          ))}
      </ul>
    </main>
  );
}
