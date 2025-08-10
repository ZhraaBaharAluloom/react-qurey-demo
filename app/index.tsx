import React, { useState } from "react";
import { TaskList } from "@/components/Tasks/TaskList";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import axios from "axios";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { addTodo, updateTodo } from "@/api/todo";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

export default function Index() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState<string>("");

  const { mutate } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: addTodo,
    onError: (err) => console.log("Something went wrong", err),

    onSuccess: () => {
      console.log("Created successfully");
      queryClient.invalidateQueries({ queryKey: ["listTodo"] });
      setNewTask("");
    },
  });

  const handleCreate = async () => {
    if (!newTask.trim()) return;
    mutate({
      todo: newTask,
      completed: false,
      userId: 8,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bootcamp Todos</Text>
      <TextInput
        value={newTask}
        style={styles.input}
        placeholder="Enter a new task..."
        placeholderTextColor="#aaa"
        onChangeText={(text) => setNewTask(text)}
      />
      <Button title="Add" onPress={handleCreate} />
      <TaskList />
    </View>
  );
}

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
});
