import './App.css';
import AddTaskButton from './components/AddTaskButton';
import TaskList from './components/TaskList';

function App() {
  return (
      <div className='layout'>
          <AddTaskButton />
          <TaskList />
      </div>
  );
}

export default App;
