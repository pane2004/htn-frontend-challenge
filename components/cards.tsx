import { TEvent } from "@/types/events";
import { H3 } from "@/components/Text";
import { MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import { formatTimestampRange, formatTimestampToDate } from "@/utils/time";

export function EventsCard({ event }: { event: TEvent }) {
  return (
    <div className="flex flex-row gap-2 hover:scale-105">
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
        href=""
        className="flex-grow border-2 border-white max-w-2xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10"
      >
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
          <div className="flex flex-col block md:hidden font-bold">
            <span>{formatTimestampToDate(event.start_time)}</span>
            <span>
              {formatTimestampRange(event.start_time, event.end_time)}
            </span>
          </div>
          <span className="line-clamp-3">{event.description}</span>
        </div>
      </Link>
    </div>
  );
}
