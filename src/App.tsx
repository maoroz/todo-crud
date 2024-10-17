import React from 'react'
import { AppBarWithTabs } from './components'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BestFriendsPage, CommunicationsPage, DataPage, ReturnsPage, TasksPage } from './pages';

const theme = createTheme({
  palette: {
    background: {
      default: "#F3F3F3",
    },
    primary: {
      main: '#639605'
    },
    secondary: {
      main: '#CC3872'
    },
    text: {
      primary: '#555555',
      secondary: '#777777'
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color:'#CC3872' },
      },
    }
  },
  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBarWithTabs />
        <Routes>
          <Route path="/mis-datos" element={<DataPage />} />
          <Route path="/mis-tareas" element={<TasksPage />} />
          <Route path="/mis-devoluciones" element={<ReturnsPage />} />
          <Route path="/mis-comunicaciones" element={<CommunicationsPage />} />
          <Route path="/mis-mejores-amigos" element={<BestFriendsPage />} />
        </Routes>
      </Router>
    </ThemeProvider >
  )
}

export default App
