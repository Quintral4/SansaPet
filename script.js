// ============================================================
// SANSA PET SIMULATOR - GAME STATE & 8-BIT SPRITE LOGIC
// ============================================================
let hunger = 10;
let energy = 10;
let social = 10;

// Sansa's custom pixel art based on her real photo
function getSansaSVG(mood) {
  let tongue = (mood === 'eat' || mood === 'play' || mood === 'idle') ? 
    `<rect x="15" y="21" width="3" height="3" fill="#ff6b8b" rx="1"/>` : '';
  
  let eyeLeft = `<circle cx="12" cy="14" r="1.8" fill="#4a2511"/><circle cx="11.5" cy="13.5" r="0.6" fill="#fff"/>`;
  let eyeRight = `<circle cx="20" cy="14" r="1.8" fill="#4a2511"/><circle cx="19.5" cy="13.5" r="0.6" fill="#fff"/>`;
  let extraAcc = '';

  if (mood === 'sleep') {
    eyeLeft = `<path d="M 10 14 Q 12 16 14 14" stroke="#222" stroke-width="1.2" fill="none"/>`;
    eyeRight = `<path d="M 18 14 Q 20 16 22 14" stroke="#222" stroke-width="1.2" fill="none"/>`;
    tongue = '';
    extraAcc = `<text x="22" y="9" font-family="'VT323', monospace" font-size="8" fill="#ba68c8">z Z</text>`;
  } else if (mood === 'tired') {
    eyeLeft = `<text x="10" y="15" font-family="'VT323', monospace" font-size="7" fill="#222">x</text>`;
    eyeRight = `<text x="18" y="15" font-family="'VT323', monospace" font-size="7" fill="#222">x</text>`;
    extraAcc = `<circle cx="24" cy="11" r="1.5" fill="#4fc3f7"/>`;
  } else if (mood === 'play') {
    eyeLeft = `<path d="M 10 15 Q 12 12 14 15" stroke="#222" stroke-width="1.4" fill="none"/>`;
    eyeRight = `<path d="M 18 15 Q 20 12 22 15" stroke="#222" stroke-width="1.4" fill="none"/>`;
    extraAcc = `<text x="2" y="10" font-family="'VT323', monospace" font-size="8" fill="#ff4081">♪</text>
                <circle cx="5" cy="24" r="3" fill="#ffeb3b"/><path d="M 3 24 Q 5 22 7 24" stroke="#e65100" fill="none"/>`;
  } else if (mood === 'eat') {
    extraAcc = `<rect x="23" y="18" width="6" height="3" rx="1.5" fill="#bcaaa4"/><circle cx="23" cy="18" r="1.5" fill="#bcaaa4"/><circle cx="23" cy="21" r="1.5" fill="#bcaaa4"/><circle cx="29" cy="18" r="1.5" fill="#bcaaa4"/><circle cx="29" cy="21" r="1.5" fill="#bcaaa4"/>`;
  }

  let tailTransform = (mood === 'play') ? 'rotate(15 26 19)' : 'rotate(0 26 19)';

  return `
    <g transform="translate(0, 0)">
      <!-- Fluffy White Tail -->
      <g transform="${tailTransform}">
        <circle cx="26" cy="18" r="4.5" fill="#f5f5f5"/>
        <circle cx="28" cy="15" r="3.5" fill="#ffffff"/>
      </g>

      <!-- White Legs -->
      <rect x="11" y="24" width="3" height="6" fill="#f5f5f5" rx="1"/>
      <rect x="18" y="24" width="3" height="6" fill="#f5f5f5" rx="1"/>
      <ellipse cx="12" cy="30" rx="2" ry="1.2" fill="#e0e0e0"/>
      <ellipse cx="19" cy="30" rx="2" ry="1.2" fill="#e0e0e0"/>

      <!-- Body with Black Spot -->
      <ellipse cx="16" cy="22" rx="7" ry="5.5" fill="#f5f5f5"/>
      <path d="M 12 18 Q 18 17 19 22 Q 15 26 12 24 Z" fill="#263238"/>

      <!-- Black Droopy Ears -->
      <path d="M 8 9 C 4 10, 4 17, 7 19 C 9 17, 9 12, 9 9 Z" fill="#212121"/>
      <path d="M 24 9 C 28 10, 28 17, 25 19 C 23 17, 23 12, 23 9 Z" fill="#212121"/>

      <!-- Red Ribbons on Ears -->
      <polygon points="7,8 5,6 9,6" fill="#e53935"/>
      <polygon points="25,8 23,6 27,6" fill="#e53935"/>

      <!-- Head -->
      <ellipse cx="16" cy="13" rx="7.5" ry="6.5" fill="#263238"/>

      <!-- White Muzzle & Chest -->
      <path d="M 11 15 Q 16 12 21 15 Q 21 21 16 21 Q 11 21 11 15 Z" fill="#ffffff"/>

      <!-- Tan Eyebrows -->
      <ellipse cx="12" cy="10" rx="1.8" ry="0.9" fill="#d7a15c"/>
      <ellipse cx="20" cy="10" rx="1.8" ry="0.9" fill="#d7a15c"/>

      <!-- Pink Forehead Gem -->
      <polygon points="16,8.5 17,10 16,11.5 15,10" fill="#ff4081"/>

      <!-- Black Nose -->
      <ellipse cx="16" cy="16.5" rx="1.6" ry="1.1" fill="#111"/>

      <!-- Eyes -->
      ${eyeLeft}
      ${eyeRight}

      <!-- Mouth & Tongue -->
      <path d="M 14.5 18 Q 16 19.5 17.5 18" stroke="#111" stroke-width="0.9" fill="none"/>
      ${tongue}

      <!-- Extras -->
      ${extraAcc}
    </g>
  `;
}

