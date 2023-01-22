import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import supabase from "./config/supabase";

// Pages
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";

const App = () => {
  const [user, setUser] = useState<string | undefined | null>(null);

  // Check if user is currently logged in or not
  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.access_token);
    console.log(session);

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session?.access_token);
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={!user}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute isLoggedIn={!user}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/todos"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <Todos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-todo"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <AddTodo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-todo/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <EditTodo />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
