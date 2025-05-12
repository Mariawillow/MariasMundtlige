import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="da">
      <body className={`${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
    </ClerkProvider>

  );
}


