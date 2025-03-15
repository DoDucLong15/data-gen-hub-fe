export function capitalizeFirstLetters(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatDate(date: Date | string | undefined, format: string = 'yyyy-MM-dd'): string {
  if (!date) return '-';
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    let formatted = format;
    formatted = formatted.replace('yyyy', year.toString());
    formatted = formatted.replace('MM', month);
    formatted = formatted.replace('dd', day);

    if (format.includes('HH') || format.includes('mm')) {
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      formatted = formatted.replace('HH', hours);
      formatted = formatted.replace('mm', minutes);
    }

    return formatted;
  } catch (error) {
    console.error('Date formatting error:', error);
    return '-';
  }
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}

// Convert file size to human-readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Check if file is allowed by extension
export function isFileAllowed(file: File, allowedExtensions: string[]): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  return allowedExtensions.includes(extension);
}

// Create URL query string from parameters
export function createQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });

  return searchParams.toString();
}
