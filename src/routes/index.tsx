import React, { useContext } from "react";

import AuthContext from "../contexts/Auth";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  // if (loading) {
  // Lottie
  // }

  return signed ? <StackRoutes /> : <AuthRoutes />
};

export default Routes;
