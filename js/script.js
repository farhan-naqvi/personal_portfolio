/* ============================================================
   PORTFOLIO INTERACTIONS
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavToggle();
  initActiveNav();
  initScrollReveal();
  initHeroTypewriter();
  initProjectModal();
  initProjectLabRail();
  initEmailCopy();
  initContactForm();
  initBlogCarousel();
});

/* ---------- Footer year ---------- */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });

  // Close menu when a link is clicked
  nav.querySelectorAll(".nav__links a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("nav--open"));
  });
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__links a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.nav === id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Scroll-triggered reveal animations ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));

  // Stagger the "about" paragraphs line by line
  const aboutLines = document.querySelectorAll(".reveal--line");
  aboutLines.forEach((line, i) => {
    line.style.transitionDelay = `${i * 0.12}s`;
  });
}

/* ---------- Hero typewriter ---------- */
function initHeroTypewriter() {
  const el = document.getElementById("heroType");
  if (!el) return;

  const words = [
    "AI-native products",
    "agentic workflows",
    "backend platforms",
    "data infrastructure",
    "developer tools",
    "distributed systems",
    "gRPC backend services",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 70;
  const DELETE_SPEED = 40;
  const PAUSE = 1600;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        return setTimeout(tick, PAUSE);
      }
      return setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        return setTimeout(tick, 300);
      }
      return setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------- Project case-study modal ---------- */
