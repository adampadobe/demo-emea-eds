/**
 * Feature grid: each row = one feature. Columns: Icon/Image, Title, Description.
 * Optional link in description or 4th column.
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')].filter((row) => row.children.length > 0);
  const grid = document.createElement('div');
  grid.className = 'feature-grid-inner';

  rows.forEach((row) => {
    const cells = [...row.children];
    const card = document.createElement('div');
    card.className = 'feature-grid-card';

    const iconCell = cells[0];
    const title = cells[1]?.textContent?.trim();
    const desc = cells[2];
    const link = cells[3]?.querySelector('a');

    if (iconCell) {
      const pic = iconCell.querySelector('picture, img');
      if (pic) {
        const wrap = document.createElement('div');
        wrap.className = 'feature-grid-icon';
        if (pic.tagName === 'IMG') {
          wrap.appendChild(createOptimizedPicture(pic.src, pic.alt || '', false, [{ width: '200' }]));
        } else {
          wrap.appendChild(pic.cloneNode(true));
        }
        card.appendChild(wrap);
      }
    }

    const text = document.createElement('div');
    text.className = 'feature-grid-text';
    if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title;
      text.appendChild(h3);
    }
    if (desc) {
      const p = document.createElement('p');
      p.innerHTML = desc.innerHTML || desc.textContent || '';
      text.appendChild(p);
    }
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'button secondary';
      a.textContent = link.textContent?.trim() || 'Learn more';
      text.appendChild(a);
    }
    card.appendChild(text);
    grid.appendChild(card);
  });

  block.textContent = '';
  block.appendChild(grid);
}
