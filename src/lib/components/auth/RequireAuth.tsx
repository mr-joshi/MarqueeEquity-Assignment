import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: React.ReactNode;
};

const RequireAuth = ({
  children,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
//their should be backend apito verify token as we have nothig so iam doing this hack
  let isAuthenticated = false;
  if (token && token?.length===144 ) isAuthenticated = true;
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
