
const sections = document.querySelectorAll(".page-section");
const navButtons = document.querySelectorAll(".nav-btn");
const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");
const toast = document.getElementById("toast");

function showSection(id){
  sections.forEach(section => {
    section.classList.remove("active");
    section.style.display = "none";
  });

  const target = document.getElementById(id);
  if(target){
    target.classList.add("active");
    target.style.display = "block";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.section === id);
  });

  closeMenu();
}

function closeMenu(){
  if(navLinks) navLinks.classList.remove("open");
  if(menuBtn) menuBtn.textContent = "☰";
}

function showToast(message){
  if(!toast) return;
  toast.textContent = message;
  toast.style.display = "block";
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 2600);
}

navButtons.forEach(button => {
  button.addEventListener("click", () => showSection(button.dataset.section));
});

document.querySelectorAll("[data-section]").forEach(button => {
  if(!button.classList.contains("nav-btn")){
    button.addEventListener("click", () => showSection(button.dataset.section));
  }
});

if(menuBtn){
  menuBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    navLinks.classList.toggle("open");
    menuBtn.textContent = navLinks.classList.contains("open") ? "×" : "☰";
  });
}

document.addEventListener("click", (event) => {
  const navbar = document.querySelector(".navbar");
  if(window.innerWidth <= 920 && navbar && !navbar.contains(event.target)){
    closeMenu();
  }
});


document.querySelectorAll(".mode-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    showToast(`Mod selectat: ${button.textContent.trim()}`);
  });
});

const copyEmailBtn = document.getElementById("copyEmailBtn");
if(copyEmailBtn){
  copyEmailBtn.addEventListener("click", async () => {
    try{
      await navigator.clipboard.writeText("ecovisionapp53@gmail.com");
      showToast("Email copiat.");
    }catch(e){
      alert("Email: ecovisionapp53@gmail.com");
    }
  });
}

const mailBtn = document.getElementById("mailBtn");
if(mailBtn){
  mailBtn.addEventListener("click", (event) => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if(!isMobile){
      event.preventDefault();
      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=ecovisionapp53@gmail.com&su=Mesaj%20EcoVision&body=Salut!%20Am%20o%20întrebare%20despre%20EcoVision.", "_blank");
    }
  });
}

function updateDemoValues(){
  const temp = 22 + Math.floor(Math.random() * 4);
  const hum = 45 + Math.floor(Math.random() * 10);
  const score = 68 + Math.floor(Math.random() * 18);
  const pressure = 1009 + Math.floor(Math.random() * 10);

  const tempValue = document.getElementById("tempValue");
  const humValue = document.getElementById("humValue");
  const airScore = document.getElementById("airScore");
  const pressureValue = document.getElementById("pressureValue");

  if(tempValue) tempValue.textContent = `${temp}°C`;
  if(humValue) humValue.textContent = `${hum}%`;
  if(airScore) airScore.textContent = score;
  if(pressureValue) pressureValue.textContent = `${pressure} hPa`;
}


showSection("home");


// Admin panel
const adminLogin = document.getElementById("adminLogin");
const adminPanel = document.getElementById("adminPanel");
const adminPassword = document.getElementById("adminPassword");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const robotIpInput = document.getElementById("robotIpInput");
const robotEndpointInput = document.getElementById("robotEndpointInput");
const saveIpBtn = document.getElementById("saveIpBtn");
const savedIpText = document.getElementById("savedIpText");

function loadAdminSettings(){
  if(robotIpInput) robotIpInput.value = localStorage.getItem("ecovisionRobotIp") || "";
  if(robotEndpointInput) robotEndpointInput.value = "/control?cmd=";
  if(savedIpText){
    const ip = localStorage.getItem("ecovisionRobotIp");
    savedIpText.textContent = ip ? `IP salvat: ${ip}` : "IP nesetat.";
  }
}

function unlockAdmin(){
  if(!adminPassword) return;
  if(adminPassword.value.trim() === "ecovision"){
    adminLogin.classList.add("hidden");
    adminPanel.classList.remove("hidden");
    showToast("Panou admin deblocat.");
    loadAdminSettings();
  }else{
    showToast("Parolă greșită.");
  }
}

if(adminLoginBtn) adminLoginBtn.addEventListener("click", unlockAdmin);
if(adminPassword){
  adminPassword.addEventListener("keydown", (e) => {
    if(e.key === "Enter") unlockAdmin();
  });
}

