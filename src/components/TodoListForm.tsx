import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { getTodo, deleteTodo, updateTodo } from "../api/todoApi";
import { TodoType } from "../types/todo.types";

import "bootstrap/dist/css/bootstrap.min.css";

const TodoListForm: React.FC = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [editableTodoId, setEditableTodoId] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<TodoType>>({});

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
      await updateTodo(todoId, editedValues);
      const updatedTodo = await getTodo();
      setTodo(updatedTodo);
      setEditableTodoId(null);
      setEditedValues({});
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleEditClick = (todoId: string) => {
    setEditableTodoId(todoId);
  };

  const isEditable = (todoId: string) => {
    return editableTodoId === todoId;
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <Container fluid className="todo-list-form" style={{ maxWidth: "600px" }}>
      {todo.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((todo, index) => (
              <tr key={index}>
                <td>
                  {isEditable(todo._id) ? (
                    <input
                      type="text"
                      value={editedValues.title || todo.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  ) : (
                    <span>{todo.title}</span>
                  )}
                </td>
                <td>
                  {isEditable(todo._id) ? (
                    <textarea
                      value={editedValues.description || todo.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  ) : (
                    <span>{todo.description}</span>
                  )}
                </td>
                <td>
                  {isEditable(todo._id) ? (
                    <input
                      type="checkbox"
                      checked={
                        editedValues.completed !== undefined
                          ? editedValues.completed
                          : todo.completed
                      }
                      onChange={() =>
                        handleInputChange("completed", !editedValues.completed)
                      }
                    />
                  ) : (
                    <span>{todo.completed ? "Yes" : "No"}</span>
                  )}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(todo._id)}
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    variant={isEditable(todo._id) ? "success" : "primary"}
                    onClick={() =>
                      isEditable(todo._id)
                        ? handleUpdate(todo._id)
                        : handleEditClick(todo._id)
                    }
                  >
                    {isEditable(todo._id) ? "Save" : "Edit"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No todo's available.</p>
      )}
    </Container>
  );
};

export default TodoListForm;
