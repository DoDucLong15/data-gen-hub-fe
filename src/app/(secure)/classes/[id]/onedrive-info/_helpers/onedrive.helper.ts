import { TOnedriveItem } from '@/utils/types/onedrive.type';

export const isFolder = (item: TOnedriveItem): boolean => {
  return item.folder ? true : false;
};
