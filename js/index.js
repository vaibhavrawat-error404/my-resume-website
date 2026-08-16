document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Theme toggle ---------------- */
  const themeBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('vr-theme');
  if (savedTheme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀';
  }
  themeBtn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      themeBtn.textContent = '☾';
      localStorage.setItem('vr-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      themeBtn.textContent = '☀';
      localStorage.setItem('vr-theme', 'dark');
    }
  });

  /* ---------------- Scroll reveal for sections ---------------- */
  const sections = document.querySelectorAll('main section');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => revealObserver.observe(s));

  /* ---------------- Project filters ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---------------- Copy to clipboard (phone / email) ---------------- */
  const toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }
  document.querySelectorAll('.copyable').forEach(el => {
    el.addEventListener('click', () => {
      const value = el.dataset.copy;
      navigator.clipboard.writeText(value).then(() => {
        showToast('Copied: ' + value);
      }).catch(() => {
        showToast('Could not copy — please copy manually');
      });
    });
  });

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Nav active state on scroll (scrollspy) ---------------- */
  const navLinks = document.querySelectorAll('#links a[data-section]');
  const targets = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (targets.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = document.querySelector(`#links a[href="${id}"]`);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active-nav'));
          link.classList.add('active-nav');
        }
      });
    }, { threshold: 0.4 });
    targets.forEach(t => spyObserver.observe(t));
  }

  /* ---------------- Typing tagline effect ---------------- */
  const tagline = document.getElementById('tagline');
  if (tagline) {
    const fullText = tagline.dataset.text || tagline.textContent.trim();
    tagline.textContent = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    let i = 0;
    function typeChar() {
      if (i <= fullText.length) {
        tagline.textContent = fullText.slice(0, i);
        tagline.appendChild(cursor);
        i++;
        setTimeout(typeChar, 45);
      }
    }
    typeChar();
  }

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});