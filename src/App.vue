<template>
  <div class="flex justify-center w-auto">
    <div class="grid justify-items-center">
      <h1 class="text-3xl py-3 mt-4">ToDoリスト</h1>

      <div class="flex my-4">
        <input
          v-model="todoInput"
          class="border-solid border-2 rounded-md"
        />
        <button
          @click="addTodo"
          class="bg-indigo-500 hover:bg-cyan-600 rounded-md text-white py-2 px-4 mx-2"
        >
          追加
        </button>
      </div>

      <div
        v-for="todo in todos"
        key="id"
        class="p-3 m-2 bg-green-300 rounded-md min-w-full flex items-center justify-between"
      >
        <p :class="{ 'line-through	': todo.isCompleted }">{{ todo.title }}</p>
        <div>
          <button
            v-show="!todo.isCompleted"
            @click="toggleComplete(todo.id)"
            class="py-1 px-2 bg-yellow-600 mx-1 rounded-md text-white"
          >
            完了
          </button>
          <button
            v-show="todo.isCompleted"
            @click="toggleComplete(todo.id)"
            class="py-1 px-2 bg-yellow-600 mx-1 rounded-md text-white"
          >
            未完了
          </button>
          <button
            @click="deleteTodo(todo.id)"
            class="py-1 px-2 bg-red-500 mx-1 rounded-md text-white"
          >
            削除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const todoInput = ref('');

const todos = reactive([
  {
    id: 1,
    title: 'Task to do',
    isCompleted: true,
  },
  {
    id: 2,
    title: 'Task to do',
    isCompleted: false,
  },
]);

function deleteTodo(id) {
  todos.pop(id);
  console.log('delete');
}

function addTodo() {
  todos.push({
    id: todos.length + 1,
    title: todoInput.value,
    isCompleted: false,
  });
  todoInput.value = '';
  console.log('add');
}

function toggleComplete(id) {
  const index = todos.findIndex((todo) => todo.id === id);
  todos[index].isCompleted = !todos[index].isCompleted;
}
</script>
