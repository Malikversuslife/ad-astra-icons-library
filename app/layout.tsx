import type { Metadata } from "next";
import "./styles.css";
import "./dark.css";
export const metadata: Metadata = { title: "Ad astra — Icon System", description: "A sculptural dimensional icon language by Malik Lawal." };
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
