import { useState } from "react";
import Cookies from "js-cookie";

import { toErrorWithMessage } from "@/utils/error";
import { ACCESS_TOKEN } from "@/constants/cookies";
import { useSavedEvents } from "./useSavedEvents";

export const useLogout = () => {
  // not very applicable for fake login but normally i would add error and loading states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { clearSavedEvents } = useSavedEvents();

  const logout = async () => {
    try {
      // here would call the logout endpoint if it existed
      Cookies.remove(ACCESS_TOKEN);
      clearSavedEvents();
    } catch (error) {
      setError(toErrorWithMessage(error).message);
    }
  };

  return { loading, error, logout };
};
