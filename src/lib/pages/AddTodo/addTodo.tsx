// TodoItem.tsx

import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  UnorderedList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { TodoContext } from "../../../context/todoContext";
import './addTodo.css'
interface TodoItemProps {
  id: number;
  text: string;
  subTasks: {
    id: number;
    text: string;
  }[];
  completed:boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, subTasks,completed }) => {
  const { deleteTodo, addSubTask, deleteSubTask,todoCompleted } = useContext(TodoContext);
  const [newSubTaskText, setNewSubTaskText] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const handleSubTodoAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newSubTaskText.trim() !== "") {
      addSubTask(id, { id: Date.now(), text: newSubTaskText });
      setNewSubTaskText("");
      toast({
        title: "Sub-Task Added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Please enter a sub-task",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSubTaskDelete = (subTaskId: number) => {
    deleteSubTask(id, subTaskId);
    toast({
      title: "Sub-Task Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };
  const handleTodoDelete=(id:number)=>{
    deleteTodo(id)
    toast({
      title: "Task Deleted",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  }
  const handleCompleteTodo=(id:number)=>{
    todoCompleted(id);
    console.log(id)
  }

  return (
    <Box className="addTodoMain">
      <div className="addTodoMain-buttons">
        <p style={{fontSize:'18px' ,fontWeight:'700'}}>{text}</p>
        <div className="addtodo-buttondata">
        <Checkbox  colorScheme='green' onChange={()=>handleCompleteTodo(id)}isChecked={completed} >
          {completed?'Completed':'Pending'}
        </Checkbox>
        <Button onClick={onToggle} mt={2}>
          {isOpen ? "Hide Sub-Tasks" : "Add/Show Sub-Tasks"}
        </Button>
        <Button onClick={() => handleTodoDelete(id)} mt={2} style={{marginLeft:'10px'}}colorScheme="red">
          Delete
        </Button>
        </div>
      </div>

      <Collapse in={isOpen} animateOpacity>
        <Box mt={4}>
          <form onSubmit={handleSubTodoAdd}>
            <FormControl>
              <FormLabel>New Sub-Todo:</FormLabel>
              <Input
                type="text"
                value={newSubTaskText}
                onChange={(e) => setNewSubTaskText(e.target.value)}
              />
            </FormControl>
            <Button type="submit" mt={2} colorScheme="teal">
              Add
            </Button>
          </form>

          <UnorderedList mt={4}>
            {subTasks.map((subTask) => (
              <ListItem key={subTask.id} >
                <div className="litagsAddtodo">
                <span>{subTask.text}</span>
                <Button
                  onClick={() => handleSubTaskDelete(subTask.id)}
                  ml={2}
                  colorScheme="red"
                >
                  Delete Sub-Task
                </Button>
                </div>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Collapse>
    </Box>
  );
};

export default TodoItem;
