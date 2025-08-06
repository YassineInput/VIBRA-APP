import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Title, TextInput, IconButton, Card, Text, Chip } from 'react-native-paper';
import { OpenAIService } from '../services/openai';
import { AirtableService } from '../services/airtable';

export default function ChatScreen({ route, navigation }) {
  const { lead } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message
    if (lead) {
      const welcomeMsg = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Hello! I'm here to help with ${lead.fields['Full Name'] || 'this lead'}. How can I assist you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMsg]);
    }
  }, [lead]);

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setLoading(true);
    setTyping(true);

    try {
      // Prepare conversation context for AI
      const conversation = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const leadContext = {
        name: lead?.fields['Full Name'] || 'Prospect',
        email: lead?.fields['Email'] || '',
        phone: lead?.fields['Phone'] || '',
        status: lead?.fields['Status'] || 'New',
        score: lead?.fields['Lead Score'] || 'Unknown',
        value: lead?.fields['Estimated Value'] || 'Unknown',
        source: lead?.fields['Lead Source'] || 'Unknown'
      };

      const result = await OpenAIService.generateResponse(conversation, leadContext);

      if (result.success) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: result.message,
          timestamp: new Date()
        };
        const updatedMessages = [...newMessages, aiMessage];
        setMessages(updatedMessages);

        // Store conversation in Airtable (every 5 messages to avoid spam)
        if (updatedMessages.length % 5 === 0 && lead?.id) {
          try {
            const summary = `Conversation with ${lead.fields['Full Name']} - ${updatedMessages.length} messages`;
            await AirtableService.storeConversation(lead.id, updatedMessages, summary);
          } catch (error) {
            console.error('Failed to store conversation:', error);
          }
        }
      } else {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.role === 'user' ? styles.userMessage : styles.aiMessage
    ]}>
      <Card style={[
        styles.messageCard,
        item.role === 'user' ? styles.userCard : styles.aiCard
      ]}>
        <Card.Content style={styles.messageContent}>
          <Text style={[
            styles.messageText,
            item.role === 'user' ? styles.userText : styles.aiText
          ]}>
            {item.content}
          </Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Title style={styles.title}>
          AI Chat - {lead?.fields['Full Name'] || 'New Lead'}
        </Title>
        {lead?.fields['Lead Score'] && (
          <Chip style={styles.scoreChip}>
            Score: {lead.fields['Lead Score']}/10
          </Chip>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        onLayout={() => flatListRef.current?.scrollToEnd()}
      />
      
      {typing && (
        <View style={styles.typingContainer}>
          <Card style={styles.typingCard}>
            <Card.Content style={styles.typingContent}>
              <Text style={styles.typingText}>AI is typing...</Text>
              <View style={styles.typingDots}>
                <Text style={styles.dot}>●</Text>
                <Text style={styles.dot}>●</Text>
                <Text style={styles.dot}>●</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          placeholder="Type your message..."
          value={inputText}
          onChangeText={setInputText}
          style={styles.textInput}
          multiline
          onSubmitEditing={sendMessage}
        />
        <IconButton
          icon="send"
          mode="contained"
          onPress={sendMessage}
          loading={loading}
          disabled={loading || !inputText.trim()}
          style={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    flex: 1
  },
  scoreChip: {
    backgroundColor: '#2196F3'
  },
  messagesList: {
    flex: 1,
    padding: 8
  },
  messageContainer: {
    marginVertical: 4,
    maxWidth: '80%'
  },
  userMessage: {
    alignSelf: 'flex-end'
  },
  aiMessage: {
    alignSelf: 'flex-start'
  },
  messageCard: {
    elevation: 1
  },
  userCard: {
    backgroundColor: '#2196F3'
  },
  aiCard: {
    backgroundColor: 'white'
  },
  messageContent: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4
  },
  userText: {
    color: 'white'
  },
  aiText: {
    color: '#333'
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.7
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    maxHeight: 100
  },
  sendButton: {
    backgroundColor: '#2196F3'
  },
  typingContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    maxWidth: '80%'
  },
  typingCard: {
    backgroundColor: '#f0f0f0',
    elevation: 1
  },
  typingContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  typingText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8
  },
  typingDots: {
    flexDirection: 'row'
  },
  dot: {
    fontSize: 12,
    color: '#2196F3',
    marginHorizontal: 1
  }
});