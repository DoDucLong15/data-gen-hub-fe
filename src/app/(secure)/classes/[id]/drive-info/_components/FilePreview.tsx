import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, X, Info, Calendar, FileType, User, RefreshCw } from 'lucide-react';
import { useFileDownload } from '@/hooks/useDrive';
import { formatDate } from '../_helpers/file-helper.helper';
import { FileItem } from '@/utils/types/file.type';
import { FileIcon } from './FileIcon';
import Image from 'next/image';
import { useI18n } from '@/i18n';

interface FilePreviewProps {
  classId: string;
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FilePreview: React.FC<FilePreviewProps> = ({ classId, file, isOpen, onClose }) => {
  const { downloadFile } = useFileDownload();
  const [isDownloading, setIsDownloading] = useState(false);
  const { t, isReady } = useI18n();

  // Always call hooks at the top level, before any conditional logic
  const handleDownload = async () => {
    if (file) {
      try {
        setIsDownloading(true);
        await downloadFile(classId, [file.id], file.name.split('.').slice(0, -1).join('') || 'file');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const isLongFileName = (name: string) => name.length > 50;

  // Hàm cắt ngắn tên file
  const truncateFileName = (name: string) => {
    if (name.length <= 50) return name;

    const extension = name.includes('.') ? name.split('.').pop() : '';
    const nameWithoutExt = extension ? name.slice(0, -(extension.length + 1)) : name;

    if (nameWithoutExt.length <= 40) return name;
    return `${nameWithoutExt.slice(0, 40)}...${extension ? `.${extension}` : ''}`;
  };

  // If no file, render elegant dialog with message
  if (!file) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="border border-gray-200 bg-gradient-to-br from-slate-50 to-gray-100 p-8 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-slate-800">
              {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.NO_FILE_SELECTED')}
            </DialogTitle>
          </DialogHeader>
          <p className="py-4 font-light text-slate-600">
            {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.PLEASE_SELECT_FILE')}
          </p>
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-slate-300 font-medium text-slate-700 hover:bg-slate-100"
            >
              {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.CLOSE')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Determine file types
  const isImage = file.mimeType.startsWith('image/');
  const isPdf = file.mimeType === 'application/pdf';
  const isVideo = file.mimeType.startsWith('video/');
  const isAudio = file.mimeType.startsWith('audio/');
  const isGoogleDocs =
    file.mimeType === 'application/vnd.google-apps.document' ||
    file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  const isGoogleSheets =
    file.mimeType === 'application/vnd.google-apps.spreadsheet' ||
    file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const isGoogleSlides =
    file.mimeType === 'application/vnd.google-apps.presentation' ||
    file.mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';

  if (!isReady) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-lg border border-gray-200 bg-white p-0 shadow-xl sm:max-w-6xl">
        <DialogHeader className="border-b border-gray-200 bg-gradient-to-r from-slate-50 to-white px-8 py-5">
          <DialogTitle className="flex items-center gap-3">
            <FileIcon mimeType={file.mimeType} className="h-6 w-6 text-indigo-600" />
            <span className="line-clamp-1 cursor-help font-serif text-xl text-slate-800" title={file.name}>
              {isLongFileName(file.name) ? truncateFileName(file.name) : file.name}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[calc(80vh-120px)] flex-col md:flex-row">
          {/* Preview Section - Elegant styling */}
          <div className="flex h-[70%] flex-grow items-center justify-center overflow-auto bg-gradient-to-br from-slate-50 to-gray-100 p-1 md:h-auto">
            {isImage && (
              <div className="flex h-full w-full justify-center p-6">
                <Image
                  src={file.webViewLink}
                  alt={file.name}
                  className="max-h-full max-w-full rounded-md border border-gray-200 object-contain shadow-lg transition-all hover:shadow-xl"
                  width={file.imageMediaMetadata?.width}
                  height={file.imageMediaMetadata?.height}
                />
              </div>
            )}

            {(isPdf || isGoogleDocs || isGoogleSheets || isGoogleSlides) && (
              <iframe
                src={file.webViewLink}
                title={file.name}
                className="m-2 h-full w-full rounded-md border-0 shadow-lg"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            )}

            {isVideo && (
              <video controls className="max-h-full max-w-full rounded-md border border-gray-200 shadow-lg">
                <source src={file.webViewLink} />
                {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.BROWSER_NOT_SUPPORTED')}
              </video>
            )}

            {isAudio && (
              <div className="flex w-full max-w-md flex-col items-center rounded-lg border border-gray-100 bg-white p-10 shadow-lg">
                <FileIcon mimeType={file.mimeType} className="mb-6 h-28 w-28 text-indigo-600" />
                <p className="mb-6 text-center font-serif text-xl text-slate-800">{file.name}</p>
                <audio controls className="w-full">
                  <source src={file.webViewLink} />
                  {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.BROWSER_NOT_SUPPORTED')}
                </audio>
              </div>
            )}

            {!isImage && !isPdf && !isVideo && !isAudio && !isGoogleDocs && !isGoogleSheets && !isGoogleSlides && (
              <div className="flex flex-col items-center justify-center rounded-lg border border-gray-100 bg-white p-10 shadow-lg">
                <FileIcon mimeType={file.mimeType} className="mb-6 h-32 w-32 text-indigo-500" />
                <p className="mb-3 font-serif text-2xl text-slate-800">{file.name}</p>
                <p className="mb-8 text-center font-light text-slate-500">
                  {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.NO_PREVIEW')}
                </p>
                <Button
                  onClick={handleDownload}
                  className="mt-2 bg-slate-600 shadow-md transition-colors hover:bg-slate-700"
                  size="lg"
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Download className="mr-2 h-5 w-5" />
                  )}
                  {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.DOWNLOAD')}
                </Button>
              </div>
            )}
          </div>

          {/* Details Section - Sophisticated styling */}
          <div className="h-[30%] w-full overflow-y-auto border-t border-gray-200 bg-white p-8 md:h-auto md:w-96 md:border-t-0 md:border-l">
            <div className="space-y-8">
              {/* File details */}
              <div>
                <h4 className="mb-4 flex items-center text-sm font-medium tracking-wider text-slate-600 uppercase">
                  <Info className="mr-2 h-4 w-4 text-indigo-600" />
                  {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.NAME')}
                </h4>
                <div className="space-y-4 pl-1">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.NAME')}
                    </span>
                    <span className="mt-1 text-sm font-medium break-words text-slate-800">{file.name}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.TYPE')}
                    </span>
                    <span className="mt-1 flex items-center text-sm text-slate-700">
                      <FileType className="mr-1.5 h-3.5 w-3.5 text-indigo-400" />
                      {file.mimeType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h4 className="mb-4 flex items-center text-sm font-medium tracking-wider text-slate-600 uppercase">
                  <Calendar className="mr-2 h-4 w-4 text-indigo-600" />
                  {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.CREATED')}
                </h4>
                <div className="space-y-4 pl-1">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.CREATED')}
                    </span>
                    <span className="mt-1 text-sm text-slate-700">{formatDate(file.createdTime)}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500">
                      {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.MODIFIED')}
                    </span>
                    <span className="mt-1 text-sm text-slate-700">{formatDate(file.modifiedTime)}</span>
                  </div>
                </div>
              </div>

              {/* Owner */}
              {file.owners && file.owners.length > 0 && (
                <div>
                  <h4 className="mb-4 flex items-center text-sm font-medium tracking-wider text-slate-600 uppercase">
                    <User className="mr-2 h-4 w-4 text-indigo-600" />
                    {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.FILE_INFO.OWNER')}
                  </h4>
                  <div className="flex items-center space-x-4 rounded-lg border border-gray-100 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                    {file.owners[0].photoLink ? (
                      <Image
                        width={36}
                        height={36}
                        src={file.owners[0].photoLink}
                        alt={file.owners[0].displayName}
                        className="rounded-full border-2 border-white object-cover shadow-md"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200 bg-indigo-100 font-medium text-indigo-700 shadow-sm">
                        {file.owners[0].displayName.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-slate-800">{file.owners[0].displayName}</p>
                      <p className="text-xs text-slate-500">{file.owners[0].emailAddress}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with action buttons - Elegant styling */}
        <div className="flex justify-end space-x-4 border-t border-gray-200 bg-gradient-to-r from-slate-50 to-white p-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 font-medium text-slate-700 hover:bg-slate-100"
          >
            <X className="mr-2 h-4 w-4" />
            {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.CLOSE')}
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-slate-600 shadow-md transition-all hover:bg-slate-700"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {t('THESIS_PAGE.DRIVE_INFO.FILE_PREVIEW.DOWNLOAD')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
