export interface FileActivity {
  id: string;
  fileName: string;
  filePath: string;
  action: 'Created' | 'Modified' | 'Deleted' | 'Renamed' | 'Copied' | 'Cut' | 'Moved';
  timestamp: Date;
  userName: string;
  remoteIP: string;
  pcName: string;
  sourcePath?: string;
  destinationPath?: string;
}

export interface ServerConfig {
  remoteServerIP: string;
  localIP: string;
  sharedFolderPath: string;
  isConnected: boolean;
  lastHeartbeat: Date;
}

export interface FilterOptions {
  searchTerm: string;
  actionType: string;
  startDate: string;
  endDate: string;
  userName: string;
}