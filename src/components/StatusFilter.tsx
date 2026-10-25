import type { Book, ReadingStatus } from '@/types';
import { STATUS_META } from '@/types';

type FilterValue = ReadingStatus | 'all';

interface StatusFilterProps {
  books: Book[];
  active: FilterValue;
  onChange: (value: FilterValue) => void;
}

const FILTER_OPTIONS: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'want-to-read', label: 'Want to Read' },
  { value: 'reading', label: 'Reading' },
  { value: 'finished', label: 'Finished' },
];

export function StatusFilter({ books, active, onChange }: StatusFilterProps) {
  const counts = books.reduce(
    (acc, b) => {
      acc[b.status] = (acc[b.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<ReadingStatus, number>,
  );

  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_OPTIONS.map((opt) => {
        const count = opt.value === 'all' ? books.length : (counts[opt.value as ReadingStatus] ?? 0);
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition active:scale-[0.97] ${
              isActive
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt.value !== 'all' && (
              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_META[opt.value as ReadingStatus].dot}`} />
            )}
            {opt.label}
            <span className={`rounded-full px-1.5 text-xs ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export type { FilterValue };
