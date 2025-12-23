import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, MapPin } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding">
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
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Background</p>
            <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
          </div>

          {/* Education cards */}
          <div className="space-y-4">
            {/* USC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">Master of Science in Computer Science</h3>
                      <p className="text-primary font-medium">University of Southern California</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">Expected May 2027</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    Los Angeles, CA
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mumbai */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">
                        Bachelor of Technology in Information Technology
                      </h3>
                      <p className="text-primary font-medium">University of Mumbai</p>
                    </div>
                    <span className="text-sm text-muted-foreground font-mono">2020 - 2024</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Mumbai, India
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-foreground font-medium">GPA: 4.0 / 4.0</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-sm">
                    Blockchain Honors
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
