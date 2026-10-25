import { BookOpen } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/60 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
        <BookOpen className="h-8 w-8 text-blue-500" />
      </div>
      <p className="mt-5 text-lg font-medium text-gray-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