const PROJECT_DATA = {
  1: {
    title: "Visual Multi-Agent Orchestration Platform",
    year: "2026",
    description: "Built a full-stack LLM workflow platform with a React Flow DAG editor, MCP-compatible tool execution, and runtime tracing for agentic pipelines.",
    role: "Full-stack AI platform design and implementation",
    outcome: [
      "Designed and developed a visual multi-agent workflow platform that enables users to build, execute, and inspect LLM-powered pipelines using a drag-and-drop interface.",
      "The system supports modular nodes including LLM agents, tools, MCP tool calls, retrievers, and vector database integration, allowing flexible orchestration of AI workflows such as RAG-based question answering and job automation pipelines.",
      "Implemented a DAG-based workflow execution engine in Python to compile and execute user-defined graphs with topological ordering, supporting multi-step agent chaining and inter-node data flow.",
      " Built a lightweight retrieval-augmented generation (RAG) subsystem with document ingestion, embedding-based similarity search, and vector store-backed context retrieval for grounding LLM responses in user-provided knowledge.",
      "Integrated multiple LLM providers including mock runtime, Ollama local models, and Hugging Face API, enabling configurable inference backends for experimentation and deployment flexibility",
      "Developed workflow observability features, including per-node execution tracking, runtime statistics, and structured logging of agent/tool invocations to improve debugging and transparency.",
      "Exported executable workflows into auto-generated Python scripts, enabling reproducibility and standalone execution outside the visual interface",
    
    ],
    tags: ["Model Context Protocol (MCP)", "Retrieval-Augmented Generation (RAG)", "Large Language Models (LLM)", "Multi-agent Systems", "Vector Databases", "React Flow", "Full-stack Development", "Workflow Orchestration", "AI Platform"],
    link: "https://farhanbytemaster.hashnode.dev/building-a-visual-workflow-designer-for-llm-multi-agent-systems?utm_source=hashnode&utm_medium=feed",
    image: "assets/1_blog.png",
    imageAlt: "Multi-agent orchestration platform screenshot",
    gradient: ["#5EEAD4", "#3B82F6"],
  },
  2: {
    title: "Distributed Object Storage System",
    year: "2025 - 2026",
    description: "Designed a Go-based object store with gRPC streaming, content-addressable persistence, deduplication, and resilient garbage collection.",
    role: "Distributed storage architecture and cleanup pipeline",
    outcome: [
      "Built a chunk-based distributed object storage system in Go with gRPC bidirectional streaming and support for upload, download, and delete operations.",
      "Implemented content-addressable storage using SHA-256 hashing and 4 MB chunk partitioning with reference-count deduplication.",
      "Created an asynchronous garbage collection worker for deleted object processing and orphan chunk reclamation using transactional PostgreSQL coordination.",
    ],
    tags: ["Go", "gRPC", "PostgreSQL", "Distributed Systems", "Content-Addressable Storage", "Garbage Collection", "Deduplication", "Resiliency"],
    link: "https://farhanbytemaster.hashnode.dev/building-a-distributed-storage-metadata-service-in-go",
    image: "assets/p2.webp",
    imageAlt: "Distributed object storage project screenshot",
    gradient: ["#A78BFA", "#5EEAD4"],
  },
  3: {
    title: "Chronos AI",
    year: "AMD Developer Hackathon Act II",
    description: "Decision-intelligence digital twin MVP that builds memory graphs from workspace data and simulates evidence-backed future branches for decisions.",
    role: "Hackathon AI product engineering",
    outcome: [
      "Built a working decision-intelligence application that ingests workspace context from sources such as Slack, GitHub, and Notion to form a memory graph.",
      "Implemented a heuristic simulation flow for exploring plausible future branches per decision, including evidence and rationale surfaces.",
      "Built for the AMD Developer Hackathon Act II and published the live frontend, source repository, and demo video while the written project article is still pending.",
    ],
    tags: ["React 19", "Vite", "FastAPI", "LangGraph", "LangChain", "ChromaDB", "React Flow", "Decision Intelligence"],
    link: "https://chronos-ai-frontend.vercel.app/",
    links: [
      { label: "Open live app", url: "https://chronos-ai-frontend.vercel.app/" },
      { label: "View GitHub", url: "https://github.com/shurender/Chronos-AI" },
      { label: "Watch demo video", url: "https://github.com/shurender/Chronos-AI/blob/main/Frontend/public/demo-video.mp4" },
    ],
    video: "https://raw.githubusercontent.com/shurender/Chronos-AI/main/Frontend/public/demo-video.mp4",
    videoAlt: "Chronos AI application demo video",
    gradient: ["#76D8C4", "#8FB5D9"],
  },
  4: {
    title: "TorqBase: AI Knowledge Platform for Two-Stroke Engine Diagnostics",
    year: "Hirth Engines Hackathon Challenge",
    description: "An AI-powered technical knowledge platform that turns engine manuals, reports, and engineering documents into cited answers and an interactive diagnostic knowledge graph.",
    role: "AI knowledge platform and diagnostic graph engineering",
    outcome: [
      "Built TorqBase for the Hirth Engines challenge to make large, messy engineering document collections easier to search, explain, and use for troubleshooting.",
      "Implemented technical document ingestion, source-backed Q&A with citations, and an interactive 2D Knowledge Graph connecting symptoms, causes, fixes, specifications, parts, and evidence.",
      "Added diagnostic paths, evidence inspection, graph search, filters, focus mode, ranked neighborhoods, and corpus inventory workflows for engineering document collections.",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Docker", "D3.js", "RAG", "Knowledge Graph", "LLM Pipeline"],
    link: "https://github.com/farhan-naqvi/TorqBase",
    links: [
      { label: "View GitHub Repository", url: "https://github.com/farhan-naqvi/TorqBase" },
      { label: "View project deck", url: "assets/torqbase-hackxplore-deck.pdf" },
    ],
    image: "assets/torqbase-cover.webp",
    imageAlt: "TorqBase HackXplore Hirth Engines challenge cover slide",
    gradient: ["#3B82F6", "#5EEAD4"],
  },
  5: {
    title: "FlowForge",
    year: "In progress",
    description: "A production-grade data pipeline orchestration platform for defining pipelines visually, declaratively, or programmatically, then compiling them to workflow executors with deployment and observability support.",
    role: "Pipeline orchestration platform architecture and implementation",
    outcome: [
      "Building a multi-mode pipeline authoring experience across a visual DAG editor, YAML specifications, and a Python SDK backed by a shared intermediate representation.",
      "Designing executor support for Argo Workflows and Apache Airflow so pipeline definitions can compile into deployable workflow targets.",
      "Implementing platform foundations around infrastructure deployment, transformation runtime, execution tracking, metrics, logs, cost estimation, and data lineage.",
      "Marked as in progress while the repository and public release are still being finalized.",
    ],
    tags: ["Go", "TypeScript", "React", "Python SDK", "YAML", "Argo Workflows", "Apache Airflow", "Terraform", "Helm", "Observability"],
    status: "In progress",
    gradient: ["#34D399", "#60A5FA"],
  },
  6: {
    title: "ErasureGraph",
    year: "In progress",
    description: "An in-progress proof-carrying deletion dashboard for privacy, security, compliance, and data-platform teams that need auditable erasure workflows across copied, derived, cached, and backed-up data.",
    role: "Privacy engineering product design and frontend implementation",
    outcome: [
      "Building a responsive React prototype that models how a data subject's records move through source systems, exports, document chunks, embeddings, caches, analytics datasets, training manifests, and backups.",
      "Designing request detail views that track explicit deletion outcomes for every affected artifact, including verification, evidence, certificates, execution status, and audit surfaces.",
      "Wiring Supabase authentication and organization edge functions while using typed seed data for a realistic Northstar Health AI demo scenario.",
      "Keeping the project marked as in progress because real deletion against external systems and the production backend are outside the current phase.",
    ],
    tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "React Router", "Data Lineage", "Privacy Engineering", "Compliance"],
    status: "In progress",
    gradient: ["#818CF8", "#22D3EE"],
  },
  7: {
    title: "Private Agent Governance Prototype",
    year: "In development",
    description: "A confidential local-first React and TypeScript project exploring policy generation, dashboard workflows, and agent-aware website governance without exposing the underlying product direction.",
    role: "Private product engineering, interaction design, and frontend architecture",
    outcome: [
      "Designed a local-first dashboard for managing rules around automated site interaction while keeping user data private by default.",
      "Built a multi-step generator that turns owner intent into structured web-facing policy outputs and previewable configuration files.",
      "Created simulation tools for testing how different classes of non-human visitors might interpret access rules before acting.",
      "Added export/import support, local browser persistence, documentation views, preview surfaces, analytics-style flows, and settings workflows without requiring a backend or user account.",
      "Kept public-facing details intentionally abstract because the project is still confidential and in development.",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "Framer Motion", "Local Storage", "Policy Simulation", "Agent-Aware UX"],
    status: "In development",
    gradient: ["#F59E0B", "#64748B"],
  },
  8: {
    title: "FounderOS",
    year: "AMD AI Developer Hackathon ACT II - Unicorn Track",
    description: "An AI operating system for startup founders that turns a single startup idea into a structured founder workspace coordinated by a team of 9 AI executive agents.",
    role: "Full-stack AI product engineering and agent workflow design",
    outcome: [
      "Built a real-time founder dashboard that coordinates CEO, Market Researcher, CTO, UX Designer, Software Engineer, Marketing Director, VC Analyst, Finance Officer, and Legal Advisor agents.",
      "Implemented Server-Sent Events streaming for live agent activity, progress updates, and structured output generation.",
      "Generated founder-ready outputs including market research, pitch material, technical architecture, MVP code, deployment guidance, operational next steps, and resource council requests.",
      "Integrated Fireworks AI for LLM-powered agent generation and Tavily for web-backed market research.",
      "Added local runtime project storage, safe environment-based API key handling, Docker support, and AMD ROCm-oriented backend scaffolding for future GPU deployment.",
    ],
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "Server-Sent Events", "Fireworks AI", "Tavily API", "Docker", "ROCm"],
    link: "https://github.com/farhan-naqvi/FounderOS",
    links: [
      { label: "View GitHub Repository", url: "https://github.com/farhan-naqvi/FounderOS" },
    ],
    gradient: ["#F97316", "#8B5CF6"],
  },
  // 5: {
  //   title: "Enterprise Anomaly Detection Pipeline",
  //   year: "2025",
  //   description: "Architected ML-based anomaly detection for Oracle and MySQL workloads, monitoring 100K+ events and improving detection stability on imbalanced data.",
  //   role: "Anomaly detection pipeline engineering",
  //   outcome: [
  //     "Reduced false alert volume while maintaining high sensitivity for spikes and unusual behavior.",
  //   ],
  //   tags: ["Anomaly Detection", "Oracle", "Signal Engineering"],
  //   link: "#",
  //   gradient: ["#F472B6", "#A78BFA"],
  // },
  // 4: {
  //   title: "Audit Log Analytics Pipeline",
  //   year: "2024",
  //   description: "Implemented a PostgreSQL-to-Elasticsearch ingestion pipeline and Kibana dashboards to monitor audit logs and service metrics at scale.",
  //   role: "Data pipeline and observability implementation",
  //   outcome: "Deployed containerized pipelines with Docker and Kubernetes for 100M+ record ingestion workflows.",
  //   tags: ["Elasticsearch", "Python", "Kubernetes"],
  //   link: "#",
  //   gradient: ["#3B82F6", "#22D3EE"],
  // },
};

