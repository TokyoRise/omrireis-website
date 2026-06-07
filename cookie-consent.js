/*!
 * Cookie consent for omrireis.com
 * Renders a small banner on first visit and remembers the choice in a
 * first-party cookie (or_cookie_consent) for 12 months. Declining halts
 * Google Analytics so no additional GA cookies are written.
 */
(function () {
  'use strict';

  var COOKIE_NAME = 'or_cookie_consent';
  var COOKIE_DAYS = 365;

  function readConsent() {
    var match = document.cookie.match(new RegExp('(?:^|;\\s*)' + COOKIE_NAME + '=([^;]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function writeConsent(value) {
    var d = new Date();
    d.setTime(d.getTime() + COOKIE_DAYS * 24 * 60 * 60 * 1000);
    document.cookie = COOKIE_NAME + '=' + encodeURIComponent(value) +
      '; expires=' + d.toUTCString() + '; path=/; SameSite=Lax';
  }

  function disableGA() {
    window['ga-disable-G-L5MY6YV2SE'] = true;
    try {
      document.cookie.split(';').forEach(function (c) {
        var name = c.split('=')[0].trim();
        if (name.indexOf('_ga') === 0) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + location.hostname;
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
      });
    } catch (e) {}
  }

  function buildBanner() {
    var bar = document.createElement('div');
    bar.className = 'cookie-banner';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.innerHTML =
      '<p class="cookie-banner__text">' +
        'This site uses cookies to measure traffic via Google Analytics. ' +
        'See our <a href="privacy.html">Privacy Policy</a> for details.' +
      '</p>' +
      '<div class="cookie-banner__buttons">' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--decline" data-consent="decline">Decline</button>' +
        '<button type="button" class="cookie-banner__btn cookie-banner__btn--accept" data-consent="accept">Accept</button>' +
      '</div>';
    document.body.appendChild(bar);

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      var choice = btn.getAttribute('data-consent');
      writeConsent(choice);
      if (choice === 'decline') disableGA();
      bar.remove();
    });
  }

  function init() {
    var consent = readConsent();
    if (consent === 'decline') {
      disableGA();
      return;
    }
    if (consent === 'accept') return;
    // No choice yet — show the banner
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', buildBanner);
    } else {
      buildBanner();
    }
  }

  init();
})();
