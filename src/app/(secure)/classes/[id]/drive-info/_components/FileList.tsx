import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { FileItem } from '@/utils/types/file.type';
import { useFileDownload } from '@/hooks/useDrive';
import { formatDate, isFolder } from '../_helpers/file-helper.helper';
import { FileIcon } from './FileIcon';

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead className="w-12"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Modified</TableHead>
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
            <TableCell onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={isSelected(file.id)}
                onCheckedChange={() => toggleFileSelection(file.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </TableCell>
            <TableCell>
              <FileIcon mimeType={file.mimeType} className="h-5 w-5" />
            </TableCell>
            <TableCell className="font-medium">{file.name}</TableCell>
            <TableCell>{file.owners[0]?.displayName || 'Unknown'}</TableCell>
            <TableCell>{formatDate(file.modifiedTime)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
