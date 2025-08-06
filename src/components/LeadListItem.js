import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, Avatar, Surface } from 'react-native-paper';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

export default function LeadListItem({ lead, onPress }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return '#FFFFFF';
      case 'Qualified': return '#00FF88';
      case 'Hot': return '#FF4444';
      case 'Warm': return '#FFAA00';
      case 'Cold': return '#999999';
      case 'Converted': return '#00FF88';
      default: return '#FFFFFF';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#FF4444'; // Red - Hot
    if (score >= 6) return '#FFAA00'; // Orange - Warm  
    if (score >= 4) return '#FFFFFF'; // White - Medium
    return '#999999'; // Gray - Cold
  };

  const getScoreLabel = (score) => {
    if (score >= 8) return 'HOT';
    if (score >= 6) return 'WARM';
    if (score >= 4) return 'MEDIUM';
    return 'COLD';
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Surface style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <View style={styles.leadInfo}>
              <View style={styles.avatarContainer}>
                <Avatar.Text 
                  size={50} 
                  label={lead.fields['Full Name']?.charAt(0) || '?'} 
                  style={styles.avatar}
                  labelStyle={styles.avatarLabel}
                />
              </View>
              <View style={styles.details}>
                <Text style={styles.name}>{lead.fields['Full Name'] || 'Unknown'}</Text>
                <Text style={styles.email}>{lead.fields['Email'] || 'No email'}</Text>
                <Text style={styles.phone}>{lead.fields['Phone'] || 'No phone'}</Text>
                <Text style={styles.company}>{lead.fields['Company'] || 'No company'}</Text>
              </View>
            </View>
            <View style={styles.statusContainer}>
              <Chip 
                style={[styles.statusChip, { backgroundColor: getStatusColor(lead.fields['Status']) }]}
                textStyle={styles.statusText}
              >
                {lead.fields['Status'] || 'New'}
              </Chip>
              {lead.fields['Lead Score'] && (
                <View style={styles.scoreContainer}>
                  <View style={[styles.scoreBox, { backgroundColor: getScoreColor(lead.fields['Lead Score']) }]}>
                    <Text style={styles.scoreText}>{lead.fields['Lead Score']}/10</Text>
                  </View>
                  <Chip 
                    style={[styles.labelChip, { backgroundColor: getScoreColor(lead.fields['Lead Score']) }]}
                    textStyle={styles.labelText}
                  >
                    {getScoreLabel(lead.fields['Lead Score'])}
                  </Chip>
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.footer}>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Source</Text>
              <Text style={styles.footerValue}>{lead.fields['Lead Source'] || 'Unknown'}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Value</Text>
              <Text style={styles.footerValue}>${lead.fields['Estimated Value'] || '0'}</Text>
            </View>
            <View style={styles.footerItem}>
              <Text style={styles.footerLabel}>Created</Text>
              <Text style={styles.footerValue}>
                {lead.fields['Created'] ? new Date(lead.fields['Created']).toLocaleDateString() : 'Unknown'}
              </Text>
            </View>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: spacing.sm,
    marginHorizontal: spacing.xs,
    borderRadius: borderRadius.lg,
    backgroundColor: '#111111',
    ...shadows.medium,
  },
  cardContent: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  leadInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    borderRadius: borderRadius.full,
    padding: 2,
    marginRight: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    backgroundColor: '#000000',
  },
  avatarLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  phone: {
    fontSize: 14,
    color: '#999999',
    marginBottom: spacing.xs,
  },
  company: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusChip: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.full,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
  },
  scoreBox: {
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginBottom: spacing.xs,
  },
  scoreText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelChip: {
    borderRadius: borderRadius.full,
  },
  labelText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerItem: {
    alignItems: 'center',
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: spacing.xs,
  },
  footerValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});