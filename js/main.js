/**
 * Main JavaScript file to initialize all components with continuous animations
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('NeuralNexus AI Website Initialized');
  
  // Set up mobile navigation
  const setupMobileNav = () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, i) => {
          if (navLinks.classList.contains('active')) {
            if (i === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (i === 1) span.style.opacity = '0';
            if (i === 2) span.style.transform = 'rotate(-45deg) translate(5px, -5px)';
          } else {
            span.style.transform = '';
            span.style.opacity = '1';
          }
        });
      });
      
      // Close mobile menu when clicking on links
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
          
          const spans = navToggle.querySelectorAll('span');
          spans.forEach(span => {
            span.style.transform = '';
            span.style.opacity = '1';
          });
        });
      });
    }
  };
  
  // Handle header transparency on scroll with enhanced effects
  const setupHeaderScroll = () => {
    const header = document.getElementById('main-header');
    
    if (header) {
      window.addEventListener('scroll', utils.throttle(() => {
        if (window.scrollY > 50) {
          header.style.backgroundColor = 'var(--color-background)';
          header.style.borderBottomColor = 'var(--color-border)';
          header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
          header.style.backgroundColor = 'rgba(var(--color-background-rgb), 0.8)';
          header.style.borderBottomColor = 'transparent';
          header.style.boxShadow = 'none';
        }
        
        // Add subtle animation based on scroll position
        const scrollPercentage = Math.min(1, window.scrollY / 500);
        header.style.backdropFilter = `blur(${5 + scrollPercentage * 15}px)`;
      }, 100));
    }
  };
  
  // Set dynamic year in footer copyright
  const setupDynamicYear = () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  };
  
  // Add continuous animations to about section
  const animateAboutSection = () => {
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
      // Add subtle floating animation
      aboutImage.style.animation = 'float 6s ease-in-out infinite';
    }
    
    // Add CSS for floating animation if not already present
    if (!document.querySelector('#about-float-style')) {
      const style = document.createElement('style');
      style.id = 'about-float-style';
      style.textContent = `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // Add continuous animations to footer
  const animateFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) {
      // Remove background animation to make it static
      footer.style.background = 'var(--color-surface)';
      footer.style.animation = 'none';
    }
  };
  
  // Add subtle hover effects to buttons
  const enhanceButtons = () => {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 6px 30px rgba(10, 132, 255, 0.4)';
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 4px 15px rgba(10, 132, 255, 0.3)';
      });
    });
  };
  
  // Initialize page
  const init = () => {
    // Calculate CSS variables
    const root = document.documentElement;
    const bgColor = getComputedStyle(root).getPropertyValue('--color-background').trim();
    
    // Convert hex to rgb and set as a CSS variable for transparency
    const hexToRgb = (hex) => {
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Convert 3-digit hex to 6-digits
      if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
      }
      
      // Convert to RGB
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };
    
    // Check if the background color is in hex format
    if (bgColor.startsWith('#')) {
      const rgbValue = hexToRgb(bgColor);
      root.style.setProperty('--color-background-rgb', rgbValue);
    } else if (bgColor.startsWith('rgb')) {
      // Extract RGB values if already in RGB format
      const rgbMatch = bgColor.match(/\d+/g);
      if (rgbMatch && rgbMatch.length >= 3) {
        const rgbValue = `${rgbMatch[0]}, ${rgbMatch[1]}, ${rgbMatch[2]}`;
        root.style.setProperty('--color-background-rgb', rgbValue);
      }
    }
    
    setupMobileNav();
    setupHeaderScroll();
    setupDynamicYear();
    animateAboutSection();
    animateFooter();
    enhanceButtons();
  };
  
  // Initialize continuous animations
  const initContinuousAnimations = () => {
    // Re-apply animations periodically
    setInterval(() => {
      animateAboutSection();
    }, 15000);
  };
  
  // Initialize
  init();
  initContinuousAnimations();
  
  // Handle browser resize events
  window.addEventListener('resize', utils.debounce(() => {
    // Reinitialize certain components on resize
    // Add resize-specific code here
  }, 250));
});