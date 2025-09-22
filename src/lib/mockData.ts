import { FileActivity } from './types';

const userNames = ['john.doe', 'jane.smith', 'mike.wilson', 'sarah.johnson', 'david.brown'];
const pcNames = ['WORKSTATION-01', 'LAPTOP-02', 'DESKTOP-03', 'PC-04', 'WORKSTATION-05'];
const ipAddresses = ['10.87.39.21', '10.87.39.22', '10.87.39.23', '10.87.39.24', '10.87.39.25'];
const fileTypes = ['.docx', '.xlsx', '.pdf', '.txt', '.pptx', '.jpg', '.png', '.mp4', '.zip'];
const actions: FileActivity['action'][] = ['Created', 'Modified', 'Deleted', 'Renamed', 'Copied', 'Cut', 'Moved'];

const generateFileName = (): string => {
  const names = ['Report', 'Document', 'Presentation', 'Image', 'Video', 'Archive', 'Spreadsheet', 'Manual'];
  const name = names[Math.floor(Math.random() * names.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  const extension = fileTypes[Math.floor(Math.random() * fileTypes.length)];
  return `${name}_${number}${extension}`;
};

const generateFilePath = (fileName: string): string => {
  const folders = ['Documents', 'Reports', 'Projects', 'Archive', 'Temp', 'Shared', 'Public'];
  const subFolders = ['2024', 'Current', 'Draft', 'Final', 'Backup'];
  const folder = folders[Math.floor(Math.random() * folders.length)];
  const subFolder = Math.random() > 0.5 ? `/${subFolders[Math.floor(Math.random() * subFolders.length)]}` : '';
  return `\\\\10.87.42.87\\SharedFolder\\${folder}${subFolder}\\${fileName}`;
};

export const generateMockActivity = (): FileActivity => {
  const fileName = generateFileName();
  const action = actions[Math.floor(Math.random() * actions.length)];
  const filePath = generateFilePath(fileName);
  
  const activity: FileActivity = {
    id: Math.random().toString(36).substr(2, 9),
    fileName,
    filePath,
    action,
    timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Random time in last 24 hours
    userName: userNames[Math.floor(Math.random() * userNames.length)],
    remoteIP: ipAddresses[Math.floor(Math.random() * ipAddresses.length)],
    pcName: pcNames[Math.floor(Math.random() * pcNames.length)]
  };

  // Add source/destination paths for move operations
  if (action === 'Moved' || action === 'Renamed') {
    activity.sourcePath = filePath;
    activity.destinationPath = generateFilePath(action === 'Renamed' ? generateFileName() : fileName);
  }

  return activity;
};

export const generateInitialData = (count: number = 50): FileActivity[] => {
  return Array.from({ length: count }, () => generateMockActivity())
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};