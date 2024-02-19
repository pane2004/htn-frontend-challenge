import { TEvent } from "@/types/events";

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

export function processPublicEvents(events: TEvent[]) {
  const permissionMap = new Map(
    events.map((event) => [event.id, event.permission])
  );

  const processedEvents = events
    .filter((event) => event.permission === "public")
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
