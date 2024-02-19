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

export function H2({ glow, children, ...props }: TextProps) {
  return (
    <h2
      className={`font-bold sm:text-4xl text-2xl ${
        glow ? "text-shadow shadow-fuchsia-400 hover:brightness-150" : ""
      }`}
      {...props}
    >
      {children}
    </h2>
  );
}

export function H3({ glow, children, ...props }: TextProps) {
  return (
    <h3
      className={`font-medium md:text-2xl text-xl ${
        glow ? "text-shadow shadow-fuchsia-400 hover:brightness-150" : ""
      }`}
      {...props}
    >
      {children}
    </h3>
  );
}
