import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sidebar from '../components/Sidebar';
import DashboardScreen from '../screens/DashboardScreen';
import LeadsScreen from '../screens/LeadsScreen';
import ChatScreen from '../screens/ChatScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import AddLeadScreen from '../screens/AddLeadScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [activeScreen, setActiveScreen] = useState('Dashboard');

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const getCurrentScreen = () => {
    switch (activeScreen) {
      case 'Dashboard':
        return <DashboardScreen />;
      case 'Leads':
        return <LeadsScreen />;
      case 'Analytics':
        return <AnalyticsScreen />;
      case 'Chat':
        return <ChatScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <Sidebar 
        activeScreen={activeScreen} 
        onNavigate={handleNavigate} 
      />
      <View style={styles.mainContent}>
        {getCurrentScreen()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
  },
});

export default MainNavigator; 