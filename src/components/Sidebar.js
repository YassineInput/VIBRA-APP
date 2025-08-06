import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const Sidebar = ({ activeScreen, onNavigate }) => {
  const menuItems = [
    { id: 'Dashboard', icon: 'view-dashboard-outline', label: 'Dashboard' },
    { id: 'Leads', icon: 'account-group-outline', label: 'Orders' },
    { id: 'Analytics', icon: 'chart-line', label: 'Analytics' },
    { id: 'Chat', icon: 'message-outline', label: 'Messages' },
    { id: 'Settings', icon: 'cog-outline', label: 'Settings' },
  ];

  return (
    <Surface style={styles.sidebar}>
      <View style={styles.sidebarContent}>
        {/* Logo/Brand */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Icon name="lightning-bolt" size={20} color="#000000" />
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.navSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.navItem,
                activeScreen === item.id && styles.activeNavItem
              ]}
              onPress={() => onNavigate(item.id)}
            >
              <Icon
                name={item.icon}
                size={24}
                color={activeScreen === item.id ? '#FFFFFF' : '#666666'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="help-circle-outline" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Icon name="cog-outline" size={24} color="#666666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <View style={styles.userAvatar}>
              <Text style={styles.userInitial}>B</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 70,
    height: '100%',
    backgroundColor: '#0a0a0a',
    borderRightWidth: 1,
    borderRightColor: '#1a1a1a',
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navSection: {
    alignItems: 'center',
  },
  navItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.sm,
    borderRadius: 8,
  },
  activeNavItem: {
    backgroundColor: '#FFFFFF',
  },
  bottomSection: {
    alignItems: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitial: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default Sidebar;
