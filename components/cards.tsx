import { TEvent } from "@/types/events";
import { H2, H3 } from "@/components/Text";
import {
  MdClose,
  MdFavorite,
  MdFavoriteBorder,
  MdOpenInNew,
} from "react-icons/md";
import Link from "next/link";
import { formatTimestampRange, formatTimestampToDate } from "@/utils/time";
import { Button } from "./Buttons";
import { useRouter } from "next/router";
import { useSavedEvents } from "@/hooks/useSavedEvents";
import { useTranslations } from "next-intl";

interface EventsCardProps {
  event: TEvent;
  isPublic: boolean;
  mine?: boolean;
  setLocalEvents: React.Dispatch<React.SetStateAction<TEvent[] | undefined>>;
}

export function EventsCard({ event, isPublic, mine, setLocalEvents }: EventsCardProps) {
  const { unsaveEvent } = useSavedEvents();
  const t = useTranslations("Cards");

  const UnsaveEventAction = async () => {
    await unsaveEvent(event.id);
    setLocalEvents(prev => (prev && prev.filter(e => e.id != event.id)));
  }

  return (
    <div className={`flex flex-row gap-2 ${mine ? "" : "hover:scale-105"}`}>
      <div className="hidden md:block">
        <div className="flex flex-col text-right">
          <span>{formatTimestampToDate(event.start_time)}</span>
          <span className="whitespace-nowrap">
            {formatTimestampRange(event.start_time, event.end_time)}
          </span>
        </div>
      </div>
      <div className="hidden md:block w-4 border-l-2 border-t-2 border-b-2 border-white mr-1" />

      <Link
        href={
          mine
            ? ""
            : `/${isPublic ? "events-public" : "events-private"}/?eventId=${event.id
            }`
        }
        className={`flex-grow border-2 border-white max-w-2xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 ${mine ? "cursor-default" : ""}`}
      >
        <div className="flex justify-end items-center h-8 pr-2 space-x-2 border-b-2 border-white bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
          <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
          <div className="w-4 h-4 bg-gray-300 border-2 border-white" />
        </div>
        <div className="p-8 space-y-4">
          <div className="space-y-2">
            <H3>{event.name}</H3>
            {event.speakers.length > 0 && (
              <div className="flex flex-row items-center gap-1 inline-block">
                <span>{t("by")}</span>
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
            )}
          </div>
          <div className="flex flex-col block md:hidden font-bold">
            <span>{formatTimestampToDate(event.start_time)}</span>
            <span>
              {formatTimestampRange(event.start_time, event.end_time)}
            </span>
          </div>
          <span className="line-clamp-3">{event.description}</span>
          {mine && <Button
            label={t("unsave")}
            onClick={UnsaveEventAction}
          >
            <MdFavorite size={18} />
          </Button>}
        </div>
      </Link>
    </div>
  );
}

interface FullEventCardProps {
  event: TEvent;
  isPublic: boolean;
  eventsMap?: {
    [k: string]: string;
  };
  onClose?: () => void;
}

export function EventsCardFull({
  event,
  eventsMap,
  isPublic,
  onClose,
}: FullEventCardProps) {
  const router = useRouter();
  const { saveEvent, unsaveEvent, isEventSaved } = useSavedEvents();
  const t = useTranslations("Cards");

  return (
    <div className="flex-grow border-2 border-white max-w-2xl bg-black bg-gradient-to-r from-blue-600/20 to-cyan-500/20">
      <div className="flex justify-end items-center h-10 pr-2 space-x-2 border-b-2 border-white bg-gradient-to-r from-blue-600 to-cyan-500">
        <button
          type="button"
          className="flex items-center justify-center w-6 h-6 bg-gray-300 border-2 border-white"
          onClick={onClose}
        >
          <span className="sr-only">Close event modal</span>
          <MdClose size={32} />
        </button>
      </div>
      <div className="p-8 space-y-8">
        <div className="space-y-2">
          <H2>{event.name}</H2>
          {event.speakers.length > 0 && (
            <div className="flex flex-row items-center gap-2 inline-block">
              <H3>{t("by")}</H3>
              <ul>
                {event.speakers.map((speaker, j) => (
                  <li
                    key={`${speaker.name}-${j}`}
                    className="inline-block mr-2"
                  >
                    <H3>{speaker.name}</H3>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="font-bold">
          <H3>{formatTimestampToDate(event.start_time)}</H3>
          <H3>{formatTimestampRange(event.start_time, event.end_time)}</H3>
        </div>
        <div>
          <span>{event.description}</span>
        </div>
        {event.related_events.length > 0 && (
          <div className="space-y-2">
            <H3>{t("related")}</H3>
            <div className="flex flew-row flex-wrap text-nowrap gap-2">
              {event.related_events.map((id) => (
                <button
                  key={id}
                  className="p-2 border border-1 border-gray-200 text-xs text-center bg-gradient-to-r to-orange-500 from-fuchsia-500 hover:brightness-125"
                  onClick={() => {
                    router.push({
                      pathname: isPublic ? "/events-public" : "/events-private",
                      query: { eventId: id },
                    });
                  }}
                >
                  {eventsMap?.[id]}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <Link
            href={isPublic ? event?.public_url ?? "" : event.private_url}
            target="_blank"
          >
            <Button label={t("more")}>
              <MdOpenInNew size={18} />
            </Button>
          </Link>
          {!isPublic && (
            <Button
              label={t("save")}
              onClick={() => {
                isEventSaved(event.id)
                  ? unsaveEvent(event.id)
                  : saveEvent(event.id);
              }}
            >
              {isEventSaved(event.id) ? (
                <MdFavorite size={18} />
              ) : (
                <MdFavoriteBorder size={18} />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
