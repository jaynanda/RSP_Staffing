/* ==========================================================================
   RSP Staffing — Recruitment Staffing Professional
   Interactive UI, Scroll Animations, Spotlight Bento & Direct WhatsApp Engine
   ========================================================================== */

const WHATSAPP_RECIPIENT = "917008905480";
const LINKEDIN_URL = "https://www.linkedin.com/company/rsp-recruitment/home/?viewAsMember=true";

// Detailed Service Catalog for Modal Drawer
const SERVICE_DETAILS = {
  "it-staffing": {
    tag: "Technology & Engineering",
    title: "IT Staffing",
    summary: "Specialized technology talent placement across software engineering, cloud infrastructure, data platforms, and enterprise security.",
    highlights: [
      "Full-stack, backend, frontend, and mobile application engineers",
      "Cloud architects (AWS, Azure, Google Cloud) & Kubernetes specialists",
      "Data engineers, BI developers, and machine learning practitioners",
      "Technical screening focused on real-world architecture and delivery"
    ]
  },
  "contract-staffing": {
    tag: "Agile Workforce",
    title: "Contract Staffing",
    summary: "Flexible project-based staffing designed to help organizations meet critical product deadlines, seasonal spikes, and transformation initiatives.",
    highlights: [
      "Rapid deployment of pre-vetted specialists for fixed or rolling durations",
      "Ideal for system migrations, product launches, and backlog acceleration",
      "Transparent hourly or milestone-aligned engagement structures",
      "Seamless onboarding and dedicated consultant care throughout the project"
    ]
  },
  "contract-to-hire": {
    tag: "Risk-Mitigated Hiring",
    title: "Contract-to-Hire Staffing",
    summary: "Evaluate a professional's technical execution, communication style, and team alignment on live projects before extending a permanent offer.",
    highlights: [
      "Observe real-world collaboration prior to long-term commitment",
      "Structured transition pathways from contract phase to full-time payroll",
      "Reduces hiring friction for mission-critical engineering and finance roles",
      "Aligns incentives between hiring managers and career-focused candidates"
    ]
  },
  "direct-hire": {
    tag: "Long-Term Leadership & Core Teams",
    title: "Direct Hire / Permanent Placement",
    summary: "Dedicated search and recruitment for full-time individual contributors, domain specialists, managers, and executive leaders.",
    highlights: [
      "Deep market mapping and proactive outreach to passive professionals",
      "Comprehensive competency, cultural alignment, and career-goal evaluation",
      "End-to-end interview coordination and offer-stage consultation",
      "Built for organizations investing in sustainable, long-term team growth"
    ]
  },
  "rpo": {
    tag: "Scalable Talent Operations",
    title: "Recruitment Process Outsourcing (RPO)",
    summary: "Embedded recruitment pipelines and dedicated sourcing pods that operate as an extension of your internal HR and talent acquisition team.",
    highlights: [
      "Full-lifecycle or modular recruitment support tailored to hiring volume",
      "Standardized interview rubrics, candidate care, and pipeline reporting",
      "Employer brand representation across technical and clinical communities",
      "Scalable capacity for multi-role division expansions"
    ]
  },
  "it-consulting": {
    tag: "Advisory & Execution",
    title: "IT Consulting",
    summary: "Strategic technology advisory and hands-on engineering execution to modernize legacy applications, data pipelines, and security postures.",
    highlights: [
      "Cloud readiness assessments and infrastructure modernization roadmaps",
      "Data warehouse architecture, governance, and analytics enablement",
      "DevSecOps pipeline automation and zero-trust security hardening",
      "Actionable deliverables paired with experienced implementation specialists"
    ]
  },
  "talent-acquisition": {
    tag: "Dedicated Sourcing Support",
    title: "Talent Acquisition & Recruitment Support",
    summary: "Targeted sourcing, resume calibration, technical screening, and interview coordination that empowers internal HR teams to close roles faster.",
    highlights: [
      "Custom boolean and network-driven sourcing for niche skill sets",
      "Detailed candidate profiles highlighting verified project achievements",
      "Calendar management, debrief facilitation, and candidate feedback loops",
      "Flexible support for lean HR teams managing competing priorities"
    ]
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initScrollReveal();
  initSpotlightCards();
  initMobileMenu();
  initIndustryFilter();
  initPortalSwitcher();
  initResumeFileInput();
  initServiceModal();
  initWhatsAppForms();

  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* 1. Top Scroll Progress Bar & Navbar Shadow */
function initScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const navPills = document.querySelectorAll(".nav-pill[data-section]");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && docHeight > 0) {
      bar.style.width = `${Math.min(100, (scrollTop / docHeight) * 100)}%`;
    }

    // Active section highlight
    let currentSection = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 160;
      if (scrollTop >= top) {
        currentSection = sec.getAttribute("id");
      }
    });

    if (currentSection) {
      navPills.forEach((pill) => {
        pill.classList.toggle("active", pill.getAttribute("data-section") === currentSection);
      });
    }
  }, { passive: true });
}

