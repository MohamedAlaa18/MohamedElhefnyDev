import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../state/store';
import { ViewProvider } from '../context/ViewContext';
import { ThemeProvider } from '../context/ThemeContext';

interface CustomProvidersProps {
  children: ReactNode;
}

const CustomProvider = ({ children }: CustomProvidersProps) => {
  return (
    <Provider store={store}>
      <ViewProvider>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </ViewProvider>
    </Provider>
  );
};

export default CustomProvider;
