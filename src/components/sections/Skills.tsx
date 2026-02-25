import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SiPython, SiJavascript, SiCplusplus, SiTypescript, 
  SiR, SiSqlite, SiGnubash, SiSpringboot, 
  SiDotnet, SiNodedotjs, SiNextdotjs, SiLangchain,
  SiApachekafka, SiApachespark,
  SiPytorch,
  SiTensorflow,
  SiKeras,
  SiScikitlearn,
  SiJfrogpipelines,
  SiPandas,
  SiNumpy,
  SiRstudioide,
  SiJupyter,
  SiMysql,
  SiMongodb,
  SiAmazonredshift,
  SiPostgresql,
  SiApachecassandra,
  SiFirebase,
  SiAmazonwebservices,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiLinux,
  SiRabbitmq,
  SiGithub,
  SiGit,
  SiPeakdesign,
  SiUnity,
  } from "react-icons/si";
import { TbAutomation, TbBrandCSharp, TbLivePhoto } from "react-icons/tb";
import { FaJava, FaNetworkWired } from "react-icons/fa";
import { GiHistogram, GiRadioTower, GiSloth } from "react-icons/gi";
import { FcScatterPlot } from "react-icons/fc";
import { VscAzure } from "react-icons/vsc";
import { IoGitPullRequest } from "react-icons/io5";
import { DiRedis } from "react-icons/di";
import { RiRobot2Fill } from "react-icons/ri";
import { BiSolidNetworkChart } from "react-icons/bi";
import {  BsFillOpticalAudioFill } from "react-icons/bs";

const skillCategories = [
  {
    title: "Languages",
    skills: [{icon: SiPython, name: ""},
      {icon: SiJavascript, name: ""},
      {icon: FaJava, name: "Java"},
      {icon: SiCplusplus, name: "C++"},
      {icon: TbBrandCSharp, name: "  "},
      {icon: SiTypescript, name: ""},
      {icon: SiR, name: ""},
      {icon: SiSqlite, name: "SQL"}, {icon: SiGnubash, name: "Bash"}],
  },
  {
    title: "Frameworks & Systems",
    skills: [{icon: SiSpringboot, name: "Spring Boot"}, 
      {icon: SiDotnet, name: ""}, 
      {icon: SiNodedotjs, name: "Node.js"}, 
      {icon: SiNextdotjs, name: "Next.js"}, 
      {icon: SiLangchain, name: "LangChain"}, 
      {icon: SiApachekafka, name: "Apache Kafka"}, 
      {icon: SiApachespark, name: "Apache Spark"},
      {icon: SiPeakdesign, name: "System Design"},
      {icon: SiUnity, name: "Game Development"}
    ]
  },
  {
    title: "Machine Learning & AI",
    skills: [{icon: SiPytorch, name: "PyTorch"}, {icon: SiTensorflow, name: "TensorFlow"}, 
      {icon: SiKeras, name: "Keras"}, {icon: GiSloth, name: "UnSloth"}, 
      {icon: BiSolidNetworkChart, name: "ONNX"}, {icon: SiScikitlearn, name: "Scikit-Learn"}, 
      {icon: SiJfrogpipelines, name: "RAG Pipelines"}, {icon: BsFillOpticalAudioFill, name: "OCR"}],
  },
  {
    title: "Data & Analytics",
    skills: [{icon: SiPandas, name: "Pandas"}, {icon: SiNumpy, name: "NumPy"}, 
      {icon: GiHistogram, name: "PowerBI"}, {icon: SiRstudioide, name: "RStudio"}, 
      {icon: SiJupyter, name: "Jupyter"}, {icon: FcScatterPlot, name: "Matplotlib"}],
  },
  {
    title: "Databases & Caching",
    skills: [{icon: SiMysql, name: "MySQL"}, {icon: SiMongodb, name: "MongoDB"}, 
      {icon: SiAmazonredshift, name: "AWS Redshift"}, {icon: SiPostgresql, name: "PostgreSQL"}, 
      {icon: SiApachecassandra, name: "Cassandra"}, {icon: SiFirebase, name: "Firebase"},
      {icon: DiRedis, name: "Redis"}, {icon: SiRabbitmq, name: "RabbitMQ"}],
  },
  {
    title: "Cloud & DevOps",
    skills: [{icon: SiAmazonwebservices, name: "AWS"}, {icon: VscAzure, name: "Azure"}, 
      {icon:  SiGooglecloud, name: "GCP"}, {icon: SiGithub, name: "GitHub"},
      {icon: SiDocker, name: "Docker"}, {icon: SiKubernetes, name: "Kubernetes"}, 
      {icon: IoGitPullRequest, name: "CI/CD"}, {icon: SiLinux, name: "Linux"},
      {icon: SiGit, name: "Git"}],
  },
  {
    title: "Specializations",
    skills: [
      {icon: FaNetworkWired, name: "Distributed Systems"},
      {icon: RiRobot2Fill, name: "Multi-Agent Systems"},
      {icon: TbLivePhoto, name: "Real-Time Systems"},
      {icon: TbAutomation, name: "AI Automation"},
      {icon: GiRadioTower, name: "Internet of Things"},
      {icon: SiPeakdesign, name: "System Design"}],
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
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
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
                      key={skill.name}
                      className="flex flex-row px-2.5 py-1 text-sm rounded-md bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {skill.icon && <skill.icon className="text-slate-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-pulseinline mr-1 h-5 w-5" />}
                      {skill.name}
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
