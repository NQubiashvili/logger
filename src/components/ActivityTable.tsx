import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileActivity } from '@/lib/types';
import { 
  FileText, 
  FilePlus, 
  FileEdit, 
  FileX, 
  Copy, 
  Scissors, 
  ArrowRight,
  Clock,
  User,
  Monitor,
  Globe
} from 'lucide-react';

interface ActivityTableProps {
  activities: FileActivity[];
  isRealTime?: boolean;
}

const getActionIcon = (action: FileActivity['action']) => {
  switch (action) {
    case 'Created': return <FilePlus className="h-4 w-4" />;
    case 'Modified': return <FileEdit className="h-4 w-4" />;
    case 'Deleted': return <FileX className="h-4 w-4" />;
    case 'Renamed': return <FileText className="h-4 w-4" />;
    case 'Copied': return <Copy className="h-4 w-4" />;
    case 'Cut': return <Scissors className="h-4 w-4" />;
    case 'Moved': return <ArrowRight className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

const getActionColor = (action: FileActivity['action']) => {
  switch (action) {
    case 'Created': return 'bg-green-500';
    case 'Modified': return 'bg-blue-500';
    case 'Deleted': return 'bg-red-500';
    case 'Renamed': return 'bg-purple-500';
    case 'Copied': return 'bg-yellow-500';
    case 'Cut': return 'bg-orange-500';
    case 'Moved': return 'bg-indigo-500';
    default: return 'bg-gray-500';
  }
};

export default function ActivityTable({ activities, isRealTime = false }: ActivityTableProps) {
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const truncatePath = (path: string, maxLength: number = 50) => {
    if (path.length <= maxLength) return path;
    return '...' + path.slice(-(maxLength - 3));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          File Server Activity Log
          {isRealTime && (
            <Badge variant="outline" className="ml-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timestamp
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    File Name
                  </div>
                </TableHead>
                <TableHead>Action</TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    User
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Remote IP
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    PC Name
                  </div>
                </TableHead>
                <TableHead>File Path</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">
                    {formatTimestamp(activity.timestamp)}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {activity.fileName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getActionColor(activity.action)} text-white`}>
                      <div className="flex items-center gap-1">
                        {getActionIcon(activity.action)}
                        {activity.action}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      {activity.userName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <code className="text-sm">{activity.remoteIP}</code>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Monitor className="h-3 w-3 text-muted-foreground" />
                      {activity.pcName}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <code className="text-xs text-muted-foreground break-all" title={activity.filePath}>
                        {truncatePath(activity.filePath)}
                      </code>
                      {(activity.sourcePath || activity.destinationPath) && (
                        <div className="text-xs text-muted-foreground">
                          {activity.sourcePath && (
                            <div>From: <code>{truncatePath(activity.sourcePath, 40)}</code></div>
                          )}
                          {activity.destinationPath && (
                            <div>To: <code>{truncatePath(activity.destinationPath, 40)}</code></div>
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {activities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No file activities found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}