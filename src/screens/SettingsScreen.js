import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Card,
  Title,
  List,
  Switch,
  Button,
  useTheme,
  Avatar,
  Text,
  Divider,
  RadioButton,
  Chip
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import authService from '../services/authService';
import { ConfigService } from '../services/config';

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('general');
  const [availableIndustries, setAvailableIndustries] = useState([]);

  const user = authService.getCurrentUser() || { name: 'John Doe', email: 'john.doe@company.com' };

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    try {
      const result = await ConfigService.loadConfig();
      if (result.success) {
        setCurrentConfig(result.config);
        setSelectedIndustry(result.config.industry || 'general');
      }
      
      const industries = ConfigService.getAvailableIndustries();
      setAvailableIndustries([
        { id: 'general', name: 'General Business', config: ConfigService.defaultConfig },
        ...industries
      ]);
    } catch (error) {
      console.error('Failed to load configuration:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Error', 'Failed to logout');
            }
          }
        },
      ]
    );
  };

  const handleMenuPress = (title) => {
    Alert.alert(title, `${title} functionality would be implemented here`);
  };

  const handleIndustryChange = async (industryId) => {
    try {
      const result = await ConfigService.switchClient(industryId);
      if (result.success) {
        setSelectedIndustry(industryId);
        setCurrentConfig(result.config);
        Alert.alert(
          'Industry Changed',
          `Successfully switched to ${result.config.companyName}. The app will restart to apply changes.`,
          [
            {
              text: 'OK',
              onPress: () => {
                // In a real app, you might want to restart or refresh the app
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', 'Failed to switch industry: ' + result.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change industry: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={[styles.headerTitle, { color: theme.colors.onBackground }]}>
            Settings
          </Title>
        </View>

        {/* Profile Section */}
        <Card style={styles.card}>
          <Card.Content style={styles.profileSection}>
            <Avatar.Text 
              size={64} 
              label={user.name ? user.name.split(' ').map(n => n[0]).join('') : 'JD'} 
              style={[styles.avatar, { backgroundColor: theme.colors.primary }]} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
              <Button 
                mode="outlined" 
                compact 
                style={styles.editProfileButton}
                onPress={() => handleMenuPress('Edit Profile')}
              >
                Edit Profile
              </Button>
            </View>
          </Card.Content>
        </Card>

        {/* Notifications */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Notifications</Title>
            <List.Item
              title="Enable Notifications"
              description="Receive app notifications"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => (
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Email Notifications"
              description="Receive email updates"
              left={props => <List.Icon {...props} icon="email" />}
              right={() => (
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  disabled={!notificationsEnabled}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Push Notifications"
              description="Receive push notifications"
              left={props => <List.Icon {...props} icon="cellphone" />}
              right={() => (
                <Switch
                  value={pushNotifications}
                  onValueChange={setPushNotifications}
                  disabled={!notificationsEnabled}
                />
              )}
            />
          </Card.Content>
        </Card>

        {/* App Preferences */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>App Preferences</Title>
            <List.Item
              title="Dark Mode"
              description="Switch to dark theme"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                />
              )}
            />
            <Divider />
            <List.Item
              title="Language"
              description="English"
              left={props => <List.Icon {...props} icon="translate" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Language')}
            />
            <Divider />
            <List.Item
              title="Currency"
              description="USD"
              left={props => <List.Icon {...props} icon="currency-usd" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Currency')}
            />
          </Card.Content>
        </Card>

        {/* Data Management */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Data Management</Title>
            <List.Item
              title="Export Data"
              description="Download your data"
              left={props => <List.Icon {...props} icon="download" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Export Data')}
            />
            <Divider />
            <List.Item
              title="Backup Data"
              description="Backup to cloud"
              left={props => <List.Icon {...props} icon="cloud-upload" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Backup Data')}
            />
            <Divider />
            <List.Item
              title="Clear Cache"
              description="Free up storage space"
              left={props => <List.Icon {...props} icon="delete-sweep" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => Alert.alert('Clear Cache', 'Cache cleared successfully!')}
            />
          </Card.Content>
        </Card>

        {/* Support */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Support & Help</Title>
            <List.Item
              title="Help Center"
              description="Get help and support"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Help Center')}
            />
            <Divider />
            <List.Item
              title="Contact Support"
              description="Get in touch with us"
              left={props => <List.Icon {...props} icon="message" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Contact Support')}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              description="Read our privacy policy"
              left={props => <List.Icon {...props} icon="file-document" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Privacy Policy')}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              description="Read our terms"
              left={props => <List.Icon {...props} icon="file-document-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => handleMenuPress('Terms of Service')}
            />
          </Card.Content>
        </Card>

        {/* App Info */}
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>App Information</Title>
            <List.Item
              title="Version"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information" />}
            />
          </Card.Content>
        </Card>

        {/* Logout Button */}
        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          contentStyle={styles.logoutButtonContent}
        >
          Logout
        </Button>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  avatar: {
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  industryChip: {
    marginTop: 8,
    alignSelf: 'flex-start'
  },
  sectionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  industryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  industryLabel: {
    fontSize: 16,
  },
  industryPreview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorPreview: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    opacity: 0.7,
    marginBottom: 8,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 16,
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});

export default SettingsScreen;