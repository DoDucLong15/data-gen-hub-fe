import { FileItem } from '@/utils/types/file.type';

export const isFolder = (item: FileItem): boolean => {
  return item.mimeType === 'application/vnd.google-apps.folder';
};

// Get file icon based on mimeType
export const getFileIcon = (mimeType: string): string => {
  if (mimeType === 'application/vnd.google-apps.folder') {
    return 'folder';
  }

  if (mimeType.startsWith('image/')) {
    return 'image';
  }

  if (mimeType.startsWith('video/')) {
    return 'video';
  }

  if (mimeType.startsWith('audio/')) {
    return 'audio';
  }

  if (mimeType === 'application/pdf') {
    return 'file-pdf';
  }

  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
    return 'file-spreadsheet';
  }

  if (mimeType.includes('document') || mimeType.includes('word')) {
    return 'file-text';
  }

  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return 'file-presentation';
  }

  return 'file';
};

// Format file size
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'N/A';

  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Search files in tree
export const searchFiles = (tree: FileItem, query: string): FileItem[] => {
  const results: FileItem[] = [];

  const search = (item: FileItem, term: string) => {
    if (item.name.toLowerCase().includes(term.toLowerCase())) {
      results.push(item);
    }

    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => search(child, term));
    }
  };

  search(tree, query);
  return results;
};

// Flatten file tree for easier navigation
export const flattenFileTree = (tree: FileItem): Record<string, FileItem> => {
  const flatTree: Record<string, FileItem> = {};

  const flatten = (item: FileItem) => {
    flatTree[item.id] = item;

    if (item.children && item.children.length > 0) {
      item.children.forEach((child) => flatten(child));
    }
  };

  flatten(tree);
  return flatTree;
};
