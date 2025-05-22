import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/Footer";
import LoadingSpinnerWrapper from "@/components/LoadingSpinnerWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="da">
        <body className={`${montserrat.variable} antialiased`}>
          <LoadingSpinnerWrapper>
            <main>{children}</main>
            <Footer />
          </LoadingSpinnerWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
