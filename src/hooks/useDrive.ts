import { ClassesApi, ESyncDriveDataType } from '@/apis/classes.api';
import { FileItem, FileSelectionMode } from '@/utils/types/file.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { STUDENTS_QUERY_KEY } from './useStudents';
import { GENERATED_SHEETS_QUERY_KEY } from './useGenerateThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { ProcessApi } from '@/apis/process.api';
import { EProgressType } from '@/utils/enums/progress.enum';

export const fileKeys = (classId: string) => ({
  all: ['files', classId] as const,
  tree: () => [...fileKeys(classId).all, 'tree'] as const,
  folder: (id: string) => [...fileKeys(classId).all, 'folder', id] as const,
});

export const useDrives = (classId: string) => {
  const queryClient = useQueryClient();

  const {
    data: fileTree,
    isLoading: loadingFileTree,
    isError: errorFileTree,
    refetch: refetchFileTree,
    isRefetching: isRefetchingFileTree,
  } = useQuery({
    queryKey: fileKeys(classId).tree(),
    queryFn: () => ClassesApi.getDriveInfoTree(classId),
    staleTime: 1000 * 60 * 5,
  });

  const uploadFilesMutation = useMutation({
    mutationFn: ({ files, parentId }: { files: File[]; parentId: string }) =>
      ClassesApi.uploadFiles(classId, files, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys(classId).tree() });
    },
  });

  const createFolderMutation = useMutation({
    mutationFn: ({ name, parentId }: { name: string; parentId: string }) =>
      ClassesApi.createFolder(classId, name, parentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys(classId).tree() });
    },
  });

  const deleteFileMutation = useMutation({
    mutationFn: (fileId: string) => ClassesApi.deleteFile(classId, fileId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: fileKeys(classId).tree() });
    },
  });

  const syncDriveDataMutation = useMutation({
    mutationFn: (types?: ESyncDriveDataType[]) => ClassesApi.syncDriveData([classId], types),
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
    createFolderMutation,
    deleteFileMutation,
    syncDriveDataMutation,
  };
};

export const useFileNavigation = (fileTree: FileItem | null) => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([{ id: 'root', name: 'Root' }]);

  // Get current folder based on path
  const getCurrentFolder = useCallback(() => {
    if (!fileTree) return null;

    if (currentPath.length === 0) return fileTree;

    let current: FileItem | undefined = fileTree;

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

export const useFileSelection = (selectionMode: FileSelectionMode = 'multiple') => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const toggleFileSelection = useCallback(
    (fileId: string) => {
      setSelectedFiles((prev) => {
        if (prev.includes(fileId)) {
          return prev.filter((id) => id !== fileId);
        } else {
          if (selectionMode === 'single') {
            return [fileId];
          }
          return [...prev, fileId];
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
    isSelected: (fileId: string) => selectedFiles.includes(fileId),
  };
};

export const useFileDownload = () => {
  const downloadFile = useCallback(async (classId: string, fileIds: string[], fileName: string) => {
    try {
      const blob = await ClassesApi.downloadFile(classId, fileIds);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      return false;
    }
  }, []);

  return { downloadFile };
};

export const useDriveDataSyncHistory = (classId: string) => {
  const {
    data: processes = [],
    isLoading: processesIsLoafing,
    refetch: refetchProcesses,
  } = useQuery({
    queryKey: ['process-other-document', classId],
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [EProgressType.DRIVE_DATA],
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
