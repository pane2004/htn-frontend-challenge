import { Sora } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

import { useLogin } from "@/hooks/useLogin";
import { Gear, Square, Star } from "@/components/decorations/Icons";
import { Button } from "@/components/Buttons";
import { TextInput } from "@/components/Input";
import { H1, H3 } from "@/components/Text";
import { toErrorWithMessage } from "@/utils/error";

const sora = Sora({ subsets: ["latin"] });

export function LoginPage() {
  const router = useRouter();
  const { loading, login } = useLogin();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    login(email, password)
      .then(() => {
        router.push("/events-private");
      })
      .catch((error) => {
        const message =
          toErrorWithMessage(error)?.message ||
          "Login failed. Please try again.";
        setErrorMessage(message);
      });
  };

  return (
    <main className={`flex min-h-screen p-12 ${sora.className}`}>
      <div className="flex flex-col items-center justify-center w-full space-y-16 z-10">
        <div className="relative flex flex-col items-center space-y-2">
          <StarDecorations />
          <H1 glow>Events</H1>
          <H3>Hackathon Global Inc.™</H3>
        </div>

        <form className="w-full max-w-xl" onSubmit={onSubmit}>
          <div className="mb-5">
            <TextInput
              heading="Email"
              type="email"
              id="email"
              placeholder="name@email.com"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          <div className="mb-5">
            <TextInput
              heading="Password"
              type="password"
              id="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-center text-red-500">{errorMessage}</div>
          )}
          <div className="flex md:flex-row flex-col gap-4">
            <Button label="Sign In" type="submit" />
            <Button
              label="Continue as Guest"
              type="button"
              className="text-white hover:brightness-75"
              onClick={() => {
                router.push("/events-public");
              }}
            />
          </div>
        </form>
      </div>
    </main>
  );
}

function StarDecorations() {
  return (
    <div className="hidden sm:block w-0 fade-in">
      <div className="absolute -top-8 left-2 transform -translate-y-full">
        <Square colour="shadow-yellow-500" />
      </div>
      <div className="absolute top-20 -left-36 transform -translate-y-full">
        <Star />
      </div>
      <div className="absolute top-2 -left-28 transform -translate-y-full">
        <Gear colour="shadow-cyan-500" />
      </div>
      <div className="absolute top-2 left-72 transform -translate-y-full">
        <Star colour="shadow-yellow-500" />
      </div>
      <div className="absolute top-16 -right-36 transform -translate-y-full">
        <Square colour="shadow-cyan-500" />
      </div>
      <div className="absolute top-40 -right-32 transform -translate-y-full">
        <Gear />
      </div>
    </div>
  );
}
