import { PropTypes } from 'prop-types';
import { useTasksContext } from '../context/TasksContext';
import { FaEdit } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const TasksListItem = ({ position, task }) => {
  const { editTask, toggleCompleted, deleteTask } = useTasksContext();

  const taskTitle = `#${position} — ${task.name}`;

  return (
    <article
      className={task.completed ? 'task' : 'task not-completed'}
      onDoubleClick={() => toggleCompleted(task._id)}
    >
      <div className='priority-num-display'>{task.priority}</div>
      <h3>
        <span>
          {taskTitle}
          {task.completed && <span> ✔ </span>}
        </span>
        <div className='task-buttons'>
          <button onClick={() => editTask(task._id)}>
            <FaEdit />
          </button>
          <button onClick={() => deleteTask(task._id)}>
            <FaTrashAlt />
          </button>
        </div>
      </h3>
      <p>{task.time}</p>
      <p>
        <Link to={`/task/${task._id}`}>View details</Link>
      </p>
    </article>
  );
};

TasksListItem.propTypes = {
  position: PropTypes.number,
  task: PropTypes.shape({
    name: PropTypes.string,
    time: PropTypes.string,
    priority: PropTypes.number,
    completed: PropTypes.bool
  })
};

export default TasksListItem;