/* 2. IntersectionObserver Scroll Reveal */
function initScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach((el) => observer.observe(el));
}

/* 3. Interactive Spotlight Bento Cards */
function initSpotlightCards() {
  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  });
}

/* 4. Mobile Menu Toggle */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-menu-drawer");
  if (!btn || !drawer) return;

  btn.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
  });

  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => drawer.classList.add("hidden"));
  });
}

/* 5. Industry Category Filter */
function initIndustryFilter() {
  const buttons = document.querySelectorAll(".industry-filter-btn");
  const cards = document.querySelectorAll(".industry-card");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      buttons.forEach((b) => {
        b.classList.remove("bg-[#084C5E]", "text-white", "shadow-md");
        b.classList.add("bg-white/80", "text-[#0F293A]");
      });
      btn.classList.remove("bg-white/80", "text-[#0F293A]");
      btn.classList.add("bg-[#084C5E]", "text-white", "shadow-md");

      cards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

/* 6. Employer / Candidate Portal Tab Switcher (if present) */
function initPortalSwitcher() {
  const tabBtns = document.querySelectorAll("[data-portal-tab]");
  const panels = document.querySelectorAll("[data-portal-panel]");
  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-portal-tab");
      tabBtns.forEach((b) => {
        const isActive = b.getAttribute("data-portal-tab") === target;
        b.classList.toggle("bg-[#084C5E]", isActive);
        b.classList.toggle("text-white", isActive);
        b.classList.toggle("shadow-md", isActive);
        b.classList.toggle("text-[#475569]", !isActive);
      });
      panels.forEach((p) => {
        p.classList.toggle("hidden", p.getAttribute("data-portal-panel") !== target);
      });
    });
  });
}

/* 7. Candidate Resume File Input Display */
function initResumeFileInput() {
  const fileInput = document.getElementById("cand-resume");
  const fileLabel = document.getElementById("cand-resume-label");
  if (!fileInput || !fileLabel) return;

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files.length > 0) {
      const f = fileInput.files[0];
      const kb = Math.round(f.size / 1024);
      fileLabel.innerHTML = `<span class="text-[#139A5E] font-bold">Selected: ${f.name}</span> <span class="text-xs text-slate-500">(${kb} KB — attach in WhatsApp chat)</span>`;
    }
  });
}

/* 8. Service Details Modal */
function initServiceModal() {
  const modal = document.getElementById("service-modal");
  const closeBtn = document.getElementById("service-modal-close");
  const backdrop = document.getElementById("service-modal-backdrop");

  document.querySelectorAll("[data-service-key]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.getAttribute("data-service-key");
      const info = SERVICE_DETAILS[key];
      if (!info || !modal) return;

      document.getElementById("modal-service-tag").textContent = info.tag;
      document.getElementById("modal-service-title").textContent = info.title;
      document.getElementById("modal-service-summary").textContent = info.summary;

      const listEl = document.getElementById("modal-service-list");
      listEl.innerHTML = info.highlights
        .map((item) => `<li class="flex items-start gap-3 text-sm text-slate-700"><span class="w-5 h-5 rounded-full bg-[#139A5E]/15 text-[#139A5E] flex items-center justify-center shrink-0 mt-0.5 font-bold">✓</span><span>${item}</span></li>`)
        .join("");

      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });

  const closeModal = () => {
    if (!modal) return;
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);
}

