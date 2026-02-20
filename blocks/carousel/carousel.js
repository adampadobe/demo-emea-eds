import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Builds one slide DOM from a row (cells: image, title, cta text, cta link).
 * @param {Element} row Table row div
 * @returns {Element} Slide element
 */
function buildSlide(row) {
  const cells = [...row.children];
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';

  const picCell = cells[0];
  let pictureEl = null;
  if (picCell) {
    const pic = picCell.querySelector('picture') || picCell.querySelector('img');
    if (pic) {
      if (pic.tagName === 'IMG') {
        pictureEl = createOptimizedPicture(pic.src, pic.alt || '', true, [{ width: '1600' }, { width: '800' }]);
      } else {
        pictureEl = pic.cloneNode(true);
      }
    }
  }
  if (pictureEl) {
    const wrap = document.createElement('div');
    wrap.className = 'carousel-slide-image';
    wrap.appendChild(pictureEl);
    slide.appendChild(wrap);
  }

  const content = document.createElement('div');
  content.className = 'carousel-slide-content';
  const title = cells[1]?.textContent?.trim();
  if (title) {
    const h2 = document.createElement('h2');
    h2.textContent = title;
    content.appendChild(h2);
  }
  const ctaText = cells[2]?.textContent?.trim();
  const ctaLink = cells[3]?.querySelector('a')?.href || cells[3]?.textContent?.trim();
  if (ctaText && ctaLink) {
    const a = document.createElement('a');
    a.href = ctaLink;
    a.className = 'button';
    a.textContent = ctaText;
    content.appendChild(a);
  } else if (ctaText) {
    const span = document.createElement('span');
    span.className = 'carousel-slide-cta';
    span.textContent = ctaText;
    content.appendChild(span);
  }
  slide.appendChild(content);
  return slide;
}

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')].filter((row) => row.children.length > 0);
  if (rows.length === 0) return;

  const container = document.createElement('div');
  container.className = 'carousel-container';
  const track = document.createElement('div');
  track.className = 'carousel-track';
  rows.forEach((row) => track.appendChild(buildSlide(row)));
  container.appendChild(track);

  const prev = document.createElement('button');
  prev.type = 'button';
  prev.className = 'carousel-btn carousel-prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.innerHTML = '‹';
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'carousel-btn carousel-next';
  next.setAttribute('aria-label', 'Next slide');
  next.innerHTML = '›';

  const dots = document.createElement('div');
  dots.className = 'carousel-dots';
  rows.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.dataset.index = i;
    dots.appendChild(dot);
  });

  let index = 0;
  const slides = track.querySelectorAll('.carousel-slide');
  const total = slides.length;

  function goTo(i) {
    index = (i + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, j) => d.classList.toggle('active', j === index));
  }

  prev.addEventListener('click', () => goTo(index - 1));
  next.addEventListener('click', () => goTo(index + 1));
  dots.querySelectorAll('.carousel-dot').forEach((dot) => {
    dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
  });

  let autoplay = setInterval(() => goTo(index + 1), 6000);
  block.addEventListener('mouseenter', () => clearInterval(autoplay));
  block.addEventListener('mouseleave', () => { autoplay = setInterval(() => goTo(index + 1), 6000); });

  container.appendChild(prev);
  container.appendChild(next);
  container.appendChild(dots);
  block.textContent = '';
  block.appendChild(container);
  goTo(0);
}
