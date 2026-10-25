import { useState } from 'react';
import { BookMarked } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { StatusFilter, type FilterValue } from '@/components/StatusFilter';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import { Summary } from '@/components/Summary';
import type { ReadingStatus } from '@/types';

function App() {
  const { books, addBook, hasBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = filter === 'all' ? books : books.filter((b) => b.status === (filter as ReadingStatus));

  const readingCount = books.filter((b) => b.status === 'reading').length;
  const finishedCount = books.filter((b) => b.status === 'finished').length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <BookMarked className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Reading List</h1>
              <p className="text-sm text-gray-500">Track the books you want to read, are reading, and have finished.</p>
            </div>
          </div>
        </header>

        {/* Add book */}
        <div className="mb-6">
          <AddBookForm onAdd={addBook} hasBook={hasBook} />
        </div>

        {books.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Summary */}
            <Summary total={books.length} reading={readingCount} finished={finishedCount} />

            {/* Filters */}
            <div className="mb-5">
              <StatusFilter books={books} active={filter} onChange={setFilter} />
            </div>

            {/* List */}
            {filtered.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-400">No books in this category.</p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {filtered.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={updateStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <footer className="mt-12 text-center text-xs text-gray-400">
          Your reading list is saved on this device.
        </footer>
      </div>
    </div>
  );
}

export default App;
