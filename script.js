// ========== MOBILE MENU TOGGLE ==========
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (navMenu.classList.contains("active") && 
        !navMenu.contains(event.target) && 
        !menuBtn.contains(event.target)) {
      navMenu.classList.remove("active");
    }
  });

  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll("a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll(".counter");
const speed = 200;

const animateCounter = (counter) => {
  const updateCount = () => {
    const target = parseInt(counter.getAttribute("data-target"));
    const count = parseInt(counter.innerText);
    const increment = target / speed;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
};

// Intersection Observer for counters
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      animateCounter(counter);
      observer.unobserve(counter);
    }
  });
}, observerOptions);

counters.forEach(counter => {
  observer.observe(counter);
});

// ========== CONTACT FORM SUBMISSION ==========
const contactForm = document.getElementById("inquiryForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("fullName")?.value.trim();
    const email = document.getElementById("emailAdd")?.value.trim();
    
    if (!name || !email) {
      showNotification("Please fill in all required fields", "error");
      return;
    }
    
    // Simulate form submission
    showNotification(`Thank you ${name}! Our team will contact you within 24 hours.`, "success");
    contactForm.reset();
  });
}

// ========== NEWSLETTER FORM ==========
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input").value;
    if (email) {
      showNotification("Subscribed successfully! Stay tuned for updates.", "success");
      newsletterForm.reset();
    }
  });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fa-solid ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    <span>${message}</span>
  `;
  
  // Style notification
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: ${type === "success" ? "#10b981" : "#ef4444"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    font-family: 'Poppins', sans-serif;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add animation styles
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "") return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ========== COUNTRY CARD CLICK EFFECT ==========
const countryCards = document.querySelectorAll(".country-card");
countryCards.forEach(card => {
  card.addEventListener("click", () => {
    const country = card.querySelector("h3")?.innerText || "";
    const contactInput = document.getElementById("prefCountry");
    if (contactInput) {
      contactInput.value = country;
      // Smooth scroll to contact section
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});

// ========== SERVICE CARD HOVER EFFECT ==========
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// ========== YEAR UPDATE IN FOOTER ==========
const yearElement = document.querySelector(".footer-bottom p:first-child");
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = `&copy; ${currentYear} GLOBAL BRIDGE Educational Consultancy. All rights reserved.`;
}

// ========== LOADING ANIMATION ==========
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  console.log("GLOBAL BRIDGE Website Loaded Successfully!");
});

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.createElement("button");
backToTop.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
backToTop.id = "backToTop";
backToTop.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0f67ff, #16a34a);
  color: white;
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  z-index: 999;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// ========== PARALLAX EFFECT ON HERO ==========
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector(".hero");
  if (hero && scrolled < 600) {
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});

console.log("✨ GLOBAL BRIDGE Website - Fully Loaded ✨");
