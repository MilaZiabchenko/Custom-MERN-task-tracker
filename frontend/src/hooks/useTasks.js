import { useReducer, useState, useEffect } from 'react';
import { tasksReducer } from './../utils/tasksReducer.js';

const useTasks = url => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, dispatch] = useReducer(tasksReducer, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          setIsLoading(false);
          setError(`Oops ${response.status}: ${response.statusText}`);

          throw new Error(`Oops, ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setIsLoading(false);
        dispatch({ type: 'loaded_tasks', payload: data });
      } catch (err) {
        setIsLoading(false);
        setError(err.message);

        throw new Error(err.message);
      }
    };

    getTasks();
  }, [url]);

  return { isLoading, error, tasks };
};

export default useTasks;
