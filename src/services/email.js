// Email automation service using Brevo (SendinBlue) API
const BREVO_API_KEY = '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'; // Replace with your actual API key
const BREVO_API_URL = 'https://api.brevo.com/v3';

export const EmailService = {
  // Email templates
  templates: {
    welcome: {
      subject: 'Welcome to LeadGenius Pro!',
      content: `
        <h2>Welcome {{firstName}}!</h2>
        <p>Thank you for your interest in our services. We're excited to help you achieve your goals.</p>
        <p>Our team will be in touch with you shortly to discuss your needs in detail.</p>
        <p>Best regards,<br>The LeadGenius Pro Team</p>
      `
    },
    followUp: {
      subject: 'Following up on your inquiry',
      content: `
        <h2>Hi {{firstName}},</h2>
        <p>I wanted to follow up on your recent inquiry about our services.</p>
        <p>Based on your information, I believe we can help you with:</p>
        <ul>
          <li>Automated lead generation</li>
          <li>AI-powered lead qualification</li>
          <li>Streamlined follow-up processes</li>
        </ul>
        <p>Would you like to schedule a quick 15-minute call to discuss your specific needs?</p>
        <p>Best regards,<br>Your LeadGenius Pro Representative</p>
      `
    },
    nurture: {
      subject: 'Exclusive insights for {{firstName}}',
      content: `
        <h2>Hi {{firstName}},</h2>
        <p>I hope this email finds you well. I wanted to share some valuable insights that might interest you:</p>
        <h3>Latest Industry Trends:</h3>
        <ul>
          <li>AI automation is increasing lead conversion by 40%</li>
          <li>Personalized follow-ups improve response rates by 65%</li>
          <li>Real-time lead scoring helps prioritize high-value prospects</li>
        </ul>
        <p>If you'd like to learn how these trends can benefit your business, I'd be happy to share more details.</p>
        <p>Best regards,<br>Your LeadGenius Pro Team</p>
      `
    }
  },

  // Send email using Brevo API
  sendEmail: async (to, templateType, personalizations = {}) => {
    try {
      const template = EmailService.templates[templateType];
      if (!template) {
        return {
          success: false,
          error: 'Invalid template type'
        };
      }

      // Replace placeholders with personalized data
      let subject = template.subject;
      let content = template.content;
      
      Object.keys(personalizations).forEach(key => {
        const placeholder = `{{${key}}}`;
        subject = subject.replace(new RegExp(placeholder, 'g'), personalizations[key]);
        content = content.replace(new RegExp(placeholder, 'g'), personalizations[key]);
      });

      const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          sender: {
            name: 'LeadGenius Pro',
            email: 'noreply@leadgeniuspro.com'
          },
          to: [{
            email: to,
            name: personalizations.firstName || 'Valued Customer'
          }],
          subject: subject,
          htmlContent: content
        })
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          messageId: result.messageId,
          message: 'Email sent successfully'
        };
      } else {
        const error = await response.json();
        return {
          success: false,
          error: error.message || 'Failed to send email'
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Send email sequence
  sendEmailSequence: async (leadData, sequenceType = 'welcome') => {
    try {
      const personalizations = {
        firstName: leadData.name?.split(' ')[0] || 'there',
        fullName: leadData.name || 'Valued Customer',
        email: leadData.email,
        company: leadData.company || 'your company'
      };

      const result = await EmailService.sendEmail(
        leadData.email, 
        sequenceType, 
        personalizations
      );

      if (result.success) {
        console.log(`${sequenceType} email sent to ${leadData.email}`);
        return {
          success: true,
          message: `${sequenceType} email sent successfully`,
          messageId: result.messageId
        };
      } else {
        return result;
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Test email service
  testEmailService: async (testEmail = 'test@example.com') => {
    try {
      const result = await EmailService.sendEmail(testEmail, 'welcome', {
        firstName: 'Test User'
      });

      if (result.success) {
        return {
          success: true,
          message: 'Email service is working correctly',
          messageId: result.messageId
        };
      } else {
        return {
          success: false,
          error: 'Email service test failed: ' + result.error
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Email service test failed: ' + error.message
      };
    }
  },

  // Schedule delayed email (would integrate with n8n for actual scheduling)
  scheduleEmail: async (leadData, templateType, delayHours = 24) => {
    try {
      // In a real implementation, this would create a scheduled task in n8n
      // For now, we'll just log the scheduling request
      console.log(`Email scheduled: ${templateType} for ${leadData.email} in ${delayHours} hours`);
      
      return {
        success: true,
        message: `Email scheduled for ${delayHours} hours from now`,
        scheduledFor: new Date(Date.now() + delayHours * 60 * 60 * 1000).toISOString()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};