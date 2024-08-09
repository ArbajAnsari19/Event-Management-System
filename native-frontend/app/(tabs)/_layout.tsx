import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export default function layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarStyle: { justifyContent: "center", alignItems: "center" },
          tabBarIcon: (props) => (
            <Ionicons name="home" size={30} color={props.color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Add"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarStyle: { justifyContent: "center", alignItems: "center" },
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="add-box"
              size={40}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarStyle: { justifyContent: "center", alignItems: "center" },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-circle-outline"
              size={35}
              color={focused ? "blue" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
