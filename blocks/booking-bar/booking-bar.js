/**
 * Booking bar block: Etihad-style strip with From, To, Date, Search.
 * Content: one row with 4 cells (labels or placeholders), optional second row for actual labels.
 * Or first row = From, To, Date, Button text.
 */
export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row || !row.children.length) return;

  const cells = [...row.children];
  const from = cells[0]?.textContent?.trim() || 'From';
  const to = cells[1]?.textContent?.trim() || 'To';
  const date = cells[2]?.textContent?.trim() || 'Date';
  const cta = cells[3]?.textContent?.trim() || 'Search';

  const bar = document.createElement('div');
  bar.className = 'booking-bar-inner';

  bar.innerHTML = `
    <div class="booking-bar-field">
      <label for="booking-from">${from}</label>
      <input type="text" id="booking-from" placeholder="City or airport" aria-label="${from}">
    </div>
    <div class="booking-bar-field">
      <label for="booking-to">${to}</label>
      <input type="text" id="booking-to" placeholder="City or airport" aria-label="${to}">
    </div>
    <div class="booking-bar-field">
      <label for="booking-date">${date}</label>
      <input type="text" id="booking-date" placeholder="Select date" aria-label="${date}">
    </div>
    <div class="booking-bar-actions">
      <button type="button" class="button">${cta}</button>
    </div>
  `;

  block.textContent = '';
  block.appendChild(bar);
}
