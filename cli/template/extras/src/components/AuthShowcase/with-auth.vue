<script setup lang="ts">
const { getSession, signIn, signOut } = useSession();

const session = await getSession();
</script>

<template>
  <div class="authContainer">
    <p class="showcaseText">
      <span v-if="session">Logged in as {{ session.user?.name }}</span>
    </p>
    <button
      class="loginButton"
      @click="session ? () => void signOut() : () => void signIn()"
    >
      {{ session ? "Sign out" : "Sign in" }}
    </button>
  </div>
</template>

<style scoped>
.authContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.loginButton {
  border-radius: 9999px;
  background-color: rgb(255 255 255 / 0.1);
  padding: 0.75rem 2.5rem;
  font-weight: 600;
  color: white;
  text-decoration-line: none;
  transition: background-color 150ms cubic-bezier(0.5, 0, 0.2, 1);
}

.loginButton:hover {
  background-color: rgb(255 255 255 / 0.2);
}
</style>
