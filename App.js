
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import AllUser2 from "./Src/AllUser2";
import Detail from "./Src/Detail";
import AddUser from "./Src/AddUser";
import Edit from "./Src/Edit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <>
      <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen
              name="AllUser2"
              component={AllUser2}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{ headerShown: false }}
            />
             <Stack.Screen
              name="AddUser"
              component={AddUser}
              options={{ headerShown: false }}
            />
              <Stack.Screen
              name="Edit"
              component={Edit}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
