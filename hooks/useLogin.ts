import { useState } from "react";
import Cookies from "js-cookie";

import { toErrorWithMessage } from "@/utils/error";

export const useLogin = () => {
  // not very applicable for fake login but normally i would add error and loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const login = async (username: string, password: string) => {
    try {
      // would call login endpoint here to get latest access token,
      // as well as handle refresh token
      Cookies.set("access_token", "ABCDEFG");
    } catch (error) {
      // can test error behaviour by setting cookie as object
      setError(toErrorWithMessage(error).message);
    }
  };

  return { loading, error, login };
};
