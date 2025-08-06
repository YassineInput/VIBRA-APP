import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from 'victory-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const { width } = Dimensions.get('window');

const RevenueChart = ({ data, title = "Revenue", period = "This month vs last" }) => {
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
        <VictoryChart
          theme={VictoryTheme.material}
          width={width - 100}
          height={200}
          padding={{ left: 40, right: 40, top: 20, bottom: 40 }}
          domainPadding={{ x: 20 }}
        >
          <VictoryAxis
            dependentAxis
            tickFormat={() => ''}
            style={{
              axis: { stroke: 'transparent' },
              grid: { stroke: '#333333', strokeWidth: 0.5 }
            }}
          />
          <VictoryAxis
            style={{
              axis: { stroke: 'transparent' },
              tickLabels: { 
                fill: '#9CA3AF', 
                fontSize: 12,
                fontFamily: 'System'
              }
            }}
          />
          <VictoryBar
            data={chartData}
            x="month"
            y="value"
            style={{
              data: { 
                fill: ({ datum, index }) => {
                  // Create gradient-like effect by varying blue intensity
                  const blues = ['#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'];
                  return index % 2 === 0 ? '#60A5FA' : '#3B82F6';
                }
              }
            }}
            cornerRadius={4}
            barWidth={20}
          />
        </VictoryChart>
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
    marginBottom: spacing.md,
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
});

export default RevenueChart;
