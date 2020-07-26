<template>
  <v-header />
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

   <header class="pb-8">
     <button
      @click="changeTab('tasks')"
      :class="['header-btn', {'border-gray-700': isTasksActive}]"
      >Tasks</button>
     <button
     @click="changeTab('about')"
     :class="['header-btn', {'border-gray-700': !isTasksActive}]"
     >About</button>
   </header>

    <suspense v-if="isTasksActive">
      <template #default>
        <v-tasks />
      </template>
      <template #fallback>Loading Tasks...</template>
    </suspense>
    <v-about v-else />
  </div>
</template>

<script>
import VTasks from "./components/VTasks.vue";
import VHeader from "./components/VHeader.vue";
import VAbout from "./components/VAbout.vue";
import { ref, computed } from 'vue';

export default {
  name: "App",
  components: {
    VTasks,
    VHeader,
    VAbout,
  },
  setup() {
    let activeTab = ref('tasks');
    const isTasksActive = computed(() => activeTab.value === 'tasks');
    
    function changeTab(tab) {
      activeTab.value = tab;
    }

    return {
      activeTab,
      isTasksActive,
      changeTab,
    }
  }
};
</script>

<style lang="scss" scoped>
.header-btn {
  // Apply tailwind styles
  @apply pb-1 mr-4 border-b-2 outline-none;
}
</style>
