import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  useTheme,
  SegmentedButtons,
  Text,
  Surface,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { VictoryChart, VictoryLine, VictoryBar, VictoryPie, VictoryArea, VictoryAxis } from 'victory-native';
import { StatCard } from '../components';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';
import { formatCurrency } from '../utils/helpers';
import { AirtableService } from '../services/airtable';
import { RealtimeService } from '../services/realtime';

const { width } = Dimensions.get('window');

const AnalyticsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('month');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalLeads: 0,
    hotLeads: 0,
    warmLeads: 0,
    coldLeads: 0,
    convertedLeads: 0,
    averageScore: 0,
    totalValue: 0
  });

  // Real data for charts based on actual leads
  const leadStatusData = [
    { x: 'Hot', y: analytics.hotLeads },
    { x: 'Warm', y: analytics.warmLeads },
    { x: 'Cold', y: analytics.coldLeads },
    { x: 'Converted', y: analytics.convertedLeads },
  ];

  const conversionRate = analytics.totalLeads > 0 ? 
    ((analytics.convertedLeads / analytics.totalLeads) * 100).toFixed(1) : 0;

  // Sample trend data (in real app, this would come from historical data)
  const leadsTrendData = [
    { x: 'Week 1', y: Math.max(0, analytics.totalLeads - 20) },
    { x: 'Week 2', y: Math.max(0, analytics.totalLeads - 15) },
    { x: 'Week 3', y: Math.max(0, analytics.totalLeads - 8) },
    { x: 'Week 4', y: analytics.totalLeads },
  ];

  useEffect(() => {
    loadAnalytics();
    
    // Start auto-refresh for analytics
    RealtimeService.startAutoRefresh('analytics', loadAnalytics);
    
    return () => {
      RealtimeService.stopAutoRefresh('analytics');
    };
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const result = await AirtableService.getLeads();
      
      if (result.success) {
        setLeads(result.leads);
        calculateAnalytics(result.leads);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (leadsData) => {
    const totalLeads = leadsData.length;
    const hotLeads = leadsData.filter(lead => (lead.fields['Lead Score'] || 0) >= 8).length;
    const warmLeads = leadsData.filter(lead => {
      const score = lead.fields['Lead Score'] || 0;
      return score >= 6 && score < 8;
    }).length;
    const coldLeads = leadsData.filter(lead => (lead.fields['Lead Score'] || 0) < 6).length;
    const convertedLeads = leadsData.filter(lead => lead.fields['Status'] === 'Converted').length;
    
    const totalScore = leadsData.reduce((sum, lead) => sum + (lead.fields['Lead Score'] || 0), 0);
    const averageScore = totalLeads > 0 ? (totalScore / totalLeads).toFixed(1) : 0;
    
    const totalValue = leadsData.reduce((sum, lead) => sum + (lead.fields['Estimated Value'] || 0), 0);

    setAnalytics({
      totalLeads,
      hotLeads,
      warmLeads,
      coldLeads,
      convertedLeads,
      averageScore,
      totalValue
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Analytics</Title>
        <Text style={styles.headerSubtitle}>Track your lead performance</Text>
      </View>

      {/* Time Range Selector */}
      <View style={styles.timeSelectorContainer}>
        <SegmentedButtons
          value={timeRange}
          onValueChange={setTimeRange}
          buttons={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'quarter', label: 'Quarter' },
          ]}
          style={styles.segmentedButtons}
          theme={{
            colors: {
              primary: '#FFFFFF',
              onPrimary: '#000000',
              secondary: '#111111',
              onSecondary: '#FFFFFF',
            }
          }}
        />
      </View>

      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Leads</Text>
          <Text style={styles.metricValue}>{analytics.totalLeads}</Text>
          <Text style={styles.metricChange}>+12% from last period</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Hot Leads</Text>
          <Text style={[styles.metricValue, styles.hotText]}>{analytics.hotLeads}</Text>
          <Text style={styles.metricChange}>+8% from last period</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Conversion Rate</Text>
          <Text style={[styles.metricValue, styles.conversionText]}>{conversionRate}%</Text>
          <Text style={styles.metricChange}>+5% from last period</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>Total Value</Text>
          <Text style={[styles.metricValue, styles.valueText]}>${formatCurrency(analytics.totalValue)}</Text>
          <Text style={styles.metricChange}>+15% from last period</Text>
        </View>
      </View>

      {/* Charts */}
      <View style={styles.chartsContainer}>
        {/* Lead Status Distribution */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Lead Status Distribution</Text>
          <VictoryChart width={width - 80} height={200}>
            <VictoryPie
              data={leadStatusData}
              colorScale={['#FF4444', '#FFAA00', '#999999', '#00FF88']}
              innerRadius={50}
              labelRadius={({ innerRadius }) => innerRadius + 35}
              style={{ labels: { fill: '#FFFFFF', fontSize: 12 } }}
            />
          </VictoryChart>
        </View>

        {/* Leads Trend */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Leads Trend</Text>
          <VictoryChart width={width - 80} height={200}>
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: '#333333' },
                tickLabels: { fill: '#FFFFFF', fontSize: 10 }
              }}
            />
            <VictoryAxis
              style={{
                axis: { stroke: '#333333' },
                tickLabels: { fill: '#FFFFFF', fontSize: 10 }
              }}
            />
            <VictoryLine
              data={leadsTrendData}
              style={{
                data: { stroke: '#00FF88', strokeWidth: 3 }
              }}
            />
          </VictoryChart>
        </View>
      </View>

      {/* Insights */}
      <View style={styles.insightsContainer}>
        <Text style={styles.insightsTitle}>Key Insights</Text>
        <View style={styles.insightsCard}>
          <View style={styles.insightItem}>
            <View style={styles.insightIcon}>
              <Text style={styles.insightIconText}>📈</Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Conversion Rate Up</Text>
              <Text style={styles.insightSubtitle}>Your conversion rate has increased by 15% this month</Text>
            </View>
          </View>
          
          <View style={styles.insightItem}>
            <View style={styles.insightIcon}>
              <Text style={styles.insightIconText}>🔥</Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Hot Leads Growing</Text>
              <Text style={styles.insightSubtitle}>You have 25% more hot leads than last month</Text>
            </View>
          </View>
          
          <View style={styles.insightItem}>
            <View style={styles.insightIcon}>
              <Text style={styles.insightIconText}>💰</Text>
            </View>
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Revenue Increase</Text>
              <Text style={styles.insightSubtitle}>Total lead value increased by $45,000</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999999',
  },
  timeSelectorContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  segmentedButtons: {
    backgroundColor: '#111111',
  },
  metricsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  metricCard: {
    backgroundColor: '#111111',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  metricLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  hotText: {
    color: '#FF4444',
  },
  conversionText: {
    color: '#00FF88',
  },
  valueText: {
    color: '#00FF88',
  },
  metricChange: {
    fontSize: 12,
    color: '#666666',
  },
  chartsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  chartCard: {
    backgroundColor: '#111111',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  insightsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  insightsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  insightsCard: {
    backgroundColor: '#111111',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.medium,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  insightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  insightIconText: {
    fontSize: 16,
  },
  insightContent: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  insightSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
});

export default AnalyticsScreen;