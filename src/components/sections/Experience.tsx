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
      "Designed and deployed AI-powered automation modules within enterprise CRM systems using AWS SageMaker and .NET, integrating data-based insights for customer communication optimization.",
      "Built containerized data ingestion and transformation APIs with Docker and Kubernetes, achieving 65% faster response time and reliable scalability.",
      "Developed predictive ML microservices using AWS Lambda and REST APIs for forecasting customer conversion rates with >80% accuracy.",
      "Collaborated with cross-functional teams to design and deploy AI-driven customer engagement modules, enhancing retention by leveraging behavioral insights.",
    ],
    technologies: ["AWS SageMaker", ".NET", "Docker", "Kubernetes", "AWS Lambda", "REST APIs", "PostgreSQL"],
  },
  {
    title: "Web Developer Intern",
    type: "Co-Op",
    company: "Mabella SkinCare",
    location: "Mumbai, India",
    period: "Jun 2023 - May 2024",
    highlights: [
      "Engineered a multi-role, full-stack CRM platform with TypeScript/React frontend, .NET backend, and PostgreSQL database, deployed on AWS for high availability and scalability for consistent loads of 10,000 requests per hour.",
      "Designed optimized database schemas and caching methods to support consistent high-load operations, similar to real-time data systems used in robotics and vehicle telemetry.",
      "Performed code reviews, systematic testing, and debugging to enhance platform reliability and user experience.",
    ],
    technologies: ["TypeScript", "React", ".NET", "PostgreSQL", "AWS", "Redis"],
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
