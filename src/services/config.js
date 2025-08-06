// White-label configuration service
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConfigService = {
  // Default configuration
  defaultConfig: {
    clientId: 'demo',
    companyName: 'LeadGenius Pro',
    logoUrl: null,
    primaryColor: '#2196F3',
    secondaryColor: '#1976D2',
    accentColor: '#FF9800',
    industry: 'general',
    features: {
      aiChat: true,
      analytics: true,
      automation: true,
      smsIntegration: true,
      emailIntegration: true
    },
    branding: {
      appName: 'LeadGenius Pro',
      tagline: 'AI-Powered Lead Management',
      supportEmail: 'support@leadgeniuspro.com',
      supportPhone: '+1 (555) 123-4567'
    }
  },

  // Industry-specific configurations
  industryConfigs: {
    realestate: {
      companyName: 'RealEstate Pro',
      primaryColor: '#4CAF50',
      secondaryColor: '#388E3C',
      accentColor: '#FF5722',
      branding: {
        appName: 'RealEstate Pro',
        tagline: 'Smart Real Estate Lead Management',
        supportEmail: 'support@realestatepro.com'
      },
      aiPrompts: {
        qualification: 'You are a real estate lead qualification AI. Focus on buyer/seller intent, budget, timeline, and property preferences.',
        conversation: 'You are a real estate assistant helping qualify property leads. Ask about budget, location preferences, timeline, and property type.'
      }
    },
    legal: {
      companyName: 'Legal Lead Manager',
      primaryColor: '#3F51B5',
      secondaryColor: '#303F9F',
      accentColor: '#FF9800',
      branding: {
        appName: 'Legal Lead Manager',
        tagline: 'Professional Legal Lead Management',
        supportEmail: 'support@legalleadmanager.com'
      },
      aiPrompts: {
        qualification: 'You are a legal lead qualification AI. Focus on case type, urgency, budget, and legal needs assessment.',
        conversation: 'You are a legal intake assistant. Help qualify legal leads by understanding their case type, urgency, and legal needs.'
      }
    },
    insurance: {
      companyName: 'Insurance Tracker',
      primaryColor: '#607D8B',
      secondaryColor: '#455A64',
      accentColor: '#4CAF50',
      branding: {
        appName: 'Insurance Tracker',
        tagline: 'Intelligent Insurance Lead Management',
        supportEmail: 'support@insurancetracker.com'
      },
      aiPrompts: {
        qualification: 'You are an insurance lead qualification AI. Focus on coverage needs, current policies, budget, and risk assessment.',
        conversation: 'You are an insurance advisor assistant. Help qualify insurance leads by understanding their coverage needs and current situation.'
      }
    },
    healthcare: {
      companyName: 'HealthLead Pro',
      primaryColor: '#E91E63',
      secondaryColor: '#C2185B',
      accentColor: '#00BCD4',
      branding: {
        appName: 'HealthLead Pro',
        tagline: 'Healthcare Lead Management System',
        supportEmail: 'support@healthleadpro.com'
      },
      aiPrompts: {
        qualification: 'You are a healthcare lead qualification AI. Focus on medical needs, insurance coverage, urgency, and service requirements.',
        conversation: 'You are a healthcare intake assistant. Help qualify patient leads by understanding their medical needs and coverage.'
      }
    },
    automotive: {
      companyName: 'AutoLead Manager',
      primaryColor: '#FF5722',
      secondaryColor: '#D84315',
      accentColor: '#2196F3',
      branding: {
        appName: 'AutoLead Manager',
        tagline: 'Drive More Sales with Smart Leads',
        supportEmail: 'support@autoleadmanager.com'
      },
      aiPrompts: {
        qualification: 'You are an automotive lead qualification AI. Focus on vehicle preferences, budget, timeline, trade-in, and financing needs.',
        conversation: 'You are an automotive sales assistant. Help qualify car buying leads by understanding their vehicle needs and budget.'
      }
    }
  },

  // Current active configuration
  currentConfig: null,

  // Load configuration from storage
  loadConfig: async (clientId = null) => {
    try {
      let config;
      
      if (clientId) {
        // Load specific client configuration
        const storedConfig = await AsyncStorage.getItem(`config_${clientId}`);
        if (storedConfig) {
          config = JSON.parse(storedConfig);
        } else {
          // Use industry default if available
          const industry = await AsyncStorage.getItem('selectedIndustry');
          config = ConfigService.getIndustryConfig(industry || 'general');
        }
      } else {
        // Load current configuration
        const storedConfig = await AsyncStorage.getItem('currentConfig');
        config = storedConfig ? JSON.parse(storedConfig) : ConfigService.defaultConfig;
      }

      ConfigService.currentConfig = config;
      return {
        success: true,
        config: config
      };
    } catch (error) {
      console.error('Failed to load configuration:', error);
      ConfigService.currentConfig = ConfigService.defaultConfig;
      return {
        success: false,
        error: error.message,
        config: ConfigService.defaultConfig
      };
    }
  },

  // Save configuration
  saveConfig: async (config, clientId = null) => {
    try {
      const key = clientId ? `config_${clientId}` : 'currentConfig';
      await AsyncStorage.setItem(key, JSON.stringify(config));
      
      if (!clientId) {
        ConfigService.currentConfig = config;
      }

      return {
        success: true,
        message: 'Configuration saved successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get industry-specific configuration
  getIndustryConfig: (industry) => {
    const industryConfig = ConfigService.industryConfigs[industry];
    if (industryConfig) {
      return {
        ...ConfigService.defaultConfig,
        ...industryConfig,
        industry: industry
      };
    }
    return ConfigService.defaultConfig;
  },

  // Switch to different industry/client
  switchClient: async (industry, clientId = null) => {
    try {
      const config = ConfigService.getIndustryConfig(industry);
      
      if (clientId) {
        config.clientId = clientId;
      }

      const saveResult = await ConfigService.saveConfig(config);
      if (saveResult.success) {
        await AsyncStorage.setItem('selectedIndustry', industry);
        ConfigService.currentConfig = config;
        
        return {
          success: true,
          config: config,
          message: `Switched to ${config.companyName}`
        };
      } else {
        return saveResult;
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Get current configuration
  getCurrentConfig: () => {
    return ConfigService.currentConfig || ConfigService.defaultConfig;
  },

  // Get AI prompts for current industry
  getAIPrompts: () => {
    const config = ConfigService.getCurrentConfig();
    return config.aiPrompts || {
      qualification: 'You are a professional lead qualification assistant.',
      conversation: 'You are a helpful assistant for lead management.'
    };
  },

  // Get theme colors
  getThemeColors: () => {
    const config = ConfigService.getCurrentConfig();
    return {
      primary: config.primaryColor,
      secondary: config.secondaryColor,
      accent: config.accentColor
    };
  },

  // Get branding information
  getBranding: () => {
    const config = ConfigService.getCurrentConfig();
    return config.branding || ConfigService.defaultConfig.branding;
  },

  // Initialize configuration on app start
  initialize: async () => {
    try {
      const result = await ConfigService.loadConfig();
      console.log('Configuration initialized:', result.config.companyName);
      return result;
    } catch (error) {
      console.error('Failed to initialize configuration:', error);
      ConfigService.currentConfig = ConfigService.defaultConfig;
      return {
        success: false,
        error: error.message,
        config: ConfigService.defaultConfig
      };
    }
  },

  // Get available industries
  getAvailableIndustries: () => {
    return Object.keys(ConfigService.industryConfigs).map(key => ({
      id: key,
      name: ConfigService.industryConfigs[key].companyName,
      config: ConfigService.industryConfigs[key]
    }));
  }
};