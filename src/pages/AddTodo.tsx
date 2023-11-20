import AddTodoForm from "../components/AddTodoForm";

const AddTodo = () => {
  // Define the onSubmit handler function
  const handleSubmit = (data: any) => {
    // Your logic for handling form submission
    console.log(data);
  };

  return <AddTodoForm onSubmit={handleSubmit} />;
};

export default AddTodo;