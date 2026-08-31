import { getMetadata } from '../../scripts/aem.js';

/**
 * Turns a URL path segment like "eds-training" into "Eds Training".
 * @param {string} segment
 * @returns {string}
 */
function toLabel(segment) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Builds a breadcrumb trail from the current page's URL path, e.g.
 * Home > Guides > Setup Library. The WKND version this is adapted from
 * (github.com/hlxsites/wknd/blob/main/blocks/breadcrumb) hardcodes a single
 * "Adventures" crumb; this walks the actual path instead, so it works on
 * any page.
 * @param {HTMLElement} block The breadcrumb block element
 */
export default function decorate(block) {
  const { pathname } = window.location;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) {
    // already on the home page: nothing meaningful to show
    block.remove();
    return;
  }

  const trail = [{ text: 'Home', link: '/' }];
  let path = '';
  segments.forEach((segment, i) => {
    path += `/${segment}`;
    const isLast = i === segments.length - 1;
    trail.push({
      text: isLast ? (getMetadata('og:title') || document.title || toLabel(segment)) : toLabel(segment),
      link: isLast ? null : path,
    });
  });

  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Breadcrumb');
  const ul = document.createElement('ul');
  nav.append(ul);

  trail.forEach((step) => {
    const li = document.createElement('li');
    ul.append(li);
    let wrap = li;
    if (step.link) {
      wrap = document.createElement('a');
      wrap.href = step.link;
      li.append(wrap);
    }
    const span = document.createElement('span');
    span.textContent = step.text;
    wrap.append(span);
  });

  block.replaceChildren(nav);
}
