document.addEventListener("DOMContentLoaded", () => {
  // Initialize portfolio with data
  if (
    typeof portfolioData !== "undefined" &&
    typeof PortfolioRenderer !== "undefined"
  ) {
    PortfolioRenderer.init(portfolioData);
  }

  // Initialize global elements
  const sidenav = document.getElementById("sidenav");
  const main = document.getElementById("main");
  const openbtn = document.querySelector(".openbtn");
  const links = document.querySelectorAll(".links a");
  const fadeElements = document.querySelectorAll(
    "#main > *, .skills, .content"
  );

  /**
   * Typing Effect Function
   */
  function typeEffect(elementId, text, delay = 100, onComplete = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = "";
    let index = 0;

    function type() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, delay);
      } else if (onComplete) {
        onComplete();
      }
    }
    type();
  }

  /**
   * Initialize Typing Effect Animations
   */
  function initTypingEffect() {
    const nameElement = document.getElementById("name");
    if (!nameElement) return;

    // Get text from data or fallback to default
    const nameText = nameElement.getAttribute("data-text") || "Kamilia Ahmed";
    const roleText =
      document.getElementById("role")?.getAttribute("data-text") ||
      "I'm a Frontend Developer";

    nameElement.classList.add("typing");
    typeEffect("name", nameText, 100, () => {
      nameElement.classList.remove("typing");
      setTimeout(() => {
        typeEffect("role", roleText, 90);
      }, 500);
    });
  }

  /**
   * Toggle Navigation Sidebar
   */

  function toggleNav() {
    if (!sidenav || !main || !openbtn) return;

    // The transition remains active here
    sidenav.classList.toggle("hidden");
    openbtn.classList.toggle("open");
  }

  /**
   * Initialize Scroll Fade-In Effect with Intersection Observer
   */
  function initScrollFadeEffect() {
    // Use Intersection Observer for better performance
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          // Animate child elements
          if (entry.target.classList.contains("skills")) {
            initProgressBars();
          }

          // Add stagger effect to children
          const children = entry.target.querySelectorAll(
            ".skill, .project, .testimonal, .contact-info, .step"
          );
          children.forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = "1";
              child.style.transform = "translateY(0)";
            }, index * 50);
          });
        }
      });
    }, observerOptions);

    // Observe all sections
    fadeElements.forEach((el) => observer.observe(el));

    // Fallback for older browsers
    const handleScroll = () => {
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight - 100 && rect.bottom > 0;
        if (isVisible) {
          el.classList.add("show");
          if (el.classList.contains("skills")) {
            initProgressBars();
          }
        }
      });
    };

    // Check if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }
  }

  /**
   * Initialize Progress Bar Animations
   */
  function initProgressBars() {
    document.querySelectorAll(".progress").forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      if (targetWidth) bar.style.width = targetWidth;
    });
  }

  /**
   * Update Active Link Based on Scroll Position
   */
  function updateActiveLinks() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute("href"));
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      link.classList.toggle(
        "active",
        scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
      );
    });
  }

  /**
   * Adjust Sidebar and Open Button Visibility
   */
  function adjustLayout() {
    if (!sidenav || !openbtn || !main) return;
    if (window.innerWidth <= 1200) {
      sidenav.style.transition = "none";
      openbtn.style.display = "flex";
      sidenav.classList.add("hidden");
      openbtn.classList.add("active");
      openbtn.classList.add("open");
      main.style.width = `100%`;
      setTimeout(() => {
        sidenav.style.transition = "";
      }, 0);
    } else {
      sidenav.style.transition = "none";
      openbtn.style.display = "none";
      sidenav.classList.remove("hidden");
      const sidenavWidth = sidenav.offsetWidth;
      main.style.width = `calc(100% - ${sidenavWidth}px)`;
      openbtn.classList.remove("active");
      setTimeout(() => {
        sidenav.style.transition = "";
      }, 0);
    }
    console.log(main.style.width);
  }

  /**
   * Handle Project Filtering
   */
  function handleProjectFiltering() {
    const container = document.querySelector(".projects"); // Project container
    const sliderItems = document.querySelectorAll(".slider-item"); // Slider items
    const projects = document.querySelectorAll(".project"); // All projects

    sliderItems.forEach((item) => {
      item.addEventListener("click", () => {
        const filterCategory = item.getAttribute("data-category"); // Selected filter category

        // Update the active class on slider items
        sliderItems.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");

        // Filter projects
        projects.forEach((project) => {
          const projectCategory = project.getAttribute("data-category");

          // Determine visibility
          if (filterCategory === "all" || projectCategory === filterCategory) {
            project.classList.remove("hidden"); // Show project
          } else {
            project.classList.add("hidden"); // Hide project
          }
        });
      });
    });
  }

  /**
   * Handle Contact Form Submission
   */
  function handleContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.sendForm("service_cnmn5vd", "template_goj3abm", this).then(
        () => {
          Toastify({
            text: "Email sent successfully!",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "green",
          }).showToast();
          form.reset();
        },
        (error) => {
          Toastify({
            text: `Failed to send email: ${error.text || "Error occurred"}`,
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "red",
          }).showToast();
        }
      );
    });
  }

  /**
   * Event Listeners
   */
  if (links) {
    links.forEach((link) =>
      link.addEventListener("click", () => {
        if (openbtn.classList.contains("active")) toggleNav();
      })
    );
  }
  window.addEventListener("scroll", updateActiveLinks);
  window.addEventListener("resize", adjustLayout);

  /**
   * Add Smooth Scroll to Navigation Links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  /**
   * Add Parallax Effect to Hero Section
   */
  function initParallaxEffect() {
    const hero = document.getElementById("home");
    if (!hero) return;

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }

  /**
   * Add Cursor Trail Effect (Optional - can be disabled)
   */
  function initCursorEffect() {
    const cursor = document.createElement("div");
    cursor.className = "cursor-trail";
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(76, 37, 20, 0.3);
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.2s ease;
      display: none;
    `;
    document.body.appendChild(cursor);

    // Show cursor trail only on desktop
    if (window.innerWidth > 1024) {
      cursor.style.display = "block";

      document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX - 10 + "px";
        cursor.style.top = e.clientY - 10 + "px";
      });

      // Enlarge cursor on hover over interactive elements
      document
        .querySelectorAll("a, button, input, textarea, .project")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(2)";
            cursor.style.background = "rgba(76, 37, 20, 0.5)";
          });
          el.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
            cursor.style.background = "rgba(76, 37, 20, 0.3)";
          });
        });
    }
  }

  /**
   * Add Floating Particles Background (Optional)
   */
  function initParticles() {
    const hero = document.getElementById("home");
    if (!hero) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles";
    particlesContainer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 1;
      pointer-events: none;
    `;

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      particlesContainer.appendChild(particle);
    }

    hero.insertBefore(particlesContainer, hero.firstChild);

    // Add particle animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatParticle {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) translateX(${
            Math.random() * 100 - 50
          }px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Add Loading Animation
   */
  function initLoadingAnimation() {
    const loader = document.createElement("div");
    loader.className = "page-loader";
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--primary-dark-color);
      z-index: 99999;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    `;

    loader.innerHTML = `
      <div style="text-align: center; color: white;">
        <div class="spinner" style="
          width: 50px;
          height: 50px;
          border: 5px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        "></div>
        <h3>Loading...</h3>
      </div>
    `;

    document.body.prepend(loader);

    // Add spinner animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    // Hide loader after page loads
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        setTimeout(() => loader.remove(), 500);
      }, 500);
    });
  }

  /**
   * Initialize
   */
  initLoadingAnimation();
  initTypingEffect();
  initScrollFadeEffect();
  initSmoothScroll();
  initParallaxEffect();
  initCursorEffect();
  initParticles();
  adjustLayout();
  handleContactForm();
  handleProjectFiltering();

  // Attach toggleNav function to the window for global access
  window.toggleNav = toggleNav;
});
