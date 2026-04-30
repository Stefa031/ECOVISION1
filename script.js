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



/* EcoVision APK download final fix */
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href="assets/EcoVision.apk"]').forEach(function(link){
    link.addEventListener("click", function(e){
      // Link real către APK: îl lăsăm să se descarce normal.
      e.stopImmediatePropagation();
    }, true);
  });
});



/* EcoVision exact APK buttons fix */
document.addEventListener("click", function(e) {
  const apkLink = e.target.closest && e.target.closest('a[href="assets/EcoVision.apk"]');
  if (apkLink) {
    e.stopImmediatePropagation();
  }
}, true);



/* EcoVision download final behavior fix */
document.addEventListener("click", function(e) {
  const apkLink = e.target.closest && e.target.closest('a[href="assets/EcoVision.apk"]');
  if (apkLink) {
    e.stopImmediatePropagation();
    return;
  }
}, true);
