import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
};

export const getStorageInfo = () => {
  try {
    const storage = localStorage.getItem('ideas-para-app-storage');
    if (storage) {
      const parsed = JSON.parse(storage);
      console.log('📱 Storage content:', parsed);
      return parsed;
    }
    console.log('📱 No storage found');
    return null;
  } catch (error) {
    console.error('📱 Error reading storage:', error);
    return null;
  }
};

export const clearStorage = () => {
  try {
    localStorage.removeItem('ideas-para-app-storage');
    console.log('🗑️ Storage cleared');
    return true;
  } catch (error) {
    console.error('🗑️ Error clearing storage:', error);
    return false;
  }
}; 