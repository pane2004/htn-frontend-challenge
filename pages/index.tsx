import { LoginPage } from "@/sections/login";
import { GetStaticPropsContext } from "next";

export default function Login() {
  return <LoginPage />;
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/locales/${locale}`)).default
    }
  };
}
