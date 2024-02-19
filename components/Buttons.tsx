import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: React.ReactNode;
}

interface NavButtonProps {
  label: string;
  href: string;
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
  href,
  disabled,
  children,
  ...props
}: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 group ${
        disabled ? "text-gray-500 cursor-default" : "text-white hover:bg-gray-700"
      }`}
      {...props}
    >
      {children}
      <span className="ms-3">{label}</span>
    </Link>
  );
}
