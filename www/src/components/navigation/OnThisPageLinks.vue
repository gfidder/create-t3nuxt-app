<script setup lang="ts">
import type { MarkdownHeading } from "astro";
import { ref, computed, watch } from "vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import clsx from "clsx";

const props = defineProps<{
  headings: MarkdownHeading[];
  title: string;
  isRtl: boolean;
}>();

const isLtr = !props.isRtl;

const memoedHeadings = computed(() => {
  // add isVisible flag in headers
  const headers = [
    { depth: 2, slug: "overview", text: props.title, isVisible: true },
    ...props.headings.map((h) => ({ ...h, isVisible: false })),
  ];

  return headers.filter(({ depth }) => depth > 1 && depth < 4);
});

const headingWithIsVisible = ref(memoedHeadings);

watch([props.headings, props.title], () => {
  const articleHeadings = Array.from(
    document.querySelectorAll("article :is(h1,h2,h3)"),
  );

  const allObservers = articleHeadings.map((h) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const tocItem = Array.from(
            document.querySelectorAll(`a[href="#${id}"]`),
          ).at(-1);
          // occurs when the id = "toc-heading"
          if (!tocItem) return;

          if (entry.isIntersecting) {
            const headings = headingWithIsVisible.value.map((h) => {
              h.slug === id
                ? { ...h, isVisible: true }
                : { ...h, isVisible: false };
            });
            headingWithIsVisible.effect = headings;
          }
        });
      },
      {
        rootMargin: "-100px 0% -66%",
        threshold: 1,
      },
    );

    observer.observe(h);

    return observer;
  });

  return () => {
    // unobserve elements
    articleHeadings.map((h, index) => {
      allObservers[index]?.unobserve(h);
    });
  };
});
</script>

<template>
  <div
    class="sticky inset-x-0 top-20 z-[11] block w-full bg-default px-4 pb-4 pt-2 lg:hidden"
  >
    <Menu v-slot="open">
      <div class="relative w-full">
        <div>
          <MenuButton
            class="text-md inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md border-2 bg-t3-purple-200/50 px-3 py-2 font-medium hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50"
          >
            On this page
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="{1.5}"
              stroke="currentColor"
              :class="clsx('h-3 w-3 sm:h-4 sm:w-4', isRtl && '-scale-x-100')"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                :d="
                  open
                    ? 'M19.5 8.25l-7.5 7.5-7.5-7.5'
                    : 'M8.25 4.5l7.5 7.5-7.5 7.5'
                "
              />
            </svg>
          </MenuButton>
        </div>
        <MenuItems
          dir="ltr"
          class="t3-scrollbar absolute top-full z-10 mt-3 max-h-[45vh] w-full overflow-y-auto rounded-md border-2 border-primary bg-default py-1.5 shadow-md dark:border-t3-purple-200/20 dark:bg-default"
        >
          <ul :dir="isLtr ? 'ltr' : 'rtl'">
            <li
              v-for="heading in headingWithIsVisible"
              :key="heading.slug"
              class="w-full"
            >
              <MenuItem v-slot="active">
                <a
                  :href="`#${heading.slug}`"
                  :class="
                    clsx(
                      'line-clamp-1 text-md block w-full py-2 text-t3-purple-800 transition-colors hover:bg-t3-purple-300/20 hover:text-t3-purple-400 dark:text-t3-purple-200 dark:hover:bg-t3-purple-300/10 dark:hover:text-t3-purple-50',
                      isLtr && heading.depth === 2 ? 'pl-3' : 'pl-8',
                      isRtl && heading.depth === 2 ? 'pr-3' : 'pr-8',
                      {
                        'bg-t3-purple-300/20 text-t3-purple-400 underline dark:bg-t3-purple-300/10 dark:text-t3-purple-100':
                          active,
                        'bg-t3-purple-300/30 font-medium text-t3-purple-700 underline dark:bg-t3-purple-300/20 dark:text-t3-purple-100':
                          heading.isVisible,
                      },
                    )
                  "
                  >{{ heading.text }}
                </a>
              </MenuItem>
            </li>
          </ul>
        </MenuItems>
      </div>
    </Menu>
  </div>
</template>
