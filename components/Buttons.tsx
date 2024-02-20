import { EVENT_TYPES } from "@/constants/filters";
import { TEventType } from "@/types/events";
import { eventTypeToString } from "@/utils/converters";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { MdCheck, MdExpandLess, MdExpandMore } from "react-icons/md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button({ label, children, ...props }: ButtonProps) {
  return (
    <button
      className="flex flex-row items-center gap-2 border border-2 border-white font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-125"
      {...props}
    >
      {label}
      {children}
    </button>
  );
}

export function NavButton({
  label,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`flex w-full items-center p-2 group ${
        disabled
          ? "text-gray-500 cursor-default"
          : "text-white hover:bg-gray-700"
      }`}
      {...props}
    >
      {children}
      <span className="ms-3">{label}</span>
    </button>
  );
}

interface FiltersProps {
  filters: TEventType[];
  setFilters: React.Dispatch<SetStateAction<TEventType[]>>;
}

export function FilterAccordion({ filters, setFilters }: FiltersProps) {
  const [openAccordion, setOpenAccordion] = useState<boolean>(false);

  return (
    <div className="w-full">
      <button
        className="w-full p-2 flex border border-1 border-white flex-row items-center justify-between bg-gray-900"
        onClick={() => setOpenAccordion(!openAccordion)}
      >
        <span className="text-left">Filters</span>
        {openAccordion ? (
          <MdExpandLess size={32} />
        ) : (
          <MdExpandMore size={32} />
        )}
      </button>
      {openAccordion && (
        <div className="flex flex-row p-4 border border-t-0 border-gray-200 bg-gray-800 gap-2 flex-wrap">
          {EVENT_TYPES.map((type) => (
            <button
              key={type}
              className={`flex flex-row items-center p-2 gap-2 border border-1 border-gray-200 text-xs text-center bg-gradient-to-r from-fuchsia-500 to-orange-500 ${
                filters?.includes(type) ? "brightness-100" : "brightness-75"
              } hover:brightness-100`}
              onClick={() => {
                setFilters((prevFilters) => {
                  if (prevFilters && prevFilters.includes(type)) {
                    return prevFilters.filter((filter) => filter !== type);
                  } else {
                    return prevFilters ? [...prevFilters, type] : [type];
                  }
                });
              }}
            >
              {filters?.includes(type) && <MdCheck size={18} />}
              {eventTypeToString[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
