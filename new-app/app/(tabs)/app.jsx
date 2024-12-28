import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateEventTab from './CreateEventTab'; 
import EventDetailsTab from './EventDetailsTab'; 
import SignUp from './SignUp';  
import SignIn from './SignIn'; 
import AllEventsTab from './AllEventsTab';  
import GuestListTab from './GuestListTab';  
import HomeTab from './HomeTab';  

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateEventTab">
          <Stack.Screen name="CreateEventTab" component={CreateEventTab} />
          <Stack.Screen name="EventDetailsTab" component={EventDetailsTab} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="Signin" component={SignIn} />
          <Stack.Screen name="HomeTab" component={HomeTab} />
          <Stack.Screen name="AllEventsTab" component={AllEventsTab} />
    
          <Stack.Screen name="GuestListTab" component={GuestListTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
