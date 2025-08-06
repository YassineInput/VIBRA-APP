import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const OrderStats = () => {
  return (
    <View style={styles.container}>
      {/* Orders Card */}
      <Surface style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <View style={styles.statsIconContainer}>
            <Icon name="package-variant" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.statsContent}>
          <Text style={styles.statsValue}>98</Text>
          <Text style={styles.statsLabel}>orders</Text>
          <Text style={styles.statsSubtext}>32 orders are awaiting confirmation</Text>
        </View>
      </Surface>

      {/* Customers Card */}
      <Surface style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <View style={styles.statsIconContainer}>
            <Icon name="account-group" size={24} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.statsContent}>
          <Text style={styles.statsValue}>17</Text>
          <Text style={styles.statsLabel}>customers</Text>
          <Text style={styles.statsSubtext}>17 customers are waiting for response</Text>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  statsCard: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: spacing.lg,
    width: '48%',
    ...shadows.medium,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  statsHeader: {
    marginBottom: spacing.md,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContent: {
    alignItems: 'flex-start',
  },
  statsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: spacing.sm,
  },
  statsSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
});

export default OrderStats;
