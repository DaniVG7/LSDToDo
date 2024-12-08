<script setup>
import { ref } from "vue";
import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "HOME",
    items: [
      { label: "All Departments", icon: "pi pi-fw pi-home", to: "/all-departments" },
      { label: "Team", icon: "pi pi-fw pi-users", to: "/team" },
      { label: "Messages", icon: "pi pi-fw pi-comment", to: "/messages" },
      { label: "Calendar", icon: "pi pi-fw pi-calendar", to: "/calendar" },
      { label: "Reports", icon: "pi pi-fw pi-file", to: "/reports" },
    ],
  },
  {
    label: "Departments",  //Organization
    items: [
      {
        label: "Artist & bookings",
        icon: "pi pi-fw pi-microphone",
        to: "/artist-bookings",
      },
      {
        label: "Gastronomy",
        icon: "pi pi-fw pi-cart-plus",
        to: "/gastronomy",
      },
      {
        label: "Legal, security & control",
        icon: "pi pi-fw pi-shield",
        to: "/legal-security-control",
      },
      {
        label: "Marketing & sponsors",
        icon: "pi pi-fw pi-volume-up",
        to: "/marketing-sponsors",
        class: "rotated-icon",
      },
      {
        label: "Ticketing & pre-sale",
        icon: "pi pi-fw pi-ticket",
        to: "/ticketing-presale",
      },
      {
        label: "Stage & equipment",
        icon: "pi pi-fw pi-sliders-v",
        to: "/stage-equipment",
      }
    ]
  }
]);

</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style>
@media (max-width: 991px) {
  .layout-wrapper .layout-sidebar {
    width: 400px;
    z-index: 999999;
  }
}

@media (max-width: 500px) {
  .layout-wrapper .layout-sidebar {
    width: 90vw;
    z-index: 999999;
  }
}
</style>
