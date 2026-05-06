import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import About from "@/components/website/About";
import Services from "@/components/website/Services";
import WhyUs from "@/components/website/WhyUs";
import Contact from "@/components/website/Contact";
import Footer from "@/components/website/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
