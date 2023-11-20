import React, { useEffect, useState } from "react";
import { Container, ListGroup, Image } from "react-bootstrap";
import { getTodo, deleteTodo, updateTodo } from "../api/todoApi";
import { TodoType } from "../types/todo.types";

import "bootstrap/dist/css/bootstrap.min.css";

const TodoListForm: React.FC = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodo();
        setTodo(response);
      } catch (error) {
        console.error("Error fetching todo:", error);
      }
    };

    fetchTodo();
  }, [todo]);

  const handleDelete = async (todoId: string) => {
    try {
      await deleteTodo(todoId);
      const updatedTodo = await getTodo();
      setTodo(updatedTodo);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = async (todoId: string) => {
    try {
      // Replace the following line with your logic for updating todos
      const updatedTodoData = {
        /* Your updated todo data */
      };
      await updateTodo(todoId, updatedTodoData);
      const updatedTodo = await getTodo();
      setTodo(updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Container fluid className="todo-list-form" style={{ maxWidth: "600px" }}>
      <ListGroup>
        {todo.map((todo, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <h4>{todo.title}</h4>
              <p>{todo.description}</p>
              <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            </div>
            <div>
              <Image
                src="/src/assets/delete-icon.png"
                alt="Delete"
                onClick={() => handleDelete(todo._id)}
              />
              <Image
                src="/src/assets/edit-icon.png"
                alt="Update"
                className="mr-2"
                onClick={() => handleUpdate(todo._id)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default TodoListForm;
