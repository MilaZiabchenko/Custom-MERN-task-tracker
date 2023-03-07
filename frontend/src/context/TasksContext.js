import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from 'react';
import useTasks from '../hooks/useTasks.js';
import { CATEGORIES } from '../constants/categories.js';
import { tasksReducer } from '../reducers/tasksReducer.js';
import { fetchTask } from '../helpers/fetchTask.js';

const TasksContext = createContext(null);

const TasksProvider = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.LATEST);

  const { isLoading, error, tasks } = useTasks('/api/tasks');

  const [allTasks, dispatch] = useReducer(tasksReducer, tasks || []);

  useEffect(() => {
    if (tasks) {
      dispatch({ type: 'loaded_tasks', payload: tasks });
    }
  }, [tasks]);

  const [taskToEdit, setTaskToEdit] = useState({ task: {}, edit: false });
  const [showAddTask, setShowAddTask] = useState(false);

  const editTask = async id => {
    if (showAddTask === false) {
      const taskToEdit = await fetchTask(id);

      setTaskToEdit({ task: taskToEdit, edit: true });

      setShowAddTask(!showAddTask);

      const element = document.querySelector('main');

      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const updateTask = async (id, updatedTask) => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({
      type: 'updated_task',
      payload: data
    });

    setTaskToEdit({ task: {}, edit: false });
    setShowAddTask(!showAddTask);
  };

  const toggleCompleted = async id => {
    const taskToToggle = await fetchTask(id);

    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({
      type: 'toggled_completed',
      payload: data
    });
  };

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const deleteTask = async id => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE'
    });

    dispatch({ type: 'deleted_task', _id: id });
  };

  const addTask = async task => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    });

    if (!response.ok) {
      throw new Error(`Oops ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch({ type: 'added_task', payload: data });
    setShowAddTask(!showAddTask);
  };

  return (
    <TasksContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        isLoading,
        error,
        allTasks,
        taskToEdit,
        showAddTask,
        editTask,
        updateTask,
        toggleCompleted,
        toggleAddTask,
        deleteTask,
        addTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

const useTasksContext = () => useContext(TasksContext);

export { TasksProvider, useTasksContext };
