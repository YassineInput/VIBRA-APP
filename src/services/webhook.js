// Webhook service for triggering n8n workflows and handling automation
export const WebhookService = {
  // n8n webhook URLs (replace with your actual n8n instance URLs)
  webhooks: {
    leadCapture: 'https://your-n8n-instance.render.com/webhook/lead-capture',
    emailSequence: 'https://your-n8n-instance.render.com/webhook/email-sequence',
    smsNotification: 'https://your-n8n-instance.render.com/webhook/sms-notification',
    leadQualification: 'https://your-n8n-instance.render.com/webhook/lead-qualification'
  },

  // Trigger lead capture workflow
  triggerLeadCapture: async (leadData) => {
    try {
      const response = await fetch(WebhookService.webhooks.leadCapture, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lead_capture',
          data: leadData,
          timestamp: new Date().toISOString(),
          source: 'mobile_app'
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: 'Lead capture workflow triggered',
          workflowId: result.workflowId || 'unknown'
        };
      } else {
        return {
          success: false,
          error: 'Failed to trigger lead capture workflow'
        };
      }
    } catch (error) {
      console.error('Webhook error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Trigger email sequence workflow
  triggerEmailSequence: async (leadData, sequenceType = 'welcome') => {
    try {
      const response = await fetch(WebhookService.webhooks.emailSequence, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'email_sequence',
          sequenceType: sequenceType,
          lead: leadData,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: `${sequenceType} email sequence triggered for ${leadData.name}`
        };
      } else {
        return {
          success: false,
          error: 'Failed to trigger email sequence'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Trigger SMS notification workflow
  triggerSMSNotification: async (leadData, message, phoneNumber) => {
    try {
      const response = await fetch(WebhookService.webhooks.smsNotification, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'sms_notification',
          to: phoneNumber,
          message: message,
          lead: leadData,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: 'SMS notification sent successfully'
        };
      } else {
        return {
          success: false,
          error: 'Failed to send SMS notification'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Trigger lead qualification workflow
  triggerLeadQualification: async (leadData) => {
    try {
      const response = await fetch(WebhookService.webhooks.leadQualification, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'lead_qualification',
          lead: leadData,
          timestamp: new Date().toISOString(),
          requestAIAnalysis: true
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          message: 'Lead qualification workflow triggered',
          qualification: result.qualification || null
        };
      } else {
        return {
          success: false,
          error: 'Failed to trigger lead qualification'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Test webhook connectivity
  testWebhookConnection: async (webhookType = 'leadCapture') => {
    try {
      const webhookUrl = WebhookService.webhooks[webhookType];
      if (!webhookUrl) {
        return {
          success: false,
          error: 'Invalid webhook type'
        };
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'test',
          message: 'Testing webhook connectivity from mobile app',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        return {
          success: true,
          message: `${webhookType} webhook is working correctly`
        };
      } else {
        return {
          success: false,
          error: `${webhookType} webhook returned status: ${response.status}`
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Webhook connection failed: ${error.message}`
      };
    }
  },

  // Update webhook URLs (for configuration)
  updateWebhookUrls: (newWebhooks) => {
    WebhookService.webhooks = { ...WebhookService.webhooks, ...newWebhooks };
    console.log('Webhook URLs updated:', WebhookService.webhooks);
  }
};