if(saveIpBtn){
  saveIpBtn.addEventListener("click", () => {
    localStorage.setItem("ecovisionRobotIp", robotIpInput.value.trim());
    localStorage.setItem("ecovisionRobotEndpoint", "/control?cmd=");
    loadAdminSettings();
    showToast("Setări salvate.");
  });
}


loadAdminSettings();



// GitHub ESP live connection start
const cameraIpInput = document.getElementById("cameraIpInput");
const saveCameraBtn = document.getElementById("saveCameraBtn");
const cameraStream = document.getElementById("cameraStream");
const cameraPlaceholder = document.getElementById("cameraPlaceholder");

function normalizeIp(ip){
  return (ip || "").trim().replace("http://", "").replace("https://", "").replace(/\/+$/, "");
}

function loadRobotConnection(){
  const robotIp = localStorage.getItem("ecovisionRobotIp") || "";
  const endpoint = "/control?cmd=";

  if(robotIpInput) robotIpInput.value = robotIp;
  if(robotEndpointInput) robotEndpointInput.value = endpoint;

  if(savedIpText){
    savedIpText.textContent = robotIp ? `IP robot salvat: ${robotIp}` : "IP robot nesetat.";
  }
}

function loadCameraConnection(){
  const cameraIp = localStorage.getItem("ecovisionCameraIp") || "";

  if(cameraIpInput) cameraIpInput.value = cameraIp;

  if(cameraStream && cameraPlaceholder){
    if(cameraIp){
      cameraStream.src = `http://${cameraIp}/stream`;
      cameraStream.style.display = "block";
      cameraPlaceholder.style.display = "none";
    }else{
      cameraStream.removeAttribute("src");
      cameraStream.style.display = "none";
      cameraPlaceholder.style.display = "block";
    }
  }
}

if(saveIpBtn){
  saveIpBtn.addEventListener("click", () => {
    const ip = normalizeIp(robotIpInput ? robotIpInput.value : "");
    const endpoint = "/control?cmd=";

    localStorage.setItem("ecovisionRobotIp", ip);
    localStorage.setItem("ecovisionRobotEndpoint", endpoint || "/control?cmd=");

    
function setLastCommandText(text){
  const lastCommand = document.getElementById("lastCommand");
  if(lastCommand) lastCommand.textContent = text;
}

function bindHoldControls(){
  const moveButtons = document.querySelectorAll("#admin .control-btn");
  const stopButtons = document.querySelectorAll("#admin .danger-btn, #admin .control-btn.stop");

  moveButtons.forEach(button => {
    const command = button.dataset.command;
    if(!command) return;

    // STOP is instant, not hold.
    if(command === "stop"){
      button.addEventListener("click", (e) => {
        e.preventDefault();
        setLastCommandText("Comandă selectată: stop");
        sendRobotCommand("stop");
      });
      return;
    }

    let holding = false;
    let holdTimer = null;

    const start = (e) => {
      e.preventDefault();
      if(holding) return;
      holding = true;

      setLastCommandText(`Comandă activă: ${command}`);
      sendRobotCommand(command, true);

      // retrimite comanda cât ții apăsat, ca robotul să continue controlat
      holdTimer = setInterval(() => {
        if(holding) sendRobotCommand(command, true);
      }, 180);
    };

    const stop = (e) => {
      if(e) e.preventDefault();
      if(!holding) return;
      holding = false;

      if(holdTimer){
        clearInterval(holdTimer);
        holdTimer = null;
      }

      setLastCommandText("Comandă selectată: stop");
      sendRobotCommand("stop", true);
    };

    button.addEventListener("mousedown", start);
    button.addEventListener("touchstart", start, { passive: false });

    button.addEventListener("mouseup", stop);
    button.addEventListener("mouseleave", stop);
    button.addEventListener("touchend", stop);
    button.addEventListener("touchcancel", stop);
  });

  stopButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      setLastCommandText("Comandă selectată: stop");
      sendRobotCommand("stop");
    });
  });
}

document.querySelectorAll(".mode-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const mode = button.dataset.mode;
    if(mode === "auto"){
      sendRobotCommand("auto");
      showToast("Mod autonom activat.");
    }else if(mode === "manual"){
      sendRobotCommand("stop");
      showToast("Mod manual activat.");
    }
  });
});

bindHoldControls();


loadRobotConnection();
    showToast("IP robot salvat.");
  });
}

if(saveCameraBtn){
  saveCameraBtn.addEventListener("click", () => {
    const ip = normalizeIp(cameraIpInput ? cameraIpInput.value : "");
    localStorage.setItem("ecovisionCameraIp", ip);
    loadCameraConnection();
    showToast("IP cameră salvat.");
  });
}

