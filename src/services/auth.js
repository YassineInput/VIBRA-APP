import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthService = {
  // Simple demo authentication - replace with real API later
  login: async (email, password) => {
    try {
      // Demo: Accept any email/password for now
      if (email && password) {
        const userData = {
          id: '1',
          email: email,
          name: 'Demo User',
          token: 'demo-token-' + Date.now()
        };
        
        await AsyncStorage.setItem('userToken', userData.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  },

  isLoggedIn: async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token !== null;
    } catch (error) {
      return false;
    }
  },

  getCurrentUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }
};