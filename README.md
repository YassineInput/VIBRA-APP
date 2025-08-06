# Lead Genius App

A complete React Native Expo application for lead management with professional UI and navigation.

## Features

- **🔐 Authentication**: Login screen with email/password form
- **📊 Dashboard**: Overview with stats cards and quick actions
- **👥 Leads Management**: Complete leads list with search and filtering
- **📈 Analytics**: Interactive charts and insights using Victory Native
- **⚙️ Settings**: Comprehensive settings with profile management
- **🎨 Professional Design**: Blue/white color scheme using React Native Paper
- **📱 Navigation**: Stack and Bottom Tab navigation with React Navigation

## Project Structure

```
LeadGeniusApp/
├── App.js                          # Main app component with providers
├── src/
│   ├── components/                 # Reusable components
│   │   ├── EmptyState.js          # Empty state component
│   │   ├── LoadingSpinner.js      # Loading indicator
│   │   └── index.js               # Component exports
│   ├── navigation/                 # Navigation configuration
│   │   └── AppNavigator.js        # Main navigator setup
│   ├── screens/                   # App screens
│   │   ├── LoginScreen.js         # Authentication screen
│   │   ├── DashboardScreen.js     # Main dashboard
│   │   ├── LeadsScreen.js         # Leads management
│   │   ├── AnalyticsScreen.js     # Charts and analytics
│   │   └── SettingsScreen.js      # App settings
│   └── theme.js                   # React Native Paper theme
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Dependencies

The app uses the following key dependencies:

- **React Navigation**: Stack and bottom tab navigation
- **React Native Paper**: Material Design components and theming
- **Victory Native**: Interactive charts and data visualization
- **React Native Vector Icons**: Icon library
- **Expo**: Development platform and tools

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd LeadGeniusApp
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start the Expo development server**:
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**:
   - For iOS: `npm run ios` or press `i` in the Expo CLI
   - For Android: `npm run android` or press `a` in the Expo CLI
   - For web: Press `w` in the Expo CLI

## Usage

### Login
- Use any email and password to login (demo mode)
- The app will simulate authentication and navigate to the main app

### Dashboard
- View key metrics with animated stat cards
- Access quick actions to navigate to other screens
- See recent activities and insights

### Leads Management
- Browse leads with search functionality
- Filter leads by status (Hot, Warm, Cold, Converted)
- Use the floating action button to add new leads
- Each lead card shows contact information and status

### Analytics
- View interactive charts showing lead trends
- Analyze conversion rates and revenue data
- Switch between different time ranges
- Get key insights and recommendations

### Settings
- Manage user profile and preferences
- Configure notifications and app settings
- Access data management and security options
- Logout functionality

## Customization

### Theme
The app uses a professional blue/white color scheme defined in `src/theme.js`. You can customize:
- Primary and secondary colors
- Surface and background colors
- Typography and spacing
- Component roundness

### Adding New Screens
1. Create the screen component in `src/screens/`
2. Add the route to `src/navigation/AppNavigator.js`
3. Update the bottom tab navigator if needed

### Components
Reusable components are located in `src/components/` and include:
- `LoadingSpinner`: Loading states
- `EmptyState`: Empty data states

## Development

### File Structure Guidelines
- Keep screens in `src/screens/`
- Place reusable components in `src/components/`
- Navigation logic in `src/navigation/`
- Theme and styling in `src/theme.js`

### Code Style
- Use functional components with hooks
- Follow React Native best practices
- Use React Native Paper components for consistency
- Implement proper error handling and loading states

## Production Build

For production builds:

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android
```

## Support

For issues and questions:
1. Check the React Native documentation
2. Review React Navigation guides
3. Consult React Native Paper documentation
4. Check Victory Native chart examples

## License

This project is licensed under the MIT License.