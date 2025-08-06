import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon, 
  size = 'medium',
  color = '#FFFFFF',
  backgroundColor = '#111111'
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return '#00FF88';
    if (trend === 'down') return '#FF4444';
    return '#9CA3AF';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'trending-up';
    if (trend === 'down') return 'trending-down';
    return 'trending-neutral';
  };

  return (
    <Surface style={[
      styles.card, 
      size === 'large' ? styles.largeCard : styles.mediumCard,
      { backgroundColor }
    ]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
            <Icon name={icon} size={20} color={color} />
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={[styles.value, { color }]}>{value}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      {(trend || trendValue) && (
        <View style={styles.trendContainer}>
          {trend && (
            <Icon 
              name={getTrendIcon()} 
              size={16} 
              color={getTrendColor()} 
              style={styles.trendIcon} 
            />
          )}
          <Text style={[styles.trendText, { color: getTrendColor() }]}>
            {trendValue}
          </Text>
        </View>
      )}
    </Surface>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing.lg,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  mediumCard: {
    minHeight: 120,
  },
  largeCard: {
    minHeight: 140,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: spacing.sm,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  trendIcon: {
    marginRight: spacing.xs,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MetricCard;
