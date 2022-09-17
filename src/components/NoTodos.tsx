import NoTodo from "../assets/add-notes.svg";

const NoTodos = () => {
  return (
    <section className="container my-32 flex items-center justify-center px-4 lg:my-36 xl:my-44">
      <div>
        <img src={NoTodo} className="w-28" alt="No Todos" />
        <p className="py-5 text-gray-600">You have no todos</p>
      </div>
    </section>
  );
};

export default NoTodos;
