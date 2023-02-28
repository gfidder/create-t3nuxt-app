<script setup lang="ts">
import { ref } from "vue";
import { ALGOLIA } from "../../config";
import "../../styles/algolia/style.css";
import docsearch from "@docsearch/js";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

import clsx from "clsx";

docsearch({
  container: "#docsearch",
  appId: "R2IYF7ETH7",
  apiKey: "599cec31baffa4868cae4e79f180729b",
  indexName: "docsearch",
});

defineProps<{
  isLanding: boolean;
}>();

const isOpen = ref(false);

function onOpen() {
  isOpen.value = true;
}

function onClose() {
  isOpen.value = true;
}
</script>

<template>
  <button
    type="button"
    @click="onOpen"
    :class="
      clsx(
        'flex w-full cursor-text items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-slate-800 transition-colors duration-300 dark:text-slate-100',
        {
          'hover:bg-t3-purple/20 border border-t3-purple-200/20 bg-t3-purple-200/10 duration-300 hover:border-t3-purple-200/50':
            isLanding,
          'dark:hover:bg-t3-purple/20 border bg-t3-purple-200/50 duration-300 hover:bg-t3-purple-200/75 dark:border-t3-purple-200/20 dark:bg-t3-purple-200/10 dark:text-slate-100 dark:hover:border-t3-purple-200/50':
            !isLanding,
        },
      )
    "
  >
    <div class="flex items-center justify-center gap-1 lg:gap-3">
      <svg className="h-6 w-6" fill="none">
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span>Search</span>
    </div>

    <span className="rounded-md border border-current px-1">
      <span className="sr-only">Press </span>
      <kbd>/</kbd>
      <span className="sr-only"> to search</span>
    </span>
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="onClose" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Payment successful
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your payment has been successfully submitted. We’ve sent you
                  an email with all of the details of your order.
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 hover:bg-blue-200"
                  @click="onClose"
                >
                  Got it, thanks!
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
