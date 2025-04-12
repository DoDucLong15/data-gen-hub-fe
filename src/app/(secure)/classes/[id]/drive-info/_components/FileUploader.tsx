import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Upload, X } from 'lucide-react';
import { useDrives } from '@/hooks/useDrive';
import { useDropzone } from 'react-dropzone';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from '@/i18n';

interface FileUploaderProps {
  classId: string;
  isOpen: boolean;
  onClose: () => void;
  folderId: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ classId, isOpen, onClose, folderId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadFilesMutation: uploadFiles } = useDrives(classId);
  const { t, isReady } = useI18n();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (files.length === 0) return;

    try {
      setUploadProgress(10);

      // Simulate progress (in a real app, you'd use XHR or fetch with progress events)
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      await uploadFiles.mutateAsync({ files, parentId: folderId });

      setUploadProgress(100);
      clearInterval(interval);

      // Reset after successful upload
      setTimeout(() => {
        setFiles([]);
        setUploadProgress(0);
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Hàm cắt ngắn tên file nếu quá dài
  const truncateFileName = (fileName: string, maxLength: number = 20) => {
    if (fileName.length <= maxLength) return fileName;

    const extension = fileName.split('.').pop() || '';
    const nameWithoutExtension = fileName.substring(0, fileName.length - extension.length - 1);

    if (nameWithoutExtension.length <= maxLength - 5) {
      return fileName;
    }

    return `${nameWithoutExtension.substring(0, maxLength - 5)}...${extension ? `.${extension}` : ''}`;
  };

  if (!isReady) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.TITLE')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-md border-2 border-dashed p-6 text-center ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">{t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.DRAG_DROP')}</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">
                {t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.FILES_TO_UPLOAD').replace('{count}', files.length.toString())}
              </h4>

              <div className="max-h-40 space-y-2 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md bg-gray-50 p-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex max-w-[80%] items-center space-x-2">
                            <span className="truncate text-sm font-medium">{truncateFileName(file.name)}</span>
                            <span className="text-xs whitespace-nowrap text-gray-500">
                              ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{file.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="ml-2 flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>{t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.UPLOADING')}</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              {t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.CANCEL')}
            </Button>
            <Button onClick={handleUpload} disabled={files.length === 0 || uploadProgress > 0}>
              {t('THESIS_PAGE.DRIVE_INFO.FILE_UPLOADER.UPLOAD')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
