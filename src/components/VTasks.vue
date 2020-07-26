<template>
  <div class="flex flex-col">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <form class="mb-4" @submit.prevent="addTask">
        <input
          type="text"
          v-model="newTask.text"
          placeholder="New task"
          class="block w-full px-3 py-2 placeholder-gray-500 bg-white rounded shadow focus:outline-none"
        />
      </form>

      <div class="inline-block min-w-full shadow overflow-hidden sm:rounded-lg bg-white">
        <div
          class="px-6 py-4 border-b border-gray-200 flex item-center justify-between"
          v-for="todo in tasks"
          :key="todo.id"
        >
          <div class="font-medium text-gray-900">{{ todo.text }}</div>
          <button @click="remove(todo.id)">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" stroke="currentColor">
              <path
                fill="none"
                d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue';

export default {
  async setup() {
    const tasks = ref([]);
    const newTask = ref({});

    const addTask = async () => {
      if (newTask.value.text && newTask.value.text.length < 3) return;
      const { data } = await axios.post(`/api/tasks`, { data: newTask.value });
      tasks.value.push(data);
      newTask.value = {};
    }

    const remove = async (id) => {
      const data = await axios.delete(`/api/tasks/${id}`);
      tasks.value = tasks.value.filter(t => t.id !== id);
    }

    try {
      const { data } = await axios.get("/api/tasks");
      tasks.value = data;
    } catch (e) {
      console.error(e);
    }
    
    return {
      tasks,
      newTask,
      addTask,
      remove,
    }
    
  },
};
</script>