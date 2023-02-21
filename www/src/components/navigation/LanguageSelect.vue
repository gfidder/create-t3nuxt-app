<script setup lang="ts">
import { type KnownLanguageCode, KNOWN_LANGUAGES } from "../../config";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import clsx from "clsx";
import { getIsRtlFromLangCode } from "../../languages";

type LanguageSelectProps = {
  language: KnownLanguageCode;
};

const props = defineProps<LanguageSelectProps>();

const handleSelect = (code: string) => {
  const [_1, _2, ...slug] = window.location.pathname.split("/");
  window.location.pathname = `/${code}/${slug.join("/")}`;
};

const isRTL = getIsRtlFromLangCode(props.language);
</script>

<template>
  <div class="flex items-center gap-2">
    <Listbox
      :modelValue="language"
      @update:model-value="(value) => handleSelect(value)"
    >
      <div class="relative">
        <ListboxButton
          class="relative flex cursor-pointer items-center justify-center rounded-lg border bg-t3-purple-200/50 p-2 text-left focus:outline-none hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:hover:border-t3-purple-200/50 sm:text-sm"
        >
          <svg
            viewBox="0 0 88.6 77.3"
            className="h-6 w-6 text-slate-900 dark:text-t3-purple-100"
            role="img"
          >
            <path
              fill="currentColor"
              d="M61 24.6h7.9l18.7 51.6h-7.7l-5.4-15.5H54.3l-5.6 15.5h-7.2L61 24.6zM72.6 55l-8-22.8L56.3 55h16.3z"
            ></path>
            <path
              fill="currentColor"
              d="M53.6 60.6c-10-4-16-9-22-14 0 0 1.3 1.3 0 0-6 5-20 13-20 13l-4-6c8-5 10-6 19-13-2.1-1.9-12-13-13-19h8c4 9 10 14 10 14 10-8 10-19 10-19h8s-1 13-12 24c5 5 10 9 19 13l-3 7zm-52-44h56v-8h-23v-7h-9v7h-24v8z"
            ></path>
          </svg>
        </ListboxButton>
        <Transition
          enterActiveClass="transition ease-out duration-100"
          enterFromClass="transform opacity-0 -translate-y-1"
          enterToClass="transform opacity-100 -translate-y-0"
        >
          <ListboxOptions
            dir="ltr"
            :class="
              clsx(
                'focus-none shadow-l t3-scrollbar mt absolute right-0 max-h-60 w-fit overflow-auto rounded-lg border bg-default text-base focus:outline-none focus-visible:outline-none dark:border-t3-purple-200/20 sm:text-sm',
                isRTL && 'text-right',
              )
            "
          >
            <ListboxOption v-for="(name, code) in KNOWN_LANGUAGES" :key="code">
              <span>{{ name }}</span>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>
