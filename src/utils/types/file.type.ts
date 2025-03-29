export interface Owner {
  displayName: string;
  emailAddress: string;
  photoLink: string;
}

export interface FileItem {
  id: string;
  mimeType: string;
  name: string;
  owners: Owner[];
  hasThumbnail: boolean;
  webViewLink: string;
  createdTime: string;
  modifiedTime: string;
  trashed: boolean;
  children?: FileItem[];
}

export type FileTreeResponse = FileItem;

export type UploadFileResponse = {
  success: boolean;
  file?: FileItem;
  error?: string;
};

export type FileViewMode = 'grid' | 'list';

export type FileSelectionMode = 'single' | 'multiple';
