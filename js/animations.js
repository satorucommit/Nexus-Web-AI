/**
 * Handle animations and scrolling effects with continuous animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // Get all elements that should be revealed on scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  // Store animated elements to prevent re-animation
  const animatedElements = new Set();
  
  // Function to check if elements are in viewport and reveal them
  const revealOnScroll = () => {
    revealElements.forEach(element => {
      if (utils.isInViewport(element) && !animatedElements.has(element)) {
        element.classList.add('active');
        animatedElements.add(element);
      }
    });
    
    // Animate stats when they come into view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection && utils.isInViewport(statsSection) && !statsSection.classList.contains('animated')) {
      animateStats();
      statsSection.classList.add('animated');
    }
  };
  
  // Animate the stats counters
  const animateStats = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-value'), 10);
      utils.animateCount(stat, target);
    });
  };
  
  // Continuous floating animation for feature cards only (not logos)
  function animateFeatureCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      // Add continuous floating animation only to cards
      card.style.animation = `cardFloat 3s ${index * 0.2}s infinite ease-in-out`;
    });
  }
  
  // Continuous animation for timeline with moving lines
  function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animate timeline items
    timelineItems.forEach((item, index) => {
      // Add continuous pulsing animation
      item.style.animation = `timelinePulse 4s ${index * 0.5}s infinite ease-in-out`;
    });
  }
  
  // Add continuous movement to timeline line
  function animateTimelineLine() {
    // Add CSS for moving timeline line
    if (!document.querySelector('#timeline-line-animation')) {
      const style = document.createElement('style');
      style.id = 'timeline-line-animation';
      style.textContent = `
        .timeline-container::before {
          animation: moveLine 8s infinite linear;
        }
        
        @keyframes moveLine {
          0% { transform: translateX(-50%) translateY(0); }
          25% { transform: translateX(-50%) translateY(10px); }
          50% { transform: translateX(-50%) translateY(0); }
          75% { transform: translateX(-50%) translateY(-10px); }
          100% { transform: translateX(-50%) translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Continuous animation for chat messages
  function animateChat() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      // Add subtle glow effect
      chatContainer.style.boxShadow = '0 0 20px rgba(10, 132, 255, 0.3)';
      
      // Add continuous animation
      setInterval(() => {
        const intensity = utils.random(0.2, 0.5);
        chatContainer.style.boxShadow = `0 0 20px rgba(10, 132, 255, ${intensity})`;
      }, 3000);
    }
  }
  
  // Add continuous animation to scroll indicator
  function animateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.animation = 'bounce 2s infinite';
    }
  }
  
  // Throttled scroll handler
  const handleScroll = utils.throttle(() => {
    revealOnScroll();
  }, 100);
  
  // Initial check and event listener
  setTimeout(revealOnScroll, 100);
  window.addEventListener('scroll', handleScroll);
  
  // Handle navigation links active state
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const setActiveNavLink = () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', utils.throttle(setActiveNavLink, 100));
  
  // Mobile navigation toggle
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('navLinks');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      
      // Animate the hamburger
      const spans = navToggle.querySelectorAll('span');
      spans.forEach(span => span.classList.toggle('active'));
    });
    
    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize continuous animations (excluding hero background)
  animateFeatureCards(); // Only animate feature cards, not logos
  animateTimeline();
  animateTimelineLine();
  animateChat();
  animateScrollIndicator();
  
  // Re-apply animations periodically for continuous effect
  setInterval(() => {
    animateFeatureCards(); // Only animate feature cards, not logos
    animateTimeline();
  }, 10000);
});