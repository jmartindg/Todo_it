import { Navigate } from "react-router-dom";

type AuthProps = {
  isLoggedIn: string | null | undefined | boolean;
  children: JSX.Element;
};

const ProtectedRoute = ({ isLoggedIn, children }: AuthProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
