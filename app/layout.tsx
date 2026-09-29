import type { Metadata } from "next";
import "./styles.css";
import "./dark.css";
export const metadata: Metadata = {
  title: "Ad astra — Icon Library",
  description: "Ad astra is a sculptural, material-forward SVG icon library by Malik Lawal — 106 chromatic interface objects for premium digital products.",
  authors: [{ name: "Malik Lawal" }],
  creator: "Malik Lawal",
  publisher: "Malik Lawal",
  keywords: ["Ad astra", "Malik Lawal", "icon library", "SVG icons", "Figma plugin", "design system"],
  openGraph: {
    title: "Ad astra — Icon Library",
    description: "106 sculptural, chromatic SVG icons by Malik Lawal.",
  },
};
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
