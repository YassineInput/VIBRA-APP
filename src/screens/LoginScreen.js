import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, TextInput, Title, Text, Surface } from 'react-native-paper';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Login clicked', email, password);
    if (email && password) {
      onLogin();
    } else {
      alert('Please enter email and password');
    }
  };

  const handleDemoLogin = () => {
    console.log('Demo mode activated');
    setEmail('demo@vibra.com');
    setPassword('demo123');
    onLogin();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* App Branding */}
          <View style={styles.brandSection}>
            <Title style={styles.appName}>Vibra</Title>
            <Title style={styles.welcomeText}>Welcome back</Title>
            <Text style={styles.subtitle}>Let's get you into Vibra</Text>
          </View>

          {/* Login Form */}
          <View style={styles.formSection}>
            <TextInput 
              placeholder="Your Email" 
              mode="flat" 
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              theme={{
                colors: {
                  primary: '#FFFFFF',
                  background: 'transparent',
                  surface: 'transparent',
                  text: '#FFFFFF',
                  placeholder: '#9CA3AF',
                  outline: 'transparent',
                }
              }}
            />
            
            <TextInput 
              placeholder="Your Password" 
              mode="flat" 
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
              theme={{
                colors: {
                  primary: '#FFFFFF',
                  background: 'transparent',
                  surface: 'transparent',
                  text: '#FFFFFF',
                  placeholder: '#9CA3AF',
                  outline: 'transparent',
                }
              }}
            />

            {/* Sign In Button */}
            <Button 
              mode="contained" 
              onPress={handleLogin}
              style={styles.signInButton}
              contentStyle={styles.signInButtonContent}
              labelStyle={styles.signInButtonLabel}
            >
              Sign in
            </Button>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <Text style={styles.dividerText}>or</Text>
            </View>

            {/* Demo Mode Button */}
            <Button 
              mode="outlined" 
              onPress={handleDemoLogin}
              style={styles.demoButton}
              contentStyle={styles.demoButtonContent}
              labelStyle={styles.demoButtonLabel}
              icon="play"
            >
              Try Demo Mode
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.lg,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
  },
  input: {
    marginBottom: spacing.lg,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  signInButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  signInButtonContent: {
    paddingVertical: spacing.md,
  },
  signInButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  dividerContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  demoButton: {
    borderColor: '#374151',
    borderRadius: borderRadius.md,
    backgroundColor: 'transparent',
  },
  demoButtonContent: {
    paddingVertical: spacing.md,
  },
  demoButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});