import "@/styles/globals.css";
import "../../public/style.css";
import "@/components/header/header.css";
import "@/components/hero/hero.css";
import "@/components/main/main.css";
import "@/components/certificates/certificates.css";
import "@/components/projects/projects.css";
import "@/components/technologies/technologies.css";
import "@/components/loading/loading.css";
import "@/components/shared-components/doubleToggleSwitch/doubleToggleSwitch.css";
import "@/components/shared-components/modal/modal.css";
import "@/components/shared-components/particlesBackground/particlesBackground.css";
import "@/components/contact/contact.css";
import "@/components/footer/footer.css";
import "@/components/sidebar/sidebar.css";
import "@/components/resumeButton/resumeButton.css";
import "@/components/resume/resume.css";
import "@/components/dropdown/dropdown.css";
import "@/components/dropdown/dropdown.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
