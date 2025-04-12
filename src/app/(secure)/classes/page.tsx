// app/classes/page.tsx
'use client';

import { useState } from 'react';
import { SearchBar } from '@/components/ui/search-bar';
import { useClasses } from '@/hooks/useClasses';
import { TClass } from '@/utils/types/classes.type';
import { ClassList } from './_components/ClassList';
import { ClassDialog } from './_components/ClassDialog';
import { ClassPageHeader } from './_components/ClassPageHeader';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

export default function ClassesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { t, isReady } = useI18n();
  const { classes, isLoading, refetch, search, create, isCreating } = useClasses();

  const { data: searchResults = [], isLoading: isSearching } = search(searchQuery);

  const refetchSearch = () => {
    setSearchQuery('');
  };

  const displayedClasses = searchQuery.length > 0 ? searchResults : classes;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      refetchSearch();
    }
  };

  const handleRefresh = () => {
    if (searchQuery.length > 0) {
      refetchSearch();
    } else {
      refetch();
    }
  };

  const handleAddClass = (classData: Omit<TClass, 'id'>) => {
    create(classData);
    setIsAddDialogOpen(false);
  };

  if (!isReady) return null;

  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Classes }]}>
      <div className="container mx-auto px-6 py-8">
        <ClassPageHeader
          title={t('CLASSES.PAGE.TITLE')}
          description={t('CLASSES.PAGE.DESCRIPTION')}
          actionLabel={t('CLASSES.PAGE.ADD_BUTTON')}
          onAction={() => setIsAddDialogOpen(true)}
          onRefresh={handleRefresh}
        />

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            isLoading={isSearching}
            placeholder={t('CLASSES.PAGE.SEARCH_PLACEHOLDER')}
          />
        </div>

        <ClassList
          classes={displayedClasses}
          isLoading={isLoading || isSearching}
          onRefresh={handleRefresh}
          onAdd={() => setIsAddDialogOpen(true)}
          searchQuery={searchQuery}
        />

        <ClassDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddClass}
          isSubmitting={isCreating}
          mode="create"
        />
      </div>
    </ProtectedComponent>
  );
}
