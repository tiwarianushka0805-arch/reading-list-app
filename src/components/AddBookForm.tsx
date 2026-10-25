import { useState, type FormEvent } from 'react';
import { Plus } from 'lucide-react';

const MAX_TITLE_LENGTH = 60;

interface AddBookFormProps {
  onAdd: (title: string) => void;
  hasBook: (title: string) => boolean;
}

export function AddBookForm({ onAdd, hasBook }: AddBookFormProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const validate = (title: string): string => {
    const trimmed = title.trim();
    if (!trimmed) return '';
    if (trimmed.length > MAX_TITLE_LENGTH) {
      return 'Book title must be 60 characters or fewer.';
    }
    if (hasBook(trimmed)) {
      return 'This book is already in your reading list.';
    }
    return '';
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    const validationError = validate(trimmed);
    if (validationError) {
      setError(validationError);
      return;
    }
    onAdd(trimmed);
    setValue('');
    setError('');
  };

  const handleChange = (next: string) => {
    setValue(next);
    if (error) setError(validate(next));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter a book title..."
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          aria-label="Book title"
        />
        <button
          type="submit"
          disabled={!value.trim()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Book</span>
        </button>
      </form>
      {error && <p className="mt-2 text-sm font-medium text-red-600">{error}</p>}
    </div>
  );
}
