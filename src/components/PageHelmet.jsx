import { Helmet } from "react-helmet-async";

const SITE_NAME = "AgroBusiness";
const DEFAULT_DESC = "AgroBiznes məhsul kataloqu və səbət.";

/**
 * Per-page SEO: title, meta description, Open Graph, Twitter Card.
 */
export function PageHelmet({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogImage,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const url = typeof window !== "undefined" ? window.location.href : canonical || "";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
