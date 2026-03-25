const revealElements = document.querySelectorAll('.reveal');
const copyButton = document.querySelector('#copy-citation');
const citationText = document.querySelector('#citation-text');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

if (copyButton && citationText) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(citationText.textContent.trim());
      const originalLabel = copyButton.textContent;
      copyButton.textContent = 'Copied';
      window.setTimeout(() => {
        copyButton.textContent = originalLabel;
      }, 1600);
    } catch {
      copyButton.textContent = 'Copy failed';
      window.setTimeout(() => {
        copyButton.textContent = 'Copy BibTeX';
      }, 1600);
    }
  });
}