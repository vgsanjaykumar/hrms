import React, { useEffect, useRef } from 'react';

interface AlgoliaPlacesInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (value: string) => void;
}

const AlgoliaPlacesInput: React.FC<AlgoliaPlacesInputProps> = ({ value, onChange, onSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const placesInstance = useRef<any>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    // Dynamically load Algolia Places script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/places.js@1.19.0';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      placesInstance.current = (window as any).places({
        container: inputRef.current,
      });

      placesInstance.current.on('change', (e: any) => {
        onChange(e.suggestion.value);
        onSelect(e.suggestion.value);
      });

      placesInstance.current.on('clear', () => {
        onChange('');
      });
    };
    document.body.appendChild(script);

    return () => {
      if (placesInstance.current) {
        placesInstance.current.destroy();
      }
      document.body.removeChild(script);
    };
  }, [onChange, onSelect]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <input
      type="search"
      ref={inputRef}
      defaultValue={value}
      placeholder="Search Address ..."
      className="w-full border border-gray-300 rounded px-2 py-1"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default AlgoliaPlacesInput;
