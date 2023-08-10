// Global CSS
import "@/styles/globals.css";
// React Tooltip CSS
import "react-tooltip/dist/react-tooltip.css";
// Next Imports
import { SessionProvider } from "next-auth/react";
// Components
import { Layout } from "@/components";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
