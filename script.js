(() => {
  'use strict';
  document.body.classList.add('js-enabled');
  const btn = document.getElementById('menuBtn');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) {
    const setMenu = (open) => {
      menu.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      btn.textContent = open ? 'Close' : 'Menu';
    };
    btn.addEventListener('click', () => setMenu(btn.getAttribute('aria-expanded') !== 'true'));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        btn.focus();
      }
    });
  }

  // Existing contact-click actions measure intent, not connected calls or
  // confirmed appointments. Primary/secondary status is configured in Google Ads.
  const hosts = ['www.bestgastroenterologistinagra.com', 'bestgastroenterologistinagra.com'];
  if (!hosts.includes(window.location.hostname)) return;
  if (window.__aglecContactTracking) return;
  window.__aglecContactTracking = true;
  const tagId = 'AW-622603961';
  const cleanLocation = new URL(window.location.origin + '/');
  const params = new URLSearchParams(window.location.search);
  ['gclid', 'gbraid', 'wbraid'].forEach(key => {
    const value = params.get(key);
    if (value) cleanLocation.searchParams.set(key, value);
  });
  let referrer = '';
  try { referrer = document.referrer ? new URL(document.referrer).origin + '/' : ''; } catch (_) { /* Invalid referrer. */ }
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', tagId, {
    page_location: cleanLocation.href,
    page_title: 'AGLEC clinic contact',
    page_referrer: referrer,
    allow_ad_personalization_signals: false
  });
  if (!document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + tagId;
    document.head.appendChild(tag);
  }
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    let sendTo;
    if (/^tel:\+91(?:9762772430|9927005959)$/i.test(href)) {
      sendTo = 'AW-622603961/WlN6CNiti4wdELnd8KgC';
    } else if (/^https:\/\/wa\.me\/919927005959(?:[/?#]|$)/i.test(href)) {
      sendTo = 'AW-622603961/TInxCNuti4wdELnd8KgC';
    }
    if (sendTo) window.gtag('event', 'conversion', {
      send_to: sendTo,
      page_location: cleanLocation.href,
      page_title: 'AGLEC clinic contact',
      page_referrer: referrer
    });
  });
})();
