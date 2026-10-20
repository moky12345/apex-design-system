/**
 * APEX UI - DESIGN SYSTEM INTERACTIVITY ENGINE
 * Author: Karl Andre Gutierrez
 */

let demoStepperCount = 1;
let currentRating = 5;

document.addEventListener('DOMContentLoaded', () => {
  renderStarRating(currentRating);
});

/* -------------------------------------------------------------
   COLOR & CODE COPY
   ------------------------------------------------------------- */
function copyHex(hex, name) {
  navigator.clipboard.writeText(hex).then(() => {
    triggerDemoToast(`Copied ${name} (${hex}) to clipboard!`);
  }).catch(() => {
    prompt('Copy color token:', hex);
  });
}

function copyCode(className) {
  navigator.clipboard.writeText(className).then(() => {
    triggerDemoToast(`Copied "${className}" to clipboard!`);
  });
}

/* -------------------------------------------------------------
   STEPPER INTERACTION
   ------------------------------------------------------------- */
function adjustDemoStepper(delta) {
  demoStepperCount = Math.max(1, Math.min(99, demoStepperCount + delta));
  document.getElementById('demoStepperVal').textContent = demoStepperCount;
}

/* -------------------------------------------------------------
   STAR RATING INTERACTION
   ------------------------------------------------------------- */
function renderStarRating(score) {
  currentRating = score;
  const container = document.getElementById('demoStarContainer');
  const label = document.getElementById('demoRatingLabel');
  
  if (!container) return;

  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    const isFilled = i <= score;
    starsHtml += `
      <span onclick="renderStarRating(${i})" style="cursor: pointer; font-size: 24px; color: ${isFilled ? '#F59E0B' : '#CBD5E1'}; transition: transform 0.15s ease;" onmouseenter="this.style.transform='scale(1.2)'" onmouseleave="this.style.transform='scale(1)'">
        ★
      </span>
    `;
  }

  container.innerHTML = starsHtml;
  if (label) {
    label.textContent = `${score}.0 / 5.0 Rating Selected`;
  }
}

/* -------------------------------------------------------------
   TOAST SYSTEM
   ------------------------------------------------------------- */
function triggerDemoToast(message) {
  const existing = document.getElementById('apexToastDynamic');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'apexToastDynamic';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.background = '#0F172A';
  toast.style.color = '#FFFFFF';
  toast.style.padding = '12px 22px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
  toast.style.fontSize = '13.5px';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '9999';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.style.animation = 'slideToast 0.3s ease';

  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}
