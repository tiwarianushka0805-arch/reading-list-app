import { BookMarked, BookOpen, CheckCircle2 } from 'lucide-react';

interface SummaryProps {
  total: number;
  reading: number;
  finished: number;
}

export function Summary({ total, reading, finished }: SummaryProps) {
  const cards = [
    {
      label: 'Total Books',
      value: total,
      icon: BookMarked,
      iconClass: 'text-blue-500',
      bgClass: 'bg-blue-50',
    },
    {
      label: 'Currently Reading',
      value: reading,
      icon: BookOpen,
      iconClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
    },
    {
      label: 'Finished',
      value: finished,
      icon: CheckCircle2,
      iconClass: 'text-emerald-500',
      bgClass: 'bg-emerald-50',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-gray-100 bg-white p-3 text-center shadow-sm sm:flex-row sm:gap-3 sm:px-4 sm:py-3.5 sm:text-left"
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${c.bgClass}`}>
              <Icon className={`h-4 w-4 ${c.iconClass}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">{c.value}</div>
              <div className="truncate text-[11px] font-medium text-gray-500 sm:text-xs">{c.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
