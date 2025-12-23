import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin, FileText, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="container-narrow">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Section header */}
          <div className="space-y-4">
            <p className="text-sm font-mono text-primary uppercase tracking-widest">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Open to opportunities in Software Engineering, Machine Learning, and Data Engineering roles.
              Let's discuss how I can contribute to your team.
            </p>
          </div>

          {/* Contact methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <a
              href="mailto:awagh@usc.edu"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-0.5 group"
            >
              <Mail className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium group-hover:text-primary transition-colors">Email</p>
              <p className="text-xs text-muted-foreground">awagh@usc.edu</p>
            </a>

            <a
              href="https://github.com/AtharvaW29"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-0.5 group"
            >
              <Github className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium group-hover:text-primary transition-colors">GitHub</p>
              <p className="text-xs text-muted-foreground">@AtharvaW29</p>
            </a>

            <a
              href="https://www.linkedin.com/in/atharva-wagh-1974ab248/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all hover:-translate-y-0.5 group"
            >
              <Linkedin className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium group-hover:text-primary transition-colors">LinkedIn</p>
              <p className="text-xs text-muted-foreground">Connect</p>
            </a>

            <div className="p-4 rounded-xl bg-card border border-border">
              <MapPin className="w-5 h-5 text-primary mb-2 mx-auto" />
              <p className="text-sm font-medium">Location</p>
              <p className="text-xs text-muted-foreground">Los Angeles, CA</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button variant="hero" size="lg" asChild>
              <a href="mailto:awagh@usc.edu">
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="/Atharva_Wagh_Resume.pdf" download>
                <FileText className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
