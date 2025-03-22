import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

const JSONEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-json');
    await import('ace-builds/src-noconflict/theme-github');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { 
    ssr: false,
    loading: () => <Skeleton className="h-64 w-full" />
  }
);

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

export const JsonEditor = ({ value, onChange, readOnly = false }: JsonEditorProps) => {
  const { theme } = useTheme();
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    try {
      const formatted = value ? JSON.stringify(JSON.parse(value), null, 2) : '';
      setEditorValue(formatted);
    } catch (e) {
      setEditorValue(value || '');
    }
  }, [value]);

  const handleChange = (newValue: string) => {
    setEditorValue(newValue);
    onChange(newValue);
  };

  const editorTheme = theme === 'dark' ? 'monokai' : 'github';

  return (
    <JSONEditor
      mode="json"
      theme={editorTheme}
      value={editorValue}
      onChange={handleChange}
      readOnly={readOnly}
      setOptions={{
        useWorker: false,
        showPrintMargin: false,
        tabSize: 2,
      }}
      width="100%"
      height="200px"
      className="rounded-md border"
    />
  );
};