// Lightweight analytics layer for Go Global Now
// Fires events to Google Analytics 4 + Meta Pixel.
// IDs come from /app/frontend/.env (REACT_APP_GA4_ID, REACT_APP_META_PIXEL_ID).
// If IDs are empty, calls are silently no-ops (safe to ship before IDs are configured).

const GA4_ID = process.env.REACT_APP_GA4_ID;
const META_PIXEL_ID = process.env.REACT_APP_META_PIXEL_ID;

let initialised = false;

export function initAnalytics() {
  if (initialised || typeof window === "undefined") return;
  initialised = true;

  // ----- Google Analytics 4 -----
  if (GA4_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_ID, { send_page_view: true });
  }

  // ----- Meta (Facebook) Pixel -----
  if (META_PIXEL_ID) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", META_PIXEL_ID);
    window.fbq("track", "PageView");
  }
}

// Fire a page view (call on route change)
export function trackPageView(path) {
  if (GA4_ID && window.gtag) window.gtag("event", "page_view", { page_path: path });
  if (META_PIXEL_ID && window.fbq) window.fbq("track", "PageView");
}

// Fire a generic event. `value` is optional revenue value in AUD.
export function trackEvent(name, params = {}) {
  // GA4
  if (GA4_ID && window.gtag) {
    window.gtag("event", name, params);
  }
  // Meta — map common conversion events to its standard names
  if (META_PIXEL_ID && window.fbq) {
    const metaMap = {
      inquiry_submit: "Lead",
      consultation_book: "Schedule",
      quiz_complete: "CompleteRegistration",
      whatsapp_click: "Contact",
      call_click: "Contact",
      chat_open: "Contact",
    };
    const metaName = metaMap[name];
    if (metaName) {
      window.fbq("track", metaName, params);
    } else {
      window.fbq("trackCustom", name, params);
    }
  }
}
