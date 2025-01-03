import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '../../app/(tabs)/services/AuthService';

import HomeTab from './HomeTab';
import CreateEventTab from './CreateEventTab';
import ManageEventsTab from './ManageEventsTab';
import AllEventsTab from './AllEventsTab';
import SignUp from './SignUp';
import SignIn from './SignIn';
import GuestListTab from './GuestListTab';
import EventDetailsTab from './EventDetailsTab';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <AuthProvider>
      <TabLayoutWithAuth />
    </AuthProvider>
  );
}

function TabLayoutWithAuth() {
  const { isSignedIn } = useAuth();
  const colorScheme = useColorScheme();

  if (isSignedIn === undefined) {
    return <></>;
  }

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
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
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      {!isSignedIn && (
        <>
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
        </>
      )}

      {isSignedIn && (
        <>
          <Tab.Screen
            name="CreateEventTab"
            component={CreateEventTab}
            options={{
              title: 'Create Event',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
            }}
          />
          <Tab.Screen
            name="ManageEventsTab"
            component={ManageEventsTab}
            options={{
              title: 'Manage Events',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="briefcase.fill" color={color} />,
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
        </>
      )}

      <Tab.Screen
        name="EventDetailsTab"
        component={EventDetailsTab}
        options={{
          title: 'Event Details',
          tabBarButton: () => null,
        }}
      />
      <Tab.Screen
        name="GuestListTab"
        component={GuestListTab}
        options={{
          title: 'Guest List',
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
