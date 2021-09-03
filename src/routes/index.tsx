import React, { useContext } from "react";
import { Fragment } from "react";

import AuthContext from "../contexts/Auth";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";
import DrawerRoutes from "./drawer.routes";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  // if (loading) {
  // Lottie
  // }
  return signed ? (
    <>
  <StackRoutes/> 
  {/* DrawerRoutes */}
  </>
 
  ) : <AuthRoutes />;
};

export default Routes;
