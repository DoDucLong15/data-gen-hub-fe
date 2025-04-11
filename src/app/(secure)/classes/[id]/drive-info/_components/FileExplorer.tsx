import React, { useState } from 'react';
import { FileGrid } from './FileGrid';
import { FileList } from './FileList';
import { Breadcrumb } from './Breadcrumb';
import { Toolbar } from './Toolbar';
import { Spinner } from '@/components/ui/spinner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { FileViewMode, FileItem } from '@/utils/types/file.type';
import { useDrives, useFileNavigation, useFileSelection } from '@/hooks/useDrive';
import { FileUploader } from './FileUploader';
import { FilePreview } from './FilePreview';
import { CURRENT_MESSAGES } from '@/configs/messages.config';

const { THESIS_PAGE } = CURRENT_MESSAGES;
const { ERROR_LOADING_FILES } = THESIS_PAGE.DRIVE_INFO;
interface FileExplorerProps {
  classId: string;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ classId }: { classId: string }) => {
  const [viewMode, setViewMode] = useState<FileViewMode>('grid');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const { fileTree, loadingFileTree: isLoading, errorFileTree: isError } = useDrives(classId);
  const { breadcrumbs, getCurrentFolder, navigateToFolder, navigateToBreadcrumb } = useFileNavigation(fileTree || null);

  const { selectedFiles, toggleFileSelection, clearSelection, isSelected } = useFileSelection();

  const handleFilePreview = (file: FileItem) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const currentFolder = getCurrentFolder();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{ERROR_LOADING_FILES}</AlertDescription>
      </Alert>
    );
  }

  if (!fileTree) return null;

  return (
    <div className="space-y-4">
      <Breadcrumb items={breadcrumbs} onNavigate={navigateToBreadcrumb} />

      <Toolbar
        classId={classId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onUploadClick={() => setIsUploadOpen(true)}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        selectedFiles={selectedFiles}
        clearSelection={clearSelection}
      />

      {viewMode === 'grid' ? (
        <FileGrid
          classId={classId}
          files={currentFolder?.children || []}
          onFolderClick={(id, name) => navigateToFolder(id, name)}
          searchQuery={searchQuery}
          toggleFileSelection={toggleFileSelection}
          isSelected={isSelected}
          onFilePreview={handleFilePreview}
        />
      ) : (
        <FileList
          classId={classId}
          files={currentFolder?.children || []}
          onFolderClick={(id, name) => navigateToFolder(id, name)}
          searchQuery={searchQuery}
          toggleFileSelection={toggleFileSelection}
          isSelected={isSelected}
          onFilePreview={handleFilePreview}
        />
      )}

      <FileUploader
        classId={classId}
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        folderId={currentFolder?.id || 'root'}
      />

      <FilePreview
        classId={classId}
        file={previewFile}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};
