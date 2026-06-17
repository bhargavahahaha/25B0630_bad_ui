// =============================================
// EXAMPLE: Creatively Bad Battery Indicator
// "BatteryBuddy" anti-patterns demonstrated:
// - 3-phase clearance process just to view a percentage
// - A reaction-time mini-game gatekeeping basic info
// - Reading is NOT live; must be manually "requested" with a fake scan delay
// - Backwards color logic (red = full charge, green = empty)
// - Drain/Charge buttons change the REAL value instantly,
//   but the big display only updates after you hit "Refresh"
// - Color thresholds and commentary thresholds don't line up,
//   because consistency is overrated
// =============================================

let actualCharge = Math.floor(Math.random() * 41) + 40; // starts between 40-80
let displayedCharge = null;
let securityClicks = 0;
let securityFirstClickTime = null;

function nextStep(fromStep) {
  document.getElementById(`step${fromStep}`).classList.add('hidden');
  const next = document.getElementById(`step${fromStep + 1}`);
  if (next) {
    next.classList.remove('hidden');
  }

  // Reveal the "secret" debug number only once clearance is fully granted
  if (fromStep === 2) {
    document.getElementById('actualDebug').textContent = actualCharge;
  }
}

function cancelFlow() {
  // Anti-pattern: "Cancel" demands a confirmation that contradicts itself
  const confirmed = window.confirm(
    'Are you sure you want to abort?\n\nYour battery curiosity will remain unresolved.\n\nThis decision is final (until you click OK on this dialog).'
  );
  if (confirmed) {
    restartFlow();
  }
}

function registerClick() {
  const now = Date.now();

  // Start the timer on the very first click
  if (securityClicks === 0) {
    securityFirstClickTime = now;
  }

  securityClicks++;
  document.getElementById('clickCount').textContent = securityClicks;

  const msg = document.getElementById('securityMsg');

  // Too slow? The whole mini-game resets, no mercy.
  if (now - securityFirstClickTime > 3000) {
    securityClicks = 0;
    securityFirstClickTime = null;
    document.getElementById('clickCount').textContent = '0';
    msg.textContent = '⏰ Too slow. The clearance window has closed. Try again.';
    return;
  }

  if (securityClicks >= 5) {
    msg.textContent = '✅ Worthiness confirmed. Proceeding...';
    setTimeout(() => nextStep(2), 500);
  } else {
    msg.textContent = 'Keep clicking! Time is running out!';
  }
}

function refreshReading() {
  const status = document.getElementById('scanStatus');
  status.textContent = '🔍 Scanning electron flow... please remain still...';

  // Anti-pattern: a totally unnecessary fake delay before showing a number
  setTimeout(() => {
    // Anti-pattern: 20% chance the reading is just nonsense
    const rng = Math.random();
    let reading;

    if (rng < 0.1) {
      reading = -7;
    } else if (rng < 0.2) {
      reading = 999;
    } else {
      reading = actualCharge;
    }

    displayedCharge = reading;
    status.textContent = '✅ Reading complete.';
    renderBattery(reading);
  }, 1800);
}

function renderBattery(value) {
  const fill = document.getElementById('batteryFill');
  const percentText = document.getElementById('batteryPercent');
  const commentary = document.getElementById('commentary');

  const clampedWidth = Math.max(0, Math.min(100, value));
  fill.style.width = clampedWidth + '%';
  percentText.textContent = value + '%';

  // Anti-pattern: backwards color logic.
  // High charge looks alarming, low charge looks calm and safe.
  if (value > 60) {
    fill.style.background = '#e74c3c'; // red, even though battery is healthy
  } else if (value > 30) {
    fill.style.background = '#f1c40f'; // yellow
  } else {
    fill.style.background = '#2ecc71'; // green, even though battery is nearly dead
  }

  commentary.textContent = getCommentary(value);
}

function getCommentary(value) {
  if (value < 0) {
    return "Negative battery detected. Physics has left the chat. Please panic accordingly.";
  }
  if (value > 100) {
    return "Your battery has transcended its container. We don't know what this means either.";
  }
  if (value > 80) {
    return "Suspiciously full. Are you sure you deserve this much power?";
  }
  if (value > 50) {
    return "A respectable amount of battery. We're cautiously proud of you.";
  }
  if (value > 20) {
    return "Getting low. Might want to start saying your goodbyes to your apps.";
  }
  return "Critically low. This is fine. Everything is fine.";
}

function drainBattery() {
  const drainAmount = Math.floor(Math.random() * 21) + 5; // 5-25
  actualCharge = Math.max(0, actualCharge - drainAmount);
  document.getElementById('actualDebug').textContent = actualCharge;

  // Note: the big display does NOT update here. On purpose.
  alert(`You used your device. -${drainAmount}% battery, -100% peace of mind.\n\n(Your displayed reading above is now outdated. Hit "Refresh" to find out the bad news.)`);
}

function chargeBattery() {
  actualCharge = Math.min(100, actualCharge + 1);
  document.getElementById('actualDebug').textContent = actualCharge;

  const waitTimes = [
    "approximately 6 hours",
    "until next Tuesday",
    "the heat death of the universe",
    "47 minutes (we made this number up)",
    "an amount of time best measured in regret"
  ];
  const pick = waitTimes[Math.floor(Math.random() * waitTimes.length)];

  alert(`Charging... +1%.\n\nEstimated time to full charge: ${pick}.\n\n(Your displayed reading is now outdated. Hit "Refresh" to see it.)`);
}

function optimizeBattery() {
  const btn = document.getElementById('optimizeBtn');
  btn.disabled = true;

  let dots = 0;
  const status = document.getElementById('scanStatus');
  const interval = setInterval(() => {
    dots = (dots + 1) % 4;
    status.textContent = '✨ Optimizing battery health' + '.'.repeat(dots);
  }, 400);

  setTimeout(() => {
    clearInterval(interval);
    status.textContent = '';
    btn.disabled = false;
    alert('Optimization complete!\n\nYour battery health is exactly the same as before.\nBut you waited 4 whole seconds, so surely something improved.');
  }, 4000);
}

function restartFlow() {
  ['step1', 'step2', 'step3'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById('step1').classList.remove('hidden');

  securityClicks = 0;
  securityFirstClickTime = null;
  document.getElementById('clickCount').textContent = '0';
  document.getElementById('securityMsg').textContent = '';

  displayedCharge = null;
  document.getElementById('batteryFill').style.width = '0%';
  document.getElementById('batteryPercent').textContent = '??%';
  document.getElementById('commentary').textContent = '> No reading taken yet. Existential uncertainty persists.';
  document.getElementById('scanStatus').textContent = '';
}