import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TSystemConfig } from '@/utils/types/system-config.type';
import { getConfigValueType, getConfigValue } from '@/app/(secure)/admin/system-config-manage/_helpers/config.helper';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';

interface ConfigListProps {
  configs: TSystemConfig[];
  onEdit: (config: TSystemConfig) => void;
  onDelete: (key: string) => void;
  isLoading?: boolean;
}

export const ConfigList = ({ configs, onEdit, onDelete, isLoading = false }: ConfigListProps) => {
  const formatValue = (config: TSystemConfig) => {
    const type = getConfigValueType(config);
    const value = getConfigValue(config);

    switch (type) {
      case 'string':
        return value;
      case 'number':
        return value?.toString();
      case 'boolean':
        return value ? 'True' : 'False';
      case 'json':
        return JSON.stringify(value).substring(0, 50) + (JSON.stringify(value).length > 50 ? '...' : '');
      default:
        return 'Not set';
    }
  };

  const getValueTypeBadge = (config: TSystemConfig) => {
    const type = getConfigValueType(config);
    const colors: Record<string, string> = {
      string: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      number: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      boolean: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      json: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    };

    return (
      <Badge variant="outline" className={type ? colors[type] : ''}>
        {type || 'empty'}
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Key</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[40%]">Value</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {configs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="p-4 text-center">
                {isLoading ? 'Loading...' : 'No configurations found'}
              </TableCell>
            </TableRow>
          ) : (
            configs.map((config) => (
              <TableRow key={config.key}>
                <TableCell className="font-medium">{config.key}</TableCell>
                <TableCell>{getValueTypeBadge(config)}</TableCell>
                <TableCell className="overflow-hidden text-ellipsis">{formatValue(config)}</TableCell>
                <TableCell className="text-right">
                  <ProtectedComponent
                    permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Configuration }]}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <EllipsisVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(config)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDelete(config.key)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ProtectedComponent>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
