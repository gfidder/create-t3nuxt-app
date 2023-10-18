<script setup lang="ts">
const { data: sessionData, status, signIn, signOut } = useAuth();
const { $client } = useNuxtApp();

const { data: secretMessage } =
  await $client.example.getSecretMessage.useQuery();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <p class="text-center text-2xl text-white">
      <span v-if="status === 'authenticated'"
        >Logged in as {{ sessionData?.user?.name }}</span
      >
      <span v-if="secretMessage"> - {{ secretMessage }}</span>
    </p>
    <button
      class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      @click="status === 'authenticated' ? signOut() : signIn()"
    >
      {{ status === "authenticated" ? "Sign out" : "Sign in" }}
    </button>
  </div>
</template>
