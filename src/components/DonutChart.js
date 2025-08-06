import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { VictoryPie, VictoryContainer } from 'victory-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const DonutChart = ({ data, title = "Sales by Category", period = "This month vs last" }) => {
  // Sample data if none provided
  const chartData = data || [
    { category: "Apple MacBook Air M2", value: 35, color: "#3B82F6" },
    { category: "Apple Watch Series 9", value: 25, color: "#10B981" },
    { category: "AirPods 3rd Generation", value: 20, color: "#F59E0B" },
    { category: "AirPods Devon Simplified", value: 15, color: "#EF4444" },
    { category: "Others", value: 5, color: "#8B5CF6" },
  ];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

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

      <View style={styles.content}>
        <View style={styles.chartContainer}>
          <VictoryPie
            data={chartData}
            x="category"
            y="value"
            width={160}
            height={160}
            innerRadius={50}
            padAngle={2}
            colorScale={chartData.map(item => item.color)}
            labelComponent={<></>}
            standalone={false}
          />
          <View style={styles.centerText}>
            <Text style={styles.centerValue}>{total}</Text>
            <Text style={styles.centerLabel}>Total</Text>
          </View>
        </View>

        <View style={styles.legend}>
          {chartData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText} numberOfLines={1}>
                {item.category}
              </Text>
            </View>
          ))}
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
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
    marginRight: spacing.lg,
  },
  centerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  centerLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  legend: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  legendText: {
    fontSize: 12,
    color: '#FFFFFF',
    flex: 1,
  },
});

export default DonutChart;
