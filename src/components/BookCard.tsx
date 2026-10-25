import { useState, useRef, useEffect, type ElementRef } from 'react';
import { MoreVertical, Trash2, X } from 'lucide-react';
import type { Book, ReadingStatus } from '@/types';
import { STATUS_META } from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const menuRef = useRef<ElementRef<'div'>>(null);
  const statusRef = useRef<ElementRef<'div'>>(null);

  useEffect(() => {
    if (!menuOpen && !statusOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (statusOpen && statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen, statusOpen]);

  const meta = STATUS_META[book.status];

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-gray-900">{book.title}</h3>

        <div className="flex shrink-0 items-center gap-0.5">
          <button
            onClick={() => onRemove(book.id)}
            className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
            aria-label="Delete book"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              aria-label="Book options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
              <button
                onClick={() => {
                  onRemove(book.id);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </button>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="relative mt-4" ref={statusRef}>
        <button
          onClick={() => setStatusOpen((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition hover:opacity-80 ${meta.badge}`}
        >
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          {meta.label}
        </button>
        {statusOpen && (
          <div className="absolute left-0 top-full z-10 mt-1 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
            {STATUS_ORDER.map((s) => {
              const m = STATUS_META[s];
              const isCurrent = s === book.status;
              return (
                <button
                  key={s}
                  onClick={() => {
                    onStatusChange(book.id, s);
                    setStatusOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition hover:bg-gray-50 ${
                    isCurrent ? 'font-semibold text-gray-900' : 'text-gray-600'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${m.dot}`} />
                  {m.label}
                  {isCurrent && <span className="ml-auto text-xs text-gray-400">current</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
