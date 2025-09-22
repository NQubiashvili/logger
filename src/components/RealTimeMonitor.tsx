import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Play, Pause, Trash2 } from 'lucide-react';
import { FileActivityDatabase } from '@/lib/database';

interface RealTimeMonitorProps {
  onNewActivity: () => void;
}

export default function RealTimeMonitor({ onNewActivity }: RealTimeMonitorProps) {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [activityCount, setActivityCount] = useState(0);
  const [lastActivity, setLastActivity] = useState<string>('');

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      // Simulate new file activity (10% chance every 3 seconds)
      if (Math.random() < 0.1) {
        const newActivity = FileActivityDatabase.simulateNewActivity();
        setActivityCount(prev => prev + 1);
        setLastActivity(`${newActivity.action}: ${newActivity.fileName} by ${newActivity.userName}`);
        onNewActivity();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isMonitoring, onNewActivity]);

  const handleToggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all activity data? This action cannot be undone.')) {
      FileActivityDatabase.clearAllActivities();
      setActivityCount(0);
      setLastActivity('');
      onNewActivity(); // Refresh the display
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Monitor
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleMonitoring}
              className="flex items-center gap-2"
            >
              {isMonitoring ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Resume
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearData}
              className="flex items-center gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Clear Data
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={isMonitoring ? "default" : "secondary"}>
                {isMonitoring ? (
                  <>
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Monitoring Active
                  </>
                ) : (
                  'Monitoring Paused'
                )}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              File system monitoring status
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">
              {activityCount}
            </div>
            <p className="text-sm text-muted-foreground">
              Activities detected this session
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Last Activity:
            </div>
            <p className="text-xs text-muted-foreground break-all">
              {lastActivity || 'No recent activity'}
            </p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> This is a demonstration of real-time file server monitoring. 
            In a production environment, this would connect to actual Windows Security Event Logs 
            and FileSystemWatcher APIs to track real user activities on the remote share folder 
            \\10.87.42.87\SharedFolder.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}