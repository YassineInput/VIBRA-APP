import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, Animated, StatusBar } from 'react-native';
import { Button, TextInput, Title, Text, Surface, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Pulse animation for logo
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, []);

  const handleLogin = async () => {
    console.log('Login clicked', email, password);
    if (email && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLogin();
      }, 1500);
    } else {
      alert('Please enter email and password');
    }
  };

  const handleDemoLogin = async () => {
    console.log('Demo mode activated');
    setEmail('demo@vibra.com');
    setPassword('demo123');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <LinearGradient
        colors={['#000000', '#0a0a0a', '#000000']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Animated.View
              style={[
                styles.mainContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }
              ]}
            >
              {/* Background Decorative Elements */}
              <View style={styles.decorativeBackground}>
                <View style={[styles.decorativeCircle, styles.circle1]} />
                <View style={[styles.decorativeCircle, styles.circle2]} />
                <View style={[styles.decorativeCircle, styles.circle3]} />
              </View>

              {/* App Branding */}
              <Animated.View
                style={[
                  styles.brandSection,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <LinearGradient
                  colors={['#FFFFFF', '#E0E0E0']}
                  style={styles.logoContainer}
                >
                  <Text style={styles.logoText}>V</Text>
                </LinearGradient>
                <Title style={styles.appName}>Vibra</Title>
                <Title style={styles.welcomeText}>Welcome back</Title>
                <Text style={styles.subtitle}>Let's get you into the future</Text>
              </Animated.View>

              {/* Login Form */}
              <Card style={styles.formCard}>
                <Card.Content style={styles.formSection}>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Email address"
                      mode="outlined"
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      left={<TextInput.Icon icon="email-outline" />}
                      theme={{
                        colors: {
                          primary: '#FFFFFF',
                          background: '#0a0a0a',
                          surface: '#0a0a0a',
                          text: '#FFFFFF',
                          placeholder: '#9CA3AF',
                          outline: '#333333',
                          onSurfaceVariant: '#9CA3AF',
                        }
                      }}
                    />
                  </View>
            
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Password"
                      mode="outlined"
                      style={styles.input}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      left={<TextInput.Icon icon="lock-outline" />}
                      right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                      theme={{
                        colors: {
                          primary: '#FFFFFF',
                          background: '#0a0a0a',
                          surface: '#0a0a0a',
                          text: '#FFFFFF',
                          placeholder: '#9CA3AF',
                          outline: '#333333',
                          onSurfaceVariant: '#9CA3AF',
                        }
                      }}
                    />
                  </View>

                  {/* Sign In Button */}
                  <LinearGradient
                    colors={['#FFFFFF', '#F0F0F0']}
                    style={styles.signInButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Button
                      mode="contained"
                      onPress={handleLogin}
                      style={styles.signInButton}
                      contentStyle={styles.signInButtonContent}
                      labelStyle={styles.signInButtonLabel}
                      loading={isLoading}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </LinearGradient>

                  {/* Divider */}
                  <View style={styles.dividerContainer}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.dividerText}>or</Text>
                    <View style={styles.dividerLine} />
                  </View>

                  {/* Demo Mode Button */}
                  <Button
                    mode="outlined"
                    onPress={handleDemoLogin}
                    style={styles.demoButton}
                    contentStyle={styles.demoButtonContent}
                    labelStyle={styles.demoButtonLabel}
                    icon="play-circle-outline"
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Try Demo Mode'}
                  </Button>
                </Card.Content>
              </Card>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Secure • Private • Fast</Text>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    minHeight: height,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    position: 'relative',
  },
  decorativeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.03,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    top: 50,
    right: -50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: '#FFFFFF',
    bottom: 100,
    left: -30,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    top: '50%',
    right: 20,
  },
  brandSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
    zIndex: 1,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    fontWeight: '400',
  },
  formCard: {
    backgroundColor: 'rgba(17, 17, 17, 0.8)',
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.xs,
    ...shadows.large,
    borderWidth: 1,
    borderColor: '#333333',
  },
  formSection: {
    padding: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: '#0a0a0a',
    fontSize: 16,
  },
  signInButtonGradient: {
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  signInButton: {
    backgroundColor: 'transparent',
    borderRadius: borderRadius.md,
  },
  signInButtonContent: {
    paddingVertical: spacing.md + 2,
  },
  signInButtonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333333',
  },
  dividerText: {
    color: '#9CA3AF',
    fontSize: 14,
    marginHorizontal: spacing.md,
    fontWeight: '500',
  },
  demoButton: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    backgroundColor: 'transparent',
  },
  demoButtonContent: {
    paddingVertical: spacing.md + 2,
  },
  demoButtonLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    paddingBottom: spacing.lg,
  },
  footerText: {
    color: '#666666',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1,
  },
});
