import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

import { SocketContext, socket } from "../components/SocketContext/socket";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketContext.Provider value={socket}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SocketContext.Provider>
  );
}
