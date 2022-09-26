import React from 'react'
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screens/audiolist'
import Player from '../screens/player'
import PlayList from '../screens/playlist'
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="AudioList"
          component={AudioList}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="headset" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Player"
          component={Player}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="compact-disc" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="library-music" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}