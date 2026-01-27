/**
 * Shared analytics loader for static pages.
 * Injects all analytics scripts dynamically.
 * This eliminates ~10 lines of duplicated analytics code per page.
 */
(function() {
  // Ahrefs Analytics
  var ahrefs = document.createElement('script');
  ahrefs.src = 'https://analytics.ahrefs.com/analytics.js';
  ahrefs.setAttribute('data-key', 'tzmwcZBLeKn/W0PyHxxkkg');
  ahrefs.async = true;
  document.head.appendChild(ahrefs);

  // Umami Analytics
  var umami = document.createElement('script');
  umami.src = 'https://umami.cicex.cloud/script.js';
  umami.setAttribute('data-website-id', '044c6b09-defd-4ca9-bf7b-4037f89a1cda');
  umami.defer = true;
  document.head.appendChild(umami);

  // Google Analytics
  var gtag = document.createElement('script');
  gtag.src = 'https://www.googletagmanager.com/gtag/js?id=UA-123890722-1';
  gtag.async = true;
  document.head.appendChild(gtag);

  // Initialize Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtagFn() { dataLayer.push(arguments); }
  window.gtag = gtagFn;
  gtagFn('js', new Date());
  gtagFn('config', 'UA-123890722-1');
})();
