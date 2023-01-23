import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();

  // Redirect to home page after 2 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/todos", { replace: true });
    }, 2000);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="text-center">
        <p className="pb-3 text-3xl">Oh no! Page not found!</p>
        <span>Redirecting to homepage</span>
      </section>
    </main>
  );
};

export default ErrorPage;
