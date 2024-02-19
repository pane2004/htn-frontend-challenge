interface TextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  glow?: boolean;
}

export function H1({ glow, children, ...props }: TextProps) {
  return (
    <h1
      className={`font-bold sm:text-6xl text-4xl ${
        glow ? "text-shadow shadow-fuchsia-400 hover:brightness-150" : ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
}

export function H3({ glow, children, ...props }: TextProps) {
  return (
    <h1
      className={`font-medium sm:text-2xl text-xl ${
        glow ? "text-shadow shadow-fuchsia-400 hover:brightness-150" : ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
}
