import React, { useContext } from "react";

import AuthContext from "../contexts/Auth";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";
import { Loading } from "../components/Loading";

const Routes = () => {
  const { signed, loading } = useContext(AuthContext);

  // if (loading) {
  //   return <Loading />;
  // }

  return signed ? <StackRoutes backgroundColor={'red'}/> : <AuthRoutes />;
};

export default Routes;
