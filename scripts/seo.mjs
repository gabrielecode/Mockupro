import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { tsImport } from "tsx/esm/api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const LANGS = [
  { code: "it", route: "/", locale: "it_IT" },
  { code: "en", route: "/en", locale: "en_US" },
  { code: "es", route: "/es", locale: "es_ES" },
  { code: "fr", route: "/fr", locale: "fr_FR" },
  { code: "de", route: "/de", locale: "de_DE" },
];

const rawSiteUrl = (
  process.env.SITE_URL ||
  process.env.APP_URL ||
  "https://mockupstudiopro.com"
).trim();
const siteUrl = rawSiteUrl.replace(/\/+$/, "");

const escapeHtml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeXml = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

async function run() {
  const indexHtmlPath = path.join(distDir, "index.html");
  if (!fs.existsSync(indexHtmlPath)) {
    throw new Error(`dist/index.html not found at ${indexHtmlPath}. Run vite build first.`);
  }

  const templateHtml = fs.readFileSync(indexHtmlPath, "utf8");

  const translationsModule = await tsImport("../src/translations.ts", import.meta.url);
  const translations = translationsModule.translations;

  const absoluteOgImage = `${siteUrl}/og-image.webp`;

  const alternateLinks = [
    ...LANGS.map(
      ({ code, route }) =>
        `    <link rel="alternate" hreflang="${code}" href="${escapeHtml(`${siteUrl}${route}`)}" />`
    ),
    `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(`${siteUrl}/`)}" />`,
  ].join("\n");

  for (const { code, route, locale } of LANGS) {
    const langDict = translations[code] || translations.it;
    const seoTitle = langDict.seoTitle || langDict.brandTitle || "MockupStudio Pro";
    const seoDescription = langDict.seoDescription || langDict.tagline || "";
    const canonicalUrl = `${siteUrl}${route}`;

    const escapedTitle = escapeHtml(seoTitle);
    const escapedDesc = escapeHtml(seoDescription);
    const escapedCanonical = escapeHtml(canonicalUrl);
    const escapedOgImage = escapeHtml(absoluteOgImage);

    let html = templateHtml;

    // Replace <html lang="...">
    html = html.replace(/<html\b[^>]*>/i, `<html lang="${code}">`);

    // Replace <title>...</title>
    if (/<title>[\s\S]*?<\/title>/i.test(html)) {
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapedTitle}</title>`);
    } else {
      html = html.replace(/<\/head>/i, `    <title>${escapedTitle}</title>\n  </head>`);
    }

    // Replace <meta name="description" ...>
    if (/<meta\s+[^>]*name=["']description["'][^>]*>/i.test(html)) {
      html = html.replace(
        /<meta\s+[^>]*name=["']description["'][^>]*>/i,
        `<meta name="description" content="${escapedDesc}" />`
      );
    } else {
      html = html.replace(
        /<\/head>/i,
        `    <meta name="description" content="${escapedDesc}" />\n  </head>`
      );
    }

    // Strip existing canonical, alternate, og:title/description/url/locale/image, twitter:*, and ld+json tags
    html = html
      .replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi, "")
      .replace(/<link\s+[^>]*rel=["']alternate["'][^>]*>\s*/gi, "")
      .replace(/<meta\s+[^>]*property=["']og:(?:title|description|url|locale|image)["'][^>]*>\s*/gi, "")
      .replace(/<meta\s+[^>]*name=["']twitter:(?:card|title|description|image)["'][^>]*>\s*/gi, "")
      .replace(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi, "");

    const faqEntities = [1, 2, 3, 4, 5]
      .map((n) => ({
        q: langDict[`faq${n}Q`],
        a: langDict[`faq${n}A`],
      }))
      .filter((item) => item.q && item.a)
      .map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "MockupStudio Pro",
          url: `${siteUrl}/`,
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "MockupStudio Pro",
          url: canonicalUrl,
          inLanguage: code,
          description: seoDescription,
          publisher: { "@id": `${siteUrl}/#organization` },
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${canonicalUrl}#software`,
          name: "MockupStudio Pro",
          url: canonicalUrl,
          inLanguage: code,
          description: seoDescription,
          applicationCategory: "DesignApplication",
          operatingSystem: "Web",
          image: absoluteOgImage,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "EUR",
          },
          publisher: { "@id": `${siteUrl}/#organization` },
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          inLanguage: code,
          mainEntity: faqEntities,
        },
      ],
    };

    const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

    const seoBlock = [
      `    <link rel="canonical" href="${escapedCanonical}" />`,
      alternateLinks,
      `    <meta property="og:title" content="${escapedTitle}" />`,
      `    <meta property="og:description" content="${escapedDesc}" />`,
      `    <meta property="og:url" content="${escapedCanonical}" />`,
      `    <meta property="og:locale" content="${locale}" />`,
      `    <meta property="og:image" content="${escapedOgImage}" />`,
      `    <meta name="twitter:card" content="summary_large_image" />`,
      `    <meta name="twitter:title" content="${escapedTitle}" />`,
      `    <meta name="twitter:description" content="${escapedDesc}" />`,
      `    <meta name="twitter:image" content="${escapedOgImage}" />`,
      `    <script type="application/ld+json">${safeJsonLd}</script>`,
    ].join("\n");

    html = html.replace(/<\/head>/i, `${seoBlock}\n  </head>`);

    const langOutDir = path.join(distDir, code);
    fs.mkdirSync(langOutDir, { recursive: true });
    fs.writeFileSync(path.join(langOutDir, "index.html"), html, "utf8");

    if (code === "it") {
      fs.writeFileSync(indexHtmlPath, html, "utf8");
    }
  }

  // Generate dist/sitemap.xml with xhtml:link hreflang for every URL
  const xhtmlLinks = [
    ...LANGS.map(
      ({ code, route }) =>
        `    <xhtml:link rel="alternate" hreflang="${code}" href="${escapeXml(`${siteUrl}${route}`)}" />`
    ),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${siteUrl}/`)}" />`,
  ].join("\n");

  const sitemapUrls = LANGS.map(
    ({ route }) =>
      `  <url>\n    <loc>${escapeXml(`${siteUrl}${route}`)}</loc>\n${xhtmlLinks}\n  </url>`
  ).join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8");

  // Generate dist/robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, "robots.txt"), robotsTxt, "utf8");

  console.log(`[seo] Generated localized HTML, sitemap.xml, and robots.txt for ${LANGS.length} languages (SITE_URL=${siteUrl})`);
}

run().catch((err) => {
  console.error("[seo] Failed:", err);
  process.exit(1);
});
