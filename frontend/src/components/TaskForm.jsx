import { useTasksContext } from '../context/TasksContext';
import { useState, useEffect } from 'react';
import PrioritySelect from './PrioritySelect';

const AddTaskForm = () => {
  const { toggleAddTask, showAddTask, taskToEdit, updateTask, addTask } =
    useTasksContext();

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState(10);

  useEffect(() => {
    if (toggleAddTask) {
      setName('');
      setTime('');
      setPriority(10);
    }
  }, [toggleAddTask]);

  useEffect(() => {
    if (taskToEdit?.edit) {
      setName(taskToEdit.task.name);
      setTime(taskToEdit.task.time);
      setPriority(taskToEdit.task.priority);
    }
  }, [taskToEdit]);

  const handleSubmit = e => {
    e.preventDefault();

    if (name.length < 8 || time.length < 3 || time.length > 25) {
      return null;
    }

    if (taskToEdit?.edit) {
      updateTask(taskToEdit.task._id, { name, time, priority });
    } else {
      addTask({ name, time, priority });
    }

    setName('');
    setTime('');
    setPriority(10);
  };

  return (
    showAddTask ? (
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <textarea
            placeholder='Add Task*'
            value={name}
            onChange={e => setName(e.target.value)}
            className={name.length > 0 && name.length < 8 ? 'error' : ''}
          />
          {name.length > 0 && name.length < 8 && (
            <p className='error'>Task name must be at least 8 characters</p>
          )}
        </div>
        <div className='form-control'>
          <input
            type='text'
            placeholder='Add Time*'
            value={time}
            onChange={e => setTime(e.target.value)}
            className={
              (time.length > 0 && time.length < 3) || time.length > 25
                ? 'error'
                : ''
            }
          />
          {((time.length > 0 && time.length < 3) || time.length > 25) && (
            <p className='error'>
              Time must be within a range between 3 and 25 characters
            </p>
          )}
        </div>
        <div className='form-control'>
          <PrioritySelect
            selected={priority}
            select={priority => setPriority(priority)}
          />
        </div>
        <button
          type='submit'
          className='btn btn-block'
          disabled={name.length < 8 || time.length < 3 || time.length > 20}
        >
          Save Task
        </button>
      </form>
    ) : null
  );
};

export default AddTaskForm;
