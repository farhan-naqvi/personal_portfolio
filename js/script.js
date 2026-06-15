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

  const words = ["distributed systems", "data pipelines", 
  "storage infrastructure",
  "agentic AI products",
  "ML systems",
  "gRPC backend services",
  "retrieval architectures"];
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
  // 3: {
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
  const cards = document.querySelectorAll(".project-card");
  if (!modal || !cards.length) return;

  const media = document.getElementById("modalMedia");
  const title = document.getElementById("modalTitle");
  const year = document.getElementById("modalYear");
  const description = document.getElementById("modalDescription");
  const role = document.getElementById("modalRole");
  const outcome = document.getElementById("modalOutcome");
  const tagsWrap = document.getElementById("modalTags");
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

      link.href = data.link;

      tagsWrap.innerHTML = "";
      data.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "chip";
        span.textContent = tag;
        tagsWrap.appendChild(span);
      });

      if (data.image) {
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
