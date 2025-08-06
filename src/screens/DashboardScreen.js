import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions, StatusBar } from 'react-native';
import { Title, Button, Card, Text, Surface, Avatar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';
import MetricCard from '../components/MetricCard';
import SimpleChart from '../components/SimpleChart';
import SimpleDonutChart from '../components/SimpleDonutChart';
import OrderStats from '../components/OrderStats';
import { demoStats } from '../services/demoData';

const { width, height } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <View style={styles.searchContainer}>
                <Icon name="magnify" size={20} color="#9CA3AF" style={styles.searchIcon} />
                <Text style={styles.searchText}>Search</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.dateText}>{getCurrentDate()}</Text>
              <View style={styles.headerIcons}>
                <Icon name="cog-outline" size={20} color="#9CA3AF" style={styles.headerIcon} />
                <Icon name="bell-outline" size={20} color="#9CA3AF" style={styles.headerIcon} />
                <Avatar.Text size={32} label="B" style={styles.avatar} />
              </View>
            </View>
          </View>

          <View style={styles.greeting}>
            <Title style={styles.greetingTitle}>Hello, Barbara!👋</Title>
            <Text style={styles.greetingSubtitle}>This is what's happening in your store this month.</Text>
            <View style={styles.periodSelector}>
              <Text style={styles.periodText}>This month</Text>
              <Icon name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricsRow}>
            <MetricCard
              title="Total revenue"
              value="$ 99,560"
              trend="up"
              trendValue="+3.2%"
              icon="chart-line"
              color="#3B82F6"
              size="medium"
            />
            <MetricCard
              title="Total orders"
              value="35"
              trend="down"
              trendValue="-2.5%"
              subtitle="This month vs last"
              backgroundColor="#111111"
            />
          </View>

          <View style={styles.metricsRow}>
            <MetricCard
              title="Total visitors"
              value="45,600"
              trend="down"
              trendValue="-1.2%"
              subtitle="This month vs last"
              backgroundColor="#111111"
            />
            <MetricCard
              title="Net profit"
              value="$ 60,450"
              trend="up"
              trendValue="+3.5%"
              subtitle="This month vs last"
              color="#00FF88"
            />
          </View>
        </View>

        {/* Revenue Chart */}
        <View style={styles.chartSection}>
          <SimpleChart />
        </View>

        {/* Sales by Category and Order Stats */}
        <View style={styles.bottomSection}>
          <SimpleDonutChart />
          <OrderStats />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: 200,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: spacing.sm,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: spacing.md,
  },
  avatar: {
    backgroundColor: '#4F46E5',
    marginLeft: spacing.md,
  },
  greeting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    maxWidth: '60%',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    marginTop: spacing.sm,
  },
  periodText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginRight: spacing.xs,
  },
  metricsGrid: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  chartSection: {
    paddingHorizontal: spacing.lg,
  },
  bottomSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
