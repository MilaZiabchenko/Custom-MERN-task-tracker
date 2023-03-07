import { useState, useEffect } from 'react';
import { useTasksContext } from '../context/TasksContext';
import { CATEGORIES } from '../constants/categories.js';
import { AnimatePresence, motion } from 'framer-motion';
import TasksListItem from './TasksListItem';
import Spinner from './Spinner';

const TasksList = () => {
  const { activeCategory, isLoading, error, allTasks } = useTasksContext();

  const [tasks, setTasks] = useState(allTasks);

  useEffect(() => {
    if (activeCategory === CATEGORIES.LATEST) {
      setTasks(allTasks);
    }

    if (activeCategory === CATEGORIES.PRIOR) {
      setTasks(
        [...allTasks].sort((prev, next) => next.priority - prev.priority)
      );
    }

    if (activeCategory === CATEGORIES.TODO) {
      setTasks(allTasks.filter(task => !task.completed));
    }

    if (activeCategory === CATEGORIES.DONE) {
      setTasks(allTasks.filter(task => task.completed));
    }
  }, [activeCategory, allTasks]);

  if (error) return <h3>{error}</h3>;

  if (!isLoading && (!tasks || tasks.length === 0))
    return <h3>No Tasks To Show...</h3>;

  return isLoading ? (
    <Spinner />
  ) : (
    <section>
      <AnimatePresence>
        {tasks.map((task, i) => (
          <motion.div
            key={task._id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TasksListItem position={tasks.length - i} task={task} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default TasksList;
