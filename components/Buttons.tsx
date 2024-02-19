interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function Button({ label, ...props }: ButtonProps) {
  return (
    <button
      className="border border-2 border-white font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-125"
      {...props}
    >
      {label}
    </button>
  );
}
