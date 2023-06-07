import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const RequireAuth = ({
  children,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  let isAuthenticated = false;
  if (token) isAuthenticated = true;
  else {
    isAuthenticated = false;
  }

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={'/'} />
  );
};

export default RequireAuth;
