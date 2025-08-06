import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
  }

  async login(email, password) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        if (email && password) {
          const userData = {
            id: 1,
            email: email,
            name: 'John Doe',
            avatar: null,
          };
          
          try {
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            await AsyncStorage.setItem('isAuthenticated', 'true');
            this.isAuthenticated = true;
            this.user = userData;
            resolve(userData);
          } catch (error) {
            reject(new Error('Failed to save user data'));
          }
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async logout() {
    try {
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('isAuthenticated');
      this.isAuthenticated = false;
      this.user = null;
      return true;
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }

  async checkAuthStatus() {
    try {
      const isAuth = await AsyncStorage.getItem('isAuthenticated');
      const userData = await AsyncStorage.getItem('user');
      
      if (isAuth === 'true' && userData) {
        this.isAuthenticated = true;
        this.user = JSON.parse(userData);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  getCurrentUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}

export default new AuthService();