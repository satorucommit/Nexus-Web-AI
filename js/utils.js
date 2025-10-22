/**
 * Utility functions for the AI website
 */

// Helper function to select DOM elements
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);

// Handle scroll events with throttling
const throttle = (callback, delay = 200) => {
  let isThrottled = false;
  
  return function(...args) {
    if (isThrottled) return;
    
    isThrottled = true;
    callback.apply(this, args);
    
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
};

// Detect if an element is in viewport
const isInViewport = (element, offset = 100) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= offset &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) - offset &&
    rect.right >= offset
  );
};

// Generate a random number between min and max
const random = (min, max) => Math.random() * (max - min) + min;

// Generate a random integer between min and max
const randomInt = (min, max) => Math.floor(random(min, max));

// Format number with commas
const formatNumber = (num) => {
  return new Intl.NumberFormat().format(num);
};

// Animate number counting
const animateCount = (element, target, duration = 2000, easing = 'easeOutExpo') => {
  const start = 0;
  const startTime = performance.now();
  
  const easings = {
    linear: t => t,
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
  };
  
  const animate = (currentTime) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    const easedProgress = easings[easing](progress);
    
    const value = Math.floor(easedProgress * (target - start) + start);
    element.textContent = formatNumber(value);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

// Get a random element from an array
const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Debounce function to prevent excessive function calls
const debounce = (callback, wait = 300) => {
  let timeout;
  
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), wait);
  };
};

// Create a typed text effect
const typeText = (element, text, speed = 50) => {
  let index = 0;
  element.textContent = '';
  element.classList.add('typing');
  
  const typing = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typing);
      element.classList.remove('typing');
    }
  }, speed);
  
  return typing;
};

// Add a class after a delay
const addClassWithDelay = (element, className, delay) => {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
};

// Export all utility functions
window.utils = {
  select,
  selectAll,
  throttle,
  isInViewport,
  random,
  randomInt,
  formatNumber,
  animateCount,
  randomElement,
  debounce,
  typeText,
  addClassWithDelay
};