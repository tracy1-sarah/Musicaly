import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screens/audiolist'
import Player from '../screens/player'
import PlayList from '../screens/playlist'
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator()

export default function AppNavigator() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="AudioList"
          component={AudioList}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="headset" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Player"
          component={Player}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="compact-disc" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PlayList"
          component={PlayList}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="library-music" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
}
