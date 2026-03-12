import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QITCHEN | Premium Sushi Restaurant",
  description: "Experience the art of sushi at Qitchen. Premium Japanese cuisine, expertly crafted rolls, and an unforgettable dining experience. Book your table today.",
  keywords: "sushi, restaurant, Japanese cuisine, fine dining, maki, uramaki, reservation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
