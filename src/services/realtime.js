export const RealtimeService = {
  // Auto-refresh interval (30 seconds)
  refreshInterval: 30000,
  intervals: new Map(),

  // Start auto-refresh for a component
  startAutoRefresh: (key, callback) => {
    // Clear existing interval if any
    RealtimeService.stopAutoRefresh(key);
    
    // Set new interval
    const intervalId = setInterval(callback, RealtimeService.refreshInterval);
    RealtimeService.intervals.set(key, intervalId);
    
    console.log(`Started auto-refresh for ${key}`);
  },

  // Stop auto-refresh for a component
  stopAutoRefresh: (key) => {
    const intervalId = RealtimeService.intervals.get(key);
    if (intervalId) {
      clearInterval(intervalId);
      RealtimeService.intervals.delete(key);
      console.log(`Stopped auto-refresh for ${key}`);
    }
  },

  // Stop all auto-refresh intervals
  stopAllAutoRefresh: () => {
    RealtimeService.intervals.forEach((intervalId, key) => {
      clearInterval(intervalId);
      console.log(`Stopped auto-refresh for ${key}`);
    });
    RealtimeService.intervals.clear();
  },

  // Simulate push notification (basic implementation)
  simulateNotification: (title, message) => {
    console.log(`🔔 NOTIFICATION: ${title} - ${message}`);
    
    // In a real app, you'd use Expo Notifications here
    // For now, we'll just log and could show an alert
    if (typeof alert !== 'undefined') {
      alert(`${title}\n\n${message}`);
    }
  },

  // Check for new leads and notify
  checkForNewLeads: async (previousCount, currentCount) => {
    if (currentCount > previousCount) {
      const newLeadsCount = currentCount - previousCount;
      RealtimeService.simulateNotification(
        'New Leads!',
        `You have ${newLeadsCount} new lead${newLeadsCount > 1 ? 's' : ''} to review.`
      );
    }
  }
};