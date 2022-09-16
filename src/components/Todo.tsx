import toast from "react-hot-toast";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { GoPrimitiveDot } from "react-icons/go";
import { Link } from "react-router-dom";
import supabase from "../config/supabase";

interface TodoProps {
  id: number;
  title: string;
  createdAt: string;
  description: string;
  completed: string;
  onDelete: (id: number) => void;
}

const Todo = ({ id, title, createdAt, description, completed, onDelete }: TodoProps) => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

  const handleDeleteFavorites = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("todos").delete().eq("id", id).select();

    if (error) {
      toast.error(`Error deleting todo`);
    }

    if (data) {
      onDelete(id);
      toast.success(`Todo deleted`);
    }
  };

  const handleCompleteTodo = (completed: string) => {
    if (completed === "In Progress") {
      return <GoPrimitiveDot className="text-yellow-500" />;
    } else if (completed === "Done") {
      return <GoPrimitiveDot className="text-green-500" />;
    } else {
      return <GoPrimitiveDot className="text-red-500" />;
    }
  };

  return (
    <article className="relative whitespace-pre-line rounded bg-white p-5 shadow">
      <header>
        <div className="mb-1">
          <p>{handleCompleteTodo(completed)}</p>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold capitalize">{title}</h2>
          <small className="text-gray-600">Created at: {formattedDate(createdAt)}</small>
        </div>
        <div className="absolute right-3 -top-3 space-x-1">
          <Link to={`/edit-todo/${id}`}>
            <button
              className="rounded bg-indigo-600 p-2 transition hover:bg-indigo-700"
              aria-label="Edit todo"
              title="Edit todo"
            >
              <AiFillEdit className="text-white" />
            </button>
          </Link>

          <button
            onClick={handleDeleteFavorites}
            className="rounded bg-indigo-600 p-2 transition hover:bg-indigo-700"
            aria-label="Delete todo"
            title="Delete todo"
          >
            <AiFillDelete className="text-white" />
          </button>
        </div>
      </header>
      <footer>
        <p className="desc pt-3 text-sm">{description}</p>
      </footer>
    </article>
  );
};

export default Todo;
