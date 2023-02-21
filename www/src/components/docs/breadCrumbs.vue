<script setup lang="ts">
import { SIDEBAR, SIDEBAR_HEADER_MAP, type OuterHeaders } from "../../config";
import { getIsRtlFromLangCode, getLanguageFromURL } from "../../languages";
import breadCrumbsArrow from "./breadCrumbsArrow.vue";

type SlugType = "" | "usage" | "deployment";
type Entry = { text: string; link: string };

const lang = getLanguageFromURL(window.location.href);
const isRtl = getIsRtlFromLangCode(lang ?? "en");
const slugToEntryPath = (slug: SlugType) => {
  switch (slug) {
    case "":
      return "Create T3 Nuxt App";
    case "usage":
      return "Usage";
    case "deployment":
      return "Deployment";
  }
};

const slug =
  window.location.pathname.slice(1).split("/").length > 2
    ? window.location.pathname.slice(1).split("/")[1]
    : "" || "";

// TODO: find a way to use inference here to gain better typesafety
const actualEntries = SIDEBAR[lang][
  slugToEntryPath(slug === undefined || slug === "" ? "" : (slug as SlugType))
] as Entry[] | undefined;

const getPathNameFromLink = (link: string) => {
  return actualEntries?.find((entry) => entry.link === link)?.text;
};

const getHeaderName = (header: OuterHeaders) => {
  if (lang === "en") {
    return header;
  }
  return SIDEBAR_HEADER_MAP[lang][header];
};

const breadcrumbs = window.location.pathname
  .split("/")
  .slice(window.location.pathname.split("/").length > 3 ? -2 : -1)
  .map((crumb) => {
    const path = window.location.pathname
      .split("/")
      .slice(0, window.location.pathname.split("/").indexOf(crumb) + 1)
      .join("/");
    return {
      href: `${window.location.protocol}//${window.location.host}${path}`,
      key: crumb,
      text:
        getPathNameFromLink(path.slice(path.indexOf(lang))) ||
        getHeaderName(
          `${crumb[0]?.toUpperCase()}${crumb.slice(1)}` as OuterHeaders,
        ),
    };
  });
</script>

<template>
  <div class="mb-4 flex items-center gap-2 px-4 text-sm">
    <a
      href="/"
      class="rounded-lg border bg-t3-purple-200/50 p-1 hover:bg-t3-purple-200/75 hover:no-underline dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50"
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="m12 5.561l-7 5.6V19h5v-4h4v4h5v-7.358a1 1 0 0 0-.375-.781L12 5.561ZM12 3l7.874 6.3A3 3 0 0 1 21 11.641V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7.839A2 2 0 0 1 3.75 9.6L12 3Z"
        />
      </svg>
    </a>
    <breadCrumbsArrow :isRtl="isRtl" />
    <div
      v-for="(crumb, index) in breadcrumbs"
      :key="crumb.key"
      class="flex items-center gap-2"
    >
      <a
        :href="crumb.href"
        class="rounded-lg border bg-t3-purple-200/50 p-1 hover:bg-t3-purple-200/75 hover:no-underline dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50"
      >
        {{ crumb.text }}
      </a>
      <breadCrumbsArrow v-if="index < breadcrumbs.length - 1" :isRtl="isRtl" />
    </div>
  </div>
</template>
