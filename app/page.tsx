import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProblemStrip from "@/components/ProblemStrip";
import DreamState from "@/components/DreamState";
import Mechanism from "@/components/Mechanism";
import Proof from "@/components/Proof";
import Deliverables from "@/components/Deliverables";
import Timeline from "@/components/Timeline";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemStrip />
        <DreamState />
        <Mechanism />
        <Proof />
        <Deliverables />
        <Timeline />
        <Pricing />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
