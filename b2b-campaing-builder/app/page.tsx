import type { Metadata } from "next";
import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  title: "AdGenius | B2B Google Ads Campaign Generator",
  description:
    "Generate high-performing Google Ads campaigns for B2B service companies from a landing page URL",
};

export default function Home() {
  return <LandingPage />;
}
