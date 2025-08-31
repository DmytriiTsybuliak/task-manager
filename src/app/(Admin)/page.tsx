import TaskList from '@/components/TaskList';

export default function Home() {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <>
      {isAuthenticated ? <TaskList /> : <p>Welcome to Task Manager. Please log in to continue.</p>}
    </>
  );
}
