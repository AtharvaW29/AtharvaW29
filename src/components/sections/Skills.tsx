import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C++", "C#", "TypeScript", "JavaScript", "R", "SQL", "Bash"],
  },
  {
    title: "Frameworks & Systems",
    skills: ["Spring Boot", ".NET", "Node.js", "Next.js", "LangChain", "Apache Kafka", "Spark"],
  },
  {
    title: "Machine Learning & AI",
    skills: ["PyTorch", "TensorFlow", "Keras", "UnSloth", "Scikit-Learn", "RAG Pipelines"],
  },
  {
    title: "Data & Analytics",
    skills: ["Pandas", "NumPy", "PowerBI", "RStudio", "AWS Redshift", "Matplotlib"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (Lambda, EC2, S3, Redshift)", "Azure", "Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    title: "Specializations",
    skills: ["Distributed Systems", "Multi-Agent Systems", "Real-Time Systems", "AI Automation", "System Design"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
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
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Technical</p>
            <h2 className="text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
          </div>

          {/* Skills grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-wide">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-sm rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
