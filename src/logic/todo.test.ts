import { TodoItem, generateID, validateTodo, formatTodo } from "./todo";

describe("generateID", () => {
  it("should return a string", () => {
    const id = generateID();
    expect(typeof id).toBe("string");
  });

  it("should return a unique string", () => {
    const id1 = generateID();
    const id2 = generateID();
    expect(id1).not.toBe(id2);
  });
});

describe("validateTodo function", () => {
  const todos: TodoItem[] = [
    { id: "1", value: "Todo1", done: false },
    { id: "2", value: "Todo2", done: true },
  ];

  test("returns false if the value is empty", () => {
    const todo: TodoItem = { id: "3", value: "", done: false };
    const result = validateTodo(todo, todos);
    expect(result).toBe(false);
  });

  test("returns false if the value is longer than 255 characters", () => {
    const todo: TodoItem = {
      id: "4",
      value: "a".repeat(256),
      done: false,
    };
    const result = validateTodo(todo, todos);
    expect(result).toBe(false);
  });

  test("returns false if the todo is already in the array (case insensitive)", () => {
    const todo2: TodoItem = { id: "6", value: "tOdO1", done: false };
    const result2 = validateTodo(todo2, todos);
    expect(result2).toBe(false);
  });

  test("returns true if the todo is valid", () => {
    const todo: TodoItem = { id: "3", value: "Todo3", done: false };
    const result = validateTodo(todo, todos);
    expect(result).toBe(true);
  });
});

describe("formatTodo function", () => {
  test("capitalizes the first letter of the todo", () => {
    const todo: TodoItem = { id: "1", value: "todo1", done: false };
    const formattedTodo = formatTodo(todo);
    expect(formattedTodo.value).toBe("Todo1");
  });

  describe("formatTodo", () => {
    it("should capitalize the first letter of the value", () => {
      const todo = new TodoItem();
      todo.value = "clean house";
      const formattedTodo = formatTodo(todo);
      expect(formattedTodo.value).toBe("Clean house");
    });

    it("should not modify the original todo", () => {
      const todo = new TodoItem();
      todo.value = "clean house";
      const formattedTodo = formatTodo(todo);
      expect(formattedTodo).not.toBe(todo);
      expect(formattedTodo.value).not.toBe(todo.value);
    });
  });
});
