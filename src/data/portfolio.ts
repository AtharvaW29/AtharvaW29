// Single source of truth for all portfolio content.
// Both the game (panels, dialogue) and the quick view render from this file.

export type LocationId =
  | "about"
  | "experience"
  | "projects"
  | "research"
  | "education"
  | "skills"
  | "arcade"
  | "contact";

export interface LinkItem {
  label: string;
  href: string;
}

export interface Entry {
  id: string;
  title: string;
  subtitle?: string;
  meta?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
  links?: LinkItem[];
}

export interface LocationContent {
  id: LocationId;
  /** In-game building name */
  place: string;
  /** Plain section name used in the quick view */
  section: string;
  blurb: string;
  entries: Entry[];
}

export const RESUME_URL = `${import.meta.env.BASE_URL}Atharva_Wagh.pdf`;

export const profile = {
  name: "Atharva Wagh",
  role: "Software Engineer",
  tagline: "Distributed systems, data pipelines and applied ML",
  status: "Open to SWE / ML / Data Engineering roles",
  location: "Los Angeles, CA",
  email: "awagh@usc.edu",
  github: "https://github.com/AtharvaW29",
  githubSchool: "https://github.com/awagh29",
  linkedin: "https://www.linkedin.com/in/atharva-wagh-1974ab248/",
};