// DOM References
const elHungerBar = document.getElementById('hunger-bar');
const elEnergyBar = document.getElementById('energy-bar');
const elSocialBar = document.getElementById('social-bar');

const elHungerNum = document.getElementById('hunger-num');
const elEnergyNum = document.getElementById('energy-num');
const elSocialNum = document.getElementById('social-num');

const elSystemMsg = document.getElementById('system-message');
const elAlertMsg = document.getElementById('alert-message');
const elStatusBadge = document.getElementById('status-badge');
const elSansaSvg = document.getElementById('sansa-svg');
const elSansaBox = document.getElementById('sansa-sprite');

// Animate sprite
function triggerSansaAnimation(mood) {
  elSansaSvg.innerHTML = getSansaSVG(mood);
  elSansaBox.classList.remove('sansa-bounce');
  void elSansaBox.offsetWidth;
  elSansaBox.classList.add('sansa-bounce');

  setTimeout(() => {
    if (energy <= 2) {
      elSansaSvg.innerHTML = getSansaSVG('tired');
    } else {
      elSansaSvg.innerHTML = getSansaSVG('idle');
    }
  }, 1400);
}

// Update UI
function renderUI(message) {
  elHungerNum.textContent = `${hunger}/10`;
  elEnergyNum.textContent = `${energy}/10`;
  elSocialNum.textContent = `${social}/10`;

  elHungerBar.style.width = `${hunger * 10}%`;
  elEnergyBar.style.width = `${energy * 10}%`;
  elSocialBar.style.width = `${social * 10}%`;

  elSystemMsg.textContent = message;

  const alerts = [];
  if (hunger <= 2) alerts.push("⚠️ Warning! Sansa is very hungry.");
  if (energy <= 2) alerts.push("⚠️ Warning! Sansa needs to sleep soon.");
  if (social <= 2) alerts.push("⚠️ Warning! Sansa is feeling lonely.");

  if (alerts.length > 0) {
    elAlertMsg.textContent = alerts.join(" | ");
    elStatusBadge.textContent = "STATUS: ALERT";
    elStatusBadge.style.color = "#e53935";
  } else {
    elAlertMsg.textContent = "";
    elStatusBadge.textContent = "STATUS: HAPPY";
    elStatusBadge.style.color = "#f57f17";
  }
}

// Action Handlers
function handlePlay() {
  if (energy < 2) {
    renderUI("Sansa is too tired to play right now!");
    triggerSansaAnimation('tired');
    return;
  }
  hunger = Math.max(0, hunger - 2);
  energy = Math.max(0, energy - 2);
  social = Math.min(10, social + 3);
  
  triggerSansaAnimation('play');
  renderUI("You played with Sansa! She's wagging her tail (+3 Social, -2 Hunger, -2 Energy).");
}

function handleEat() {
  if (hunger >= 10) {
    renderUI("Sansa is already full, she doesn't want more treats.");
    return;
  }
  hunger = Math.min(10, hunger + 3);
  energy = Math.max(0, energy - 1);

  triggerSansaAnimation('eat');
  renderUI("You gave Sansa a treat (+3 Hunger, -1 Energy).");
}

function handleSleep() {
  if (energy >= 10) {
    renderUI("Sansa is not sleepy at the moment.");
    return;
  }
  energy = 10;
  hunger = Math.max(0, hunger - 2);
  social = Math.max(0, social - 1);

  triggerSansaAnimation('sleep');
  renderUI("Sansa took a refreshing nap (Energy fully restored, -2 Hunger, -1 Social).");
}

function handleReset() {
  hunger = 10;
  energy = 10;
  social = 10;
  triggerSansaAnimation('idle');
  renderUI("Simulator reset to initial state!");
}

// Keyboard listeners
document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'p') handlePlay();
  if (key === 'e') handleEat();
  if (key === 's') handleSleep();
  if (key === 'r') handleReset();
});

// Init
elSansaSvg.innerHTML = getSansaSVG('idle');
renderUI("Welcome to Sansa Simulator!");