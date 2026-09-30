const btn=document.getElementById('menuBtn');const menu=document.getElementById('mobileMenu');if(btn&&menu){btn.addEventListener('click',()=>{const open=menu.classList.toggle('open');btn.setAttribute('aria-expanded',open);btn.textContent=open?'✕':'☰'});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='☰'}));}

// Count contact intent for this site. These are clicks, not confirmed appointments.
// Both Ads actions are secondary, so they do not change account-wide bidding.
document.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('a[href]');
  if (!link || typeof window.gtag !== 'function') return;

  const href = link.getAttribute('href') || '';
  let sendTo;
  if (href.startsWith('tel:')) {
    sendTo = 'AW-622603961/WlN6CNiti4wdELnd8KgC';
  } else if (/^https:\/\/wa\.me\/919927005959(?:[/?#]|$)/i.test(href)) {
    sendTo = 'AW-622603961/TInxCNuti4wdELnd8KgC';
  }
  if (sendTo) window.gtag('event', 'conversion', {send_to: sendTo});
});
