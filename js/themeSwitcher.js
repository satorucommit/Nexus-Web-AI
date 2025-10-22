/**
 * Handle theme switching functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on saved preference or system preference
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  } else if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark-mode');
  } else if (prefersDark) {
    document.documentElement.classList.add('dark-mode');
  }
  
  // Update theme toggle button state
  updateThemeToggleState();
  
  // Handle theme toggle click
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark-mode');
      
      // Save preference to localStorage
      const isDarkMode = document.documentElement.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      
      // Update toggle button state
      updateThemeToggleState();
      
      // Dispatch custom event for other components to listen to
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { darkMode: isDarkMode }
      }));
    });
  }
  
  // Update toggle button state based on current theme
  function updateThemeToggleState() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    
    if (themeToggle) {
      // Update aria-label for accessibility
      themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      
      // Add visual feedback
      themeToggle.classList.remove('theme-transition');
      themeToggle.classList.add('theme-transition');
      setTimeout(() => {
        themeToggle.classList.remove('theme-transition');
      }, 300);
    }
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Only apply if user hasn't manually set a preference
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
      updateThemeToggleState();
    }
  });
  
  // Listen for theme changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === 'theme') {
      if (e.newValue === 'dark') {
        document.documentElement.classList.add('dark-mode');
      } else if (e.newValue === 'light') {
        document.documentElement.classList.remove('dark-mode');
      }
      updateThemeToggleState();
    }
  });
});

// Function to apply theme to dynamically created elements
function applyThemeToElement(element) {
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  if (isDarkMode) {
    element.classList.add('dark-mode');
  } else {
    element.classList.remove('dark-mode');
  }
}