function initProjectModal() {
  const modal = document.getElementById("projectModal");
  const cards = document.querySelectorAll(".project-card[data-project]");
  if (!modal || !cards.length) return;

  const media = document.getElementById("modalMedia");
  const title = document.getElementById("modalTitle");
  const year = document.getElementById("modalYear");
  const description = document.getElementById("modalDescription");
  const role = document.getElementById("modalRole");
  const outcome = document.getElementById("modalOutcome");
  const tagsWrap = document.getElementById("modalTags");
  const linksWrap = document.getElementById("modalLinks");
  const link = document.getElementById("modalLink");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const id = card.dataset.project;
      const data = PROJECT_DATA[id];
      if (!data) return;

      title.textContent = data.title;
      year.textContent = data.year;
      description.textContent = data.description;
      role.textContent = data.role;

      if (Array.isArray(data.outcome)) {
        outcome.innerHTML = `<ul class="modal__outcome-list">${data.outcome.map((item) => `<li>${item}</li>`).join("")}</ul>`;
      } else {
        outcome.textContent = data.outcome;
      }

      if (linksWrap && Array.isArray(data.links) && data.links.length) {
        linksWrap.innerHTML = "";
        linksWrap.style.display = "";
        data.links.forEach((item, index) => {
          const anchor = document.createElement("a");
          anchor.href = item.url;
          anchor.target = "_blank";
          anchor.rel = "noopener noreferrer";
          anchor.className = index === 0 ? "btn btn--primary" : "btn btn--ghost";
          anchor.innerHTML = `<span>${item.label}</span><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
          linksWrap.appendChild(anchor);
        });
      } else if (link && data.link) {
        if (linksWrap && !linksWrap.contains(link)) {
          linksWrap.innerHTML = "";
          linksWrap.appendChild(link);
        }
        if (linksWrap) linksWrap.style.display = "";
        link.href = data.link;
      } else if (linksWrap) {
        linksWrap.innerHTML = "";
        linksWrap.style.display = "none";
      }

      tagsWrap.innerHTML = "";
      data.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "chip";
        span.textContent = tag;
        tagsWrap.appendChild(span);
      });

      if (data.video) {
        media.innerHTML = `<video src="${data.video}" aria-label="${data.videoAlt || data.title}" class="modal__video" controls playsinline preload="metadata"></video>`;
        media.style.background = "none";
      } else if (data.image) {
        media.innerHTML = `<img src="${data.image}" alt="${data.imageAlt || data.title}" class="modal__image" />`;
        media.style.background = "none";
      } else {
        media.innerHTML = "";
        media.style.background = `linear-gradient(135deg, ${data.gradient[0]}, ${data.gradient[1]})`;
      }

      openModal();
    });

    // Keyboard accessibility
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  function openModal() {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });
}

/* ---------- In-progress project rail ---------- */
function initProjectLabRail() {
  const viewport = document.querySelector(".projects-lab__viewport");
  const rail = document.querySelector(".projects-lab__rail");
  if (!viewport || !rail) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const originalCards = Array.from(rail.querySelectorAll(".project-card"));

  function appendCloneSet() {
    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("tabindex");
      clone.removeAttribute("role");
      clone.classList.remove("reveal");
      clone.classList.add("is-visible");
      clone.dataset.railClone = "true";
      rail.appendChild(clone);
    });
  }

  appendCloneSet();
  while (rail.scrollWidth < viewport.clientWidth * 2.2) {
    appendCloneSet();
  }

  function updateRailMotion() {
    const firstClone = rail.querySelector("[data-rail-clone='true']");
    if (!firstClone) return;

    const travel = -firstClone.offsetLeft;
    viewport.style.setProperty("--lab-travel", `${travel}px`);
    viewport.style.setProperty("--lab-duration", `${Math.max(18, Math.abs(travel) / 36)}s`);
    rail.style.animationPlayState = travel === 0 ? "paused" : "";
  }

  updateRailMotion();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(updateRailMotion);
    resizeObserver.observe(viewport);
    resizeObserver.observe(rail);
  } else {
    window.addEventListener("resize", updateRailMotion, { passive: true });
  }
}

/* ---------- Copy email to clipboard ---------- */
function initEmailCopy() {
  const btn = document.getElementById("emailBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch (err) {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    btn.classList.add("is-copied");
    setTimeout(() => btn.classList.remove("is-copied"), 1600);
  });
}

/* ---------- Contact form ---------- */
function initBlogCarousel() {
  const carousel = document.getElementById("blogsCarousel");
  const prev = document.querySelector(".carousel__nav--prev");
  const next = document.querySelector(".carousel__nav--next");
  if (!carousel || !prev || !next) return;

  const scrollStep = carousel.clientWidth * 0.75;

  function updateButtons() {
    prev.disabled = carousel.scrollLeft <= 20;
    next.disabled = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 20;
  }

  prev.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollStep, behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
  });

  carousel.addEventListener("scroll", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in every field before sending.";
      return;
    }

    // No backend: open a pre-filled mail client as the delivery mechanism.
    const recipient = document.getElementById("emailBtn")?.dataset.email || "farhannaqvi16@gmail.com";
    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

    status.textContent = "Opening your email client...";
    form.reset();
  });
}
