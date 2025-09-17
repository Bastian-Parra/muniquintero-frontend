import {createContext, useState, useContext, useEffect} from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('darkMode')
        return savedTheme ? JSON.parse(savedTheme) : false
    })
    
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.body.classList.toggle('dark-mode', darkMode)
    }, [darkMode])

    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode}}>
            <div className={darkMode ? 'dark-mode' : ''}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)