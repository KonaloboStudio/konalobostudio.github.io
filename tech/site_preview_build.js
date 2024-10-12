function addMetaTags() {
  const head = document.getElementsByTagName("head")[0];
  const descriptionMeta = document.createElement("meta");
  descriptionMeta.setAttribute("name", "description");
  descriptionMeta.setAttribute("content", "");
  head.appendChild(descriptionMeta);
  const twitterMetaTags = [
    { property: "og:url", content: "https://konalobostudio.github.io" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "KonaloboWorld!" },
    { property: "og:description", content: "" },
    {
      property: "og:image",
      content: "https://konalobostudio.github.io/tech/kswrldsiteprev.png",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "konalobostudio.github.io" },
    { property: "twitter:url", content: "https://konalobostudio.github.io" },
    { name: "twitter:title", content: "KonaloboWorld!" },
    { name: "twitter:description", content: "" },
    {
      name: "twitter:image",
      content: "https://konalobostudio.github.io/tech/kswrldsiteprev.png",
    },
  ];
  for (const meta of twitterMetaTags) {
    const twitterMeta = document.createElement("meta");
    if (meta.name) {
      twitterMeta.setAttribute("name", meta.name);
    } else {
      twitterMeta.setAttribute("property", meta.property);
    }
    twitterMeta.setAttribute("content", meta.content);
    head.appendChild(twitterMeta);
  }
}
addMetaTags();
