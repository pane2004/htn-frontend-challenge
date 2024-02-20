import { TEvent } from "@/types/events";
import { GetServerSidePropsContext } from "next";

/* 
The functions will clean up the events response from the API.
By leveraging SSR, we can process the data before client receives it
(instead of filtering by the client, where private events might not show up in 
the ui, but will certainly show up in client logs) to TRULY make events safe and private. 
Specifically for private events:
- only keep the items where the permission key is "public"
- set private_url key to "" for each item
- for the related_events array, for each number (which is an id of 
  another event in the original array) check the corresponding item 
  with the same id, and if its "permission" key is set as private, delete 
  the number from the related_events array
- finally sort all the remaining items by start_time
*/

export function processPublicEvents(events: TEvent[]): TEvent[] {
  const permissionMap = new Map(
    events.map((event) => [event.id, event.permission])
  );

  const processedEvents = events
    .filter((event) => event?.permission === "public")
    .map((event) => ({
      ...event,
      private_url: "",
      related_events: event.related_events.filter(
        (id) => permissionMap.get(id) !== "private"
      ),
    }))
    .sort((a, b) => a.start_time - b.start_time);

  return processedEvents;
}

export function processPrivateEvents(events: TEvent[]): TEvent[] {
  const processedEvents = [...events].sort(
    (a, b) => a.start_time - b.start_time
  );

  return processedEvents;
}

// a basic client based search function
export function searchEvents(events: TEvent[], query: string) {
  const lowerCaseQuery = query.toLowerCase();
  return events.filter(
    (event) =>
      event.name.toLowerCase().includes(lowerCaseQuery) ||
      (event?.description &&
        event?.description.toLowerCase().includes(lowerCaseQuery))
  );
}

type CookieObject = {
  [K: string]: string;
}

// function to parse cookies server-side
export const parseCookies = (req: GetServerSidePropsContext["req"]) => {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  return cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce<CookieObject>((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
};
