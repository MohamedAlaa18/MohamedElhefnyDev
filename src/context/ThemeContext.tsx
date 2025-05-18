import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>("dark");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("currentTheme") || "dark";
        setTheme(storedTheme);
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        if (theme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
        }

        localStorage.setItem("currentTheme", theme);
    }, [theme, isMounted]);

    // Avoid rendering children until client is hydrated
    if (!isMounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
