import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Wifi, HardDrive } from 'lucide-react';
import { ServerConfig } from '@/lib/types';

interface ServerStatusProps {
  config: ServerConfig;
}

export default function ServerStatus({ config }: ServerStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Server Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Remote Server</span>
            </div>
            <p className="text-sm text-muted-foreground">{config.remoteServerIP}</p>
            <Badge variant={config.isConnected ? "default" : "destructive"}>
              {config.isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Local IP</span>
            </div>
            <p className="text-sm text-muted-foreground">{config.localIP}</p>
            <Badge variant="outline">Active</Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">Shared Folder</span>
            </div>
            <p className="text-sm text-muted-foreground break-all">{config.sharedFolderPath}</p>
            <Badge variant="secondary">Monitoring</Badge>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Last heartbeat: {config.lastHeartbeat.toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}