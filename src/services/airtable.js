const AIRTABLE_TOKEN = 'patZMdVjwxrYKVyVu.01c840deac620f8d8cd65f9cc7a0f0224dc8be77e8f261f000b638a196414b04'; // Replace with your token
const BASE_ID = 'appTDKfssjP24KSYv'; // Replace with your base ID

export const AirtableService = {
  // Test connection
  testConnection: async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Clients`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          message: `Connected! Found ${data.records.length} clients in database`,
          records: data.records
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.error?.message || 'Connection failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get all leads
  getLeads: async () => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Leads`, {
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          leads: data.records
        };
      } else {
        return {
          success: false,
          error: 'Failed to fetch leads'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Add new lead
  addLead: async (leadData) => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Leads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: leadData
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          lead: data.records[0]
        };
      } else {
        return {
          success: false,
          error: 'Failed to add lead'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Store conversation in Airtable
  storeConversation: async (leadId, conversation, summary) => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Conversations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              'Lead ID': leadId,
              'Conversation': JSON.stringify(conversation),
              'Summary': summary,
              'Date': new Date().toISOString(),
              'Message Count': conversation.length
            }
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          conversation: data.records[0]
        };
      } else {
        return {
          success: false,
          error: 'Failed to store conversation'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Update lead with AI insights
  updateLeadInsights: async (leadId, insights) => {
    try {
      const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/Leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: insights
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          lead: data
        };
      } else {
        return {
          success: false,
          error: 'Failed to update lead insights'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};