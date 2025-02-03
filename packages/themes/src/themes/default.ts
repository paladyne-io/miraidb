import type { Theme } from '../index'

const defaultTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    border: '#e2e8f0'
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    fontSize: {
      base: '1rem',
      sm: '0.875rem',
      lg: '1.125rem',
      xl: '1.25rem'
    }
  },
  spacing: {
    base: '1rem',
    sm: '0.5rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  },
  borderRadius: {
    sm: '0.125rem',
    base: '0.25rem',
    lg: '0.5rem',
    full: '9999px'
  }
}

export default defaultTheme
