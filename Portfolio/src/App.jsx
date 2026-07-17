import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Preloader from "./components/Preloader";
import Background from "./components/Background";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import LiveBand from "./components/LiveBand";
import Skills from "./sections/Skills";
import Bento from "./sections/Bento";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="grain relative min-h-screen">
      <Preloader onDone={() => setReady(true)} />

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[--color-violet] via-[--color-purple] to-[--color-magenta]"
      />

      <Background />
      <Cursor />
      <Navbar />

      <main>
        <Hero start={ready} />
        <About />
        <LiveBand />
        <Skills />
        <Bento />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
