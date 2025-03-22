import { formatDistanceToNow } from 'date-fns';
import { Register } from '@/utils/types/register.type';
import { RegisterActions } from './RegisterAction';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Register>[] = [
  {
    accessorKey: 'stt',
    header: 'STT',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => row.original.phone || 'N/A',
  },
  {
    accessorKey: 'school',
    header: 'School',
    cell: ({ row }) => row.original.school || 'N/A',
  },
  {
    accessorKey: 'department',
    header: 'Department',
    cell: ({ row }) => row.original.department || 'N/A',
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => row.original.position || 'N/A',
  },
  {
    accessorKey: 'createdAt',
    header: 'Registered',
    cell: ({ row }) => {
      return formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true });
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return <RegisterActions register={row.original} />;
    },
  },
];
