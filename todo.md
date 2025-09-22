# File Server Monitoring Web Application - MVP Implementation

## Core Features to Implement:
1. **Dashboard Interface** - Main monitoring view with real-time activity feed
2. **Activity Logger Component** - Display file operations (Copy, Cut, Modify, Create, Delete, Rename)
3. **User Information Display** - Show username, IP address, PC name, timestamp
4. **File Operation Details** - Source/destination paths for move operations
5. **Search and Filter** - Filter by user, action type, date range, file name
6. **Real-time Updates** - Simulated live monitoring with auto-refresh
7. **Database Integration** - Mock MSSQL-like data structure with localStorage
8. **Remote Server Configuration** - Display connection to 10.87.42.87 and local IP 10.87.39.20

## Files to Create:
1. `src/pages/Index.tsx` - Main dashboard page
2. `src/components/ActivityLogger.tsx` - File activity logging component
3. `src/components/ActivityTable.tsx` - Table display for file activities
4. `src/components/SearchFilters.tsx` - Search and filter controls
5. `src/components/ServerStatus.tsx` - Server connection status display
6. `src/components/RealTimeMonitor.tsx` - Real-time activity monitor
7. `src/lib/mockData.ts` - Mock file activity data
8. `src/lib/database.ts` - LocalStorage database operations

## Implementation Strategy:
- Use React with TypeScript for the frontend
- Implement mock real-time monitoring with setInterval
- Use localStorage to simulate MSSQL database
- Create responsive dashboard with shadcn/ui components
- Simulate file server monitoring with realistic mock data