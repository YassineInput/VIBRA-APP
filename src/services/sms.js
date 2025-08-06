// SMS service using Textbelt API
const TEXTBELT_API_KEY = 'ec4c91076b077c6124d2a454850e8a9766eb64c5z6ZcUkGRMGT5TcOKzpDclKI3R'; // Replace with your actual API key
const TEXTBELT_API_URL = 'https://textbelt.com/text';

export const SMSService = {
  // SMS templates
  templates: {
    welcome: 'Hi {{firstName}}! Thank you for your interest in LeadGenius Pro. Our team will contact you shortly to discuss your needs. Reply STOP to opt out.',
    followUp: 'Hi {{firstName}}, this is a quick follow-up on your inquiry. Are you available for a brief call this week? Reply YES or NO.',
    reminder: 'Hi {{firstName}}, just a friendly reminder about our scheduled call today at {{time}}. Looking forward to speaking with you!',
    nurture: 'Hi {{firstName}}! Did you know that AI automation can increase your lead conversion by 40%? Let\'s discuss how this can benefit your business.',
    urgent: 'Hi {{firstName}}, we have an exclusive offer that expires soon. Would you like to learn more? Call us at (555) 123-4567.'
  },

  // Send SMS using Textbelt API
  sendSMS: async (phoneNumber, message, useKey = true) => {
    try {
      // Clean phone number (remove non-digits except +)
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
      
      const payload = {
        phone: cleanPhone,
        message: message,
      };

      // Add API key if available and requested
      if (useKey && TEXTBELT_API_KEY && TEXTBELT_API_KEY !== 'YOUR_TEXTBELT_API_KEY') {
        payload.key = TEXTBELT_API_KEY;
      }

      const response = await fetch(TEXTBELT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          return {
            success: true,
            messageId: result.textId,
            message: 'SMS sent successfully',
            quotaRemaining: result.quotaRemaining
          };
        } else {
          return {
            success: false,
            error: result.error || 'Failed to send SMS'
          };
        }
      } else {
        return {
          success: false,
          error: 'SMS API request failed'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Send templated SMS
  sendTemplatedSMS: async (phoneNumber, templateType, personalizations = {}) => {
    try {
      const template = SMSService.templates[templateType];
      if (!template) {
        return {
          success: false,
          error: 'Invalid template type'
        };
      }

      // Replace placeholders with personalized data
      let message = template;
      Object.keys(personalizations).forEach(key => {
        const placeholder = `{{${key}}}`;
        message = message.replace(new RegExp(placeholder, 'g'), personalizations[key]);
      });

      const result = await SMSService.sendSMS(phoneNumber, message);
      
      if (result.success) {
        console.log(`${templateType} SMS sent to ${phoneNumber}`);
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Send SMS to lead
  sendSMSToLead: async (leadData, templateType, customData = {}) => {
    try {
      if (!leadData.phone) {
        return {
          success: false,
          error: 'Lead has no phone number'
        };
      }

      const personalizations = {
        firstName: leadData.name?.split(' ')[0] || 'there',
        fullName: leadData.name || 'Valued Customer',
        company: leadData.company || 'your company',
        ...customData
      };

      return await SMSService.sendTemplatedSMS(
        leadData.phone,
        templateType,
        personalizations
      );
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Test SMS service
  testSMSService: async (testPhone = '+1234567890') => {
    try {
      const testMessage = 'This is a test message from LeadGenius Pro SMS service. Reply STOP to opt out.';
      const result = await SMSService.sendSMS(testPhone, testMessage);

      if (result.success) {
        return {
          success: true,
          message: 'SMS service is working correctly',
          messageId: result.messageId,
          quotaRemaining: result.quotaRemaining
        };
      } else {
        return {
          success: false,
          error: 'SMS service test failed: ' + result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'SMS service test failed: ' + error.message
      };
    }
  },

  // Check SMS quota (Textbelt specific)
  checkQuota: async () => {
    try {
      const response = await fetch('https://textbelt.com/quota/' + TEXTBELT_API_KEY);
      
      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          quotaRemaining: result.quotaRemaining,
          message: `You have ${result.quotaRemaining} SMS credits remaining`
        };
      } else {
        return {
          success: false,
          error: 'Failed to check SMS quota'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Validate phone number format
  validatePhoneNumber: (phoneNumber) => {
    // Basic phone number validation
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phoneNumber);
  },

  // Schedule SMS (would integrate with n8n for actual scheduling)
  scheduleSMS: async (leadData, templateType, delayMinutes = 60) => {
    try {
      // In a real implementation, this would create a scheduled task in n8n
      console.log(`SMS scheduled: ${templateType} for ${leadData.phone} in ${delayMinutes} minutes`);
      
      return {
        success: true,
        message: `SMS scheduled for ${delayMinutes} minutes from now`,
        scheduledFor: new Date(Date.now() + delayMinutes * 60 * 1000).toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};