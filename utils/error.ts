/*
this is typically how i handle errors in typescript
at scale with many packages, as some of them can throw
really random errors hence the implicit type of unknown for errors.
learned quite a lot from: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
*/

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    return new Error(String(maybeError));
  }
}
