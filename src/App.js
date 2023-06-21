import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline, Grid } from '@mui/material'
import theme from "./theme"
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Bookmarks from './Components/Bookmarks'
import Definitions from './Components/Definition'

const App = () => {
  const [bookmarks, setBookmarks] = useState(JSON.parse(localStorage.getItem('bookmarks')) || {});

  
  
  useEffect(()=>{
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])
  const addBookmark = (word, definitions) => 
  setBookmarks(oldBookmarks => ({...oldBookmarks,
  [word]: definitions
 }))

  const removeBookmark = word => setBookmarks(oldBookmarks=>{
   const temp = { ...oldBookmarks };
   delete temp[word];
   return temp;
  })
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Grid container>
      <Grid item xs={12} sx={{ p: 2 }}>
    <Router>
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/bookmarks" element={<Bookmarks bookmarks={bookmarks}/>} />
      <Route path="/search/:word" element={<Definitions bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} />}/>
      </Routes>
    </Router>
    </Grid>
    </Grid>
    </ThemeProvider>
  )
}

export default App