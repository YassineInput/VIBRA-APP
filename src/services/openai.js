const OPENAI_API_KEY = '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'; // Replace with your actual API key

export const OpenAIService = {
  // Test basic ChatGPT API call
  testConnection: async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: 'Hello, this is a test connection.'
            }
          ],
          max_tokens: 50
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: data.choices[0].message.content
        };
      } else {
        return {
          success: false,
          error: data.error?.message || 'API call failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Lead qualification using AI
  qualifyLead: async (leadInfo) => {
    // Get industry-specific prompts
    const { ConfigService } = require('./config');
    const aiPrompts = ConfigService.getAIPrompts();
    
    const prompt = `
${aiPrompts.qualification || 'You are a professional lead qualification AI.'}
Analyze this lead and provide a qualification score from 1-10 and brief reasoning.

Lead Information:
- Name: ${leadInfo.name || 'Not provided'}
- Email: ${leadInfo.email || 'Not provided'}
- Phone: ${leadInfo.phone || 'Not provided'}
- Message: ${leadInfo.message || 'Not provided'}
- Source: ${leadInfo.source || 'Website'}

Respond in JSON format:
{
  "score": 8,
  "qualification": "Hot Lead",
  "reasoning": "Shows strong buying intent with specific requirements",
  "nextAction": "Schedule viewing appointment",
  "priority": "High"
}
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a professional lead qualification assistant. Always respond with valid JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 200,
          temperature: 0.3
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const aiResponse = data.choices[0].message.content;
        try {
          const qualification = JSON.parse(aiResponse);
          return {
            success: true,
            qualification: qualification
          };
        } catch (parseError) {
          return {
            success: false,
            error: 'Failed to parse AI response'
          };
        }
      } else {
        return {
          success: false,
          error: data.error?.message || 'API call failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Generate AI response for lead conversation
  generateResponse: async (conversation, leadContext) => {
    // Get current configuration and branding
    const { ConfigService } = require('./config');
    const config = ConfigService.getCurrentConfig();
    const branding = ConfigService.getBranding();
    const aiPrompts = ConfigService.getAIPrompts();
    
    const systemPrompt = `
You are an AI assistant for ${branding.appName} (${config.companyName}). 
${aiPrompts.conversation || 'You help qualify leads and provide excellent customer service.'}

Lead Context:
- Name: ${leadContext.name || 'Prospect'}
- Interest: ${leadContext.interest || 'General inquiry'}
- Budget: ${leadContext.budget || 'Not specified'}

Be professional, helpful, and focus on understanding their needs.
Keep responses concise and ask qualifying questions when appropriate.
`;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        ...conversation.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 150,
          temperature: 0.7
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        return {
          success: true,
          message: data.choices[0].message.content
        };
      } else {
        return {
          success: false,
          error: data.error?.message || 'API call failed'
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