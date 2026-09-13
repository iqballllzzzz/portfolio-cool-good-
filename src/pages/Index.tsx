import ThreeBackground from "@/components/portfolio/ThreeBackground";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Karya from "@/components/portfolio/Karya";
import Discord from "@/components/portfolio/Discord";
import Skills from "@/components/portfolio/Skills";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ThreeBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Karya />
        <Discord />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default Index;