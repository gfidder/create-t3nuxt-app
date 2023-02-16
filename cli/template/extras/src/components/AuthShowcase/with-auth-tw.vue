<script setup lang="ts">
const { getSession, signIn, signOut } = useSession();

const session = await getSession();
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 bg-slate-800">
    <p class="text-center text-2xl text-white">
      <span v-if="session">Logged in as {{ session.user?.name }}</span>
    </p>
    <button
      class="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
      @click="session ? () => void signOut() : () => void signIn()"
    >
      {{ session ? "Sign out" : "Sign in" }}
    </button>
  </div>
</template>
