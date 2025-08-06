import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { 
  Title, 
  TextInput, 
  Button, 
  Card, 
  Text, 
  Chip,
  RadioButton,
  Checkbox
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AutomationService } from '../services/automation';

export default function AddLeadScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    source: 'Manual Entry',
    estimatedValue: '',
    priority: 'Medium'
  });
  const [loading, setLoading] = useState(false);
  const [triggerAutomation, setTriggerAutomation] = useState(true);
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true);
  const [sendWelcomeSMS, setSendWelcomeSMS] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const leadData = {
        'Full Name': formData.name,
        'Email': formData.email,
        'Phone': formData.phone,
        'Company': formData.company,
        'Message': formData.message,
        'Lead Source': formData.source,
        'Estimated Value': parseFloat(formData.estimatedValue) || 0,
        'Priority': formData.priority,
        'Status': 'New',
        'Created Date': new Date().toISOString()
      };

      if (triggerAutomation) {
        // Use full automation workflow
        const result = await AutomationService.processNewLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: formData.source,
          estimatedValue: parseFloat(formData.estimatedValue) || 0
        });

        if (result.success) {
          const { results } = result;
          let successMessage = '🎉 Lead Added Successfully!\n\n';
          
          if (results.leadStored) successMessage += '✅ Stored in database\n';
          if (results.aiQualified) successMessage += '✅ AI qualification completed\n';
          if (results.webhookTriggered) successMessage += '✅ Automation workflow triggered\n';
          if (results.emailSent) successMessage += '✅ Welcome email sent\n';
          if (results.smsSent) successMessage += '✅ Welcome SMS sent\n';
          
          if (results.errors.length > 0) {
            successMessage += `\n⚠️ ${results.errors.length} minor issues occurred`;
          }

          Alert.alert('Success', successMessage, [
            { text: 'Add Another', onPress: resetForm },
            { text: 'View Leads', onPress: () => navigation.navigate('Leads') }
          ]);
        } else {
          Alert.alert('Error', 'Failed to process lead: ' + result.error);
        }
      } else {
        // Simple lead addition without automation
        const { AirtableService } = require('../services/airtable');
        const result = await AirtableService.addLead(leadData);
        
        if (result.success) {
          Alert.alert('Success', 'Lead added successfully!', [
            { text: 'Add Another', onPress: resetForm },
            { text: 'View Leads', onPress: () => navigation.navigate('Leads') }
          ]);
        } else {
          Alert.alert('Error', 'Failed to add lead: ' + result.error);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
      source: 'Manual Entry',
      estimatedValue: '',
      priority: 'Medium'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Title style={styles.title}>Add New Lead</Title>
          <Text style={styles.subtitle}>Enter lead information and trigger automation</Text>
        </View>

        <Card style={styles.formCard}>
          <Card.Content>
            <TextInput
              label="Full Name *"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Email Address *"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              label="Phone Number"
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              mode="outlined"
              keyboardType="phone-pad"
              style={styles.input}
            />

            <TextInput
              label="Company"
              value={formData.company}
              onChangeText={(value) => handleInputChange('company', value)}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Message/Notes"
              value={formData.message}
              onChangeText={(value) => handleInputChange('message', value)}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
            />

            <TextInput
              label="Estimated Value ($)"
              value={formData.estimatedValue}
              onChangeText={(value) => handleInputChange('estimatedValue', value)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
            />

            <Text style={styles.sectionTitle}>Lead Source</Text>
            <View style={styles.chipContainer}>
              {['Manual Entry', 'Website', 'Social Media', 'Referral', 'Cold Outreach', 'Event'].map((source) => (
                <Chip
                  key={source}
                  selected={formData.source === source}
                  onPress={() => handleInputChange('source', source)}
                  style={styles.chip}
                >
                  {source}
                </Chip>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Priority Level</Text>
            <RadioButton.Group
              onValueChange={(value) => handleInputChange('priority', value)}
              value={formData.priority}
            >
              <View style={styles.radioContainer}>
                <RadioButton.Item label="High" value="High" />
                <RadioButton.Item label="Medium" value="Medium" />
                <RadioButton.Item label="Low" value="Low" />
              </View>
            </RadioButton.Group>
          </Card.Content>
        </Card>

        <Card style={styles.automationCard}>
          <Card.Content>
            <Title style={styles.cardTitle}>Automation Settings</Title>
            
            <View style={styles.checkboxContainer}>
              <Checkbox
                status={triggerAutomation ? 'checked' : 'unchecked'}
                onPress={() => setTriggerAutomation(!triggerAutomation)}
              />
              <Text style={styles.checkboxLabel}>
                Trigger full automation workflow (AI qualification, email, SMS)
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={sendWelcomeEmail ? 'checked' : 'unchecked'}
                onPress={() => setSendWelcomeEmail(!sendWelcomeEmail)}
                disabled={!triggerAutomation}
              />
              <Text style={[styles.checkboxLabel, !triggerAutomation && styles.disabledText]}>
                Send welcome email
              </Text>
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                status={sendWelcomeSMS ? 'checked' : 'unchecked'}
                onPress={() => setSendWelcomeSMS(!sendWelcomeSMS)}
                disabled={!triggerAutomation}
              />
              <Text style={[styles.checkboxLabel, !triggerAutomation && styles.disabledText]}>
                Send welcome SMS (if phone provided)
              </Text>
            </View>

            {triggerAutomation && (
              <Text style={styles.automationNote}>
                ℹ️ With automation enabled, the lead will be:
                {'\n'}• Stored in Airtable
                {'\n'}• Qualified by AI (scored 1-10)
                {'\n'}• Added to email/SMS sequences
                {'\n'}• Assigned follow-up tasks
              </Text>
            )}
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.submitButton}
            contentStyle={styles.buttonContent}
          >
            {loading ? 'Processing...' : 'Add Lead & Trigger Automation'}
          </Button>

          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancel
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    padding: 16
  },
  header: {
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 4
  },
  formCard: {
    marginBottom: 16,
    elevation: 2
  },
  automationCard: {
    marginBottom: 20,
    elevation: 2
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 12
  },
  input: {
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  chip: {
    marginRight: 8,
    marginBottom: 8
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  checkboxLabel: {
    flex: 1,
    marginLeft: 8
  },
  disabledText: {
    opacity: 0.5
  },
  automationNote: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    fontSize: 14,
    lineHeight: 20
  },
  buttonContainer: {
    marginBottom: 20
  },
  submitButton: {
    marginBottom: 12
  },
  buttonContent: {
    paddingVertical: 8
  },
  cancelButton: {
    borderColor: '#666'
  }
});