 // Initialize animations when DOM is loaded
 document.addEventListener('DOMContentLoaded', function() {
    // Animate section underlines
    setTimeout(() => {
      document.getElementById('portfolioUnderline').style.width = '80%';
      document.getElementById('experienceUnderline').style.width = '60%';
    }, 500);
    
    // Animate timeline progress
    setTimeout(() => {
      document.getElementById('timelineProgress').style.height = '100%';
    }, 1000);
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        
        // Animate timeline dots after items appear
        setTimeout(() => {
          item.querySelector('.timeline-dot').style.backgroundColor = '#FBBF24';
        }, 300);
      }, 800 + (index * 300));
    });
    
    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button styling
        filterBtns.forEach(b => b.classList.remove('active', 'bg-yellow-400', 'text-black', 'border-yellow-400'));
        filterBtns.forEach(b => b.classList.add('border-gray-500', 'text-gray-400'));
        btn.classList.add('active', 'bg-yellow-400', 'text-black', 'border-yellow-400');
        btn.classList.remove('border-gray-500', 'text-gray-400');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          const shouldShow = filterValue === 'all' || categories.includes(filterValue);
          
          if (shouldShow) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // Toggle experience details
    const toggleButtons = document.querySelectorAll('.toggle-details');
    toggleButtons.forEach(button => {
      button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const icon = button.querySelector('svg');
        
        if (content.classList.contains('hidden')) {
          content.classList.remove('hidden');
          icon.style.transform = 'rotate(180deg)';
        } else {
          content.classList.add('hidden');
          icon.style.transform = 'rotate(0)';
        }
      });
    });
  });