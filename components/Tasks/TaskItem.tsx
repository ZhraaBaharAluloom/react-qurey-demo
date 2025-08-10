import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "expo-checkbox";

import { updateTodo } from "@/api/todo";
import { Todo } from "@/data/todos";

interface TaskItemProps {
  todo: Todo;
  handleDelete: (id: number) => void;
}

const TaskItem = ({ todo, handleDelete }: TaskItemProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: updateTodo,
    onError: (err) => console.log("Something went wrong", err),
    onSuccess: () => {
      console.log("Updated successfully");
      queryClient.invalidateQueries({ queryKey: ["listTodo"] });
    },
  });

  const handleUpdate = async (id: number, value: boolean) => {
    mutate({
      id,
      completed: value,
    });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Checkbox
          value={todo.completed}
          onValueChange={(value) => handleUpdate(todo.id, value)}
        />
        <Text style={[styles.todo, todo.completed && styles.done]}>
          {todo.todo}
        </Text>
      </View>
      <MaterialIcons
        name="delete-forever"
        size={24}
        color="black"
        onPress={() => handleDelete(todo.id)}
      />
    </View>
  );
};

export default TaskItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  todoList: {
    paddingBottom: 20,
  },
  todo: {
    fontSize: 18,
    paddingVertical: 8,
  },
  done: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});
