<script setup>
import AddForm from "@/components/AddForm.vue";
import FavoritesList from "../components/FavoritesList.vue";
</script>

<template>
  <div
    class="mx-auto p-4 min-h-screen flex flex-col"  >
    <AddForm />
    <FavoritesList />
  </div>
</template>

<style scoped>
div{
  background-color:#FFFBF5;
}
</style>
