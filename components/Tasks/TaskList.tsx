import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";

import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteTodo, getTodos } from "@/api/todo";

import TaskItem from "@/components/Tasks/TaskItem";

export const TaskList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: deleteTodo,
    onError: (err) => {
      console.log("Something went wrong", err);
    },
  });

  const handleDelete = async (id: number) => {
    mutate(id);
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator color={"green"} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.todoList}>
      {data?.map((todo) => {
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
