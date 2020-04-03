import React from "react";
import { YellowBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/pages/Main";
import Profile from "./src/pages/Profile";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerTitle: "DevRadar",
            headerTitleAlign: "center",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: "#7D40E7",
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Profile",
            headerTitleAlign: "center",
            headerTintColor: "#FFF",
            headerStyle: {
              backgroundColor: "#7D40E7",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
