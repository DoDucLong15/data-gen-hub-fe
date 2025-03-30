import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileItem } from '@/utils/types/file.type';
import { useFileDownload } from '@/hooks/useDrive';
import { formatDate, isFolder } from '../_helpers/file-helper.helper';
import { FileIcon } from './FileIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FileGridProps {
  classId: string;
  files: FileItem[];
  onFolderClick: (id: string, name: string) => void;
  searchQuery: string;
  toggleFileSelection: (fileId: string) => void;
  isSelected: (fileId: string) => boolean;
  onFilePreview: (file: FileItem) => void;
}

export const FileGrid: React.FC<FileGridProps> = ({
  classId,
  files,
  onFolderClick,
  searchQuery,
  toggleFileSelection,
  isSelected,
  onFilePreview,
}) => {
  const { downloadFile } = useFileDownload();

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [files, searchQuery]);

  const handleItemClick = (file: FileItem, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      toggleFileSelection(file.id);
    } else {
      if (isFolder(file)) {
        onFolderClick(file.id, file.name);
      } else {
        // Show preview instead of downloading directly
        onFilePreview(file);
      }
    }
  };

  // Add double-click handler for direct download
  const handleDoubleClick = (file: FileItem) => {
    if (!isFolder(file)) {
      downloadFile(classId, [file.id], file.name);
    }
  };

  // Hàm kiểm tra nếu tên file quá dài
  const isLongFileName = (name: string) => name.length > 18;

  // Hàm cắt ngắn tên file
  const truncateFileName = (name: string) => {
    if (name.length <= 18) return name;

    const extension = name.includes('.') ? name.split('.').pop() : '';
    const nameWithoutExt = extension ? name.slice(0, -(extension.length + 1)) : name;

    if (nameWithoutExt.length <= 12) return name;
    return `${nameWithoutExt.slice(0, 12)}...${extension ? `.${extension}` : ''}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {filteredFiles.map((file) => (
        <Card
          key={file.id}
          className={`cursor-pointer transition-colors hover:bg-gray-50 ${
            isSelected(file.id) ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={(e) => handleItemClick(file, e)}
          onDoubleClick={() => handleDoubleClick(file)}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFileSelection(file.id);
          }}
        >
          <CardContent className="flex flex-col items-center p-4">
            <FileIcon mimeType={file.mimeType} className="mb-2 h-12 w-12" />
            <div className="w-full text-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="max-w-full truncate text-sm font-medium">
                      {isLongFileName(file.name) ? truncateFileName(file.name) : file.name}
                    </p>
                  </TooltipTrigger>
                  {isLongFileName(file.name) && (
                    <TooltipContent side="top" align="center" className="max-w-xs">
                      <p className="text-sm break-words">{file.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              <p className="text-xs text-gray-500">{formatDate(file.modifiedTime)}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
