/**
 * Initialize Loading Animation
 */
function initLoadingAnimation() {
  const loadingScreen = document.getElementById("loading-screen");

  if (!loadingScreen) return;

  // Hide loading screen when page is fully loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.classList.add("fade-out");

      // Remove the element from DOM after fade out completes
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }, 300); // Small delay to ensure smooth transition
  });

  // Fallback: Hide loading screen after 3 seconds even if page isn't fully loaded
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains("fade-out")) {
      loadingScreen.classList.add("fade-out");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 500);
    }
  }, 3000);
}

// Initialize loading animation immediately
initLoadingAnimation();

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
   * Mobile-specific enhancements
   */
  function initMobileEnhancements() {
    // Close sidebar when clicking outside on mobile
    if (window.innerWidth <= 750) {
      document.addEventListener("click", (e) => {
        if (
          sidenav &&
          !sidenav.classList.contains("hidden") &&
          !sidenav.contains(e.target) &&
          !openbtn.contains(e.target)
        ) {
          toggleNav();
        }
      });

      // Prevent body scroll when sidebar is open
      const observer = new MutationObserver(() => {
        if (sidenav && !sidenav.classList.contains("hidden")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
      });

      if (sidenav) {
        observer.observe(sidenav, {
          attributes: true,
          attributeFilter: ["class"],
        });
      }

      // Add touch swipe to close sidebar
      let touchStartX = 0;
      let touchEndX = 0;

      sidenav?.addEventListener(
        "touchstart",
        (e) => {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );

      sidenav?.addEventListener(
        "touchend",
        (e) => {
          touchEndX = e.changedTouches[0].screenX;
          if (touchStartX - touchEndX > 50) {
            // Swipe left
            if (!sidenav.classList.contains("hidden")) {
              toggleNav();
            }
          }
        },
        { passive: true }
      );
    }
  }

  // Initialize mobile enhancements
  initMobileEnhancements();

  /**
   * About Section - Blur Background Effect
   */
  function initAboutBlurEffect() {
    const aboutSummary = document.querySelector("#about .summary");
    if (!aboutSummary) return;

    aboutSummary.addEventListener("mouseenter", () => {
      document.body.classList.add("blur-active");
    });

    aboutSummary.addEventListener("mouseleave", () => {
      document.body.classList.remove("blur-active");
    });
  }

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
   * Add Subtle Parallax Effect to Hero Section
   */
  function initParallaxEffect() {
    const hero = document.getElementById("home");
    if (!hero) return;

    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.3; // Reduced for subtler effect
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }

  /**
   * Initialize
   */
  initTypingEffect();
  initScrollFadeEffect();
  initSmoothScroll();
  initParallaxEffect();
  initAboutBlurEffect();
  adjustLayout();
  handleContactForm();
  handleProjectFiltering();

  // Attach toggleNav function to the window for global access
  window.toggleNav = toggleNav;
});
