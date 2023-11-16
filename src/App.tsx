import { useState } from 'react';
import AddTodo from './pages/AddTodo';

const App = () => {
  const[todo, setTodo] = useState();
  return <AddTodo />;
}

export default App