const readButton = document.querySelector('#read-letter');
const letterRest = document.querySelector('#letter-rest');
readButton.addEventListener('click', () => {
  const isOpen = readButton.getAttribute('aria-expanded') === 'true';
  readButton.setAttribute('aria-expanded', String(!isOpen));
  letterRest.hidden = isOpen;
  readButton.textContent = isOpen ? 'Читать дальше ↓' : 'Свернуть письмо ↑';
});
const dialog = document.querySelector('#photo-dialog');
document.querySelectorAll('.memory').forEach(button => {
  button.addEventListener('click', () => {
    const source = button.querySelector('img');
    const photo = document.querySelector('#dialog-image');
    photo.src = source.src;
    photo.alt = source.alt;
    document.querySelector('#dialog-caption').textContent = button.querySelector('span').firstChild.textContent.trim();
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
document.querySelector('#hug-button').addEventListener('click', event => {
  event.currentTarget.textContent = 'Обнимаю крепко ♥';
  document.querySelector('#hug-response').textContent = 'Пусть тебе сейчас станет чуточку теплее. ♡';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♡', '♥', '✧'][i % 3];
    heart.setAttribute('aria-hidden', 'true');
    heart.style.setProperty('--x', `${Math.random() * 90 + 5}vw`);
    heart.style.setProperty('--delay', `${Math.random() * 0.6}s`);
    document.body.append(heart);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
  }
});
