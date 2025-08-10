import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";

import { TaskList } from "@/components/Tasks/TaskList";
import { Todo } from "@/data/todos";
import axios from "axios";

export default function Index() {
  const [newTask, setNewTask] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const getData = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/todos/`);
      setTodoList(res.data.todos);
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreate = async () => {
    if (!newTask.trim()) return;

    const newTodo = {
      todo: newTask,
      completed: false,
      userId: 8,
    };
    const res = await axios.post("https://dummyjson.com/todos/add", newTodo);

    setTodoList([...todoList, res.data]);
    setNewTask("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bootcamp Todos</Text>
      <View style={styles.inputContainerStyle}>
        <TextInput
          value={newTask}
          style={styles.input}
          placeholder="Enter a new task..."
          placeholderTextColor="#aaa"
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity onPress={handleCreate}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      <TaskList todoList={todoList} setTodoList={setTodoList} />
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
    flex: 1,
  },
  inputContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
