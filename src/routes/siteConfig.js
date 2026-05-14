const express = require("express");
const path = require("path");
const fs = require("fs");
const SiteConfig = require("../models/SiteConfig");
const auth = require("../middleware/auth");

const router = express.Router();

// Path to the frontend index.html (adjust if build output differs)
const INDEX_HTML = path.join(__dirname, "../../../Bikes2/index.html");

function buildPixelScripts(pixels = {}) {
  let scripts = "";

  if (pixels.meta) {
    scripts += `
  <!-- Meta Pixel -->
  <script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${pixels.meta}');
  fbq('track', 'PageView');
  </script>
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${pixels.meta}&ev=PageView&noscript=1"/></noscript>
  <!-- End Meta Pixel -->`;
  }

  if (pixels.tiktok) {
    scripts += `
  <!-- TikTok Pixel -->
  <script>
  !function (w, d, t) {
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load('${pixels.tiktok}');
    ttq.page();
  }(window, document, 'ttq');
  </script>
  <!-- End TikTok Pixel -->`;
  }

  if (pixels.snapchat) {
    scripts += `
  <!-- Snapchat Pixel -->
  <script>
  (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function(){a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};a.queue=[];var s='script';r=t.createElement(s);r.async=!0;r.src=n;var u=t.getElementsByTagName(s)[0];u.parentNode.insertBefore(r,u);})(window,document,'https://sc-static.net/scevent.min.js');
  snaptr('init', '${pixels.snapchat}', {});
  snaptr('track', 'PAGE_VIEW');
  </script>
  <!-- End Snapchat Pixel -->`;
  }

  if (pixels.google) {
    scripts += `
  <!-- Google Tag -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${pixels.google}"></script>
  <script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${pixels.google}');
  </script>
  <!-- End Google Tag -->`;
  }

  if (pixels.twitter) {
    scripts += `
  <!-- Twitter Pixel -->
  <script>
  !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
  twq('config','${pixels.twitter}');
  </script>
  <!-- End Twitter Pixel -->`;
  }

  return scripts;
}

function injectPixelsIntoHtml(pixels) {
  if (!fs.existsSync(INDEX_HTML)) return;
  let html = fs.readFileSync(INDEX_HTML, "utf-8");

  // Remove any previously injected pixel block
  html = html.replace(
    /\s*<!-- PIXELS:START -->[\s\S]*?<!-- PIXELS:END -->/g,
    "",
  );

  const scripts = buildPixelScripts(pixels);
  if (scripts) {
    html = html.replace(
      "</head>",
      `\n  <!-- PIXELS:START -->${scripts}\n  <!-- PIXELS:END -->\n</head>`,
    );
  }

  fs.writeFileSync(INDEX_HTML, html, "utf-8");
}

async function getConfig() {
  let config = await SiteConfig.findOne();
  if (!config) config = await SiteConfig.create({});
  return config;
}

// GET /api/config  — public (landing page fetches this)
router.get("/", async (_req, res) => {
  try {
    res.json(await getConfig());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/config  — admin only
router.put("/", auth, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig({});
    Object.assign(config, req.body);
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/config/section  — partial update (colors, seo, pixels, hero, footer, etc.)
router.patch("/:section", auth, async (req, res) => {
  const { section } = req.params;
  const allowed = [
    "colors",
    "seo",
    "pixels",
    "hero",
    "footer",
    "navLinks",
    "announcements",
  ];
  if (!allowed.includes(section))
    return res.status(400).json({ message: "Invalid section" });
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig({});
    config[section] = req.body;
    config.markModified(section);
    await config.save();

    // Auto-inject pixel scripts into index.html when pixels are updated
    if (section === "pixels") {
      try {
        injectPixelsIntoHtml(req.body);
      } catch (e) {
        console.warn(
          "⚠️  Could not auto-inject pixels into index.html:",
          e.message,
        );
      }
    }

    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

async function getConfig() {
  let config = await SiteConfig.findOne();
  if (!config) config = await SiteConfig.create({});
  return config;
}

// GET /api/config  — public (landing page fetches this)
router.get("/", async (_req, res) => {
  try {
    res.json(await getConfig());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/config  — admin only
router.put("/", auth, async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig({});
    Object.assign(config, req.body);
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/config/section  — partial update (colors, seo, pixels, hero, footer, etc.)
router.patch("/:section", auth, async (req, res) => {
  const { section } = req.params;
  const allowed = [
    "colors",
    "seo",
    "pixels",
    "hero",
    "footer",
    "navLinks",
    "announcements",
  ];
  if (!allowed.includes(section))
    return res.status(400).json({ message: "Invalid section" });
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig({});
    config[section] = req.body;
    config.markModified(section);
    await config.save();
    res.json(config);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
