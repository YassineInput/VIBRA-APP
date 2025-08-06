import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const SimpleChart = ({ data, title = "Revenue", period = "This month vs last" }) => {
  // Sample data if none provided
  const chartData = data || [
    { month: "Jan", value: 45000 },
    { month: "Feb", value: 52000 },
    { month: "Mar", value: 48000 },
    { month: "Apr", value: 61000 },
    { month: "May", value: 55000 },
    { month: "Jun", value: 67000 },
    { month: "Jul", value: 59000 },
    { month: "Aug", value: 72000 },
  ];

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{period}</Text>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="dots-horizontal" size={20} color="#9CA3AF" />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {chartData.map((item, index) => {
            const height = (item.value / maxValue) * 120;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={styles.barBackground}>
                  <View 
                    style={[
                      styles.bar, 
                      { 
                        height: height,
                        backgroundColor: index % 2 === 0 ? '#60A5FA' : '#3B82F6'
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.barLabel}>{item.month}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111111',
    borderRadius: 12,
    padding: spacing.lg,
    marginVertical: spacing.md,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  iconContainer: {
    padding: spacing.xs,
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    height: 150,
    paddingHorizontal: spacing.sm,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barBackground: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  bar: {
    width: 16,
    borderRadius: 4,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});

export default SimpleChart;
