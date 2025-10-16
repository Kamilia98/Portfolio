/**
 * Portfolio Renderer Module
 * Handles dynamic rendering of portfolio content from data.js
 */

const PortfolioRenderer = {
  /**
   * Initialize and render all sections
   */
  init(data) {
    this.data = data;
    this.renderPersonalInfo();
    this.renderSocialMedia();
    this.renderAbout();
    this.renderSkills();
    this.renderResume();
    this.renderProjects();
    this.renderTestimonials();
    this.renderContact();
    this.renderFooter();
  },

  /**
   * Render personal information in hero section
   */
  renderPersonalInfo() {
    const { name, role } = this.data.personal;
    const nameElement = document.getElementById("name");
    const roleElement = document.getElementById("role");

    if (nameElement) nameElement.setAttribute("data-text", name);
    if (roleElement) roleElement.setAttribute("data-text", role);
  },

  /**
   * Render social media links in sidebar
   */
  renderSocialMedia() {
    const container = document.querySelector(".social-media");
    if (!container) return;

    container.innerHTML = this.data.socialMedia
      .map((social) => {
        if (social.icon === "custom-svg") {
          return `
          <a
            href="${social.url}"
            target="_blank"
            title="${social.name}"
            aria-label="${social.ariaLabel}"
            class="d-flex justify-content-center"
          >
            ${social.customSvg}
          </a>
        `;
        }
        return `
        <a
          href="${social.url}"
          target="_blank"
          title="${social.name}"
          aria-label="${social.ariaLabel}"
          class="${social.icon} d-flex justify-content-center"
        ></a>
      `;
      })
      .join("");
  },

  /**
   * Render About section
   */
  renderAbout() {
    // Description
    const descriptionContainer = document.querySelector("#about .description");
    if (descriptionContainer) {
      descriptionContainer.innerHTML = this.data.about.description
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join("");
    }

    // Personal info cards
    const infoList = document.querySelector("#about .summary .info ul");
    if (infoList) {
      const { phone, location, degree, grade, email } = this.data.personal;
      infoList.innerHTML = `
        <li>
          <div>
            <span class="infoname">Mobile: </span>
            ${phone}
          </div>
        </li>
        <li>
          <div>
            <span class="infoname">Address: </span>
            ${location}
          </div>
        </li>
        <li>
          <div>
            <span class="infoname"> Degree: </span>
            ${degree}
          </div>
        </li>
        <li>
          <div>
            <span class="infoname">Grade: </span>
            ${grade}
          </div>
        </li>
        <li>
          <div>
            <span class="infoname">Email: </span>
            ${email}
          </div>
        </li>
      `;
    }

    // Update images
    const profileImg = document.querySelector("#about .summary img");
    if (profileImg && this.data.personal.profileImage) {
      profileImg.src = this.data.personal.profileImage;
    }

    const sidebarImg = document.querySelector("#sidenav .my-img img");
    if (sidebarImg && this.data.personal.image) {
      sidebarImg.src = this.data.personal.image;
    }

    const nameHeader = document.querySelector("#sidenav .name-header");
    if (nameHeader) {
      nameHeader.textContent = this.data.personal.name;
    }
  },

  /**
   * Render Skills section
   */
  renderSkills() {
    const container = document.getElementById("skills");
    if (!container) return;

    // Find the section title
    const title = container.querySelector(".section-title");
    const titleHTML = title
      ? title.outerHTML
      : '<h2 class="section-title">Skills</h2>';

    // Build skills HTML
    const skillsHTML = this.data.skills
      .map((skillGroup) => {
        if (skillGroup.subcategories) {
          // Has subcategories (like Web Development)
          const subcategoriesHTML = skillGroup.subcategories
            .map(
              (subcat) => `
            <div class="skills-subgroup">
              <h4>${subcat.name}</h4>
              <div class="skills">
                ${subcat.skills
                  .map(
                    (skill) => `<div class="skill"><span>${skill}</span></div>`
                  )
                  .join("")}
              </div>
            </div>
          `
            )
            .join("");

          return `
          <div class="skills-part">
            <h3>${skillGroup.category}</h3>
            <div class="skills-group">
              ${subcategoriesHTML}
            </div>
          </div>
        `;
        } else {
          // Simple list (like Programming Languages)
          return `
          <div class="skills-part">
            <h3>${skillGroup.category}</h3>
            <div class="skills">
              ${skillGroup.skills
                .map(
                  (skill) => `<div class="skill"><span>${skill}</span></div>`
                )
                .join("")}
            </div>
          </div>
        `;
        }
      })
      .join("");

    container.innerHTML = titleHTML + skillsHTML;
  },

  /**
   * Render Resume section
   */
  renderResume() {
    const container = document.getElementById("resume");
    if (!container) return;

    const { summary, education, experience } = this.data.resume;
    const cvBtn = this.data.personal.cvFile;

    container.innerHTML = `
      <h2 class="section-title">Resume</h2>
      <a href="${cvBtn}" download class="cv-btn">
        Download my CV
      </a>

      <div class="parts">
        <!-- Summary Section -->
        <div class="part">
          <h3>Summary</h3>
          <div class="steps">
            <div class="step">
              <div class="line"></div>
              <div class="content">
                <div>${summary.name}</div>
                <p>${summary.description}</p>
                <ul class="contact-info">
                  ${summary.contact
                    .map(
                      (item) =>
                        `<li><strong>${item.label}:</strong> ${item.value}</li>`
                    )
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Education Section -->
        <div class="part">
          <h3>Education</h3>
          <div class="steps">
            ${education
              .map(
                (edu) => `
              <div class="step">
                <div class="line"></div>
                <div class="content">
                  <div class="degree">${edu.degree}</div>
                  <div class="date">${edu.period}</div>
                  ${
                    edu.institution
                      ? `<div class="university">${edu.institution}</div>`
                      : ""
                  }
                  ${edu.grade ? `<div class="grade">${edu.grade}</div>` : ""}
                  ${edu.rank ? `<div class="rank">${edu.rank}</div>` : ""}
                  ${edu.track ? `<div class="track">${edu.track}</div>` : ""}
                  ${
                    edu.expectedGraduation
                      ? `<div class="expected-graduation">${edu.expectedGraduation}</div>`
                      : ""
                  }
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Professional Experience Section -->
        <div class="part">
          <h3>Professional Experience</h3>
          <div class="steps">
            ${experience
              .map(
                (exp) => `
              <div class="step">
                <div class="line"></div>
                <div class="content">
                  <div class="degree">${exp.title}</div>
                  ${exp.period ? `<div class="date">${exp.period}</div>` : ""}
                  ${
                    exp.company
                      ? `<div class="university">${exp.company}</div>`
                      : ""
                  }
                  ${
                    exp.location
                      ? `<div class="grade">${exp.location}</div>`
                      : ""
                  }
                  ${exp.description ? `<p>${exp.description}</p>` : ""}
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Render Projects section
   */
  renderProjects() {
    const projectsContainer = document.querySelector("#portfolio .projects");
    if (!projectsContainer) return;

    projectsContainer.innerHTML = this.data.projects
      .map(
        (project) => `
      <div class="project ${
        project.visible ? "visible" : "hidden"
      }" data-category="${project.category}">
        <a href="${project.url}" target="_blank">
          <i class="fa-solid fa-link"></i>
        </a>
        <a href="${project.url}" target="_blank">
          <img src="${project.image}" alt="${project.title}" width="100%" />
        </a>
        <div class="projectTitle">${project.title}</div>
      </div>
    `
      )
      .join("");
  },

  /**
   * Render Testimonials section
   */
  renderTestimonials() {
    const container = document.querySelector("#testimonials .testimonials");
    if (!container) return;

    container.innerHTML = this.data.testimonials
      .map(
        (testimonial) => `
      <div class="testimonal">
        <div class="message">
          <div class="content">${testimonial.content}</div>
        </div>
        <div class="icon"><i class="fa fa-user"></i></div>
      </div>
    `
      )
      .join("");
  },

  /**
   * Render Contact section
   */
  renderContact() {
    const leftCard = document.querySelector("#contact .left-card");
    if (!leftCard) return;

    leftCard.innerHTML = this.data.contact.info
      .map(
        (item) => `
      <div class="contact-info">
        <div class="icon">
          <i class="${item.icon}"></i>
        </div>
        <div class="contact">
          <div>${item.label}</div>
          <div>${item.value}</div>
        </div>
      </div>
    `
      )
      .join("");
  },

  /**
   * Render Footer
   */
  renderFooter() {
    const footer = document.querySelector("footer.section");
    if (!footer) return;

    const { copyright, tagline } = this.data.footer;
    footer.innerHTML = `
      <p>${copyright}</p>
      <p>${tagline.replace("♥", "&hearts;")}</p>
    `;
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = PortfolioRenderer;
}
