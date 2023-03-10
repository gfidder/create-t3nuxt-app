<script setup lang="ts">
useHead({
  title: "Create T3 App",
  meta: [
    {
      name: "description",
      content: "Generated by create-t3-app",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
});

const { $client } = useNuxtApp();

const hello = await $client.example.hello.useQuery({ text: "from tRPC" });
</script>

<template>
  <main class="main">
    <div class="container">
      <h1 class="title">Create <span class="pinkSpan">T3</span> App</h1>
      <div class="cardRow">
        <NuxtLink
          class="card"
          href="https://create.t3.gg/en/usage/first-steps"
          target="_blank"
        >
          <h3 class="cardTitle">First Steps →</h3>
          <div class="cardText">
            Just the basics - Everything you need to know to set up your
            database and authentication.
          </div>
        </NuxtLink>
        <NuxtLink
          class="card"
          href="https://create.t3.gg/en/introduction"
          target="_blank"
        >
          <h3 class="cardTitle">Documentation →</h3>
          <div class="cardText">
            Learn more about Create T3 App, the libraries it uses, and how to
            deploy it.
          </div>
        </NuxtLink>
      </div>
      <p class="showcaseText">
        {{ hello.data ? hello.data.value?.greeting : "Loading tRPC query..." }}
      </p>
      <AuthShowcase />
    </div>
  </main>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #2e026d, #15162c);
}

.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 4rem 1rem;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}

.title {
  font-size: 3rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0;
  color: white;
}

@media (min-width: 640px) {
  .title {
    font-size: 5rem;
  }
}

.pinkSpan {
  color: hsl(280 100% 70%);
}

.cardRow {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
}

@media (min-width: 640px) {
  .cardRow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .cardRow {
    gap: 2rem;
  }
}

.card {
  max-width: 20rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  color: white;
  background-color: rgb(255 255 255 / 0.1);
}

.card:hover {
  background-color: rgb(255 255 255 / 0.2);
  transition: background-color 150ms cubic-bezier(0.5, 0, 0.2, 1);
}

.cardTitle {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  margin: 0;
}

.cardText {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.showcaseContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>

<style>
.showcaseText {
  color: white;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
}
</style>
