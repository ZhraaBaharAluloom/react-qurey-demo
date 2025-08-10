interface Todo {
  id: number;
  completed: boolean;
  todo: string;
  userId?: number;
}

const todos: Todo[] = [
  { id: 1, completed: false, todo: "Set up development environment" },
  { id: 2, completed: true, todo: "Finish JavaScript fundamentals" },
  { id: 3, completed: false, todo: "Build first React Native app" },
  { id: 4, completed: false, todo: "Push code to GitHub" },
  { id: 5, completed: true, todo: "Join stand-up meeting" },
];

export { Todo, todos };
