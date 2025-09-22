import { useState, useEffect, useCallback } from 'react';
import { FileActivityDatabase } from '@/lib/database';
import { FileActivity, FilterOptions, ServerConfig } from '@/lib/types';
import ServerStatus from '@/components/ServerStatus';
import SearchFilters from '@/components/SearchFilters';
import ActivityTable from '@/components/ActivityTable';
import RealTimeMonitor from '@/components/RealTimeMonitor';

export default function Index() {
  const [activities, setActivities] = useState<FileActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<FileActivity[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    actionType: 'all',
    startDate: '',
    endDate: '',
    userName: 'all'
  });
  const [uniqueUsers, setUniqueUsers] = useState<string[]>([]);

  const serverConfig: ServerConfig = {
    remoteServerIP: '10.87.42.87',
    localIP: '10.87.39.20',
    sharedFolderPath: '\\\\10.87.42.87\\SharedFolder',
    isConnected: true,
    lastHeartbeat: new Date()
  };

  const loadActivities = useCallback(() => {
    const loadedActivities = FileActivityDatabase.getActivities();
    setActivities(loadedActivities);
    setUniqueUsers(FileActivityDatabase.getUniqueUsers());
  }, []);

  const applyFilters = useCallback(() => {
    const filtered = FileActivityDatabase.filterActivities(filters);
    setFilteredActivities(filtered);
  }, [filters]);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  useEffect(() => {
    applyFilters();
  }, [activities, applyFilters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      actionType: 'all',
      startDate: '',
      endDate: '',
      userName: 'all'
    });
  };

  const handleNewActivity = () => {
    loadActivities();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            File Server Activity Logger
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring of file server activities on remote share folder
          </p>
        </div>

        {/* Server Status */}
        <ServerStatus config={serverConfig} />

        {/* Real-Time Monitor */}
        <RealTimeMonitor onNewActivity={handleNewActivity} />

        {/* Search and Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          uniqueUsers={uniqueUsers}
        />

        {/* Activity Table */}
        <ActivityTable activities={filteredActivities} isRealTime={true} />

        {/* Statistics Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600">
              {filteredActivities.filter(a => a.action === 'Created').length}
            </div>
            <div className="text-sm text-muted-foreground">Files Created</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-blue-600">
              {filteredActivities.filter(a => a.action === 'Modified').length}
            </div>
            <div className="text-sm text-muted-foreground">Files Modified</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-red-600">
              {filteredActivities.filter(a => a.action === 'Deleted').length}
            </div>
            <div className="text-sm text-muted-foreground">Files Deleted</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-purple-600">
              {uniqueUsers.length}
            </div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}