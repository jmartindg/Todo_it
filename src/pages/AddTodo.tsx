import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabase";
import toast from "react-hot-toast";

const AddTodo = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<string>("");
  const navigate = useNavigate();

  // Get supabase user
  const user = supabase.auth.user();

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if the fields are empty
    if (!title || !description || completed === undefined) {
      toast.error("Please fill all fields");
      return;
    }

    const { data: todos, error } = await supabase
      .from("todos")
      .insert([{ title: title, description: description, completed: completed, user_id: user?.id }]);

    if (error) {
      toast.error(error.message);
    }

    if (todos) {
      toast.success("Todo added");
      navigate("/todos");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value);
  };

  return (
    <section className="container flex min-h-screen items-center justify-center">
      <form className="rounded bg-white p-8 shadow-md" onSubmit={handleAddTodo}>
        <header className="mb-5">
          <Link to="/todos" className="text-indigo-600 hover:underline">
            <AiOutlineArrowLeft size={18} />
          </Link>
        </header>

        <label htmlFor="title" className="text-sm font-semibold">
          Title
        </label>
        <input
          onChange={handleTitleChange}
          value={title}
          name="title"
          type="text"
          className="relative mb-2 block w-96 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="What needs to be done?"
        />

        <label htmlFor="description" className="text-sm font-semibold">
          Description <span className="text-[12px] text-gray-600">(Maximum of 50 characters)</span>
        </label>
        <textarea
          onChange={handleDescriptionChange}
          value={description}
          className="relative mb-2 block w-96 appearance-none rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          placeholder="Write some short description..."
        ></textarea>

        <p className="pt-2 pb-1 text-sm font-semibold">Status</p>
        <input onChange={handleCompleted} className="mr-2" type="radio" name="completed" value="In Progress" />
        <label htmlFor="in-progress" className="text-sm">
          In Progress
        </label>
        <br />
        <input onChange={handleCompleted} className="mr-2" type="radio" name="completed" value="Done" />
        <label htmlFor="done" className="text-sm">
          Done
        </label>

        <div className="mt-4 w-full">
          <input
            type="submit"
            value="Add Todo"
            className="group relative flex w-full cursor-pointer justify-center rounded border border-transparent bg-indigo-600 py-2 px-2 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          />
        </div>
      </form>
    </section>
  );
};

export default AddTodo;
