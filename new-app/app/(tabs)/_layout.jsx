import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import HomeTab from './HomeTab';
import CreateEventTab from './CreateEventTab';
import ManageEventsTab from './ManageEventsTab';
import EventDetailsTab from './EventDetailsTab';
import AllEventsTab from './AllEventsTab';
import SignUp from './SignUp'; 
import SignIn from './SignIn'; 
import GuestListTab from './GuestListTab'; 

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      initialRouteName="HomeTab" // Set HomeTab as the initial route
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: { paddingBottom: 5 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="CreateEventTab"
        component={CreateEventTab}
        options={{
          title: 'Create Event',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="EventDetailsTab"
        component={EventDetailsTab}
        options={{
          title: 'Event Details',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="AllEventsTab"
        component={AllEventsTab}
        options={{
          title: 'All Events',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />

      <Tab.Screen
        name="GuestListTab"
        component={GuestListTab}
        options={{
          title: 'Guest List',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          title: 'Sign In',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="key.fill" color={color} />,
        }}
      />

      <Tab.Screen
        name="ManageEventsTab"
        component={ManageEventsTab}
        options={{
          title: 'Manage Events',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="key.fill" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
