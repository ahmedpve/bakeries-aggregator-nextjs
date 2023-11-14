import Layout from "@/components/layout/layout";
import { AuthContextProvider } from "@/store/auth-context";
import { CartContextProvider } from "@/store/cart-context";
import { CurrentUserContextProvider } from "@/store/current-user-context";
import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bakeries Aggregator</title>
        <meta name="description" content="An online aggregator to search and order products from bakery shops." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthContextProvider>
        <CurrentUserContextProvider>
          <CartContextProvider>
            <ChakraProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </CartContextProvider>
        </CurrentUserContextProvider>
      </AuthContextProvider>
    </>
  );
}
