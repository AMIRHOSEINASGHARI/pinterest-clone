import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Pinterest</title>
        <meta
          name="description"
          content="Discover recipes, home ideas, style inspiration and other ideas to try."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
