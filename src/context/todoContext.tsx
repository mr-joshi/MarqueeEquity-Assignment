import React, { ReactNode, createContext, useEffect, useState } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  subTasks: {
    id: number;
    text: string;
  }[];
}

interface TodoContextProps {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  deleteTodo: (id: number) => void;
  addSubTask: (id: number, newSubTask: { id: number; text: string }) => void;
  deleteSubTask: (id: number, subTaskId: number) => void;
  todoCompleted: (id: number) => void;
}

const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => {},
  deleteTodo: () => {},
  addSubTask: () => {},
  deleteSubTask: () => {},
  todoCompleted: () => {},
});

const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);



  const addTodo = (newTodo: Todo) => {
    let allTodos=[...todos, newTodo]
    setTodos([...todos, newTodo]);
    localStorage.setItem('todos', JSON.stringify(allTodos));
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const addSubTask = (id: number, newSubTask: { id: number; text: string }) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          subTasks: [...todo.subTasks, newSubTask],
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteSubTask = (id: number, subTaskId: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          subTasks: todo.subTasks.filter((subTask) => subTask.id !== subTaskId),
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todoCompleted = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, addSubTask, deleteSubTask, todoCompleted }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
