<script setup lang="ts">
const { data: sessionData, signIn, signOut } = useSession();
const { $client } = useNuxtApp();

const { data: secretMessage } = $client.example.getSecretMessage.useQuery();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <p class="text-center text-2xl text-white">
      <span v-if="sessionData">Logged in as {{ sessionData.user?.name }}</span>
      <span v-if="secretMessage"> - {{ secretMessage }}</span>
    </p>
    <button
      class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      @click="sessionData ? () => void signOut() : () => void signIn()"
    >
      {{ sessionData ? "Sign out" : "Sign in" }}
    </button>
  </div>
</template>
