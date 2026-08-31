import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  // authors may omit the optional background color row, so identify
  // cells by content rather than fixed position: first cell with a
  // picture is the image, first remaining text cell is the title,
  // any further text cell is the background color
  let imageCell;
  let titleCell;
  let colorCell;

  rows.forEach((row) => {
    const cell = row.firstElementChild;
    if (!cell) return;
    if (cell.querySelector('picture')) {
      imageCell = cell;
    } else if (!titleCell) {
      titleCell = cell;
    } else if (!colorCell) {
      colorCell = cell;
    }
  });

  if (imageCell) {
    imageCell.className = 'banner-image';
    const img = imageCell.querySelector('img');
    if (img) {
      img.closest('picture').replaceWith(
        createOptimizedPicture(img.src, img.alt, true, [{ width: '1200' }]),
      );
    }
  }

  if (titleCell) {
    titleCell.className = 'banner-title';
    if (!titleCell.querySelector('h1, h2, h3, h4, h5, h6')) {
      // the doc-to-html pipeline wraps loose text in a <p>; unwrap it
      // so the heading doesn't end up with a <p> as its only child
      const wrapper = titleCell.querySelector(':scope > p');
      const heading = document.createElement('h2');
      heading.append(...(wrapper || titleCell).childNodes);
      if (wrapper) wrapper.replaceWith(heading);
      else titleCell.append(heading);
    }
  }

  // background color is metadata, not visible content: read it, then
  // drop the row and fall back to the default blue set in banner.css
  const color = colorCell?.textContent.trim();
  colorCell?.parentElement.remove();
  if (color) block.style.setProperty('--banner-background-color', color);
}
