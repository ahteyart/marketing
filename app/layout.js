import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agensi Perkerjaan Global Link Sdn Bhd – Labour Solutions Malaysia",
  description: "Licensed employment agency providing reliable labour and manpower solutions across Malaysia. Factory, construction, plantation, hospitality and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
