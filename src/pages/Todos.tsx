import { useEffect, useState } from "react";
import supabase from "../config/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import Navbar from "../components/Navbar";
import Todo from "../components/Todo";

interface TodoData {
  id: number;
  title: string;
  inserted_at: string;
  description: string;
  completed: string;
}

const Todos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<string>("inserted_at");
  const [ascending, setAscending] = useState<boolean>(false);

  const refreshTodos = (id: number) => {
    setTodos((previousTodos: any) => {
      return previousTodos?.filter((todos: any) => todos.id !== id);
    });
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    toast.success("Successfully Signed Out");
    navigate("/");
    if (error) {
      toast.error(error.message);
    }
  };

  const orderToInsertedAt = () => {
    setOrder("inserted_at");
    setAscending(false);
  };

  const orderToTitle = () => {
    setOrder("title");
    setAscending(true);
  };

  useEffect(() => {
    const getTodos = async () => {
      const { error, data: todos } = await supabase.from("todos").select("*").order(order, { ascending: ascending });

      if (error) {
        setLoading(true);
        setTodos([]);
        toast.error(error.message);
        setLoading(false);
      }

      if (todos) {
        setLoading(true);
        setTodos(todos);
        setLoading(false);
      }
    };

    getTodos();
  }, [order]);

  return (
    <>
      <Navbar signOut={handleSignOut} />
      <main className="px-4">
        <section className="container py-8">
          <header className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="pb-1 text-2xl font-bold md:pb-0 md:text-3xl">Welcome</h1>
              <div className="mt-2 flex items-center space-x-1 pb-5 md:pb-0">
                <p className="pr-1">Sort by: </p>
                <button
                  onClick={orderToInsertedAt}
                  className="rounded bg-indigo-600 px-3 py-1 text-sm text-gray-50 transition hover:bg-indigo-700"
                >
                  Created
                </button>
                <button
                  onClick={orderToTitle}
                  className="rounded bg-indigo-600 px-3 py-1 text-sm text-gray-50 transition hover:bg-indigo-700"
                >
                  Title
                </button>
              </div>
            </div>
            <div className="w-full rounded bg-white px-4 py-3 shadow md:w-72 lg:w-80">
              <p className="pb-2 font-semibold">Legend</p>
              <div className="flex space-x-3">
                <p className="flex items-center text-sm">
                  <GoPrimitiveDot className="mr-1 text-yellow-500" /> In Progress
                </p>
                <p className="flex items-center text-sm">
                  <GoPrimitiveDot className="mr-1 text-green-500" /> Done
                </p>
              </div>
            </div>
          </header>
          {loading && <p>Loading...</p>}
          <section className="grid grid-cols-1 gap-5 py-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {todos.length === 0 ? (
              <p>You have no todos</p>
            ) : (
              todos.map((todo) => (
                <Todo
                  id={todo.id}
                  key={todo.id}
                  title={todo.title}
                  createdAt={todo.inserted_at}
                  description={todo.description}
                  completed={todo.completed}
                  onDelete={refreshTodos}
                />
              ))
            )}
          </section>
        </section>
      </main>
    </>
  );
};

export default Todos;
