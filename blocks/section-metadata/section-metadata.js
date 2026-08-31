import { readBlockConfig, toClassName } from '../../scripts/aem.js';

export default function decorate(block) {
  const section = block.closest('.section');
  if (section) {
    const config = readBlockConfig(block);
    Object.keys(config).forEach((key) => {
      if (key === 'style') {
        // one or more comma-separated style names become classes on the
        // section, e.g. "light" matches the .section.light rule in styles.css
        String(config.style)
          .split(',')
          .map((style) => toClassName(style.trim()))
          .filter(Boolean)
          .forEach((style) => section.classList.add(style));
      } else {
        section.dataset[key] = config[key];
      }
    });
  }
  // drop the metadata block (and its wrapper) once applied: it's not content
  block.parentElement.remove();
}
