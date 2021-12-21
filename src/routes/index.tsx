import React, { useContext, useEffect } from "react";

import AuthContext from "../contexts/Auth";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";
import { Loading } from "../components/Loading";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  return loading ? <Loading /> : signed ? <StackRoutes /> : <AuthRoutes />;
};

export default Routes;
