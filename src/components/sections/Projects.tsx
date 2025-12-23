import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Ollama-Powered Interview Officer",
    category: "LLM / RAG System",
    description: "A sophisticated RAG pipeline leveraging fine-tuned Ollama-based LLMs for contextual government interviewing tasks with real-time multi-agent interactions.",
    problem: "Traditional interview preparation lacks personalized, contextual feedback. Standard LLMs don't provide domain-specific interview guidance.",
    architecture: "Multi-agent LLM pipeline with RAG retrieval from curated knowledge bases, real-time WebSocket communication, and GPU-accelerated fine-tuning.",
    challenges: [
      "Fine-tuning LLMs with limited compute resources using UnSloth optimization",
      "Managing real-time state synchronization across distributed agents",
      "Designing efficient vector retrieval for interview context",
    ],
    outcomes: [
      "Deployed containerized application with Docker Compose",
      "Real-time interaction via WebSocket streaming",
      "GPU-optimized training pipeline",
    ],
    technologies: ["LangChain", "UnSloth", "Docker", "WebSockets", "AWS Redshift", "Apache Kafka", "TypeScript"],
    year: "2025",
  },
  {
    title: "Blockchain-Based Renewable Energy Trading",
    category: "Distributed Systems Research",
    description: "Decentralized P2P energy trading platform using smart contracts and IoT integration for real-time sensor monitoring and automated trading triggers.",
    problem: "Centralized energy grids lack transparency and efficiency for peer-to-peer renewable energy trading. Small producers have no direct market access.",
    architecture: "Solidity smart contracts on Polygon network, embedded C programs for IoT sensors, Flask backend with React frontend, and Web3.js integration.",
    challenges: [
      "Designing a Proof of Burn algorithm modified for real-time sensor data",
      "Integrating embedded systems (Cortex-A53) with blockchain triggers",
      "Ensuring transaction finality while maintaining real-time responsiveness",
    ],
    outcomes: [
      "Published research paper on the system architecture",
      "Implemented escrow agent for trustless P2P transactions",
      "Real-time control system integration with embedded modules",
    ],
    technologies: ["Solidity", "React", "Flask", "Web3.js", "Embedded C", "IoT", "Polygon"],
    year: "2023-24",
    isResearch: true,
  },
  {
    title: "TCR Sequence Extraction Pipeline",
    category: "Bioinformatics / Data Engineering",
    description: "Automated bioinformatics pipeline processing 100M+ RNA sequencing reads for T-cell receptor sequence extraction with advanced analytics.",
    problem: "Extracting TCR sequences from raw RNA-seq data is computationally intensive and requires specialized domain knowledge for accurate alignment.",
    architecture: "Python/R pipeline using MiXCR for sequence alignment, parallel processing for large datasets, and dimensionality reduction for analysis.",
    challenges: [
      "Processing massive datasets (100M+ reads) efficiently",
      "Implementing parallel processing and chunking strategies",
      "Achieving high alignment efficiency (76%) with noisy data",
    ],
    outcomes: [
      "Achieved 76% alignment efficiency on complex RNA data",
      "Leveraged differential analysis for extracted TCR data",
      "Built reusable pipeline for future bioinformatics work",
    ],
    technologies: ["Python", "R", "RStudio", "MiXCR", "Pandas", "NumPy"],
    year: "2025",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="section-padding">
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
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Engineering</p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl">
              Select projects demonstrating system design, distributed computing, and production-grade engineering.
            </p>
          </div>

          {/* Projects */}
          <div className="space-y-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors"
              >
                {/* Project header */}
                <div className="p-6 pb-4">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        {project.isResearch && (
                          <span className="px-2 py-0.5 text-xs font-mono rounded bg-accent text-accent-foreground">
                            Research
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-mono text-primary">{project.category}</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{project.description}</p>

                  {/* Tech stack preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-secondary/60 text-muted-foreground font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 text-xs rounded bg-secondary/60 text-muted-foreground font-mono">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {expandedProject === index ? "Show less" : "View details"}
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform ${
                        expandedProject === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expanded details */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedProject === index ? "auto" : 0,
                    opacity: expandedProject === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-6 border-t border-border pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Problem */}
                      <div>
                        <h4 className="text-sm font-mono text-primary mb-2 uppercase tracking-wide">
                          Problem Statement
                        </h4>
                        <p className="text-sm text-muted-foreground">{project.problem}</p>
                      </div>

                      {/* Architecture */}
                      <div>
                        <h4 className="text-sm font-mono text-primary mb-2 uppercase tracking-wide">
                          Architecture
                        </h4>
                        <p className="text-sm text-muted-foreground">{project.architecture}</p>
                      </div>
                    </div>

                    {/* Challenges */}
                    <div>
                      <h4 className="text-sm font-mono text-primary mb-2 uppercase tracking-wide">
                        Key Challenges
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.challenges.map((challenge, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <h4 className="text-sm font-mono text-primary mb-2 uppercase tracking-wide">
                        Outcomes
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {project.outcomes.map((outcome, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Full tech stack */}
                    <div>
                      <h4 className="text-sm font-mono text-primary mb-2 uppercase tracking-wide">
                        Full Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded bg-secondary/60 text-muted-foreground font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          {/* GitHub CTA */}
          <div className="text-center pt-4">
            <Button variant="outline" asChild>
              <a 
                href="https://github.com/AtharvaW29" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                View More on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
