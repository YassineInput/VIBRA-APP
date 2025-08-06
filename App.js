import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/styles/theme';
import Sidebar from './src/components/Sidebar';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import LeadsScreen from './src/screens/LeadsScreen';
import OrderListScreen from './src/screens/OrderListScreen';
import ChatScreen from './src/screens/ChatScreen';
import AnalyticsScreen from './src/screens/AnalyticsScreen';
import AddLeadScreen from './src/screens/AddLeadScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  // Pass the login handler to LoginScreen
  const LoginScreenWithHandler = () => (
    <LoginScreen onLogin={handleLogin} />
  );

  if (!isLoggedIn) {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreenWithHandler} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Sidebar 
          activeScreen={activeScreen} 
          onNavigate={handleNavigate} 
        />
        <View style={styles.mainContent}>
          {activeScreen === 'Dashboard' && <DashboardScreen />}
          {activeScreen === 'Leads' && <OrderListScreen />}
          {activeScreen === 'Analytics' && <AnalyticsScreen />}
          {activeScreen === 'Chat' && <ChatScreen />}
          {activeScreen === 'Settings' && <SettingsScreen />}
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
