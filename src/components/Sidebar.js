import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const Sidebar = ({ activeScreen, onNavigate }) => {
  const menuItems = [
    { id: 'Dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'Leads', icon: '👥', label: 'Leads' },
    { id: 'Analytics', icon: '📈', label: 'Analytics' },
    { id: 'Chat', icon: '💬', label: 'Chat' },
    { id: 'Settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <Surface style={styles.sidebar}>
      <View style={styles.sidebarContent}>
        {/* Logo/Brand */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>V</Text>
          </View>
          <Text style={styles.brandName}>Vibra</Text>
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
              <View style={[
                styles.navIcon,
                activeScreen === item.id && styles.activeNavIcon
              ]}>
                <Text style={styles.navIconText}>{item.icon}</Text>
              </View>
              <Text style={[
                styles.navLabel,
                activeScreen === item.id && styles.activeNavLabel
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.navItem}>
            <View style={styles.navIcon}>
              <Text style={styles.navIconText}>❓</Text>
            </View>
            <Text style={styles.navLabel}>Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 80,
    height: '100%',
    backgroundColor: '#000000',
    ...shadows.large,
  },
  sidebarContent: {
    flex: 1,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  brandName: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
  navSection: {
    flex: 1,
    width: '100%',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  activeNavItem: {
    backgroundColor: '#111111',
  },
  navIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  activeNavIcon: {
    backgroundColor: '#FFFFFF',
  },
  navIconText: {
    fontSize: 16,
  },
  navLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
  },
  activeNavLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomSection: {
    width: '100%',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
});

export default Sidebar; 