async function fetchRobotData(){
  const ip = localStorage.getItem("ecovisionRobotIp");
  if(!ip) return;

  try{
    const response = await fetch(`http://${ip}/data`, { cache: "no-store" });
    const data = await response.json();
    updateGeneralAirText(data);
    
if(data.mq135 !== undefined){
  const mq135Box = document.getElementById("airValue");
  if(mq135Box){
    mq135Box.textContent = data.mq135;
  }
}

    updateAirTextOnly(data);
    updateGeneralAirText(data);
    
if(data.mq135 !== undefined){
  const mq135Box = document.getElementById("airValue");
  if(mq135Box){
    mq135Box.textContent = data.mq135;
  }
}


    if(data.temp !== undefined) document.getElementById("tempValue").textContent = `${data.temp}°C`;
    if(data.hum !== undefined) document.getElementById("humValue").textContent = `${data.hum}%`;

    if(data.mq7 !== undefined) document.getElementById("coValue").textContent = data.mq7;
    if(data.co !== undefined) document.getElementById("coValue").textContent = data.co;

    if(data.mq8 !== undefined) document.getElementById("h2Value").textContent = data.mq8;
    if(data.h2 !== undefined) document.getElementById("h2Value").textContent = data.h2;

    
    if(data.air !== undefined) document.getElementById("airValue").textContent = data.air;

    if(data.dust !== undefined) document.getElementById("dustValue").textContent = data.dust;
    if(data.pressure !== undefined) document.getElementById("pressureValue").textContent = `${data.pressure} hPa`;
    if(data.battery !== undefined) document.getElementById("batteryValue").textContent = `${data.battery}%`;
    if(data.batteryP !== undefined) document.getElementById("batteryValue").textContent = `${data.batteryP}%`;
    

    const connectionState = document.getElementById("connectionState");
    updateAirTextOnly(data);
    updateGeneralAirText(data);
    
if(data.mq135 !== undefined){
  const mq135Box = document.getElementById("airValue");
  if(mq135Box){
    mq135Box.textContent = data.mq135;
  }
}

    if(connectionState) connectionState.textContent = "ONLINE";
  }catch(err){
    const connectionState = document.getElementById("connectionState");
    if(connectionState) connectionState.textContent = "OFFLINE";
  }
}

async function sendRobotCommand(command, silent = false){
  const ip = localStorage.getItem("ecovisionRobotIp");
  const endpoint = "/control?cmd=";

  if(!ip){
    if(!silent) showToast("Setează IP-ul robotului în Admin.");
    return false;
  }

  try{
    await fetch(`http://${ip}${endpoint}${command}`, { cache: "no-store" });
    if(!silent) showToast(`Comandă trimisă: ${command}`);
    return true;
  }catch(err){
    if(!silent) showToast("Comanda nu a putut fi trimisă.");
    return false;
  }
}


loadRobotConnection();
loadCameraConnection();
setInterval(fetchRobotData, 2500);
// GitHub ESP live connection end


/* EcoVision final HTTPS/mixed content helper */
function showConnectionWarningIfNeeded(){
  const isHttps = location.protocol === "https:";
  const robotIp = localStorage.getItem("ecovisionRobotIp");
  if(isHttps && robotIp){
    console.warn("GitHub Pages rulează pe HTTPS. Unele browsere pot bloca cererile HTTP către ESP32.");
  }
}
showConnectionWarningIfNeeded();



/* FIX final: Calitate aer trebuie să fie text, nu valoarea MQ135 */
function updateAirTextOnly(data){
  const airEl = document.getElementById("airValue");
  if(!airEl || !data) return;

  if(data.air !== undefined && data.air !== null && data.air !== ""){
    airEl.textContent = data.air;
  }else if(data.airScore !== undefined){
    const score = Number(data.airScore);
    if(score < 350) airEl.textContent = "Bun";
    else if(score < 700) airEl.textContent = "Mediu";
    else airEl.textContent = "Rau";
  }
}



