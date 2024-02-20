import { useState } from "react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "@/constants/cookies";

export const useLogin = () => {
  // not very applicable for fake login but normally i would add error and loading states
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    // would call login endpoint here to actually login, for our purposes hard-code
    if (email !== "name@email.com") {
      throw new Error("Invalid Email");
    }
    if (password !== "password") {
      throw new Error("Invalid Password");
    }
    Cookies.set(ACCESS_TOKEN, "ABCDEFG");
  };

  return { loading, login };
};
