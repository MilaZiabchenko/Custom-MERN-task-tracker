import { useParams, useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks';
import Spinner from '../components/Spinner';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const TaskDetails = () => {
  const { taskId } = useParams();
  const { isLoading, error, tasks: task } = useTasks(`/api/tasks/${taskId}`);

  const navigate = useNavigate();

  return isLoading ? (
    <Spinner />
  ) : (
    <section className='details'>
      {error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <h2>{task.name}</h2>
          <h4>
            {' '}
            Priority: <strong>{task.priority}</strong>{' '}
          </h4>
          <h4>
            Scheduled time: <strong>{task.time}</strong>{' '}
          </h4>
          <h4>
            Last updated:{' '}
            <strong>
              {formatDistanceToNow(new Date(task.updatedAt), {
                addSuffix: true,
              })}
            </strong>
          </h4>
          <h3>
            Task is{' '}
            {task.completed
              ? 'ongoing or brought to an end ⌛🤸‍♀️😊'
              : 'to be completed... ⏳'}
          </h3>
        </>
      )}
      <button className='btn' onClick={() => navigate('/')}>
        Back to Tasks
      </button>
    </section>
  );
};

export default TaskDetails;
