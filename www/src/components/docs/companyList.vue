<script setup lang="ts">
interface Company {
  name: string;
  link: string;
  linkName: string;
}

const companies: Company[] = [
  {
    name: "Ping.gg",
    linkName: "ping.gg",
    link: "https://ping.gg",
  },
  {
    name: "Nexiona",
    linkName: "nexiona.com",
    link: "https://nexiona.com",
  },
  {
    name: "Layer3",
    linkName: "layer3.xyz",
    link: "https://layer3.xyz",
  },
];

interface Props {
  companyIntl: string;
  linkIntl: string;
}

const props = withDefaults(defineProps<Props>(), {
  companyIntl: "Description",
  linkIntl: "Link",
});
</script>

<template>
  <table>
    <tr>
      <th>{{ props.companyIntl }}</th>
      <th>{{ props.linkIntl }}</th>
    </tr>
    <tr v-for="company in companies">
      <td>{{ company.name }}</td>
      <td>
        <a :href="company.link">{{ company.linkName }}</a>
      </td>
    </tr>
  </table>
</template>
