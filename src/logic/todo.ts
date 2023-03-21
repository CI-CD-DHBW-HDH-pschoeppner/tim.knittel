import { writable } from "svelte/store";

export class TodoItem {
  id = "";
  value = "";
  done = false;
}

// this function must return a unique ID every time it is called
export function generateID(): string {
  const uniqueId = Math.random().toString(36);
  return uniqueId;
}

// make sure, that
// the value isn't longer than 255 characters
// the value isn' empty
// the todo isn't contained in the todos array (case insensitive)
export function validateTodo(todo: TodoItem, todos: TodoItem[]): boolean {
  if (
    todo.value.length > 255 ||
    todo.value.length === 0 ||
    todos.some((t) => t.value.toLowerCase() === todo.value.toLowerCase())
  ) {
    return false;
  }
  return true;
}

// capitalize the first letter of the todo
export function formatTodo(todo: TodoItem): TodoItem {
  // TODO: implement
  return {
    id: todo.id,
    value: todo.value.charAt(0).toUpperCase() + todo.value.slice(1),
    done: todo.done,
  };
}

// generate a random rgb color
// each value (r,g,b) should be between 50 and 150
export function generateColor(): string {
  const r = Math.floor(Math.random() * 100) + 50;
  const g = Math.floor(Math.random() * 100) + 50;
  const b = Math.floor(Math.random() * 100) + 50;
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

export const todoList = writable<TodoItem[]>([]);
