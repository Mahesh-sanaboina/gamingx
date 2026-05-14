export const initGtag = (measurementId) => {
  if (!measurementId || typeof window === 'undefined') return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
};

export const trackPageView = (path) => {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
};

export const trackEvent = (action, params = {}) => {
  if (!window.gtag) return;
  window.gtag('event', action, params);
};
