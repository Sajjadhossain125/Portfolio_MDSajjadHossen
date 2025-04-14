 // Mobile menu toggle functionality
 document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const portfolioToggle = document.querySelector('.portfolio-toggle');
    const portfolioSubmenu = document.querySelector('.portfolio-submenu');
    
    // Toggle main mobile menu
    mobileMenuButton.addEventListener('click', function() {
      // Toggle the mobile menu
      if (mobileMenu.classList.contains('hidden')) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        
        // Animation timing
        setTimeout(() => {
          mobileMenu.classList.remove('opacity-0', '-translate-y-2');
          mobileMenu.classList.add('opacity-100', 'translate-y-0');
        }, 10);
      } else {
        // Hide menu with animation
        mobileMenu.classList.add('opacity-0', '-translate-y-2');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
        }, 300);
      }
    });
    
    // Toggle portfolio submenu in mobile view
    if (portfolioToggle) {
      portfolioToggle.addEventListener('click', function() {
        if (portfolioSubmenu.classList.contains('hidden')) {
          portfolioSubmenu.classList.remove('hidden');
          this.querySelector('svg').classList.add('rotate-180');
        } else {
          portfolioSubmenu.classList.add('hidden');
          this.querySelector('svg').classList.remove('rotate-180');
        }
      });
    }
    
    // Handle window resize (close mobile menu when switching to desktop)
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden', 'opacity-0', '-translate-y-2');
          mobileMenu.classList.remove('opacity-100', 'translate-y-0');
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      }
    });
  });
  
  // Scroll event for navbar styling
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
      navbar.classList.add('py-2', 'shadow-lg', 'bg-[#1A1A1D]/95');
      navbar.classList.remove('py-4', 'bg-[#1A1A1D]/90');
    } else {
      navbar.classList.add('py-4', 'bg-[#1A1A1D]/90');
      navbar.classList.remove('py-2', 'shadow-lg', 'bg-[#1A1A1D]/95');
    }
  });