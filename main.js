// ==========================================
// Omri Reis — Site JS
// ==========================================

// Auto-update copyright year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (toggle && navLinks) {
  // Inject social icons into mobile dropdown once
  const navSocial = document.querySelector('.nav-social');
  if (navSocial) {
    const mobileSocialLi = document.createElement('li');
    mobileSocialLi.className = 'mobile-social';
    mobileSocialLi.innerHTML = navSocial.innerHTML;
    navLinks.appendChild(mobileSocialLi);
  }

  const closeMenu = () => {
    navLinks.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked (not social icons)
  navLinks.querySelectorAll('li:not(.mobile-social) a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });
}

// Contact form — formsubmit.co AJAX submission
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const body = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    try {
      const res = await fetch('https://formsubmit.co/ajax/omri.reis@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        status.textContent = "Thanks for reaching out! I'll be in touch soon.";
        status.style.display = 'block';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please email me directly at omri.reis@gmail.com';
        status.style.display = 'block';
      }
    } catch {
      status.textContent = 'Something went wrong. Please email me directly at omri.reis@gmail.com';
      status.style.display = 'block';
    }
  });
}
