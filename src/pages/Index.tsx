import ThreeBackground from "@/components/portfolio/ThreeBackground";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import School from "@/components/portfolio/School";
import Gaming from "@/components/portfolio/Gaming";
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
        <School />
        <Gaming />
        <Skills />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
