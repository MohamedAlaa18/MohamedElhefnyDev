import "@/styles/globals.css";
import "../../public/style.css";
import "@/components/contact/contact.css";
import "@/components/footer/footer.css";
import "@/components/header/header.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
