import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Title, Button, Card, Text, Surface, Avatar, Chip } from 'react-native-paper';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';
import { AuthService } from '../services/auth';
import { OpenAIService } from '../services/openai';
import { AirtableService } from '../services/airtable';
import { AutomationService } from '../services/automation';
import { demoStats } from '../services/demoData';

const { width } = Dimensions.get('window');

export default function DashboardScreen({ navigation }) {
  const handleLogout = async () => {
    await AuthService.logout();
    navigation.replace('Login');
  };

  const testConnections = async () => {
    console.log('Testing all connections...');
    
    try {
      // Test OpenAI
      const openAITest = await OpenAIService.testConnection();
      console.log('OpenAI test:', openAITest);
      
      // Test Airtable
      const airtableTest = await AirtableService.testConnection();
      console.log('Airtable test:', airtableTest);
      
      if (openAITest.success && airtableTest.success) {
        alert(`All Systems Connected! ✅\n\nOpenAI: ${openAITest.message}\nAirtable: ${airtableTest.message}`);
      } else {
        alert('Some connections failed - check console');
      }
      
    } catch (error) {
      console.error('Connection test error:', error);
      alert('Error: ' + error.message);
    }
  };

  const testAutomation = async () => {
    console.log('Testing automation services...');
    
    try {
      const result = await AutomationService.testAutomationServices();
      console.log('Automation test results:', result);
      
      if (result.success) {
        alert(`🎉 All Automation Services Working!\n\n${result.summary}`);
      } else {
        alert(`⚠️ Automation Test Results:\n\n${result.summary}\n\nErrors:\n${result.errors.join('\n')}`);
      }
    } catch (error) {
      console.error('Automation test error:', error);
      alert('Automation test failed: ' + error.message);
    }
  };

  const testLeadWorkflow = async () => {
    console.log('Testing complete lead workflow...');
    
    try {
      const sampleLead = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        company: 'Test Company',
        message: 'Interested in your AI automation services',
        source: 'Mobile App Test'
      };

      const result = await AutomationService.processNewLead(sampleLead);
      console.log('Lead workflow results:', result);
      
      if (result.success) {
        const { results } = result;
        const successCount = Object.values(results).filter(r => r === true).length;
        alert(`🚀 Lead Workflow Test Complete!\n\n✅ Lead Stored: ${results.leadStored ? 'Yes' : 'No'}\n✅ AI Qualified: ${results.aiQualified ? 'Yes' : 'No'}\n✅ Webhook Triggered: ${results.webhookTriggered ? 'Yes' : 'No'}\n✅ Email Sent: ${results.emailSent ? 'Yes' : 'No'}\n✅ SMS Sent: ${results.smsSent ? 'Yes' : 'No'}\n\nErrors: ${results.errors.length}`);
      } else {
        alert(`❌ Lead Workflow Failed:\n\n${result.error}\n\nCheck console for details.`);
      }
    } catch (error) {
      console.error('Lead workflow test error:', error);
      alert('Lead workflow test failed: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Title style={styles.headerTitle}>Hello, Admin! 👋</Title>
            <Text style={styles.headerSubtitle}>This is what's happening in your leads this month.</Text>
          </View>
          <Avatar.Text size={40} label="A" style={styles.avatar} />
        </View>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Leads</Text>
          <Text style={styles.statValue}>{demoStats.totalLeads}</Text>
          <Text style={styles.statChange}>+12% from last month</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Qualified Leads</Text>
          <Text style={[styles.statValue, styles.qualifiedText]}>{demoStats.qualifiedLeads}</Text>
          <Text style={styles.statChange}>+8% from last month</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Conversion Rate</Text>
          <Text style={[styles.statValue, styles.conversionText]}>{demoStats.conversionRate}%</Text>
          <Text style={styles.statChange}>+5% from last month</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Revenue Generated</Text>
          <Text style={[styles.statValue, styles.revenueText]}>${demoStats.revenueGenerated}</Text>
          <Text style={styles.statChange}>+15% from last month</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('AddLead')}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            labelStyle={styles.actionButtonLabel}
          >
            Add New Lead
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Leads')}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            labelStyle={styles.outlinedButtonLabel}
          >
            View All Leads
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={() => navigation.navigate('Analytics')}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            labelStyle={styles.outlinedButtonLabel}
          >
            View Analytics
          </Button>
          
          <Button 
            mode="outlined" 
            onPress={testConnections}
            style={styles.actionButton}
            contentStyle={styles.actionButtonContent}
            labelStyle={styles.outlinedButtonLabel}
          >
            Test Connections
          </Button>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.recentActivityContainer}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>👤</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New lead added</Text>
              <Text style={styles.activitySubtitle}>John Doe from Tech Corp</Text>
              <Text style={styles.activityTime}>2 minutes ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>✅</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Lead qualified</Text>
              <Text style={styles.activitySubtitle}>Sarah Smith from Innovate Inc</Text>
              <Text style={styles.activityTime}>15 minutes ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>💰</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Deal closed</Text>
              <Text style={styles.activitySubtitle}>Mike Johnson from StartupXYZ</Text>
              <Text style={styles.activityTime}>1 hour ago</Text>
            </View>
          </View>
        </View>
      </View>

      {/* System Status */}
      <View style={styles.systemStatusContainer}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <View style={styles.statusGrid}>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>AI Service</Text>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.statusOnline]} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Database</Text>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.statusOnline]} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>Automation</Text>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.statusOnline]} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
          
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>API</Text>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, styles.statusOnline]} />
              <Text style={styles.statusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#000000',
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
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
  avatar: {
    backgroundColor: '#FFFFFF',
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statCard: {
    backgroundColor: '#111111',
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  statLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  qualifiedText: {
    color: '#00FF88',
  },
  conversionText: {
    color: '#00FF88',
  },
  revenueText: {
    color: '#00FF88',
  },
  statChange: {
    fontSize: 12,
    color: '#666666',
  },
  quickActionsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    marginBottom: spacing.md,
    backgroundColor: '#FFFFFF',
    borderColor: '#333333',
  },
  actionButtonContent: {
    paddingVertical: spacing.sm,
  },
  actionButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  outlinedButtonLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  recentActivityContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  activityCard: {
    backgroundColor: '#111111',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    ...shadows.medium,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityIconText: {
    fontSize: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
  },
  systemStatusContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusCard: {
    backgroundColor: '#111111',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    width: '48%',
    marginBottom: spacing.md,
    ...shadows.small,
  },
  statusLabel: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  statusOnline: {
    backgroundColor: '#00FF88',
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});