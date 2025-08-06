import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Text, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StatCard = ({ title, value, icon, color, subtitle, onPress }) => {
  const theme = useTheme();
  
  return (
    <Card style={[styles.card, { backgroundColor: color || theme.colors.primary }]} onPress={onPress}>
      <Card.Content style={styles.content}>
        <View style={styles.header}>
          <Icon
            name={icon}
            size={32}
            color="#FFFFFF"
            style={styles.icon}
          />
          <Text style={styles.value}>{value}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 12,
    elevation: 3,
  },
  content: {
    paddingVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  icon: {
    margin: 0,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.8,
  },
});

export default StatCard;