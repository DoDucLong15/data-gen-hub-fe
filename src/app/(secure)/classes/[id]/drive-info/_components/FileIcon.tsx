import React from 'react';
import { Folder, File, FileText, Image, Video, FileSpreadsheet, Music } from 'lucide-react';
import { getFileIcon } from '../_helpers/file-helper.helper';

interface FileIconProps {
  mimeType: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ mimeType, className }) => {
  const iconType = getFileIcon(mimeType);

  switch (iconType) {
    case 'folder':
      return <Folder className={className} />;
    case 'file-text':
      return <FileText className={className} />;
    case 'image':
      return <Image className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'audio':
      return <Music className={className} />;
    case 'file-spreadsheet':
      return <FileSpreadsheet className={className} />;
    // case 'file-pdf':
    //   return <FilePdf className={className} />;
    // case 'file-presentation':
    //   return <FilePresentation className={className} />;
    default:
      return <File className={className} />;
  }
};
