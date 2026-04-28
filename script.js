const navButtons = document.querySelectorAll('[data-section]');
const sections = document.querySelectorAll('.page-section');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

function showSection(id) {
  sections.forEach(section => section.classList.toggle('active-section', section.id === id));
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.section === id));
  navLinks.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach(button => {
  button.addEventListener('click', event => {
    const section = button.dataset.section;
    if (section) {
      event.preventDefault();
      showSection(section);
      history.replaceState(null, '', `#${section}`);
    }
  });
});

menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

const initial = location.hash.replace('#', '');
if (initial && document.getElementById(initial)) showSection(initial);
