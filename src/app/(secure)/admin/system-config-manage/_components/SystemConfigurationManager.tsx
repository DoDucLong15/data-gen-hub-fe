'use client';

import { DeleteConfigDialog, EditConfigDialog } from './ConfigDialog';
import { Button } from '@/components/ui/button';
import { ConfigList } from './ConfigList';
import { useSystemConfig } from '@/hooks/useSystemConfig';
import { TSystemConfig } from '@/utils/types/system-config.type';
import { useState } from 'react';
import { Plus, RefreshCcw } from 'lucide-react';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';

export default function SystemConfigurationManager() {
  // Query hooks
  const {
    data: configs = [],
    isLoading: isLoadingConfigs,
    createSystemConfig,
    updateSystemConfig,
    deleteSystemConfig,
    isCreating,
    isUpdating,
    isDeleting,
    refetch,
  } = useSystemConfig();

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<TSystemConfig | undefined>();
  const [configToDelete, setConfigToDelete] = useState<string | undefined>();

  // Handlers
  const handleAddNew = () => {
    setCurrentConfig(undefined);
    setEditDialogOpen(true);
  };

  const handleEdit = (config: TSystemConfig) => {
    setCurrentConfig(config);
    setEditDialogOpen(true);
  };

  const handleDelete = (key: string) => {
    setConfigToDelete(key);
    setDeleteDialogOpen(true);
  };

  const handleSaveConfig = (config: TSystemConfig) => {
    if (currentConfig) {
      updateSystemConfig(config);
      setEditDialogOpen(false);
    } else {
      createSystemConfig(config);
      setEditDialogOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (configToDelete) {
      deleteSystemConfig(configToDelete);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <div className="flex items-center gap-2">
          <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Configuration }]}>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </ProtectedComponent>
          <Button onClick={() => refetch()} variant={'outline'}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ConfigList configs={configs} onEdit={handleEdit} onDelete={handleDelete} isLoading={isLoadingConfigs} />

      <EditConfigDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        config={currentConfig}
        onSave={handleSaveConfig}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfigDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        configKey={configToDelete}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}
