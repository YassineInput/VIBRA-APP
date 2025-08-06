import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Dimensions, ScrollView } from 'react-native';
import { Title, Searchbar, FAB, Snackbar, Chip, Surface, Text } from 'react-native-paper';
import { customColors, shadows, spacing, borderRadius } from '../styles/theme';
import { AirtableService } from '../services/airtable';
import { RealtimeService } from '../services/realtime';
import { demoLeads } from '../services/demoData';
import LeadListItem from '../components/LeadListItem';

const { width } = Dimensions.get('window');

export default function LeadsScreen({ navigation }) {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [previousLeadCount, setPreviousLeadCount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    loadLeads();
    
    // Start auto-refresh
    RealtimeService.startAutoRefresh('leads', loadLeads);
    
    // Cleanup on unmount
    return () => {
      RealtimeService.stopAutoRefresh('leads');
    };
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchQuery, leads, selectedFilter]);

  useEffect(() => {
    // Check for new leads and notify
    if (leads.length > 0 && previousLeadCount > 0) {
      RealtimeService.checkForNewLeads(previousLeadCount, leads.length);
    }
    setPreviousLeadCount(leads.length);
  }, [leads]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      
      // Use demo data for now (in real app, this would be AirtableService.getLeads())
      // const result = await AirtableService.getLeads();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Use demo data
      setLeads(demoLeads);
      setError('');
    } catch (err) {
      setError('Error loading leads: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLeads();
    setRefreshing(false);
  };

  const filterLeads = () => {
    let filtered = leads;

    // Apply status filter
    if (selectedFilter !== 'All') {
      if (selectedFilter === 'Hot') {
        filtered = filtered.filter(lead => (lead.fields['Lead Score'] || 0) >= 8);
      } else if (selectedFilter === 'Warm') {
        filtered = filtered.filter(lead => {
          const score = lead.fields['Lead Score'] || 0;
          return score >= 6 && score < 8;
        });
      } else if (selectedFilter === 'Cold') {
        filtered = filtered.filter(lead => (lead.fields['Lead Score'] || 0) < 6);
      } else {
        filtered = filtered.filter(lead => lead.fields['Status'] === selectedFilter);
      }
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(lead => {
        const name = lead.fields['Full Name'] || '';
        const email = lead.fields['Email'] || '';
        const phone = lead.fields['Phone'] || '';
        
        return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               phone.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredLeads(filtered);
  };

  const handleLeadPress = (lead) => {
    // Navigate to lead details or edit screen
    console.log('Lead pressed:', lead);
  };

  const renderLead = ({ item }) => (
    <LeadListItem 
      lead={item} 
      onPress={() => handleLeadPress(item)}
    />
  );

  const getFilterColor = (filter) => {
    switch (filter) {
      case 'Hot':
        return '#FF4444';
      case 'Warm':
        return '#FFAA00';
      case 'Cold':
        return '#999999';
      case 'Qualified':
        return '#00FF88';
      case 'Converted':
        return '#00FF88';
      default:
        return '#FFFFFF';
    }
  };

  const filters = ['All', 'Hot', 'Warm', 'Cold', 'Qualified', 'Converted'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Leads</Title>
        <Text style={styles.headerSubtitle}>Manage your lead pipeline</Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search leads..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor="#FFFFFF"
          inputStyle={styles.searchInput}
          theme={{
            colors: {
              primary: '#FFFFFF',
              background: '#111111',
              surface: '#111111',
              text: '#FFFFFF',
              placeholder: '#999999',
            }
          }}
        />
      </View>

      {/* Filter Chips */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <Chip
            key={filter}
            selected={selectedFilter === filter}
            onPress={() => setSelectedFilter(filter)}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipSelected
            ]}
            textStyle={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextSelected
            ]}
            selectedColor={getFilterColor(filter)}
          >
            {filter}
          </Chip>
        ))}
      </ScrollView>

      {/* Leads List */}
      <FlatList
        data={filteredLeads}
        renderItem={renderLead}
        keyExtractor={(item) => item.id}
        style={styles.leadsList}
        contentContainerStyle={styles.leadsContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FFFFFF"
            colors={['#FFFFFF']}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddLead')}
        color="#000000"
      />

      {/* Error Snackbar */}
      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        style={styles.snackbar}
        theme={{
          colors: {
            surface: '#FF4444',
            onSurface: '#FFFFFF',
          }
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchbar: {
    backgroundColor: '#111111',
    borderRadius: borderRadius.md,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#333333',
  },
  searchInput: {
    color: '#FFFFFF',
  },
  filterContainer: {
    marginBottom: spacing.lg,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    marginRight: spacing.sm,
    backgroundColor: '#111111',
    borderColor: '#333333',
    borderWidth: 1,
  },
  filterChipSelected: {
    backgroundColor: '#222222',
    borderColor: '#FFFFFF',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  filterTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  leadsList: {
    flex: 1,
  },
  leadsContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  snackbar: {
    backgroundColor: '#FF4444',
  },
});