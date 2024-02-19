interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  heading?: string;
}

export function TextInput({ heading, ...props }: TextInputProps) {
  return (
    <>
      {heading && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-sm font-medium text-white"
        >
          {heading}
        </label>
      )}
      <input
        className="border text-sm block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-white"
        {...props}
      />
    </>
  );
}