export const locations: LocationContent[] = [
  {
    id: "about",
    place: "Home",
    section: "About",
    blurb: "Who lives here, and what he is up to.",
    entries: [
      {
        id: "profile",
        title: "Atharva Wagh",
        subtitle: "Software Engineer",
        meta: "Los Angeles, CA",
        summary:
          "MS Computer Science student at the University of Southern California with 2+ years of experience building backend services, data pipelines and ML-powered systems.",
        bullets: [
          "Currently a Student Software Developer at USC Viterbi K-12, building enterprise applications.",
          "Previously a full-time Software Developer at IMFS in Mumbai, shipping containerized microservices to production.",
          "Interested in the overlap of systems engineering, data at scale and applied ML.",
          "Open to SWE / ML / Data Engineering roles.",
        ],
        links: [
          { label: "Download resume", href: RESUME_URL },
          { label: "Email", href: "mailto:awagh@usc.edu" },
        ],
      },
      {
        id: "focus",
        title: "Current focus",
        subtitle: "What is on the workbench right now",
        bullets: [
          "ARES: UAV navigation research with intermittent or unavailable LiDAR.",
          "NothingDB: a relational database engine written from scratch in C++20.",
          "SYNC: a coordination layer for agentic workflows.",
        ],
      },
    ],
  },
  {
    id: "experience",
    place: "Guild Hall",
    section: "Experience",
    blurb: "Completed and active quests.",
    entries: [
      {
        id: "usc-k12",
        title: "Student Software Developer",
        subtitle: "USC Viterbi School of Engineering (K-12)",
        meta: "May 2026 - Present · Los Angeles, CA",
        bullets: [
          "Built logging and mission-style security dashboards with anomaly detection using Azure ML, Splunk and .NET.",
          "Built scalable backend APIs, orchestration services and full-stack AI-integrated web modules inside enterprise CRM systems.",
          "Implemented stored procedures in auth pipelines, improving operational efficiency and security.",
          "Contributed to debugging, system design, A/B testing, privacy analysis and iterative optimization of production systems in an Agile team.",
          "Designed logging and monitoring pipelines that support operational analysis and anomaly detection.",
        ],
        tags: [".NET", "Azure ML", "Splunk", "SQL", "REST APIs"],
      },
      {
        id: "imfs",
        title: "Software Developer (Full Time)",
        subtitle: "Institute of Management and Foreign Studies (IMFS)",
        meta: "Jul 2024 - May 2025 · Mumbai, India",
        bullets: [
          "Developed scalable backend services and REST APIs in Python and .NET for cloud-native, database-driven applications.",
          "Designed relational and NoSQL database systems (PostgreSQL, MongoDB) for high-performance querying and analytics.",
          "Deployed, monitored and maintained production applications and backend services on AWS.",
          "Containerized microservices with Docker and Kubernetes, improving deployment efficiency and application performance by 80%.",
        ],
        tags: ["Python", ".NET", "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"],
      },
      {
        id: "mabella",
        title: "Web Developer Intern (Co-Op)",
        subtitle: "Mabella SkinCare",
        meta: "Jun 2023 - May 2024 · Mumbai, India",
        bullets: [
          "Engineered a full-stack CRM platform with React, Flask and PostgreSQL for high-volume transactional workloads.",
          "Developed a Beautiful Soup web-scraping service for market analysis, supporting inventory and production decisions.",
          "Debugged and tested web applications across frontend and backend layers.",
          "Designed and optimized database-driven features, improving data retrieval performance.",
        ],
        tags: ["React", "TypeScript", "Flask", "PostgreSQL", "Beautiful Soup"],
      },
    ],
  },
  {
    id: "projects",
    place: "Workshop",
    section: "Projects",
    blurb: "Things built, broken and rebuilt.",
    entries: [
      {
        id: "ares",
        title: "ARES",
        subtitle: "UAV navigation with intermittent LiDAR",
        meta: "2026 · Research project",
        summary:
          "A research project for single-UAV navigation when LiDAR is intermittent or unavailable. It combines a MATLAB/Simulink quadrotor simulation, reproducible telemetry and dataset collection, Python reconstruction training and closed-loop inference experiments.",
        bullets: [
          "Baseline LiDAR obstacle avoidance with a VFH/PID controller.",
          "Reconstruction models (SAITS, CNN/MLP, sparsity-invariant CNN) supply estimated observations during sensor outages.",
          "A state-augmented SAITS reconstructor trained with a differentiable barrier QP.",
          "Trained models exported to native MATLAB inference and checked against PyTorch reference cases.",
        ],
        tags: ["MATLAB", "Simulink", "PyTorch", "SAITS", "BarrierNet", "ONNX"],
        links: [{ label: "Repository", href: "https://github.com/awagh29/ARES" }],
      },
      {
        id: "nothingdb",
        title: "NothingDB",
        subtitle: "Relational database engine in modern C++",
        meta: "2026 · In progress",
        summary:
          "A relational database management system being built from scratch in C++20 with a modular CMake build.",
        bullets: [
          "Page-based storage, tuple lifecycle management, logical deletion and RID-based updates.",
          "Explores buffer pool management, B+ tree indexing, query parsing and execution pipelines.",
          "Roadmap covers transactions, write-ahead logging and concurrency control.",
        ],
        tags: ["C++20", "CMake", "Storage engines", "Query processing"],
        links: [
          { label: "Repository", href: "https://github.com/AtharvaW29/NothingDBFromScratch" },
        ],
      },
      {
        id: "sync",
        title: "SYNC",
        subtitle: "Framework-agnostic agentic workflow synchronization layer",
        meta: "2026",
        summary:
          "Coordinates finite worker, station and reusable-resource capacity through an authoritative SpacetimeDB execution engine, with a dashboard showing live runs.",
        bullets: [
          "Primal-dual planner with a reproducible benchmark command.",
          "Real worker subprocesses with scale-up, task execution and cancellation.",
          "Single-container production deployment.",
        ],
        tags: ["TypeScript", "SpacetimeDB", "Node.js", "Vitest", "Docker"],
        links: [
          { label: "Repository", href: "https://github.com/awagh29/SYNC" },
          { label: "Live demo", href: "https://sync-3t5e.onrender.com" },
        ],
      },
      {
        id: "interview",
        title: "Multi-Agent AI Interview Platform",
        subtitle: "LLM agents that run technical interviews",
        meta: "2025",
        summary:
          "A multi-agent system built with LangChain, AWS Bedrock and RAG pipelines to simulate autonomous technical interview workflows.",
        bullets: [
          "Event-driven communication over Apache Kafka and WebSockets for low-latency multi-agent orchestration and streaming.",
          "Tool calling, web scraping, vector retrieval and contextual memory to improve response quality.",
          "Fine-tuning with UnSloth; services containerized with Docker.",
        ],
        tags: ["LangChain", "AWS Bedrock", "RAG", "Kafka", "WebSockets", "Django", "Docker"],
        links: [
          { label: "Repository", href: "https://github.com/AtharvaW29/AI_Interview_Prototype" },
        ],
      },
      {
        id: "f1",
        title: "Formula 1 Podium Prediction",
        subtitle: "Pre- and post-qualifying race outcome model",
        meta: "2026",
        summary:
          "Machine learning on historical and live F1 data to predict Grand Prix podiums before and after qualifying.",
        bullets: [
          "Logistic Regression model with an 82.35% true positive rate and 0.98 AUC.",
          "Reusable analytics pipelines for querying, feature engineering and race simulations.",
          "Interactive Power BI dashboard for race analysis.",
        ],
        tags: ["Python", "SQL", "Scikit-learn", "AWS SageMaker", "Power BI"],
        links: [{ label: "Repository", href: "https://github.com/AtharvaW29/F1_Analysis" }],
      },
      {
        id: "ats",
        title: "ATS Resume Optimizer",
        subtitle: "Local résumé tailoring with a knowledge base",
        meta: "2026",
        summary:
          "A local web app that takes a job description, retrieves confirmed experience from a persistent SQLite knowledge base and produces a tailored one-page PDF.",
        bullets: [
          "Local RAG retrieval over a personal knowledge base.",
          "Structured LLM outputs with prompt caching.",
          "LaTeX rendering with a check that the result fits on exactly one page.",
        ],
        tags: ["Python", "Flask", "SQLite", "RAG", "LaTeX", "Docker"],
        links: [
          { label: "Repository", href: "https://github.com/awagh29/ATS-Resume-Optimizer" },
        ],
      },
      {
        id: "wattswap",
        title: "WattSwap",
        subtitle: "Peer-to-peer renewable energy trading",
        meta: "2023 - 2024",
        summary:
          "A decentralized energy trading platform with smart-contract escrow and dual-party approval. The system design was published as a research paper.",
        bullets: [
          "Solidity smart contracts with an escrow agent for trustless P2P transactions.",
          "IoT sensor integration for real-time monitoring and automated trading triggers.",
          "Multi-chain V2 with USDC escrow and QR payments.",
        ],
        tags: ["Solidity", "React", "Web3.js", "Express", "MongoDB", "IoT"],
        links: [{ label: "Repository", href: "https://github.com/AtharvaW29/WattSwap" }],
      },
      {
        id: "tcr",
        title: "TCR Sequence Extraction Pipeline",
        subtitle: "Bioinformatics data engineering",
        meta: "2025",
        summary:
          "An automated pipeline that processes 100M+ RNA sequencing reads to extract T-cell receptor sequences.",
        bullets: [
          "MiXCR alignment with parallel processing and chunking for large datasets.",
          "76% alignment efficiency on noisy RNA data.",
          "Differential analysis and dimensionality reduction on the extracted TCR data.",
        ],
        tags: ["Python", "R", "MiXCR", "Pandas", "NumPy"],
        links: [
          {
            label: "Repository",
            href: "https://github.com/AtharvaW29/TCR-Extraction-From-RNA-Sequences",
          },
        ],
      },
      {
        id: "admissions",
        title: "College Admission Prediction",
        subtitle: "Ensemble ML for multi-class admissions",
        meta: "2024",
        summary:
          "A Random Forest + XGBoost pipeline for multi-class admissions classification, served through FastAPI.",
        bullets: [
          "ROC AUC of 0.81 on train and 0.78 on test.",
          "REST endpoints for real-time inference, with model serving on AWS SageMaker.",
        ],
        tags: ["Python", "XGBoost", "Random Forest", "FastAPI", "AWS SageMaker"],
        links: [
          {
            label: "Repository",
            href: "https://github.com/AtharvaW29/College-Admission-Prediction-System",
          },
        ],
      },
    ],
  },
  {
    id: "research",
    place: "Library",
    section: "Research",
    blurb: "Papers, experiments and open questions.",
    entries: [
      {
        id: "paper",
        title: "Bridging Energy Gaps: Blockchain-Enabled P2P Trading for Renewable Energy",
        subtitle: "Peer-reviewed publication",
        meta: "2024",
        summary:
          "Research on decentralized energy trading that uses distributed algorithms and smart contracts for transparent peer-to-peer renewable energy transactions, with real-time IoT sensor integration.",
        tags: ["Distributed systems", "Blockchain", "Smart contracts", "IoT"],
        links: [
          {
            label: "View paper",
            href: "https://drive.google.com/file/d/1zLUzS5S13gGqnUjNrlcndFPUjHwXu3Ib/view",
          },
        ],
      },
      {
        id: "ares-research",
        title: "ARES: navigation under sensor failure",
        subtitle: "Ongoing research",
        meta: "2026",
        summary:
          "Studies whether learned reconstruction of missing LiDAR observations, combined with barrier-function safety layers, can keep a quadrotor navigating through sensor outages.",
        tags: ["Robotics", "Time-series imputation", "Control barrier functions"],
        links: [{ label: "Repository", href: "https://github.com/awagh29/ARES" }],
      },
      {
        id: "tcr-research",
        title: "TCR extraction from RNA-seq",
        subtitle: "Bioinformatics research at USC",
        meta: "2025",
        summary:
          "ETL pipelines for RNA-seq data, extracting T-cell receptor sequences from FASTQ files and comparing extraction tools.",
        tags: ["Bioinformatics", "ETL", "MiXCR"],
      },
    ],
  },
  {
    id: "education",
    place: "Academy",
    section: "Education",
    blurb: "Where the stats were levelled up.",
    entries: [
      {
        id: "usc",
        title: "MS in Computer Science",
        subtitle: "University of Southern California",
        meta: "Aug 2025 - May 2027 · Los Angeles, CA",
        bullets: [
          "GPA: 3.57 / 4.0",
          "Coursework: Distributed Systems, High-Performance Computing, Deep Learning, Advanced Computer Vision.",
        ],
      },
      {
        id: "mumbai",
        title: "B.Tech in Information Technology",
        subtitle: "University of Mumbai",
        meta: "Aug 2020 - May 2024 · Mumbai, India",
        bullets: ["GPA: 4.0 / 4.0", "Blockchain Honors"],
      },
    ],
  },
  {
    id: "skills",
    place: "Armory",
    section: "Skills",
    blurb: "Equipment and abilities.",
    entries: [
      {
        id: "languages",
        title: "Languages",
        tags: ["Python", "Java", "C++", "C#", "JavaScript", "TypeScript", "SQL", "R", "Bash"],
      },
      {
        id: "frameworks",
        title: "Frameworks",
        tags: [
          "React",
          "Node.js",
          "Next.js",
          "Django",
          "Spring Boot",
          ".NET",
          "FastAPI",
          "Flask",
          "GraphQL",
          "REST APIs",
          "Vue.js",
        ],
      },
      {
        id: "cloud",
        title: "Cloud & DevOps",
        tags: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "Linux", "Git", "CI/CD", "Azure DevOps"],
      },
      {
        id: "data",
        title: "Databases & Messaging",
        tags: [
          "PostgreSQL",
          "MySQL",
          "MongoDB",
          "Redis",
          "Cassandra",
          "Apache Kafka",
          "RabbitMQ",
          "Apache Spark",
        ],
      },
      {
        id: "ml",
        title: "Machine Learning & AI",
        tags: [
          "PyTorch",
          "TensorFlow",
          "Scikit-learn",
          "Pandas",
          "NumPy",
          "ONNX",
          "LLMs",
          "RAG",
          "LangChain",
          "UnSloth",
        ],
      },
      {
        id: "concepts",
        title: "Core Concepts",
        tags: [
          "Microservices",
          "Distributed Systems",
          "System Design",
          "Data Pipelines",
          "Parallel Processing",
          "Multi-Agent Systems",
        ],
      },
    ],
  },
  {
    id: "arcade",
    place: "Arcade",
    section: "Game Dev",
    blurb: "Yes, he makes games too.",
    entries: [
      {
        id: "pulse-thief",
        title: "Pulse Thief",
        subtitle: "Top-down adventure game",
        meta: "2026",
        summary: "A top-down adventure game, published as a web build.",
        tags: ["Game development", "WebGL"],
        links: [{ label: "Repository", href: "https://github.com/awagh29/Pulse-Thief" }],
      },
      {
        id: "enigma",
        title: "Enigma",
        subtitle: "Team game project",
        meta: "2026",
        summary:
          "A team-built game taken through alpha, beta and gold builds over a semester.",
        tags: ["Game development", "Team project", "WebGL"],
        links: [
          { label: "Gold build", href: "https://github.com/awagh29/Team10_Enigma_GoldBuild" },
        ],
      },
      {
        id: "this-site",
        title: "This portfolio",
        subtitle: "The town you are standing in",
        meta: "2026",
        summary:
          "A top-down pixel town built with React and Phaser 3. Every sprite and tile is drawn in code at load time, so there are no image assets.",
        tags: ["React", "Phaser 3", "TypeScript", "Vite"],
        links: [{ label: "Source", href: "https://github.com/AtharvaW29/AtharvaW29" }],
      },
    ],
  },
  {
    id: "contact",
    place: "Post Office",
    section: "Contact",
    blurb: "Send a letter. Replies are fast.",
    entries: [
      {
        id: "reach",
        title: "Get in touch",
        subtitle: "Open to SWE / ML / Data Engineering roles",
        meta: "Los Angeles, CA",
        summary: "The quickest way to reach Atharva is email.",
        links: [
          { label: "awagh@usc.edu", href: "mailto:awagh@usc.edu" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/atharva-wagh-1974ab248/" },
          { label: "GitHub (personal)", href: "https://github.com/AtharvaW29" },
          { label: "GitHub (USC)", href: "https://github.com/awagh29" },
          { label: "Download resume", href: RESUME_URL },
        ],
      },
    ],
  },
];

export const locationById = Object.fromEntries(
  locations.map((l) => [l.id, l]),
) as Record<LocationId, LocationContent>;
