import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { FileItem } from '@/utils/types/file.type';
import { useFileDownload } from '@/hooks/useDrive';
import { formatDate, isFolder } from '../_helpers/file-helper.helper';
import { FileIcon } from './FileIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from '@/i18n';

interface FileListProps {
  classId: string;
  files: FileItem[];
  onFolderClick: (id: string, name: string) => void;
  searchQuery: string;
  toggleFileSelection: (fileId: string) => void;
  isSelected: (fileId: string) => boolean;
  onFilePreview: (file: FileItem) => void;
}

export const FileList: React.FC<FileListProps> = ({
  classId,
  files,
  onFolderClick,
  searchQuery,
  toggleFileSelection,
  isSelected,
  onFilePreview,
}) => {
  const { t, isReady } = useI18n();

  const { downloadFile } = useFileDownload();

  const filteredFiles = useMemo(() => {
    if (!searchQuery) return files;
    return files.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [files, searchQuery]);

  const handleItemClick = (file: FileItem) => {
    if (isFolder(file)) {
      onFolderClick(file.id, file.name);
    } else {
      // Show preview instead of downloading directly
      onFilePreview(file);
    }
  };

  // Add double-click handler for direct download
  const handleDoubleClick = (file: FileItem) => {
    if (!isFolder(file)) {
      downloadFile(classId, [file.id], file.name);
    }
  };

  // Hàm kiểm tra nếu tên file quá dài
  const isLongFileName = (name: string) => name.length > 30;

  // Hàm cắt ngắn tên file
  const truncateFileName = (name: string) => {
    if (name.length <= 30) return name;

    const extension = name.includes('.') ? name.split('.').pop() : '';
    const nameWithoutExt = extension ? name.slice(0, -(extension.length + 1)) : name;

    return `${nameWithoutExt.slice(0, 22)}...${extension ? `.${extension}` : ''}`;
  };

  if (!isReady) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead className="w-12"></TableHead>
          <TableHead>{t('THESIS_PAGE.DRIVE_INFO.FILE_LIST.HEADERS.NAME')}</TableHead>
          <TableHead>{t('THESIS_PAGE.DRIVE_INFO.FILE_LIST.HEADERS.OWNER')}</TableHead>
          <TableHead>{t('THESIS_PAGE.DRIVE_INFO.FILE_LIST.HEADERS.MODIFIED')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredFiles.map((file) => (
          <TableRow
            key={file.id}
            className={`cursor-pointer hover:bg-gray-50 ${isSelected(file.id) ? 'bg-blue-50' : ''}`}
            onClick={() => handleItemClick(file)}
            onDoubleClick={() => handleDoubleClick(file)}
          >
            <TableCell onClick={(e) => e.stopPropagation()} className="w-12">
              <Checkbox
                checked={isSelected(file.id)}
                onCheckedChange={() => toggleFileSelection(file.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </TableCell>
            <TableCell className="w-12">
              <FileIcon mimeType={file.mimeType} className="h-5 w-5" />
            </TableCell>
            <TableCell className="max-w-md">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="font-medium">
                      <span className={isLongFileName(file.name) ? 'inline-block max-w-full truncate' : ''}>
                        {isLongFileName(file.name) ? truncateFileName(file.name) : file.name}
                      </span>
                    </div>
                  </TooltipTrigger>
                  {isLongFileName(file.name) && (
                    <TooltipContent side="bottom" className="max-w-md">
                      <p className="text-sm">{file.name}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell className="max-w-xs">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="max-w-full truncate">{file.owners[0]?.displayName || 'Unknown'}</div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{file.owners[0]?.displayName || 'Unknown'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TableCell>
            <TableCell>{formatDate(file.modifiedTime)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
