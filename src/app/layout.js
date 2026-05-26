import "./globals.css";
import { Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Alessio Cavallaro — Portfolio",
  description:
    "Sviluppatore Web & Studente di Ingegneria Informatica | Music Producer & Polistrumentista.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
