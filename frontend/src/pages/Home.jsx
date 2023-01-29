import TasksHeader from '../components/TasksHeader';
import TaskForm from './../components/TaskForm';
import TasksList from './../components/TasksList';

const Home = () => {
  return (
    <>
      <TasksHeader title={TasksHeader.title} />
      <TaskForm />
      <TasksList />
    </>
  );
};
export default Home;
