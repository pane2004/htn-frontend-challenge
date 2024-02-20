import { TEventType } from "@/types/events";

export const eventTypeToString: { [K in TEventType]: string } = {
  workshop: "Workshop",
  activity: "Activity",
  tech_talk: "Tech Talk",
};
