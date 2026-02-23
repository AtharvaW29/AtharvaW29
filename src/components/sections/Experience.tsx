import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, MapPin, Calendar, Building2 } from "lucide-react";

const experiences = [
  {
    title: "Software Developer",
    type: "Full Time",
    company: "Institute of Management and Foreign Studies (IMFS)",
    location: "Mumbai, India",
    period: "Jul 2024 - May 2025",
    highlights: [
        "Designed, analyzed, and developed backend software solutions using Python and .NET APIs to support enterprise CRM and transactional systems.",
        "Built and deployed containerized microservices using Docker and Kubernetes, improving system response time by 83\% and enabling scalable, reliable deployments.",
        "Developed RESTful APIs for structured data ingestion, transformation, and database integration using MySQL and PostgreSQL.",
        "Implemented automated data processing workflows and analytics modules using AWS SageMaker to support business logic and performance insights.",
        "Implemented ONNX cross platform machine learning model deployment to develop models in PyTorch and deploy in .NET mvc for scalabiliy and production performance.",
    ],
    technologies: ["AWS SageMaker", ".NET", "Docker", "Kubernetes", "AWS Lambda", "ONNX", "PySpark", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Web Developer Intern",
    type: "Co-Op",
    company: "Mabella SkinCare",
    location: "Mumbai, India",
    period: "Jun 2023 - May 2024",
    highlights: [
        "Engineered a full-stack enterprise CRM system using React, TypeScript, Flask, and PostgreSQL, supporting consistent transactional workloads.",
        "Designed optimized database schemas and caching methods to support consistent high-load operations.",
        "Architected real-time analytics infrastructure and caching layers using PostgreSQL, improving query performance and data throughput.",
        "Designed \& Deployed a OCR based product recommendation system using Tesseract, Fast API \& Docker.",
    ],
    technologies: ["TypeScript", "React", ".NET", "PostgreSQL", "AWS", "Redis", "RabbitMQ", "Tesseract OCR", "FastAPI"],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id="experience" className="section-padding bg-secondary/20">
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
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Career</p>
            <h2 className="text-3xl md:text-4xl font-bold">Professional Experience</h2>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="rounded-xl bg-card border border-border overflow-hidden"
              >
                {/* Header - clickable */}
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-secondary/30 transition-colors"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <span className="px-2 py-0.5 text-xs font-mono rounded bg-primary/10 text-primary">
                        {exp.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Expandable content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedIndex === index ? "auto" : 0,
                    opacity: expandedIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 space-y-4">
                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-wide">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
