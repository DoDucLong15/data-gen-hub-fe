import React, { useState } from 'react';
import { Grid3X3, List, Upload, Download, Trash2, Search, RefreshCw, FolderSync } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileViewMode } from '@/utils/types/file.type';
import { useDrives, useFileDownload, useFileSelection } from '@/hooks/useDrive';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

interface ToolbarProps {
  classId: string;
  viewMode: FileViewMode;
  onViewModeChange: (mode: FileViewMode) => void;
  onUploadClick: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  selectedFiles: string[];
  clearSelection: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  classId,
  viewMode,
  onViewModeChange,
  onUploadClick,
  onSearchChange,
  searchQuery,
  selectedFiles,
  clearSelection,
}) => {
  const {
    deleteFileMutation: deleteItem,
    refetchFileTree,
    isRefetchingFileTree,
    syncDriveDataMutation,
  } = useDrives(classId);
  const { downloadFile } = useFileDownload();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { t, isReady } = useI18n();

  const handleDelete = async () => {
    try {
      for (const fileId of selectedFiles) {
        await deleteItem.mutateAsync(fileId);
      }
      toast.success(
        selectedFiles.length === 1
          ? t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.TOAST.DELETE_SUCCESS_SINGLE')
          : t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.TOAST.DELETE_SUCCESS_MULTIPLE').replace(
              '{count}',
              selectedFiles.length.toString(),
            ),
      );
      clearSelection();
    } catch (error) {
      toast.error(t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.TOAST.DELETE_ERROR'));
    } finally {
      setIsDeleteAlertOpen(false);
    }
  };

  const handleSync = async () => {
    try {
      await syncDriveDataMutation.mutateAsync(undefined);
      toast.success(t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.TOAST.SYNC_SUCCESS'));
    } catch (error) {
      toast.error(t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.TOAST.SYNC_ERROR'));
    }
  };

  const handleDownload = async () => {
    if (selectedFiles.length > 0) {
      try {
        setIsDownloading(true);
        await downloadFile(classId, selectedFiles, 'download');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  if (!isReady) return null;

  return (
    <div className="mb-4 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex w-full items-center gap-2 md:w-auto">
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={(value) => value && onViewModeChange(value as FileViewMode)}
        >
          <ToggleGroupItem value="grid" aria-label={t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.VIEWS.GRID')}>
            <Grid3X3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label={t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.VIEWS.LIST')}>
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="relative w-full md:w-64">
          <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
          <Input
            placeholder={t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.SEARCH.PLACEHOLDER')}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full items-center justify-end gap-2 md:w-auto">
        {selectedFiles.length > 0 && (
          <>
            <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Thesis_Drive }]}>
              <Button variant="outline" size="sm" onClick={() => setIsDeleteAlertOpen(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                {t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.BUTTONS.DELETE')}
              </Button>
            </ProtectedComponent>

            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              {t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.BUTTONS.DOWNLOAD')}
            </Button>
          </>
        )}

        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Thesis_Drive }]}>
          <Button variant="default" size="sm" onClick={onUploadClick}>
            <Upload className="mr-2 h-4 w-4" />
            {t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.BUTTONS.UPLOAD')}
          </Button>
        </ProtectedComponent>
        <Button variant="outline" onClick={() => refetchFileTree()} disabled={isRefetchingFileTree}>
          <RefreshCw className={`h-4 w-4 ${isRefetchingFileTree ? 'animate-spin' : ''}`} />
        </Button>
        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Thesis_Drive }]}>
          <Button variant="outline" onClick={handleSync} disabled={syncDriveDataMutation.isPending}>
            <FolderSync className={`h-4 w-4 ${syncDriveDataMutation.isPending ? 'animate-spin' : ''}`} />
            {t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.BUTTONS.SYNC_DRIVE')}
          </Button>
        </ProtectedComponent>
      </div>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.DELETE_DIALOG.TITLE')}</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedFiles.length === 1
                ? t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.DELETE_DIALOG.DESCRIPTION_SINGLE')
                : t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.DELETE_DIALOG.DESCRIPTION_MULTIPLE').replace(
                    '{count}',
                    selectedFiles.length.toString(),
                  )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.DELETE_DIALOG.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {t('THESIS_PAGE.DRIVE_INFO.TOOLBAR.DELETE_DIALOG.CONFIRM')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
