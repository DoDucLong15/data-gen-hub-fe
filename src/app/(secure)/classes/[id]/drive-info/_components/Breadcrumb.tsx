import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { CURRENT_MESSAGES } from '@/configs/messages.config';

const { THESIS_PAGE } = CURRENT_MESSAGES;
const { BREADCRUMB } = THESIS_PAGE.DRIVE_INFO;

interface BreadcrumbProps {
  items: { id: string; name: string }[];
  onNavigate: (index: number) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={item.id} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}

            <button
              onClick={() => onNavigate(index)}
              className={`inline-flex items-center rounded-md px-2 py-1 text-sm font-medium ${
                index === items.length - 1
                  ? 'cursor-default text-gray-700'
                  : 'text-blue-600 hover:bg-blue-50 hover:text-blue-800'
              }`}
            >
              {index === 0 ? (
                <>
                  <Home className="mr-1 h-4 w-4" />
                  {BREADCRUMB.ROOT}
                </>
              ) : (
                item.name
              )}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
};
