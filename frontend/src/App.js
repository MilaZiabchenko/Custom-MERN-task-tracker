import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { TasksProvider } from './context/TasksContext';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import TaskDetails from './pages/TaskDetails';
import About from './pages/About';
import './App.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='task/:taskId' element={<TaskDetails />} />
    </Route>
  )
);

const App = () => (
  <TasksProvider>
    <RouterProvider router={router} />
  </TasksProvider>
);

export default App;

