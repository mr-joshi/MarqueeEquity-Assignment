// TodoList.tsx

import React, { useContext, useState } from 'react';
import TodoItem from './addTodo';
import { TodoContext } from '../../../context/todoContext';
import { Button, Input, useToast } from '@chakra-ui/react';
import { AppContext } from "../../../context/context";

const TodoList: React.FC = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState('');
  const toast = useToast();
  const {data}=useContext(AppContext)
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        com
        subTasks: [],
      };
      addTodo(newTodo);
      setNewTodoText('');
      toast({
        title: 'Sub-Task Added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    else{
      toast({
      title: 'Please enter a sub-task',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });

    }
  };

  return (
    <div >
      Hii, {data}
      <form onSubmit={handleAddTodo} style={{display:'flex',gap:'10px'}}>
      <Input
                type="text"
                value={newTodoText}                
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Enter a new todo"
      />
         <Button type='submit' >Add Todo</Button>
      </form>

      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            subTasks={todo.subTasks}
          />
        ))
      ) : (
        <p>Please Add Todo's For Your Convenience</p>
      )}
    </div>
  );
};

export default TodoList;
