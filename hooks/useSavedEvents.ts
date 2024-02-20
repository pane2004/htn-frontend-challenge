import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SAVED_EVENTS } from "@/constants/cookies";

export const useSavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState<number[]>(getSavedEventIds());

  useEffect(() => {
    // update cookies whenever the savedEvents state changes
    Cookies.set(SAVED_EVENTS, JSON.stringify(savedEvents));
  }, [savedEvents]);

  const saveEvent = (eventId: number) => {
    if (!savedEvents.includes(eventId)) {
      setSavedEvents((prevEvents) => [...prevEvents, eventId]);
    }
  };

  const unsaveEvent = (eventId: number) => {
    setSavedEvents((prevEvents) => prevEvents.filter((id) => id !== eventId));
  };

  const isEventSaved = (eventId: number): boolean => {
    return savedEvents.includes(eventId);
  };

  const clearSavedEvents = (): void => {
    setSavedEvents([]);
  };

  return { saveEvent, unsaveEvent, isEventSaved, clearSavedEvents };
};

export function getSavedEventIds(): number[] {
  const savedEvents = Cookies.get(SAVED_EVENTS);
  return savedEvents ? JSON.parse(savedEvents) : [];
}