/* FIX final: sus apare textul de calitate aer, nu procent/scor */
function updateGeneralAirText(data){
  const topAir = document.getElementById("airScore");
  const mq135Box = document.getElementById("airValue");
  const airStatus = document.getElementById("airStatus");

  if(!topAir || !data) return;

  let text = "";

  if(data.air !== undefined && data.air !== null && data.air !== ""){
    text = String(data.air);
  }else if(mq135Box && mq135Box.textContent.trim() !== ""){
    text = mq135Box.textContent.trim();
  }else if(data.airScore !== undefined){
    const score = Number(data.airScore);
    if(score < 350) text = "Bun";
    else if(score < 700) text = "Mediu";
    else text = "Rau";
  }

  if(text){
    topAir.textContent = text;
    

    const clean = text.toLowerCase();
    if(airStatus){
      if(clean.includes("bun")) airStatus.textContent = "Aerul este bun pentru monitorizare.";
      else if(clean.includes("mediu")) airStatus.textContent = "Aerul este la un nivel mediu.";
      else if(clean.includes("rau") || clean.includes("rău")) airStatus.textContent = "Aerul indică un nivel ridicat de poluare.";
      else airStatus.textContent = "Calitatea aerului este afișată pe baza senzorului MQ-135.";
    }
  }
}

document.addEventListener("DOMContentLoaded",()=>{

const menuBtn=document.querySelector(".mobile-menu-btn");
const navLinks=document.querySelector(".nav-links");

if(menuBtn&&navLinks){

menuBtn.addEventListener("click",(e)=>{
e.stopPropagation();
navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-btn").forEach(btn=>{
btn.addEventListener("click",()=>{
navLinks.classList.remove("active");
});
});

document.addEventListener("click",(e)=>{
if(!navLinks.contains(e.target)&&!menuBtn.contains(e.target)){
navLinks.classList.remove("active");
}
});

}

});


/* FINAL MOBILE MENU SHOW FIX */
document.addEventListener("DOMContentLoaded", function(){
  const menuBtn = document.querySelector(".mobile-menu-btn, .menu-btn, #menuBtn");
  const navLinks = document.querySelector(".nav-links, #navLinks");

  if(!menuBtn || !navLinks) return;

  function closeMenu(){
    navLinks.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.classList.remove("mobile-menu-open");
    menuBtn.textContent = "☰";
  }

  function toggleMenu(e){
    e.preventDefault();
    e.stopPropagation();

    const willOpen = !navLinks.classList.contains("active") && !navLinks.classList.contains("open");

    if(willOpen){
      navLinks.classList.add("active");
      navLinks.classList.add("open");
      document.body.classList.add("mobile-menu-open");
      menuBtn.textContent = "×";
    }else{
      closeMenu();
    }
  }

  menuBtn.addEventListener("click", toggleMenu);
  menuBtn.addEventListener("touchend", toggleMenu, {passive:false});

  navLinks.querySelectorAll("a, button, .nav-btn").forEach(function(item){
    item.addEventListener("click", function(){
      setTimeout(closeMenu, 80);
    });
  });

  document.addEventListener("click", function(e){
    if(window.innerWidth <= 900 && !navLinks.contains(e.target) && !menuBtn.contains(e.target)){
      closeMenu();
    }
  });

  window.addEventListener("resize", function(){
    if(window.innerWidth > 900) closeMenu();
  });
});


/* REAL MOBILE OVERLAY MENU FIX */
document.addEventListener("DOMContentLoaded", function(){
  const menuBtn = document.querySelector(".mobile-menu-btn, .menu-btn, #menuBtn");
  const overlay = document.getElementById("mobileMenuOverlay");

  if(!menuBtn || !overlay) return;

  function openMenu(){
    document.body.classList.add("mobile-menu-open");
    menuBtn.textContent = "×";
  }

  function closeMenu(){
    document.body.classList.remove("mobile-menu-open");
    menuBtn.textContent = "☰";
  }

  function toggleMenu(e){
    e.preventDefault();
    e.stopPropagation();
    if(document.body.classList.contains("mobile-menu-open")) closeMenu();
    else openMenu();
  }

  const cleanBtn = menuBtn.cloneNode(true);
  menuBtn.parentNode.replaceChild(cleanBtn, menuBtn);

  cleanBtn.addEventListener("click", toggleMenu);
  cleanBtn.addEventListener("touchend", toggleMenu, {passive:false});

  overlay.querySelectorAll(".mobile-overlay-link").forEach(function(btn){
    btn.addEventListener("click", function(){
      const target = btn.dataset.section;
      closeMenu();

      if(typeof showSection === "function"){
        showSection(target);
      }else{
        const navTarget = document.querySelector('[data-section="' + target + '"]');
        if(navTarget) navTarget.click();
      }
    });
  });

  document.addEventListener("click", function(e){
    if(window.innerWidth <= 900 && document.body.classList.contains("mobile-menu-open")){
      if(!overlay.contains(e.target) && !cleanBtn.contains(e.target)){
        closeMenu();
      }
    }
  });
});
