export default function AddTaskForm() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Task Title" className="border p-2 rounded mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Add Task
        </button>
      </form>
    </div>
  );
}
