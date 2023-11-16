import axios from 'axios';
import { TodoType } from '../types/todo.types';

const TODO_API_URL = `${import.meta.env.VITE_BASE_URL}/todo`;

const ADD_TODO_ENDPOINT = `${TODO_API_URL}`;
const DELETE_TODO_ENDPOINT = `${TODO_API_URL}`;
const UPDATE_TODO_ENDPOINT = `${TODO_API_URL}`;
const GET_TODO_ENDPOINT = `${TODO_API_URL}`;

export const addTodo = async (todoData: TodoType) => {
  try {
    const response = await axios.post(ADD_TODO_ENDPOINT, todoData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await axios.delete(`${DELETE_TODO_ENDPOINT}/${todoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTodo = async (todoId: string, updatedTodo: TodoType) => {
  try {
    const response = await axios.put(`${UPDATE_TODO_ENDPOINT}/${todoId}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTodo = async () => {
  try {
    const response = await axios.get(GET_TODO_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
