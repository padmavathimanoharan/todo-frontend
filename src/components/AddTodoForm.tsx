import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.min.css";
import { addTodo } from "../api/todoApi";
// import { TodoType } from "../types/todo.types"; // Make sure this import is correct

interface AddTodoFormProps {
  onSubmit: (values: any) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      completed: false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      try {
        // Call the function which adds this to the database
        const response = await addTodo(values);
        console.log(response);

        // Call the provided onSubmit function
        onSubmit(values);

        // Reset the form after successfully saving the todo
        formik.resetForm();
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    },
  });

  return (
    <Container fluid className="add-todo-form">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            id="title"
            name="title"
            type="text"
            placeholder="Enter the todo title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <Form.Text className="text-muted">{formik.errors.title}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            id="description"
            name="description"
            as="textarea"
            placeholder="Enter the todo description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.touched.description && formik.errors.description ? (
            <Form.Text className="text-muted">
              {formik.errors.description}
            </Form.Text>
          ) : null}
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Todo
        </Button>
      </Form>
    </Container>
  );
};

export default AddTodoForm;
