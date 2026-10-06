/**
 * Pushti Dhupelia - Developer Portfolio Interactive Scripts
 * Pushti.dev
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. DOM Elements Selection
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const skillTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');
  const projectCards = document.querySelectorAll('.project-card');
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  // Modals
  const resumeModal = document.getElementById('resumeModal');
  const resumeBtns = document.querySelectorAll('.btn-resume-trigger');
  const projectModal = document.getElementById('projectModal');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const messageInput = document.getElementById('messageInput');
  const formStatusBanner = document.getElementById('formStatusBanner');

  // --------------------------------------------------------------------------
  // 2. Sticky Navbar & Scroll Events
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Navbar background blur/shadow enhancement
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to Top button visibility
    if (scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Menu Toggle & Auto-Close
  // --------------------------------------------------------------------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          navMenu.classList.remove('open');
        }
      });
    });

    // Close menu if clicked outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Active Navigation Highlighting (ScrollSpy)
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 5. Skills Category Filter Tabs
  // --------------------------------------------------------------------------
  if (skillTabs.length > 0) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-filter');

        skillCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (category === 'all' || cardCat === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Direct Project Navigation
  // --------------------------------------------------------------------------
  // The 'View Project' buttons now directly link to the live working web apps:
  // - projects/student-registration/index.html
  // - projects/calculator/index.html
  // - projects/todo-app/index.html


  // --------------------------------------------------------------------------
  // 7. Resume Modal Controls & Print Action
  // --------------------------------------------------------------------------
  resumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) {
        openModal(resumeModal);
      }
    });
  });

  const printResumeBtn = document.getElementById('printResumeBtn');
  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // --------------------------------------------------------------------------
  // 8. General Modal Management Functions
  // --------------------------------------------------------------------------
  function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close modal when clicking outside container
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-overlay.active');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. Copy Email Helper
  // --------------------------------------------------------------------------
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = 'pushtidhupelia@gmail.com';
      try {
        await navigator.clipboard.writeText(email);
        const originalContent = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
        copyEmailBtn.style.color = '#10b981';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalContent;
          copyEmailBtn.style.color = '';
        }, 2200);
      } catch (err) {
        // Fallback
        window.location.href = `mailto:${email}`;
      }
    });
  }

  // --------------------------------------------------------------------------
  // 10. Contact Form Client-Side Validation
  // --------------------------------------------------------------------------
  if (contactForm) {
    const nameError = document.getElementById('nameError');
    const nameValidFeedback = document.getElementById('nameValidFeedback');
    const nameStatusIcon = document.getElementById('nameStatusIcon');

    const emailError = document.getElementById('emailError');
    const emailValidFeedback = document.getElementById('emailValidFeedback');
    const emailStatusIcon = document.getElementById('emailStatusIcon');

    const messageError = document.getElementById('messageError');
    const messageValidFeedback = document.getElementById('messageValidFeedback');

    // Robust Name Validation: Letters and spaces only, min 2 chars
    const validateName = (showUI = true) => {
      const val = nameInput.value.trim();
      const nameRegex = /^[a-zA-Z\s'-]+$/;
      let errorMsg = '';

      if (!val) {
        errorMsg = 'Full name is required.';
      } else if (val.length < 2) {
        errorMsg = 'Full name must be at least 2 characters.';
      } else if (!nameRegex.test(val)) {
        errorMsg = 'Full name can only contain letters and spaces (no numbers or symbols).';
      }

      if (errorMsg) {
        if (showUI) {
          nameInput.classList.add('is-invalid');
          nameInput.classList.remove('is-valid');
          if (nameError) {
            nameError.textContent = errorMsg;
            nameError.classList.add('visible');
          }
          if (nameValidFeedback) nameValidFeedback.classList.remove('visible');
          if (nameStatusIcon) {
            nameStatusIcon.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i>';
            nameStatusIcon.style.display = 'block';
          }
        }
        return false;
      } else {
        if (showUI) {
          nameInput.classList.remove('is-invalid');
          nameInput.classList.add('is-valid');
          if (nameError) nameError.classList.remove('visible');
          if (nameValidFeedback) nameValidFeedback.classList.add('visible');
          if (nameStatusIcon) {
            nameStatusIcon.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
            nameStatusIcon.style.display = 'block';
          }
        }
        return true;
      }
    };

    // Robust Email Validation: Strict format checking
    const validateEmail = (showUI = true) => {
      const val = emailInput.value.trim();
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let errorMsg = '';

      if (!val) {
        errorMsg = 'Email address is required.';
      } else if (!emailRegex.test(val)) {
        errorMsg = 'Please enter a valid email address (e.g. name@domain.com).';
      }

      if (errorMsg) {
        if (showUI) {
          emailInput.classList.add('is-invalid');
          emailInput.classList.remove('is-valid');
          if (emailError) {
            emailError.textContent = errorMsg;
            emailError.classList.add('visible');
          }
          if (emailValidFeedback) emailValidFeedback.classList.remove('visible');
          if (emailStatusIcon) {
            emailStatusIcon.innerHTML = '<i class="bi bi-exclamation-circle-fill"></i>';
            emailStatusIcon.style.display = 'block';
          }
        }
        return false;
      } else {
        if (showUI) {
          emailInput.classList.remove('is-invalid');
          emailInput.classList.add('is-valid');
          if (emailError) emailError.classList.remove('visible');
          if (emailValidFeedback) emailValidFeedback.classList.add('visible');
          if (emailStatusIcon) {
            emailStatusIcon.innerHTML = '<i class="bi bi-check-circle-fill"></i>';
            emailStatusIcon.style.display = 'block';
          }
        }
        return true;
      }
    };

    // Message Validation: Minimum 5 characters
    const validateMessage = (showUI = true) => {
      const val = messageInput.value.trim();
      let errorMsg = '';

      if (!val) {
        errorMsg = 'Message is required.';
      } else if (val.length < 5) {
        errorMsg = 'Message must be at least 5 characters long.';
      }

      if (errorMsg) {
        if (showUI) {
          messageInput.classList.add('is-invalid');
          messageInput.classList.remove('is-valid');
          if (messageError) {
            messageError.textContent = errorMsg;
            messageError.classList.add('visible');
          }
          if (messageValidFeedback) messageValidFeedback.classList.remove('visible');
        }
        return false;
      } else {
        if (showUI) {
          messageInput.classList.remove('is-invalid');
          messageInput.classList.add('is-valid');
          if (messageError) messageError.classList.remove('visible');
          if (messageValidFeedback) messageValidFeedback.classList.add('visible');
        }
        return true;
      }
    };

    // Real-time instant validation on input and blur
    nameInput.addEventListener('input', () => validateName(true));
    nameInput.addEventListener('blur', () => validateName(true));

    emailInput.addEventListener('input', () => validateEmail(true));
    emailInput.addEventListener('blur', () => validateEmail(true));

    messageInput.addEventListener('input', () => validateMessage(true));
    messageInput.addEventListener('blur', () => validateMessage(true));

    // Form submission validation
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName(true);
      const isEmailValid = validateEmail(true);
      const isMessageValid = validateMessage(true);

      if (!isNameValid) {
        nameInput.focus();
        return;
      }
      if (!isEmailValid) {
        emailInput.focus();
        return;
      }
      if (!isMessageValid) {
        messageInput.focus();
        return;
      }

      // Success feedback banner
      const nameVal = nameInput.value.trim();
      formStatusBanner.className = 'form-status-banner success';
      formStatusBanner.style.display = 'flex';
      formStatusBanner.innerHTML = `
        <i class="bi bi-check-circle-fill" style="font-size: 1.25rem;"></i>
        <div>
          <strong>Thank you, ${escapeHtml(nameVal)}!</strong> Your message has been prepared.
          <div style="font-size: 0.8125rem; font-weight: normal; margin-top: 2px;">
            Since this portfolio is hosted statically on GitHub Pages, you can also reach me directly at 
            <a href="mailto:pushtidhupelia@gmail.com" style="text-decoration: underline; font-weight: bold; color: inherit;">pushtidhupelia@gmail.com</a>.
          </div>
        </div>
      `;

      contactForm.reset();

      // Reset visual state after submission
      [nameInput, emailInput, messageInput].forEach(input => {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
      });
      if (nameStatusIcon) nameStatusIcon.style.display = 'none';
      if (emailStatusIcon) emailStatusIcon.style.display = 'none';
      if (nameValidFeedback) nameValidFeedback.classList.remove('visible');
      if (emailValidFeedback) emailValidFeedback.classList.remove('visible');
      if (messageValidFeedback) messageValidFeedback.classList.remove('visible');
    });
  }

  // Security helper to prevent XSS in client-rendered status text
  function escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // 11. Scroll Reveal Animations (Intersection Observer)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
});
