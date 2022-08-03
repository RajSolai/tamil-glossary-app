import "../styles/globals.css";
import type { AppProps } from "next/app";
import { LayoutComponent } from "../components/LayoutComponent/LayoutComponent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutComponent>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </LayoutComponent>
  );
}

export default MyApp;
