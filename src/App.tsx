import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/edit-todo/:id" element={<EditTodo />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
