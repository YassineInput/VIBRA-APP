import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, StatusBar, FlatList } from 'react-native';
import { Text, Surface, Button, Chip, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';

const OrderListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'new', label: 'New orders', count: 12, color: '#3B82F6' },
    { id: 'awaiting', label: 'Await accepting orders', count: 20, color: '#F59E0B' },
    { id: 'onway', label: 'On way orders', count: 57, color: '#EF4444' },
    { id: 'delivered', label: 'Delivered orders', count: 98, color: '#10B981' },
  ];

  const orders = [
    {
      id: 'HOK50439',
      customer: 'Kris Payer',
      category: 'Laptops',
      price: '$1302.38',
      date: '26.03.2024',
      payment: 'PayPal',
      status: 'On way',
      statusColor: '#EF4444'
    },
    {
      id: 'HOK50439',
      customer: 'Kris Payer',
      category: 'Laptops',
      price: '$1302.38',
      date: '26.03.2024',
      payment: 'PayPal',
      status: 'Delivered',
      statusColor: '#10B981'
    },
    {
      id: 'HOK50439',
      customer: 'Kris Payer',
      category: 'Laptops',
      price: '$1302.38',
      date: '26.03.2024',
      payment: 'PayPal',
      status: 'New',
      statusColor: '#3B82F6'
    },
    {
      id: 'HOK50439',
      customer: 'Kris Payer',
      category: 'Laptops',
      price: '$1302.38',
      date: '26.03.2024',
      payment: 'PayPal',
      status: 'On way',
      statusColor: '#EF4444'
    },
    {
      id: 'HOK50439',
      customer: 'Kris Payer',
      category: 'Laptops',
      price: '$1302.38',
      date: '26.03.2024',
      payment: 'PayPal',
      status: 'Delivered',
      statusColor: '#10B981'
    },
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderRow}>
      <View style={styles.checkbox}>
        <Icon name="checkbox-blank-outline" size={20} color="#666666" />
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.id}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.customer}</Text>
        <Text style={styles.orderSubtext}>One Set Store</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.category}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.price}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.date}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.orderText}>{item.payment}</Text>
      </View>
      <View style={styles.orderCell}>
        <View style={[styles.statusChip, { backgroundColor: item.statusColor + '20' }]}>
          <Text style={[styles.statusText, { color: item.statusColor }]}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.orderCell}>
        <Icon name="dots-horizontal" size={20} color="#666666" />
      </View>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerTitle}>Order list</Text>
            </View>
            <View style={styles.headerRight}>
              <Icon name="cog-outline" size={20} color="#9CA3AF" style={styles.headerIcon} />
              <Icon name="bell-outline" size={20} color="#9CA3AF" style={styles.headerIcon} />
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>B</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Filter Cards */}
        <View style={styles.filtersContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <Surface
                key={filter.id}
                style={[
                  styles.filterCard,
                  { backgroundColor: filter.color + '20' }
                ]}
              >
                <Text style={[styles.filterCount, { color: filter.color }]}>
                  {filter.count}
                </Text>
                <Text style={styles.filterLabel}>{filter.label}</Text>
                <Text style={styles.filterSubtext}>from last week</Text>
              </Surface>
            ))}
          </ScrollView>
        </View>

        {/* Search and Controls */}
        <View style={styles.controlsContainer}>
          <View style={styles.searchContainer}>
            <Icon name="magnify" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <Text style={styles.searchText}>Search</Text>
            <Text style={styles.resultCount}>300 orders</Text>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => {}}
              style={styles.exportButton}
              labelStyle={styles.exportButtonLabel}
              icon="export"
            >
              Export
            </Button>
            
            <View style={styles.sortContainer}>
              <Text style={styles.sortText}>Sort: Start default</Text>
              <Icon name="chevron-down" size={16} color="#9CA3AF" />
            </View>
            
            <Button
              mode="contained"
              onPress={() => {}}
              style={styles.addButton}
              labelStyle={styles.addButtonLabel}
              icon="plus"
            >
              Add order
            </Button>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={styles.checkbox}>
            <Icon name="checkbox-blank-outline" size={20} color="#666666" />
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>ORDER NUMBER</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>CUSTOMER</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>CATEGORY</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>PRICE</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>DATE</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>PAYMENT</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>STATUS</Text>
          </View>
          <View style={styles.headerCell} />
        </View>

        {/* Orders List */}
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.ordersList}
          showsVerticalScrollIndicator={false}
        />

        {/* Pagination */}
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>1 - 10 of 35</Text>
          <View style={styles.paginationButtons}>
            <Icon name="chevron-left" size={20} color="#666666" />
            <Icon name="chevron-right" size={20} color="#666666" />
          </View>
        </View>
      </View>
    </>
  );
};

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
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: spacing.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  filtersContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  filterCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginRight: spacing.md,
    minWidth: 140,
    ...shadows.medium,
  },
  filterCount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  filterLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  filterSubtext: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  controlsContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchText: {
    color: '#9CA3AF',
    fontSize: 14,
    flex: 1,
  },
  resultCount: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exportButton: {
    borderColor: '#333333',
    borderRadius: 8,
  },
  exportButtonLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  sortText: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: spacing.xs,
  },
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  addButtonLabel: {
    color: '#000000',
    fontSize: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  checkbox: {
    width: 40,
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  ordersList: {
    flex: 1,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  orderCell: {
    flex: 1,
    alignItems: 'flex-start',
  },
  orderText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  orderSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  statusChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  paginationText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  paginationButtons: {
    flexDirection: 'row',
  },
});

export default OrderListScreen;
