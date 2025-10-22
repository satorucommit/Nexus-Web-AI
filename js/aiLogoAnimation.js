/**
 * AI Logo Animation with spinning particles around "AI" text
 */

document.addEventListener('DOMContentLoaded', () => {
  const particlesContainer = document.getElementById('particlesContainer');
  
  if (!particlesContainer) return;
  
  // Configuration
  const config = {
    numParticles: 50,
    particleSize: { min: 6, max: 12 },
    particleColors: [
      'var(--color-primary-500)',
      'var(--color-secondary-500)',
      'var(--color-accent-400)'
    ],
    orbitRadius: { min: 200, max: 200 }, // Fixed radius for strict circle (increased from 150)
    animationDuration: { min: 10, max: 20 }
  };
  
  // Initialize the animation
  function initLogoAnimation() {
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < config.numParticles; i++) {
      createParticle(i);
    }
  }
  
  // Create a particle
  function createParticle(index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size
    const size = utils.random(config.particleSize.min, config.particleSize.max);
    
    // Random color
    const color = utils.randomElement(config.particleColors);
    
    // Fixed orbit radius for strict circle (increased from 150)
    const orbitRadius = 200;
    
    // Random animation duration
    const duration = utils.random(config.animationDuration.min, config.animationDuration.max);
    
    // Calculate even distribution around the circle
    const angle = (index / config.numParticles) * 360;
    
    // Style the particle
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
    `;
    
    // Set CSS variables for animation
    particle.style.setProperty('--orbit-radius', `${orbitRadius}px`);
    particle.style.animation = `spinAround ${duration}s infinite linear`;
    particle.style.animationDelay = `${index * 0.1}s`;
    
    particlesContainer.appendChild(particle);
  }
  
  // Add CSS for the logo animation
  function addLogoAnimationStyles() {
    if (!document.querySelector('#logo-animation-styles')) {
      const style = document.createElement('style');
      style.id = 'logo-animation-styles';
      style.textContent = `
        .particle {
          position: absolute;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        @keyframes spinAround {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius, 200px)) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius, 200px)) rotate(-360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize
  addLogoAnimationStyles();
  initLogoAnimation();
  
  // Rebuild on resize
  window.addEventListener('resize', utils.debounce(() => {
    initLogoAnimation();
  }, 500));
});