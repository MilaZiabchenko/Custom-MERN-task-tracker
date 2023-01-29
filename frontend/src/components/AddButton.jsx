import { useTasksContext } from '../context/TasksContext';

const AddButton = () => {
  const { showAddTask, toggleAddTask } = useTasksContext();

  return (
    <button className='btn' onClick={toggleAddTask}>
      {showAddTask ? 'Close' : 'Add'}
    </button>
  );
};

export default AddButton;
