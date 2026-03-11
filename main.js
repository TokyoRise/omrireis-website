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
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// Contact form — Formspree AJAX submission
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form && status) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        status.textContent = 'Thanks for reaching out! I'll be in touch soon.';
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
