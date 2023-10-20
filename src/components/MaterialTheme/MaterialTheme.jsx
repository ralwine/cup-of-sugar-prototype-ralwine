import { createTheme } from "@mui/material";

function MaterialTheme() {
    let theme = createTheme({
      palette: {
        primary: {
          main: '#B8CA30'
        },
        secondary: {
          main: '#FFEBC8',
        },
        error: {
          main: '#ff312e',
        },
        warning: {
          main: '#BF6900',
        },
        info: {
          main: '#3A3335',
        },
        success: {
          main: '#40846D'
        },
        contrastThreshold: 4.5,
        tonalOffset: 0.4,
      },
      typography: {
        fontFamily: [
          'ui-monospace',
          'Menlo',
          'Monaco',
          '"Cascadia Mono"',
          '"Segoe UI Mono"',
          '"Roboto Mono"',
          '"Oxygen Mono"',
          '"Ubuntu Monospace"',
          '"Source Code Pro"',
          '"Fira Mono"',
          '"Droid Sans Mono"',
          '"Courier New"',
          'monospace',
        ].join(','),
    },
      modalStyle:{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'secondary.main',
          border: 'info.main',
          borderWidth: 1,
          boxShadow: 24,
          p: 4,
      
        }}); 
    return theme;
  }
  
export default MaterialTheme  