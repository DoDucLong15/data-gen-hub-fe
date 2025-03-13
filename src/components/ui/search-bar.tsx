import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function SearchBar({ value, onChange, onSubmit, isLoading = false, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-10" />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" className="mr-2" /> : null}
        Search
      </Button>
    </form>
  );
}
