import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import TaskItem from "@/components/Tasks/TaskItem";
import { Todo } from "@/data/todos";
import axios from "axios";

interface TaskListProps {
  todoList: Todo[];
  setTodoList: (todoList: Todo[]) => void;
}

export const TaskList = ({ todoList, setTodoList }: TaskListProps) => {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://dummyjson.com/todos/${id}`);
      const filteredTodos = todoList.filter((todo) => todo.id !== id);
      setTodoList(filteredTodos);
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.todoList}>
      {todoList?.map((todo) => {
        return (
          <TaskItem key={todo.id} todo={todo} handleDelete={handleDelete} />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  todoList: {
    paddingBottom: 20,
  },
  todo: {
    fontSize: 18,
    paddingVertical: 8,
  },
});
