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
import { ref, onMounted } from 'vue';
import { db } from './plugins/firebase.js';
import {
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

const todosCollection = collection(db, 'todos');
const todosQuery = query(todosCollection, orderBy('date', 'desc'));

const todoInput = ref('');
const todos = ref();

onMounted(() => {
  onSnapshot(todosQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        title: doc.data().title,
        isCompleted: doc.data().isCompleted,
        date: doc.data().date,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

function deleteTodo(id) {
  deleteDoc(doc(todosCollection, id));
}

function addTodo() {
  addDoc(todosCollection, {
    title: todoInput.value,
    isCompleted: false,
    date: new Date(),
  });
  todoInput.value = '';
}

function toggleComplete(id) {
  const index = todos.value.findIndex((todo) => todo.id === id);
  updateDoc(doc(todosCollection, id), {
    isCompleted: !todos.value[index].isCompleted,
  });
}
</script>
