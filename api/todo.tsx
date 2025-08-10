import { Todo } from "@/data/todos";
import instance from ".";

export const getTodos = async () => {
  const res = await instance.get("/");
  return res.data.todos as Todo[];
};

export const addTodo = async (newTodo: Omit<Todo, "id">) => {
  const res = await instance.post("/", newTodo);
  return res.data;
};

export const deleteTodo = async (id: number) => {
  const res = await instance.delete(`/${id}`);
  return res.data;
};

export const updateTodo = async ({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}) => {
  const res = await instance.put(`/${id}`, completed);
  return res.data;
};
