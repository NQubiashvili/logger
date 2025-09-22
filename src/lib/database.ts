import { FileActivity, FilterOptions } from './types';
import { generateInitialData, generateMockActivity } from './mockData';

const STORAGE_KEY = 'fileServerActivities';

export class FileActivityDatabase {
  static getActivities(): FileActivity[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
  const activities = JSON.parse(stored) as Partial<FileActivity>[];
  return activities.map(activity => ({
    ...activity,
    timestamp: new Date(activity.timestamp)
  })) as FileActivity[];
}

      // Initialize with mock data if no data exists
      const initialData = generateInitialData();
      this.saveActivities(initialData);
      return initialData;
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  }

  static saveActivities(activities: FileActivity[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  }

  static addActivity(activity: FileActivity): void {
    const activities = this.getActivities();
    activities.unshift(activity); // Add to beginning for newest first
    
    // Keep only last 1000 activities to prevent storage overflow
    if (activities.length > 1000) {
      activities.splice(1000);
    }
    
    this.saveActivities(activities);
  }

  static filterActivities(filters: FilterOptions): FileActivity[] {
    const activities = this.getActivities();
    
    return activities.filter(activity => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch = 
          activity.fileName.toLowerCase().includes(searchLower) ||
          activity.filePath.toLowerCase().includes(searchLower) ||
          activity.userName.toLowerCase().includes(searchLower) ||
          activity.pcName.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Action type filter
      if (filters.actionType && filters.actionType !== 'all') {
        if (activity.action !== filters.actionType) return false;
      }

      // User name filter
      if (filters.userName && filters.userName !== 'all') {
        if (activity.userName !== filters.userName) return false;
      }

      // Date range filter
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        if (activity.timestamp < startDate) return false;
      }

      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        endDate.setHours(23, 59, 59, 999); // End of day
        if (activity.timestamp > endDate) return false;
      }

      return true;
    });
  }

  static simulateNewActivity(): FileActivity {
    const newActivity = generateMockActivity();
    newActivity.timestamp = new Date(); // Current time for new activity
    this.addActivity(newActivity);
    return newActivity;
  }

  static clearAllActivities(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static getUniqueUsers(): string[] {
    const activities = this.getActivities();
    const users = new Set(activities.map(a => a.userName));
    return Array.from(users).sort();
  }
}