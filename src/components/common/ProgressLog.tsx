'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, RefreshCw } from 'lucide-react';
import { doc, onSnapshot, Timestamp, DocumentSnapshot, FirestoreError } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface LogEntry {
  message: string;
  time: Timestamp;
}

interface ProgressLogProps {
  isOpen: boolean;
  onClose: () => void;
  progressId: string;
  title?: string;
}

export function ProgressLog({ isOpen, onClose, progressId, title = 'Progress Logs' }: ProgressLogProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !progressId) {
      setLogs([]);
      setIsLoading(true);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const progressDocRef = doc(db, 'progress', progressId);

    const unsubscribe = onSnapshot(
      progressDocRef,
      (docSnapshot: DocumentSnapshot) => {
        setIsLoading(false);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const logsData = data?.logs || [];
          // Sắp xếp logs theo thời gian (mới nhất ở trên)
          const sortedLogs = logsData.sort((a: LogEntry, b: LogEntry) => {
            return b.time.seconds - a.time.seconds;
          });

          setLogs(sortedLogs);
          setError(null);
        } else {
          setLogs([]);
          setError(null);
        }
      },
      (error: FirestoreError) => {
        setError('Failed to load logs');
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [isOpen, progressId]);

  const formatTime = (timestamp: Timestamp) => {
    try {
      const date = timestamp.toDate();
      return format(date, 'dd/MM/yyyy HH:mm:ss', { locale: vi });
    } catch (error) {
      return 'Invalid time';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="flex flex-col overflow-hidden bg-slate-50"
        style={{ width: '60vw', height: '75vh', maxWidth: '1600px' }}
      >
        <DialogHeader className="-mx-6 -mt-6 flex-shrink-0 border-b border-slate-300 bg-slate-100/50 px-6 py-4">
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="-mx-6 flex flex-1 flex-col overflow-hidden px-6 py-3">
          {/* Logs Content */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-slate-300 bg-white">
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-gray-500">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Loading...
              </div>
            )}

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {error ? (
                  <div className="flex items-center justify-center py-8 text-red-600">
                    <div className="text-center">
                      <p className="font-medium">Error loading logs</p>
                      <p className="text-sm text-gray-500">{error}</p>
                    </div>
                  </div>
                ) : logs.length === 0 ? (
                  <div className="flex items-center justify-center py-8 text-gray-500">
                    <div className="text-center">
                      <Clock className="mx-auto h-12 w-12 text-gray-300" />
                      <p className="mt-2 font-medium">No logs available</p>
                      <p className="text-sm">Logs will appear here as they are generated</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {logs.map((log, index) => {
                      return (
                        <div
                          key={`${log.time.seconds}-${log.time.nanoseconds}-${index}`}
                          className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 transition-colors hover:bg-slate-100/50"
                        >
                          <div className="flex gap-4">
                            <div className="w-40 flex-shrink-0">
                              <p className="font-mono text-xs whitespace-nowrap text-gray-500">
                                {formatTime(log.time)}
                              </p>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                className="text-sm leading-normal whitespace-pre-wrap text-gray-900"
                                style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                              >
                                {log.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
