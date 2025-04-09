import { formatDistanceToNow } from 'date-fns';
import { Register } from '@/utils/types/register.type';
import { RegisterActions } from './RegisterAction';
import { ColumnDef } from '@tanstack/react-table';
import { REGISTER_LIST } from '@/configs/messages.config';

export const columns: ColumnDef<Register>[] = [
  {
    accessorKey: 'stt',
    header: REGISTER_LIST.TABLE.HEADERS.NO,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'name',
    header: REGISTER_LIST.TABLE.HEADERS.NAME,
  },
  {
    accessorKey: 'email',
    header: REGISTER_LIST.TABLE.HEADERS.EMAIL,
  },
  {
    accessorKey: 'phone',
    header: REGISTER_LIST.TABLE.HEADERS.PHONE,
    cell: ({ row }) => row.original.phone || REGISTER_LIST.TABLE.NO_DATA,
  },
  {
    accessorKey: 'school',
    header: REGISTER_LIST.TABLE.HEADERS.SCHOOL,
    cell: ({ row }) => row.original.school || REGISTER_LIST.TABLE.NO_DATA,
  },
  {
    accessorKey: 'department',
    header: REGISTER_LIST.TABLE.HEADERS.DEPARTMENT,
    cell: ({ row }) => row.original.department || REGISTER_LIST.TABLE.NO_DATA,
  },
  {
    accessorKey: 'position',
    header: REGISTER_LIST.TABLE.HEADERS.POSITION,
    cell: ({ row }) => row.original.position || REGISTER_LIST.TABLE.NO_DATA,
  },
  {
    accessorKey: 'createdAt',
    header: REGISTER_LIST.TABLE.HEADERS.REGISTERED,
    cell: ({ row }) => {
      return formatDistanceToNow(new Date(row.original.createdAt), { addSuffix: true });
    },
  },
  {
    id: 'actions',
    header: REGISTER_LIST.TABLE.HEADERS.ACTIONS,
    cell: ({ row }) => {
      return <RegisterActions register={row.original} />;
    },
  },
];
