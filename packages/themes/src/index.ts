export { default as defaultTheme } from './themes/default'
export { default as darkTheme } from './themes/dark'

// Export types
export interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    surface: string
    text: string
    border: string
  }
  typography: {
    fontFamily: string
    fontSize: {
      base: string
      sm: string
      lg: string
      xl: string
    }
  }
  spacing: {
    base: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    base: string
    lg: string
    full: string
  }
}
