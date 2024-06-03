import { createContext, useState, useRef, ReactNode } from 'react';

export interface ViewContextType {
  view: string;
  // eslint-disable-next-line no-unused-vars
  handleViewChange: (viewChanged: string) => void;
  toggleCheckBox: React.RefObject<HTMLInputElement>;
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
