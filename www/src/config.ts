export const SITE = {
  title: "Create T3 Nuxt App",
  description: "The best way to start a full-stack, typesafe Nuxt app.",
  defaultLanguage: "en_US",
};

export const OPEN_GRAPH = {
  image: {
    src: "images/og-image.png",
    alt: "Create T3 Nuxt App: The best way to start a full-stack, typesafe Nuxt app.",
  },
  twitter: "t3dotgg",
};

// This is the type of the frontmatter you put in the docs markdown files.
export interface Frontmatter {
  title: string;
  description: string;
  layout: string;
  image?: { src: string; alt: string };
  dir?: "ltr" | "rtl";
  ogLocale?: string;
  lang?: KnownLanguageCode;
  isMdx?: boolean;
}

export const KNOWN_LANGUAGES = {
  // Add more languages here
  // sv: "Svenska",
  en: "English",
} as const;
export type KnownLanguageCode = keyof typeof KNOWN_LANGUAGES;

export const GITHUB_EDIT_URL = `https://github.com/gfidder/create-t3nuxt-app/tree/next/www`;

// export const COMMUNITY_INVITE_URL = `https://t3.gg/discord`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  // indexName: "create-t3-app",
  // appId: "0LE5592BV4",
  // apiKey: "892c4647b96fe1b3d0b7d8de1c5b5e40",
};

export type OuterHeaders = "Create T3 Nuxt App" | "Usage" | "Deployment";

export interface SidebarItem<
  TCode extends KnownLanguageCode = KnownLanguageCode,
> {
  text: string;
  link: `${TCode}/${string}`;
}

export type SidebarItemLink = SidebarItem["link"];

export type Sidebar = {
  [TCode in KnownLanguageCode]: {
    [THeader in OuterHeaders]?: SidebarItem<TCode>[];
  };
};
export const SIDEBAR: Sidebar = {
  // For Translations:
  // Keep the "outer headers" in English so we can match them.
  // Translate the "inner headers" to the language you're translating to.
  // Omit any files you haven't translated, they'll fallback to English.
  // Example:
  // sv: {
  //   "Create T3 App": [
  //     { text: "Introduktion", link: "sv/introduction" },
  //     { text: "Installation", link: "sv/installation" },
  //   ],
  //   Usage: [{ text: "Miljövariabler", link: "sv/usage/env-variables" }],
  // },
  en: {
    "Create T3 Nuxt App": [
      { text: "Introduction", link: "en/introduction" },
      { text: "Why CT3A?", link: "en/why" },
      { text: "Installation", link: "en/installation" },
      { text: "Folder Structure", link: "en/folder-structure" },
      { text: "FAQ", link: "en/faq" },
      { text: "T3 Collection", link: "en/t3-collection" },
      { text: "Other Recommendations", link: "en/other-recs" },
    ],
    Usage: [
      { text: "First Steps", link: "en/usage/first-steps" },
      { text: "Next.js", link: "en/usage/next-js" },
      { text: "TypeScript", link: "en/usage/typescript" },
      { text: "tRPC", link: "en/usage/trpc" },
      { text: "Prisma", link: "en/usage/prisma" },
      { text: "NextAuth.js", link: "en/usage/next-auth" },
      {
        text: "Environment Variables",
        link: "en/usage/env-variables",
      },
      { text: "Tailwind CSS", link: "en/usage/tailwind" },
    ],
    Deployment: [
      { text: "Vercel", link: "en/deployment/vercel" },
      { text: "Netlify", link: "en/deployment/netlify" },
      { text: "Docker", link: "en/deployment/docker" },
    ],
  },
};

export const SIDEBAR_HEADER_MAP: Record<
  Exclude<KnownLanguageCode, "en">,
  Record<OuterHeaders, string>
> = {
  // Translate the sidebar's "outer headers" here
  // sv: {
  //   "Create T3 App": "Create T3 App",
  //   Usage: "Användarguide",
  //   Deployment: "Deployment",
  // },
  pl: {
    "Create T3 App": "Create T3 App",
    Usage: "Korzystanie Z Narzędzia",
    Deployment: "Deployment",
  },
  ar: {
    "Create T3 App": "Create T3 App",
    Usage: "كيفية الإستخدام؟",
    Deployment: "نَشر تطبيقك",
  },
  fr: {
    "Create T3 App": "Create T3 App",
    Usage: "Utilisation",
    Deployment: "Déploiement",
  },
  pt: {
    "Create T3 App": "Create T3 App",
    Usage: "Uso",
    Deployment: "Deploy",
  },
  ru: {
    "Create T3 App": "Create T3 App",
    Usage: "Использование",
    Deployment: "Развертывание",
  },
  no: {
    "Create T3 App": "Create T3 App",
    Usage: "Bruk",
    Deployment: "Utrulling",
  },
  "zh-hans": {
    "Create T3 App": "Create T3 App",
    Usage: "用法",
    Deployment: "部署",
  },
};
