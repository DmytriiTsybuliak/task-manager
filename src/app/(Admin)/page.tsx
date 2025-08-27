import TaskList from '@/app/(Admin)/dashboard/TaskList';

export default function Home() {
  const isAuthenticated = false; // Replace with actual authentication logic

  return (
    <>
      {isAuthenticated ? <TaskList /> : <p>Welcome to Task Manager. Please log in to continue.</p>}
    </>

    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <Link href="/dashboard" className="absolute top-4 right-4">
    //     Go to Dashboard
    //   </Link>
    //   <Link href="/login" className="absolute top-4 left-4">
    //     Go to Login
    //   </Link>
    //   <div className="text-center space-y-8">
    //     <Image
    //       src="/public//logo.png"
    //       alt="Task Manager Logo"
    //       width={150}
    //       height={150}
    //       className="mx-auto"
    //     />
    //     <h1 className="text-4xl font-bold">Welcome to Task Manager</h1>
    //     <p className="text-lg text-gray-600">
    //       Your ultimate solution for managing tasks efficiently and effectively.
    //     </p>
    //   </div>
    // </div>
  );
}
