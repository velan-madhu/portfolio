document.addEventListener("DOMContentLoaded", () => {
  // --- Start of Hamburger menu and smooth scrolling ---
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const navbar = document.getElementById("navbar");

  if (hamburgerMenu && navbar) {
    hamburgerMenu.addEventListener("click", () => {
      navbar.classList.toggle("active");
    });
  }

  const navLinks = document.querySelectorAll(".navbar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: "smooth",
        });
      }
      if (navbar) {
        navbar.classList.remove("active");
      }
    });
  });
  // --- End of Hamburger menu and smooth scrolling ---

  // --- Start of Dynamic Text Animation ---
  const autoTypeElement = document.getElementById("auto-type");
  const roles = [
    "Wordpress Developer",
    "Frontend Developer",
    "UI/UX Designer",
    "Software Tester",
    "Mobile Application",
  ];
  let roleIndex = 0;

  function typeWriterEffect() {
    if (!autoTypeElement) return;
    const currentRole = roles[roleIndex];
    let charIndex = 0;

    function type() {
      if (charIndex < currentRole.length) {
        autoTypeElement.textContent += currentRole.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        setTimeout(erase, 1000);
      }
    }

    function erase() {
      if (autoTypeElement.textContent.length > 0) {
        autoTypeElement.textContent = autoTypeElement.textContent.slice(0, -1);
        setTimeout(erase, 50);
      } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeWriterEffect, 500);
      }
    }

    autoTypeElement.textContent = "";
    type();
  }

  typeWriterEffect();
  // --- End of Dynamic Text Animation ---

  // --- Start of Portfolio card flip effect ---
  const portfolioCards = document.querySelectorAll(".portfolio-card");

  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        const currentFlipped = document.querySelector(
          ".portfolio-card.flipped"
        );
        if (currentFlipped && currentFlipped !== card) {
          currentFlipped.classList.remove("flipped");
        }
        card.classList.toggle("flipped");
      }
    });
    card.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        card.classList.add("flipped");
      }
    });
    card.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        card.classList.remove("flipped");
      }
    });
  });
  // --- End of Portfolio card flip effect ---

  // --- Start of Hacker-style preloader effect ---
  const loaderTextElement = document.getElementById("loader-text");
  const terminalText =
    "Accessing secure profile database...OK\n\nVerifying user credentials...Authenticated\n\nInitializing portfolio data stream...Done\n\n>> Rendering portfolio. Please wait...";
  let textIndex = 0;

  function typeLoaderText() {
    if (!loaderTextElement) return;
    if (textIndex < terminalText.length) {
      const char = terminalText.charAt(textIndex);
      if (char === "\n") {
        loaderTextElement.innerHTML += "<br>";
      } else {
        loaderTextElement.textContent += char;
      }
      textIndex++;
      setTimeout(typeLoaderText, 100);
    }
  }

  typeLoaderText();
  // --- End of Hacker-style preloader effect ---

  // --- Start of Preloader visibility ---
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("hide");
    }
  });
  // --- End of Preloader visibility ---

  // --- Start of Load more button ---
  // This code now checks if the button exists before trying to use it.
  const loadMoreBtn = document.getElementById("load-more-btn");
  const hiddenProjects = document.querySelectorAll(".more-projects");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      hiddenProjects.forEach((project) => {
        project.classList.remove("more-projects");
      });
      loadMoreBtn.style.display = "none";
    });
  }
  // --- End of Load more button ---

  // --- Start of Contact Form Logic ---
  const form = document.getElementById("contact-form");
  const messageDiv = document.getElementById("form-message");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const messageInput = document.getElementById("message");

  if (!form) return;

  const validationRules = {
    name: (value) => {
      if (value.trim() === "") return "Name is required.";
      if (!/^[A-Za-z\s]+$/.test(value.trim()))
        return "Name can only contain alphabetic characters.";
      return null;
    },
    email: (value) => {
      if (value.trim() === "") return "Email is required.";
      if (!/^\S+@\S+\.\S+$/.test(value.trim()))
        return "Please enter a valid email address.";
      return null;
    },
    phone: (value) => {
      if (value.trim() === "") return "Phone number is required.";
      if (!/^\d{10}$/.test(value.trim()))
        return "Phone number must be exactly 10 digits.";
      return null;
    },
    message: (value) => {
      if (value.trim() === "") return "Message is required.";
      return null;
    },
  };

  const validateField = (input, errorElement, rule) => {
    const error = rule(input.value);
    if (error) {
      errorElement.textContent = error;
      input.classList.add("required-error");
      return false;
    } else {
      errorElement.textContent = "";
      input.classList.remove("required-error");
      return true;
    }
  };

  const showMessage = (message, isSuccess) => {
    if (!messageDiv) return;
    messageDiv.textContent = message;
    messageDiv.classList.remove("hidden", "success-message", "error-message");
    if (isSuccess) {
      messageDiv.classList.add("success-message");
    } else {
      messageDiv.classList.add("error-message");
    }
  };

  const resetForm = () => {
    form.reset();
    nameInput.classList.remove("required-error");
    emailInput.classList.remove("required-error");
    if (phoneInput) phoneInput.classList.remove("required-error");
    messageInput.classList.remove("required-error");
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    if (document.getElementById("phone-error"))
      document.getElementById("phone-error").textContent = "";
    document.getElementById("message-error").textContent = "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    isValid =
      validateField(
        nameInput,
        document.getElementById("name-error"),
        validationRules.name
      ) && isValid;
    isValid =
      validateField(
        emailInput,
        document.getElementById("email-error"),
        validationRules.email
      ) && isValid;
    isValid =
      validateField(
        phoneInput,
        document.getElementById("phone-error"),
        validationRules.phone
      ) && isValid;
    isValid =
      validateField(
        messageInput,
        document.getElementById("message-error"),
        validationRules.message
      ) && isValid;

    if (!isValid) {
      showMessage("Please correct the errors in the form.", false);
      return;
    }

    showMessage("Sending...", true);

    const templateParams = {
      from_name: nameInput.value.trim(),
      from_email: emailInput.value.trim(),
      from_phone: phoneInput.value.trim(),
      message: messageInput.value.trim(),
    };

    emailjs
      .send("service_46ys6w9", "template_sjenxum", templateParams)
      .then(() => {
        showMessage(
          "Thank you! Your message has been sent successfully.",
          true
        );
        resetForm();
      })
      .catch(() => {
        showMessage(
          "Oops! Something went wrong. Please try again later.",
          false
        );
      });
  });

  nameInput.addEventListener("input", () =>
    validateField(
      nameInput,
      document.getElementById("name-error"),
      validationRules.name
    )
  );

  emailInput.addEventListener("input", () =>
    validateField(
      emailInput,
      document.getElementById("email-error"),
      validationRules.email
    )
  );
  if (phoneInput) {
    phoneInput.addEventListener("input", () =>
      validateField(
        phoneInput,
        document.getElementById("phone-error"),
        validationRules.phone
      )
    );
  }

  messageInput.addEventListener("input", () =>
    validateField(
      messageInput,
      document.getElementById("message-error"),
      validationRules.message
    )
  );
  // --- End of Contact Form Logic ---
});
