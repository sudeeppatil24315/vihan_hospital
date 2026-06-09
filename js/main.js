// main.js

// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800); // Matches CSS transition duration
  }
});
document.addEventListener('DOMContentLoaded', () => {


  // Sticky Header on Scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70, // offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Animated Counters
  const counters = document.querySelectorAll('.stat-number');
  const speed = 150; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for scroll animations (Counters & Cards)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger counter animation
        if (entry.target.classList.contains('stats-strip')) {
          animateCounters();
          observer.unobserve(entry.target);
        }
        
        // Trigger card fade-ups
        if (entry.target.classList.contains('spec-card')) {
          // Add staggered delay based on child index
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      }
    });
  }, observerOptions);

  const statsStrip = document.querySelector('.stats-strip');
  if (statsStrip) observer.observe(statsStrip);

  const specCards = document.querySelectorAll('.spec-card');
  specCards.forEach(card => observer.observe(card));

  // Particle generation for Hero Section
  const particlesContainer = document.getElementById('particles');
  const particleCount = 60;
  
  if (particlesContainer) {
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random properties
      const size = Math.random() * 5 + 2; // 2px to 7px
      const posX = Math.random() * 100; // 0% to 100%
      const posY = Math.random() * 100; // 0% to 100%
      const duration = Math.random() * 20 + 10; // 10s to 30s
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Select random brand color
      const colors = ['#00B4D8', '#8DC63F', '#FFFFFF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.borderRadius = '50%';
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = opacity;
      
      // Simple floating animation using Web Animations API
      particle.animate([
        { transform: `translate(0, 0)` },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * -100 - 50}px)` }
      ], {
        duration: duration * 1000,
        iterations: Infinity,
        direction: 'alternate',
        delay: delay * 1000,
        easing: 'ease-in-out'
      });
      
      particlesContainer.appendChild(particle);
    }
  }

  // Doctor CTA — Spotlight mouse tracking
  const docBtns = document.querySelectorAll('.doc-cta-btn');
  docBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      btn.style.setProperty('--mx', x + 'px');
      btn.style.setProperty('--my', y + 'px');
    });
  });

  // Hero CTA — Spotlight mouse tracking
  const heroBtn = document.getElementById('hero-spotlight-btn');
  if (heroBtn) {
    heroBtn.addEventListener('mousemove', (e) => {
      const rect = heroBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroBtn.style.setProperty('--spotlight-x', x + 'px');
      heroBtn.style.setProperty('--spotlight-y', y + 'px');
    });
  }

  // Video Skeleton Loading
  const videos = document.querySelectorAll('.review-video');
  videos.forEach(video => {
    // If video is already loaded by the time JS runs
    if (video.readyState >= 3) {
      video.parentElement.classList.remove('skeleton-loading');
    } else {
      video.addEventListener('canplay', () => {
        video.parentElement.classList.remove('skeleton-loading');
      });
    }
  });
});
