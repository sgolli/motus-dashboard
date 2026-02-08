import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Motus Dashboard - Agent Automation Visualizer",
  description: "Visual dashboard showing all agent cron jobs, tasks, and automations with draggable nodes and connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
