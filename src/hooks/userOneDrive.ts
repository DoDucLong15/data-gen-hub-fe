import { ClassesApi, ESyncDriveDataType } from '@/apis/classes.api';
import { FileSelectionMode } from '@/utils/types/file.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { STUDENTS_QUERY_KEY } from './useStudents';
import { GENERATED_SHEETS_QUERY_KEY } from './useGenerateThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { ProcessApi } from '@/apis/process.api';
import { EProgressType } from '@/utils/enums/progress.enum';
import { TOnedriveHierarchy, TOnedriveIdentity } from '@/utils/types/onedrive.type';
import JSZip from 'jszip';
import { toast } from 'sonner';

const ONE_DRIVE_QUERY_KEY = 'onedrive';

export const fileKeys = (classId: string) => ({
  all: [`${ONE_DRIVE_QUERY_KEY}-files`, classId] as const,
  tree: () => [...fileKeys(classId).all, `${ONE_DRIVE_QUERY_KEY}-tree`] as const,
  folder: (id: string) => [...fileKeys(classId).all, `${ONE_DRIVE_QUERY_KEY}-folder`, id] as const,
});

export const useOneDrives = (classId: string) => {
  const queryClient = useQueryClient();

  const {
    data: fileTree,
    isLoading: loadingFileTree,
    isError: errorFileTree,
    refetch: refetchFileTree,
    isRefetching: isRefetchingFileTree,
  } = useQuery({
    queryKey: fileKeys(classId).tree(),
    queryFn: () => ClassesApi.getOneDriveInfo(classId),
    staleTime: 1000 * 60 * 5,
  });

  const uploadFilesMutation = useMutation({
    mutationFn: ({ files, parentId, driveId }: { files: File[]; parentId: string; driveId: string }) =>
      ClassesApi.uploadOneDriveFile(classId, files, driveId, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys(classId).tree() });
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: ({ driveId, fileId }: { driveId: string; fileId: string }) =>
      ClassesApi.deleteOneDriveFile(classId, driveId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys(classId).tree() });
    },
  });

  const syncDriveDataMutation = useMutation({
    mutationFn: (types?: ESyncDriveDataType[]) => ClassesApi.syncOneDriveData([classId], types),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: STUDENTS_QUERY_KEY(classId),
      });
      queryClient.invalidateQueries({
        queryKey: GENERATED_SHEETS_QUERY_KEY(EThesisDocumentType.ASSIGNMENT_SHEET, classId),
      });
      queryClient.invalidateQueries({
        queryKey: GENERATED_SHEETS_QUERY_KEY(EThesisDocumentType.GUIDANCE_REVIEW, classId),
      });
      queryClient.invalidateQueries({
        queryKey: GENERATED_SHEETS_QUERY_KEY(EThesisDocumentType.SUPERVISORY_COMMENTS, classId),
      });
    },
  });

  return {
    fileTree,
    loadingFileTree,
    errorFileTree,
    refetchFileTree,
    isRefetchingFileTree,
    uploadFilesMutation,
    deleteFileMutation,
    syncDriveDataMutation,
  };
};

export const useOneDriveNavigation = (fileTree: TOnedriveHierarchy | null) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([{ id: 'root', name: 'Root' }]);

  // Get current folder based on path
  const getCurrentFolder = useCallback(() => {
    if (!fileTree) return null;

    if (currentPath.length === 0) return fileTree;

    let current: TOnedriveHierarchy | undefined = fileTree;

    for (const id of currentPath) {
      if (!current.children) return null;

      current = current.children.find((item) => item.id === id);
      if (!current) return null;
    }

    return current;
  }, [fileTree, currentPath]);

  // Navigate to a folder
  const navigateToFolder = useCallback((folderId: string, folderName: string) => {
    setCurrentPath((prev) => [...prev, folderId]);
    setBreadcrumbs((prev) => [...prev, { id: folderId, name: folderName }]);
  }, []);

  // Navigate using breadcrumb
  const navigateToBreadcrumb = useCallback((index: number) => {
    setCurrentPath((prev) => prev.slice(0, index));
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
  }, []);

  return {
    currentPath,
    breadcrumbs,
    getCurrentFolder,
    navigateToFolder,
    navigateToBreadcrumb,
  };
};

export const useOneDriveSelection = (selectionMode: FileSelectionMode = 'multiple') => {
  const [selectedFiles, setSelectedFiles] = useState<TOnedriveIdentity[]>([]);

  const toggleFileSelection = useCallback(
    (file: TOnedriveIdentity) => {
      setSelectedFiles((prev) => {
        if (prev.map((f) => f.id).includes(file.id)) {
          return prev.filter((f) => f.id !== file.id);
        } else {
          if (selectionMode === 'single') {
            return [file];
          }
          return [...prev, file];
        }
      });
    },
    [selectionMode],
  );

  const clearSelection = useCallback(() => {
    setSelectedFiles([]);
  }, []);

  return {
    selectedFiles,
    toggleFileSelection,
    clearSelection,
    isSelected: (file: TOnedriveIdentity) => selectedFiles.map((f) => f.id).includes(file.id),
  };
};

export const useOneDriveDownload = () => {
  const downloadFile = useCallback(async (urls?: string[]) => {
    try {
      if (!urls || urls.length === 0) {
        throw new Error('No download URL provided');
      }

      // Nếu chỉ có 1 file, mở trực tiếp URL
      if (urls.length === 1) {
        window.open(urls[0], '_blank');
        toast.success('Download started');
        return true;
      }

      // Thông báo cho người dùng rằng đang tải xuống
      toast.info(`Downloading ${urls.length} files...`);

      // Đối với nhiều file, mở từng URL trong tab mới
      urls.forEach((url) => {
        window.open(url, '_blank');
      });

      toast.success(`Successfully initiated ${urls.length} downloads`);
      return true;
    } catch (error) {
      console.error('Error initiating downloads:', error);
      toast.error('Error downloading files');
      return false;
    }
  }, []);

  return { downloadFile };
};

export const useOneDriveSyncHistory = (classId: string) => {
  const {
    data: processes = [],
    isLoading: processesIsLoafing,
    refetch: refetchProcesses,
  } = useQuery({
    queryKey: ['process-onedrive-data', classId],
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [EProgressType.ONE_DRIVE_DATA],
      }),
    refetchInterval: 5 * 1000,
    enabled: !!classId,
  });

  return {
    processes,
    processesIsLoafing,
    refetchProcesses,
  };
};

export const useOneDriveFilePreview = (driveId: string, fileId: string) => {
  const { data: preview, isLoading: previewIsLoading } = useQuery({
    queryKey: ['onedrive-file-preview', driveId, fileId],
    queryFn: () => ClassesApi.getOneDriveFilePreview(driveId, fileId),
  });

  return {
    oneDriveFilePreview: preview,
    oneDriveFilePreviewIsLoading: previewIsLoading,
  };
};
