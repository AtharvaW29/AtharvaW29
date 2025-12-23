import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, FileText } from "lucide-react";

const Research = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="research" className="section-padding bg-secondary/20">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          {/* Section header */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Academic</p>
            <h2 className="text-3xl md:text-4xl font-bold">Research & Publications</h2>
          </div>

          {/* Publication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <FileText className="w-6 h-6" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      Bridging Energy Gaps: Blockchain-Enabled P2P Trading for Renewable Energy
                    </h3>
                    <p className="text-sm text-muted-foreground">2024 • Peer-Reviewed Publication</p>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1zLUzS5S13gGqnUjNrlcndFPUjHwXu3Ib/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View Paper
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-muted-foreground">
                  Research on decentralized energy trading systems leveraging distributed algorithms and 
                  smart contracts to enable transparent, efficient peer-to-peer renewable energy transactions. 
                  The paper explores optimization algorithms for real-time IoT sensor integration and automated 
                  distributed system architectures.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Distributed Systems", "Blockchain", "IoT Integration", "Smart Contracts", "Decentralized Architecture"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-secondary/60 text-muted-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Research focus areas */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Distributed Systems",
                description: "Designing scalable, fault-tolerant architectures for real-time applications",
              },
              {
                title: "Decentralized Protocols",
                description: "Blockchain-based solutions for trustless peer-to-peer transactions",
              },
              {
                title: "Real-Time Integration",
                description: "IoT sensor networks and embedded systems for live data processing",
              },
            ].map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="p-4 rounded-lg bg-card/50 border border-border"
              >
                <h4 className="font-medium mb-1">{area.title}</h4>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
