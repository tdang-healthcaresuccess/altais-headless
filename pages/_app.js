import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "../styles/globals.css";
import TermlyCMP from "@/components/TermlyCMP";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <FaustProvider pageProps={pageProps}>
      <TermlyCMP websiteUUID="5994a788-075f-4d09-a85d-79d13ac0aa0f" />
      <Component {...pageProps} key={router.asPath} />
    </FaustProvider>
  );
}
