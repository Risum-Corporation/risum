import React from "react";
import { NavigationContainer} from '@react-navigation/native';
import { StatusBar } from "react-native";

import StackRoutes from './stack.routes';

const Routes = () => (
<NavigationContainer>
    <StatusBar animated={true} barStyle='light-content' />
    <StackRoutes />
</NavigationContainer>
)

export default Routes;