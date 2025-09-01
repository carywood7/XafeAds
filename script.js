// Simple 2-step form logic
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const backBtn = document.getElementById('backBtn'); // Get the new back button
const step2 = document.getElementById('step2');
const step1 = document.getElementById('step1'); // Get the new step1 div
const form = document.getElementById('leadForm');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

nextBtn?.addEventListener('click', () => {
  const platform = form.querySelector('input[name="platform"]:checked');
  const issue = form.querySelector('input[name="issue"]:checked');
  if (!platform || !issue) {
    alert('Please select a platform and an issue to continue.');
    return;
  }
  step1.classList.add('hidden'); // Hide Step 1
  step2.classList.remove('hidden');
  nextBtn.classList.add('hidden');
  submitBtn.classList.remove('hidden');
  backBtn.classList.remove('hidden'); // Show the back button
  step2.scrollIntoView({behavior:'smooth', block:'start'});
});

backBtn?.addEventListener('click', () => {
  step1.classList.remove('hidden'); // Show Step 1
  step2.classList.add('hidden');
  nextBtn.classList.remove('hidden');
  submitBtn.classList.add('hidden');
  backBtn.classList.add('hidden'); // Hide the back button
  step1.scrollIntoView({behavior:'smooth', block:'start'});
});

// Mobile dropdown menu functionality
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

mobileMenuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking on a link
navLinksItems.forEach(link => {
  link.addEventListener('click', (e) => {
    // Close mobile menu
    navLinks.classList.remove('active');
    
    // Handle smooth scrolling for anchor links
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Calculate offset for sticky header
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenuToggle?.contains(e.target) && !navLinks?.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
  }
});



// UTM capture into hidden fields
const params = new URLSearchParams(window.location.search);
['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(key=>{
  const el = form.querySelector(`input[name="${key}"]`);
  if(el && params.get(key)) el.value = params.get(key);
});

// Form submit handler - redirect to thank you page
form?.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission
  // Redirect to thank you page
  window.location.href = 'thank-you.html';
});

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
  
  // Navbar scroll effect
  const header = document.querySelector('.header');
  if (window.pageYOffset > 100) {
    header.style.background = 'rgba(255,255,255,0.95)';
    header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
  } else {
    header.style.background = 'rgba(255,255,255,0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
  }
});

// Scroll to top when button is clicked
scrollTopBtn?.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
