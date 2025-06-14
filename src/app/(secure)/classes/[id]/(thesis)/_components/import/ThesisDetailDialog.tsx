import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Edit, X, FileText, Clock, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ColumnConfig, EntityConfig } from '../../_config/thesis.config';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n';

interface ThesisDetailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  entity: any;
  config: EntityConfig;
  onEdit: (entity: any) => void;
  onDownload?: (path: string) => Promise<void>;
}

export function ThesisDetailDialog({
  isOpen,
  onOpenChange,
  entity,
  config,
  onEdit,
  onDownload,
}: ThesisDetailDialogProps) {
  if (!entity) return null;
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  // Organize columns into categories for better display
  const organizeColumnsIntoCategories = (columns: ColumnConfig[]) => {
    // Important fields to show at the top
    const titleColumn = columns.find((col) => col.accessorKey === 'title' || col.accessorKey === 'name');
    const statusColumn = columns.find((col) => col.accessorKey === 'status' || col.accessorKey === 'state');

    // Description/content fields
    const contentColumns = columns.filter(
      (col) =>
        col.type === 'textarea' ||
        col.accessorKey === 'description' ||
        col.accessorKey === 'content' ||
        col.accessorKey === 'abstract',
    );

    // Metadata fields (dates, author, etc)
    const metadataColumns = columns.filter(
      (col) =>
        col.accessorKey === 'createdAt' ||
        col.accessorKey === 'updatedAt' ||
        col.accessorKey === 'author' ||
        col.accessorKey === 'supervisor',
    );

    // Other regular fields
    const regularColumns = columns.filter(
      (col) =>
        col !== titleColumn && col !== statusColumn && !contentColumns.includes(col) && !metadataColumns.includes(col),
    );

    return {
      titleColumn,
      statusColumn,
      contentColumns,
      metadataColumns,
      regularColumns,
    };
  };

  // Get organized columns for detail view
  const { titleColumn, statusColumn, contentColumns, metadataColumns, regularColumns } = organizeColumnsIntoCategories(
    config.columns,
  );

  // Helper function to render field value
  const renderFieldValue = (column: ColumnConfig, value: any) => {
    if (!value) return t('THESIS_DETAIL_DIALOG.NO_INFO');

    if (column.accessorKey?.endsWith('At')) {
      return formatDistanceToNow(new Date(value), {
        addSuffix: true,
        locale: vi,
      });
    }

    if (column.accessorKey === 'status' || column.accessorKey === 'state') {
      const statusColors: Record<string, string> = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        approved: 'bg-green-100 text-green-800 border-green-200',
        rejected: 'bg-red-100 text-red-800 border-red-200',
        draft: 'bg-gray-100 text-gray-800 border-gray-200',
        published: 'bg-blue-100 text-blue-800 border-blue-200',
        completed: 'bg-purple-100 text-purple-800 border-purple-200',
      };

      const statusValue = value.toLowerCase();
      const colorClass = statusColors[statusValue] || 'bg-gray-100 text-gray-800 border-gray-200';

      return (
        <Badge variant="outline" className={`px-2 py-0.5 text-sm ${colorClass}`}>
          {value}
        </Badge>
      );
    }

    return value;
  };

  // Get title text for dialog
  const getDialogTitle = () => {
    if (titleColumn && entity[titleColumn.accessorKey]) {
      return entity[titleColumn.accessorKey];
    }
    return `Chi tiết ${config.title}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden rounded-lg border p-0 shadow-lg">
        <DialogHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3">
          {/* Important: DialogTitle must be a direct child of DialogHeader for accessibility */}
          <DialogTitle className="pr-6 text-lg leading-tight font-bold break-words text-gray-800">
            {getDialogTitle()}
          </DialogTitle>

          <div className="mt-1 flex items-center justify-between">
            <div>{statusColumn && renderFieldValue(statusColumn, entity[statusColumn.accessorKey])}</div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">{t('THESIS_DETAIL_DIALOG.CLOSE')}</span>
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] px-4">
          <div className="py-3">
            {/* Metadata section */}
            {metadataColumns.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-1.5 text-gray-700">
                  <Clock className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">{t('THESIS_DETAIL_DIALOG.SECTIONS.BASIC_INFO.TITLE')}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {metadataColumns.map((column) => (
                    <div key={column.accessorKey} className="rounded border border-gray-200 bg-gray-50 p-2">
                      <span className="mb-1 block text-sm font-medium text-gray-600">{column.header}</span>
                      <span className="text-sm text-gray-800">
                        {renderFieldValue(column, entity[column.accessorKey])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular fields */}
            {regularColumns.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-1.5 text-gray-700">
                  <Info className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">{t('THESIS_DETAIL_DIALOG.SECTIONS.DETAILS.TITLE')}</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-1 md:grid-cols-2">
                  {regularColumns.map((column) => (
                    <div key={column.accessorKey} className="rounded border border-gray-200 bg-gray-50 p-2">
                      <span className="mb-1 block text-sm font-medium text-gray-600">{column.header}</span>
                      <span className="text-sm break-words text-gray-800">
                        {renderFieldValue(column, entity[column.accessorKey])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content fields */}
            {contentColumns.length > 0 && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-1.5 text-gray-700">
                  <FileText className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">{t('THESIS_DETAIL_DIALOG.SECTIONS.CONTENT.TITLE')}</h3>
                </div>
                <div className="space-y-3">
                  {contentColumns.map((column) => (
                    <Card key={column.accessorKey} className="overflow-hidden border border-gray-300 shadow-sm">
                      <CardHeader className="border-b border-gray-300 bg-gray-50 px-3 py-2">
                        <CardTitle className="text-sm font-medium text-gray-700">{column.header}</CardTitle>
                      </CardHeader>
                      <CardContent className="bg-white px-4 py-3">
                        <div className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">
                          {entity[column.accessorKey] || t('THESIS_DETAIL_DIALOG.NO_INFO')}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Show file download section if applicable */}
            {config.downloadEnabled && entity.inputPath && (
              <div className="mb-4">
                <div className="mb-2 flex items-center gap-1.5 text-gray-700">
                  <Download className="h-4 w-4" />
                  <h3 className="text-sm font-semibold">{t('THESIS_DETAIL_DIALOG.SECTIONS.ATTACHMENTS.TITLE')}</h3>
                </div>
                <div className="flex items-center justify-between rounded border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-slate-600" />
                    <div>
                      <p className="max-w-[200px] truncate text-sm font-medium text-gray-800 md:max-w-[300px]">
                        {entity.fileName ||
                          entity.inputPath.split('/').pop() ||
                          t('THESIS_DETAIL_DIALOG.SECTIONS.ATTACHMENTS.FILE_LABEL')}
                      </p>
                      <p className="text-xs text-gray-600">
                        {t('THESIS_DETAIL_DIALOG.SECTIONS.ATTACHMENTS.DOWNLOAD_HINT')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    onClick={() => onDownload && onDownload(entity.inputPath)}
                    className="flex h-9 items-center gap-1 border border-blue-300 bg-white px-3 py-0 text-sm hover:bg-blue-100"
                  >
                    <Download className="h-4 w-4" />
                    {t('THESIS_DETAIL_DIALOG.SECTIONS.ATTACHMENTS.DOWNLOAD_BUTTON')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="mt-auto flex justify-end gap-2 border-t bg-gray-50 p-4">
          <Button onClick={() => onOpenChange(false)} className="h-9 bg-slate-600 px-4 py-0 text-sm hover:bg-slate-700">
            {t('THESIS_DETAIL_DIALOG.CLOSE')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
