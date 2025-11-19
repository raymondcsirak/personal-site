import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Raymond Csirak | DevOps Engineer & SRE",
  description: "Get in touch with Raymond Csirak for DevOps, SRE, and Cloud Engineering opportunities.",
  openGraph: {
    title: "Contact Raymond Csirak | DevOps Engineer & SRE",
    description: "Get in touch with Raymond Csirak for DevOps, SRE, and Cloud Engineering opportunities.",
    url: "https://raymi.xyz/contact",
  },
};

export default function Contact() {
  return <ContactContent />;
} 