/* 9. Direct WhatsApp (917008905480) + Local Storage Lead Dispatcher */
function saveSubmissionRecord(type, payload) {
  try {
    const existing = JSON.parse(localStorage.getItem("rsp_staffing_submissions") || "[]");
    existing.unshift({
      id: Date.now(),
      type,
      timestamp: new Date().toISOString(),
      ...payload
    });
    localStorage.setItem("rsp_staffing_submissions", JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn("Local storage backup skipped:", err);
  }
}

function showToast(message) {
  let toast = document.getElementById("rsp-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "rsp-toast";
    toast.className = "fixed bottom-6 right-6 z-50 max-w-md bg-[#0F293A] text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/15 flex items-center gap-3 transition-all duration-300";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <span class="w-8 h-8 rounded-xl bg-[#139A5E] text-white flex items-center justify-center shrink-0 font-bold">✓</span>
    <div class="text-xs sm:text-sm leading-snug">${message}</div>
  `;
  toast.style.opacity = "1";
  setTimeout(() => {
    toast.style.opacity = "0";
  }, 5000);
}

function dispatchToWhatsApp(formattedText) {
  const url = `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(formattedText)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function initWhatsAppForms() {
  // A. Employer Hiring Requirement Form
  const empForm = document.getElementById("employer-form");
  if (empForm) {
    empForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const company = document.getElementById("emp-company")?.value.trim() || "";
      const name = document.getElementById("emp-name")?.value.trim() || "";
      const email = document.getElementById("emp-email")?.value.trim() || "";
      const phone = document.getElementById("emp-phone")?.value.trim() || "";
      const model = document.getElementById("emp-model")?.value.trim() || "";
      const role = document.getElementById("emp-role")?.value.trim() || "";
      const details = document.getElementById("emp-details")?.value.trim() || "";

      saveSubmissionRecord("Employer Hiring Request", { company, name, email, phone, model, role, details });

      const message = [
        "*New Employer Hiring Requirement — RSP Staffing*",
        "----------------------------------------",
        `*Company:* ${company}`,
        `*Contact Person:* ${name}`,
        `*Work Email:* ${email}`,
        `*Phone:* ${phone}`,
        `*Engagement Model:* ${model}`,
        `*Target Role / Domain:* ${role}`,
        `*Requirement Details:* ${details || "Provided in follow-up"}`
      ].join("\n");

      showToast("Requirement saved! Opening WhatsApp (+91 70089 05480)...");
      dispatchToWhatsApp(message);
      empForm.reset();
    });
  }

  // B. Candidate Resume Submission Form
  const candForm = document.getElementById("candidate-form");
  if (candForm) {
    candForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("cand-name")?.value.trim() || "";
      const email = document.getElementById("cand-email")?.value.trim() || "";
      const phone = document.getElementById("cand-phone")?.value.trim() || "";
      const location = document.getElementById("cand-location")?.value.trim() || "";
      const skills = document.getElementById("cand-skills")?.value.trim() || "";
      const fileInput = document.getElementById("cand-resume");
      const resumeFileName = (fileInput && fileInput.files && fileInput.files[0])
        ? fileInput.files[0].name
        : "To be attached directly in WhatsApp chat";

      saveSubmissionRecord("Candidate Application", { name, email, phone, location, skills, resumeFileName });

      const message = [
        "*New Candidate Profile & Resume — RSP Staffing*",
        "----------------------------------------",
        `*Candidate Name:* ${name}`,
        `*Email:* ${email}`,
        `*Phone:* ${phone}`,
        `*Current Location:* ${location}`,
        `*Core Skills & Stack:* ${skills}`,
        `*Resume File:* ${resumeFileName}`,
        "*(Candidate will attach the resume file in this chat)*"
      ].join("\n");

      showToast("Profile ready! Opening WhatsApp (+91 70089 05480)...");
      dispatchToWhatsApp(message);
      candForm.reset();
      const label = document.getElementById("cand-resume-label");
      if (label) label.textContent = "Click to select PDF, DOC, or DOCX resume";
    });
  }

  // C. Contact Us Form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("con-name")?.value.trim() || "";
      const company = document.getElementById("con-company")?.value.trim() || "N/A";
      const email = document.getElementById("con-email")?.value.trim() || "";
      const phone = document.getElementById("con-phone")?.value.trim() || "";
      const subject = document.getElementById("con-subject")?.value.trim() || "";
      const msg = document.getElementById("con-message")?.value.trim() || "";

      saveSubmissionRecord("General Contact Inquiry", { name, company, email, phone, subject, msg });

      const message = [
        "*New Website Inquiry — RSP Staffing*",
        "----------------------------------------",
        `*Name:* ${name}`,
        `*Company / Organization:* ${company}`,
        `*Email:* ${email}`,
        `*Phone:* ${phone}`,
        `*Subject:* ${subject}`,
        `*Message:* ${msg}`
      ].join("\n");

      showToast("Message formatted! Opening WhatsApp (+91 70089 05480)...");
      dispatchToWhatsApp(message);
      contactForm.reset();
    });
  }
}
