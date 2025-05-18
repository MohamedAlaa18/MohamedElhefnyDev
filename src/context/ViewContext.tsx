import { createContext, useState, useRef, ReactNode, RefObject } from 'react';

export interface ViewContextType {
  view: string;
  handleViewChange: (viewChanged: string) => void;
  toggleCheckBox: RefObject<HTMLInputElement>; // strict, without `null`
}

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // use dummy input to satisfy strict typing
  const dummyInput = typeof document !== 'undefined' ? document.createElement('input') : null;
  const toggleCheckBox = useRef<HTMLInputElement>(dummyInput!); // non-null assertion

  const [view, setView] = useState('projects');

  const handleViewChange = (viewChanged: string): void => {
    setView(viewChanged);
    if (toggleCheckBox.current) {
      toggleCheckBox.current.checked = viewChanged !== 'projects';
    }
  };

  return (
    <ViewContext.Provider value={{ view, handleViewChange, toggleCheckBox }}>
      {children}
    </ViewContext.Provider>
  );
};
