document.addEventListener('DOMContentLoaded', () => {
  // Initialize global elements
  const sidenav = document.getElementById('sidenav');
  const main = document.getElementById('main');
  const openbtn = document.querySelector('.openbtn');
  const links = document.querySelectorAll('.links a');
  const fadeElements = document.querySelectorAll(
    '#main > *, .skills, .content'
  );

  /**
   * Typing Effect Function
   */
  function typeEffect(elementId, text, delay = 100, onComplete = null) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = '';
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
    const nameElement = document.getElementById('name');
    if (!nameElement) return;

    nameElement.classList.add('typing');
    typeEffect('name', 'Kamilia Ahmed', 100, () => {
      nameElement.classList.remove('typing');
      setTimeout(() => {
        typeEffect('role', "I'm a Frontend Developer", 90);
      }, 500);
    });
  }

  /**
   * Toggle Navigation Sidebar
   */

  function toggleNav() {
    if (!sidenav || !main || !openbtn) return;

    // The transition remains active here
    sidenav.classList.toggle('hidden');
    openbtn.classList.toggle('open');
  }

  /**
   * Initialize Scroll Fade-In Effect
   */
  function initScrollFadeEffect() {
    const handleScroll = () => {
      fadeElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if (isVisible) {
          el.classList.add('show');
          if (el.classList.contains('skills')) {
            initProgressBars();
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on page load
  }

  /**
   * Initialize Progress Bar Animations
   */
  function initProgressBars() {
    document.querySelectorAll('.progress').forEach((bar) => {
      const targetWidth = bar.getAttribute('data-width');
      if (targetWidth) bar.style.width = targetWidth;
    });
  }

  /**
   * Update Active Link Based on Scroll Position
   */
  function updateActiveLinks() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    links.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      link.classList.toggle(
        'active',
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
      sidenav.style.transition = 'none';
      openbtn.style.display = 'flex';
      sidenav.classList.add('hidden');
      openbtn.classList.add('active');
      openbtn.classList.add('open');
      main.style.width = `100%`;
      setTimeout(() => {
        sidenav.style.transition = '';
      }, 0);
    } else {
      sidenav.style.transition = 'none';
      openbtn.style.display = 'none';
      sidenav.classList.remove('hidden');
      const sidenavWidth = sidenav.offsetWidth;
      main.style.width = `calc(100% - ${sidenavWidth}px)`;
      openbtn.classList.remove('active');
      setTimeout(() => {
        sidenav.style.transition = '';
      }, 0);
    }
    console.log(main.style.width);
  }

  /**
   * Handle Project Filtering
   */
  function handleProjectFiltering() {
    const container = document.querySelector('.projects'); // Project container
    const sliderItems = document.querySelectorAll('.slider-item'); // Slider items
    const projects = document.querySelectorAll('.project'); // All projects

    sliderItems.forEach((item) => {
      item.addEventListener('click', () => {
        const filterCategory = item.getAttribute('data-category'); // Selected filter category

        // Update the active class on slider items
        sliderItems.forEach((el) => el.classList.remove('active'));
        item.classList.add('active');

        // Filter projects
        projects.forEach((project) => {
          const projectCategory = project.getAttribute('data-category');

          // Determine visibility
          if (filterCategory === 'all' || projectCategory === filterCategory) {
            project.classList.remove('hidden'); // Show project
          } else {
            project.classList.add('hidden'); // Hide project
          }
        });
      });
    });
  }

  /**
   * Handle Contact Form Submission
   */
  function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      emailjs.sendForm('service_cnmn5vd', 'template_goj3abm', this).then(
        () => {
          Toastify({
            text: 'Email sent successfully!',
            duration: 3000,
            gravity: 'top',
            position: 'center',
            backgroundColor: 'green',
          }).showToast();
          form.reset();
        },
        (error) => {
          Toastify({
            text: `Failed to send email: ${error.text || 'Error occurred'}`,
            duration: 3000,
            gravity: 'top',
            position: 'center',
            backgroundColor: 'red',
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
      link.addEventListener('click', () => {
        if (openbtn.classList.contains('active')) toggleNav();
      })
    );
  }
  window.addEventListener('scroll', updateActiveLinks);
  window.addEventListener('resize', adjustLayout);

  /**
   * Initialize
   */
  initTypingEffect();
  initScrollFadeEffect();
  adjustLayout();
  handleContactForm();
  handleProjectFiltering();

  // Attach toggleNav function to the window for global access
  window.toggleNav = toggleNav;
});
