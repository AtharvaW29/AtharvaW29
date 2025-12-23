import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Section header */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-primary uppercase tracking-widest">About</p>
            <h2 className="text-3xl md:text-4xl font-bold">Profile & Background</h2>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main text */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a <span className="text-foreground font-medium">Master's student in Computer Science</span> at the 
                University of Southern California (Expected 2027), with a strong foundation in distributed systems, 
                machine learning, and cloud-native development.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                With 2+ years of professional experience as a full-time Software Developer at IMFS, 
                I've built AI-powered automation systems, deployed ML services in production, and 
                designed enterprise-scale CRM platforms serving thousands of users.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                My work spans the bridge between <span className="text-foreground font-medium">research ideas</span> and{" "}
                <span className="text-foreground font-medium">production systems</span>—taking cutting-edge concepts 
                in AI, distributed computing, and real-time systems and translating them into reliable, scalable software.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Enterprise AI Automation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">ML Services at Scale</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Full-Stack Distributed Systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Research-Driven Development</span>
                </div>
              </div>
            </div>

            {/* Quick facts */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Current Focus</p>
                <p className="font-medium">MS Computer Science @ USC</p>
              </div>
              
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Experience</p>
                <p className="font-medium">2+ Years Professional</p>
              </div>
              
              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Previous Education</p>
                <p className="font-medium">B.Tech IT (Blockchain Honors)</p>
                <p className="text-sm text-muted-foreground">University of Mumbai • GPA: 4.0/4.0</p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Location</p>
                <p className="font-medium">Los Angeles, CA</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
