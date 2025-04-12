import { formatDistanceToNow } from 'date-fns';
import { Register } from '@/utils/types/register.type';
import { RegisterActions } from './RegisterAction';
import { ColumnDef } from '@tanstack/react-table';
import { useI18n } from '@/i18n';
import { vi } from 'date-fns/locale';

export const getColumns = (): ColumnDef<Register>[] => {
  const { t, isReady } = useI18n();

  if (!isReady) return [];

  return [
    {
      accessorKey: 'stt',
      header: t('REGISTER_LIST.TABLE.HEADERS.NO'),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: 'name',
      header: t('REGISTER_LIST.TABLE.HEADERS.NAME'),
    },
    {
      accessorKey: 'email',
      header: t('REGISTER_LIST.TABLE.HEADERS.EMAIL'),
    },
    {
      accessorKey: 'phone',
      header: t('REGISTER_LIST.TABLE.HEADERS.PHONE'),
      cell: ({ row }) => row.original.phone || t('REGISTER_LIST.TABLE.NO_DATA'),
    },
    {
      accessorKey: 'school',
      header: t('REGISTER_LIST.TABLE.HEADERS.SCHOOL'),
      cell: ({ row }) => row.original.school || t('REGISTER_LIST.TABLE.NO_DATA'),
    },
    {
      accessorKey: 'department',
      header: t('REGISTER_LIST.TABLE.HEADERS.DEPARTMENT'),
      cell: ({ row }) => row.original.department || t('REGISTER_LIST.TABLE.NO_DATA'),
    },
    {
      accessorKey: 'position',
      header: t('REGISTER_LIST.TABLE.HEADERS.POSITION'),
      cell: ({ row }) => row.original.position || t('REGISTER_LIST.TABLE.NO_DATA'),
    },
    {
      accessorKey: 'createdAt',
      header: t('REGISTER_LIST.TABLE.HEADERS.REGISTERED'),
      cell: ({ row }) => {
        return formatDistanceToNow(new Date(row.original.createdAt), {
          addSuffix: true,
          locale: vi,
        });
      },
    },
    {
      id: 'actions',
      header: t('REGISTER_LIST.TABLE.HEADERS.ACTIONS'),
      cell: ({ row }) => {
        return <RegisterActions register={row.original} />;
      },
    },
  ];
};
