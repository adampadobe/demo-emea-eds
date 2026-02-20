/**
 * Promo banner: full-width strip. Content: one row = Image, Headline, CTA Text, CTA Link.
 */
import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row || !row.children.length) return;

  const cells = [...row.children];
  const pic = cells[0]?.querySelector('picture, img');
  const headline = cells[1]?.textContent?.trim();
  const ctaText = cells[2]?.textContent?.trim();
  const ctaLink = cells[3]?.querySelector('a')?.href || cells[3]?.textContent?.trim();

  const banner = document.createElement('div');
  banner.className = 'promo-banner-inner';

  if (pic) {
    const imgWrap = document.createElement('div');
    imgWrap.className = 'promo-banner-image';
    if (pic.tagName === 'IMG') {
      imgWrap.appendChild(createOptimizedPicture(pic.src, pic.alt || '', true, [{ width: '1600' }, { width: '800' }]));
    } else {
      imgWrap.appendChild(pic.cloneNode(true));
    }
    banner.appendChild(imgWrap);
  }

  const content = document.createElement('div');
  content.className = 'promo-banner-content';
  if (headline) {
    const h2 = document.createElement('h2');
    h2.textContent = headline;
    content.appendChild(h2);
  }
  if (ctaText && ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink;
    a.className = 'button';
    a.textContent = ctaText;
    content.appendChild(a);
  }
  banner.appendChild(content);

  block.textContent = '';
  block.appendChild(banner);
}
