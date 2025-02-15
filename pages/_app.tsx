import "@/styles/globals.css";
import type { AppProps } from 'next/app'
import { NextIntlClientProvider } from 'next-intl';

import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter();

  return getLayout(
    <NextIntlClientProvider locale={router.locale}
      timeZone="America/Toronto"
      messages={pageProps.messages}
    >
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
