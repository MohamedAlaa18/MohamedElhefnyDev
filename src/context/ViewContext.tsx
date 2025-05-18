import { createContext, useState, useRef, ReactNode } from 'react';

export interface ViewContextType {
  view: string;
  handleViewChange: (viewChanged: string) => void;
  toggleCheckBox: React.RefObject<HTMLInputElement | null>;
}

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [view, setView] = useState('projects');
  const toggleCheckBox = useRef<HTMLInputElement>(null);

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
