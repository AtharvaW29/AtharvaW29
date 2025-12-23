import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Atharva Wagh | Software Engineer & Research-Oriented Developer</title>
        <meta 
          name="description" 
          content="Atharva Wagh - Software Engineer building scalable distributed systems and AI-driven platforms. MS CS at USC, experienced in ML, cloud-native architectures, and production-grade software." 
        />
        <meta 
          name="keywords" 
          content="Software Engineer, Machine Learning Engineer, Distributed Systems, AI, Python, AWS, Full Stack Developer, USC, Atharva Wagh" 
        />
        <meta property="og:title" content="Atharva Wagh | Software Engineer" />
        <meta 
          property="og:description" 
          content="Building scalable distributed systems and AI-driven platforms that translate research into production-grade software." 
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Atharva Wagh | Software Engineer" />
        <meta 
          name="twitter:description" 
          content="Building scalable distributed systems and AI-driven platforms that translate research into production-grade software." 
        />
        <link rel="canonical" href="https://atharvawagh.dev" />
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Research />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
