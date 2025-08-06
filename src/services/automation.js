import { WebhookService } from './webhook';
import { EmailService } from './email';
import { SMSService } from './sms';
import { AirtableService } from './airtable';
import { OpenAIService } from './openai';

export const AutomationService = {
  // Complete lead processing workflow
  processNewLead: async (leadData) => {
    try {
      console.log('🚀 Starting lead processing workflow for:', leadData.name);
      const results = {
        leadStored: false,
        aiQualified: false,
        webhookTriggered: false,
        emailSent: false,
        smsSent: false,
        errors: []
      };

      // Step 1: Store lead in Airtable
      try {
        const storeResult = await AirtableService.addLead(leadData);
        if (storeResult.success) {
          results.leadStored = true;
          leadData.airtableId = storeResult.lead.id;
          console.log('✅ Lead stored in Airtable');
        } else {
          results.errors.push('Failed to store lead: ' + storeResult.error);
        }
      } catch (error) {
        results.errors.push('Airtable error: ' + error.message);
      }

      // Step 2: AI Lead Qualification
      try {
        const qualificationResult = await OpenAIService.qualifyLead(leadData);
        if (qualificationResult.success) {
          results.aiQualified = true;
          leadData.aiQualification = qualificationResult.qualification;
          
          // Update lead with AI insights
          if (leadData.airtableId) {
            await AirtableService.updateLeadInsights(leadData.airtableId, {
              'Lead Score': qualificationResult.qualification.score,
              'AI Qualification': qualificationResult.qualification.qualification,
              'AI Reasoning': qualificationResult.qualification.reasoning,
              'Next Action': qualificationResult.qualification.nextAction,
              'Priority': qualificationResult.qualification.priority
            });
          }
          console.log('✅ Lead qualified by AI:', qualificationResult.qualification.score + '/10');
        } else {
          results.errors.push('AI qualification failed: ' + qualificationResult.error);
        }
      } catch (error) {
        results.errors.push('AI qualification error: ' + error.message);
      }

      // Step 3: Trigger webhook for n8n workflow
      try {
        const webhookResult = await WebhookService.triggerLeadCapture(leadData);
        if (webhookResult.success) {
          results.webhookTriggered = true;
          console.log('✅ n8n webhook triggered');
        } else {
          results.errors.push('Webhook failed: ' + webhookResult.error);
        }
      } catch (error) {
        results.errors.push('Webhook error: ' + error.message);
      }

      // Step 4: Send welcome email
      try {
        const emailResult = await EmailService.sendEmailSequence(leadData, 'welcome');
        if (emailResult.success) {
          results.emailSent = true;
          console.log('✅ Welcome email sent');
        } else {
          results.errors.push('Email failed: ' + emailResult.error);
        }
      } catch (error) {
        results.errors.push('Email error: ' + error.message);
      }

      // Step 5: Send welcome SMS (if phone provided)
      if (leadData.phone && SMSService.validatePhoneNumber(leadData.phone)) {
        try {
          const smsResult = await SMSService.sendSMSToLead(leadData, 'welcome');
          if (smsResult.success) {
            results.smsSent = true;
            console.log('✅ Welcome SMS sent');
          } else {
            results.errors.push('SMS failed: ' + smsResult.error);
          }
        } catch (error) {
          results.errors.push('SMS error: ' + error.message);
        }
      }

      // Step 6: Schedule follow-up actions based on AI score
      if (leadData.aiQualification) {
        const score = leadData.aiQualification.score;
        if (score >= 8) {
          // Hot lead - schedule immediate follow-up
          EmailService.scheduleEmail(leadData, 'followUp', 2); // 2 hours
          SMSService.scheduleSMS(leadData, 'followUp', 120); // 2 hours
        } else if (score >= 6) {
          // Warm lead - schedule follow-up in 24 hours
          EmailService.scheduleEmail(leadData, 'followUp', 24);
        } else {
          // Cold lead - add to nurture sequence
          EmailService.scheduleEmail(leadData, 'nurture', 72); // 3 days
        }
      }

      console.log('🎉 Lead processing workflow completed');
      return {
        success: true,
        results: results,
        message: 'Lead processing workflow completed',
        leadId: leadData.airtableId
      };

    } catch (error) {
      console.error('❌ Lead processing workflow failed:', error);
      return {
        success: false,
        error: error.message,
        results: results
      };
    }
  },

  // Test all automation services
  testAutomationServices: async () => {
    console.log('🧪 Testing all automation services...');
    const testResults = {
      airtable: false,
      openai: false,
      webhook: false,
      email: false,
      sms: false,
      errors: []
    };

    // Test Airtable
    try {
      const airtableTest = await AirtableService.testConnection();
      testResults.airtable = airtableTest.success;
      if (!airtableTest.success) {
        testResults.errors.push('Airtable: ' + airtableTest.error);
      }
    } catch (error) {
      testResults.errors.push('Airtable: ' + error.message);
    }

    // Test OpenAI
    try {
      const openaiTest = await OpenAIService.testConnection();
      testResults.openai = openaiTest.success;
      if (!openaiTest.success) {
        testResults.errors.push('OpenAI: ' + openaiTest.error);
      }
    } catch (error) {
      testResults.errors.push('OpenAI: ' + error.message);
    }

    // Test Webhook
    try {
      const webhookTest = await WebhookService.testWebhookConnection();
      testResults.webhook = webhookTest.success;
      if (!webhookTest.success) {
        testResults.errors.push('Webhook: ' + webhookTest.error);
      }
    } catch (error) {
      testResults.errors.push('Webhook: ' + error.message);
    }

    // Test Email
    try {
      const emailTest = await EmailService.testEmailService();
      testResults.email = emailTest.success;
      if (!emailTest.success) {
        testResults.errors.push('Email: ' + emailTest.error);
      }
    } catch (error) {
      testResults.errors.push('Email: ' + error.message);
    }

    // Test SMS
    try {
      const smsTest = await SMSService.testSMSService();
      testResults.sms = smsTest.success;
      if (!smsTest.success) {
        testResults.errors.push('SMS: ' + smsTest.error);
      }
    } catch (error) {
      testResults.errors.push('SMS: ' + error.message);
    }

    const totalServices = 5;
    const workingServices = Object.values(testResults).filter(result => result === true).length;
    const successRate = (workingServices / totalServices * 100).toFixed(1);

    return {
      success: workingServices === totalServices,
      results: testResults,
      summary: `${workingServices}/${totalServices} services working (${successRate}%)`,
      errors: testResults.errors
    };
  },

  // Trigger follow-up sequence
  triggerFollowUpSequence: async (leadData, sequenceType = 'followUp') => {
    try {
      const results = {
        emailSent: false,
        smsSent: false,
        webhookTriggered: false,
        errors: []
      };

      // Send follow-up email
      try {
        const emailResult = await EmailService.sendEmailSequence(leadData, sequenceType);
        if (emailResult.success) {
          results.emailSent = true;
        } else {
          results.errors.push('Email: ' + emailResult.error);
        }
      } catch (error) {
        results.errors.push('Email: ' + error.message);
      }

      // Send follow-up SMS
      if (leadData.phone) {
        try {
          const smsResult = await SMSService.sendSMSToLead(leadData, sequenceType);
          if (smsResult.success) {
            results.smsSent = true;
          } else {
            results.errors.push('SMS: ' + smsResult.error);
          }
        } catch (error) {
          results.errors.push('SMS: ' + error.message);
        }
      }

      // Trigger webhook
      try {
        const webhookResult = await WebhookService.triggerEmailSequence(leadData, sequenceType);
        if (webhookResult.success) {
          results.webhookTriggered = true;
        } else {
          results.errors.push('Webhook: ' + webhookResult.error);
        }
      } catch (error) {
        results.errors.push('Webhook: ' + error.message);
      }

      return {
        success: results.errors.length === 0,
        results: results,
        message: `${sequenceType} sequence triggered`
      };

    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};