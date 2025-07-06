import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter, ChevronDown } from 'lucide-react';
import { ColumnConfig } from '../../_config/thesis.config';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useI18n } from '@/i18n';

interface FilterBarProps {
  columns: ColumnConfig[];
  data: any[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

export function FilterBar({ columns, data, onFilterChange, className = '' }: FilterBarProps) {
  const { t, isReady } = useI18n();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [availableFilters, setAvailableFilters] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const filterableColumns = columns.filter((col) => col.enableFilter);
    const newAvailableFilters: Record<string, string[]> = {};

    filterableColumns.forEach((column) => {
      const values = new Set<string>();
      data.forEach((item) => {
        const value = item[column.accessorKey];
        if (value !== null && value !== undefined && value !== '' && value?.toLowerCase() !== 'none') {
          values.add(String(value));
        }
      });
      newAvailableFilters[column.accessorKey] = Array.from(values).sort();
    });

    setAvailableFilters(newAvailableFilters);
  }, [columns, data]);

  const handleFilterChange = (columnKey: string, values: string[]) => {
    const newFilters = { ...activeFilters };
    if (values.length === 0) {
      delete newFilters[columnKey];
    } else {
      newFilters[columnKey] = values;
    }
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange({});
  };

  const filterableColumns = columns.filter((col) => col.enableFilter);

  if (filterableColumns.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">{t('THESIS_PAGE.FILTER_BAR.FILTER')}</span>
          {Object.keys(activeFilters).length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {Object.keys(activeFilters).length} {t('THESIS_PAGE.FILTER_BAR.FILTER')}
            </Badge>
          )}
        </div>
        {Object.keys(activeFilters).length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 px-2 text-xs">
            <X className="mr-1 h-3 w-3" />
            {t('THESIS_PAGE.FILTER_BAR.CLEAR_ALL')}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {filterableColumns.map((column) => (
          <div key={column.accessorKey} className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs whitespace-nowrap">{column.header}:</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 min-w-[120px] justify-between text-xs">
                  {activeFilters[column.accessorKey]?.length > 0
                    ? `${activeFilters[column.accessorKey].length} ${t('THESIS_PAGE.FILTER_BAR.SELECTED')}`
                    : t('THESIS_PAGE.FILTER_BAR.ALL')}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${column.accessorKey}-all`}
                      checked={!activeFilters[column.accessorKey] || activeFilters[column.accessorKey].length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleFilterChange(column.accessorKey, []);
                        }
                      }}
                    />
                    <Label htmlFor={`${column.accessorKey}-all`} className="text-xs">
                      {t('THESIS_PAGE.FILTER_BAR.ALL')}
                    </Label>
                  </div>
                  {availableFilters[column.accessorKey]?.map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${column.accessorKey}-${value}`}
                        checked={activeFilters[column.accessorKey]?.includes(value) || false}
                        onCheckedChange={(checked) => {
                          const currentValues = activeFilters[column.accessorKey] || [];
                          if (checked) {
                            handleFilterChange(column.accessorKey, [...currentValues, value]);
                          } else {
                            handleFilterChange(
                              column.accessorKey,
                              currentValues.filter((v) => v !== value),
                            );
                          }
                        }}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Label
                              htmlFor={`${column.accessorKey}-${value}`}
                              className="max-w-[150px] cursor-help truncate text-xs"
                            >
                              {value}
                            </Label>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs break-words">{value}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>

      {Object.keys(activeFilters).length > 0 && (
        <div className="flex flex-wrap gap-1">
          {Object.entries(activeFilters).map(([columnKey, values]) => {
            const column = columns.find((col) => col.accessorKey === columnKey);
            return (
              <TooltipProvider key={columnKey}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="max-w-[200px] cursor-help text-xs">
                      <span className="truncate">
                        {column?.header}: {values.join(', ')}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-4 w-4 flex-shrink-0 p-0 hover:bg-transparent"
                        onClick={() => handleFilterChange(columnKey, [])}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs break-words">
                      {column?.header}: {values.join(', ')}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      )}
    </div>
  );
}
