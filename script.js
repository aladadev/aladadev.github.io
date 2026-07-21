const body = document.body;
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectGrid = document.querySelector("[data-project-grid]");
let projectCards = [];
const config = window.portfolioConfig;
const projects = window.portfolioProjects ?? [];

function createProjectCard(project, index) {
  const visualThemes = [
    "project-visual-teal",
    "project-visual-coral",
    "project-visual-plum",
  ];
  const card = document.createElement("article");
  const visual = document.createElement("div");
  const content = document.createElement("div");
  const type = document.createElement("p");
  const title = document.createElement("h3");
  const meta = document.createElement("dl");
  const description = document.createElement("p");
  const link = document.createElement("a");
  const visualLabel = document.createElement("span");
  const visualTitle = document.createElement("strong");
  const visualPlatform = document.createElement("small");
  const platformMeta = document.createElement("div");
  const platformTerm = document.createElement("dt");
  const platformDescription = document.createElement("dd");
  const categoryMeta = document.createElement("div");
  const categoryTerm = document.createElement("dt");
  const categoryDescription = document.createElement("dd");

  card.className = "project-card reveal";
  card.dataset.category = project.categories.join(" ");

  visual.className = `project-visual ${visualThemes[index % visualThemes.length]}`;
  visual.setAttribute("aria-hidden", "true");
  visualLabel.textContent = "Published project";
  visualTitle.textContent = project.title;
  visualPlatform.textContent = project.platform;
  visual.append(visualLabel, visualTitle, visualPlatform);

  content.className = "project-content";
  type.className = "project-type";
  type.textContent = project.type;
  title.textContent = project.title;
  meta.className = "project-meta";
  platformTerm.textContent = "Platform";
  platformDescription.textContent = project.platform;
  platformMeta.append(platformTerm, platformDescription);
  categoryTerm.textContent = "Category";
  categoryDescription.textContent = project.categories.includes("mobile")
    ? "Mobile app"
    : "Website";
  categoryMeta.append(categoryTerm, categoryDescription);
  meta.append(platformMeta, categoryMeta);
  description.textContent = project.description;
  link.href = project.link;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = project.linkLabel;
  link.setAttribute("aria-label", `${project.linkLabel}: ${project.title}`);

  content.append(type, title, meta, description, link);
  card.append(visual, content);
  return card;
}

function renderProjects() {
  if (!projectGrid) return;

  projectGrid.replaceChildren(
    ...projects.map((project, index) => createProjectCard(project, index)),
  );
  projectCards = projectGrid.querySelectorAll("[data-category]");
}

renderProjects();

const revealItems = document.querySelectorAll(".reveal");

function setExternalLink(selector, url) {
  if (!url) return;

  document.querySelectorAll(selector).forEach((link) => {
    link.href = url;
  });
}

function applyPortfolioConfig() {
  if (!config) return;

  setExternalLink("[data-email-link]", `mailto:${config.email}`);
  setExternalLink("[data-linkedin-link]", config.linkedinUrl);
  setExternalLink("[data-github-link]", config.githubUrl);

  const featuredDemo = document.querySelector("[data-featured-demo]");
  if (featuredDemo && config.featuredProject?.demoUrl) {
    featuredDemo.href = config.featuredProject.demoUrl;
    featuredDemo.textContent = "View live project";
    featuredDemo.target = "_blank";
    featuredDemo.rel = "noreferrer";
  }

  const featuredRepository = document.querySelector(
    "[data-featured-repository]",
  );
  if (featuredRepository && config.featuredProject?.repositoryUrl) {
    featuredRepository.href = config.featuredProject.repositoryUrl;
    featuredRepository.textContent = "View source code";
    featuredRepository.target = "_blank";
    featuredRepository.rel = "noreferrer";
  }
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setMenuState(isOpen) {
  body.classList.toggle("nav-open", isOpen);
  menuToggle?.setAttribute("aria-expanded", String(isOpen));
  menuToggle?.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation",
  );
}

function closeMenu() {
  setMenuState(false);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = !body.classList.contains("nav-open");
  setMenuState(isOpen);
});

document.addEventListener("keydown", (event) => {
  const isEscapeKey = event.key === "Escape";
  const isMenuOpen = body.classList.contains("nav-open");

  if (isEscapeKey && isMenuOpen) {
    closeMenu();
    menuToggle?.focus();
  }
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    projectCards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") ?? [];
      const shouldShow =
        selectedFilter === "all" || categories.includes(selectedFilter);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

function revealOnScroll() {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

if (year) {
  year.textContent = new Date().getFullYear();
}

revealOnScroll();
refreshIcons();
applyPortfolioConfig();
