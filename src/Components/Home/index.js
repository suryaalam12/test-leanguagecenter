import { useState } from 'react'
import { Box, Typography, FilledInput, IconButton  } from '@mui/material'
import { Search as SearchIcon, Save as BookmarkIcon } from '@mui/icons-material'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  const[word, setWord] = useState("")
  const history = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(' ').length>1) return;
    history(`/search/${trimmedWord}`);
  }

  return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh'
     }}>
        <img src="/assets/logo.png" alt='Logo' />
        <Typography 
        color="primary"
        sx= {{
           mb: 1 
           }} variant='h4'>Kamus Kata</Typography>
        <Typography color="GrayText"
        sx={{ 
          mb: 1
         }}
        >Temukan arti kata dan simpan</Typography>
        <Box sx={{ width: '360' }}>
        <form onSubmit={handleSubmit}>
        <FilledInput
        value={word}
        onChange={event => setWord(event.target.value)} 
        disableUnderline placeholder="Cari Kata"
        sx={{ 
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
          '& .MuiFilledInput-input':{
            p: 2,
          }
         }}
         startAdornment={<SearchIcon color='disabled'/>}
         fullWidth
        />
        </form>
        
        </Box>
        <Link to="/bookmarks">
        <IconButton sx={{
          mr: 2,
          mt: 2,
          backgroundColor: 'red',
          borderRadius: "40px",
          color: '#fff',
          background: 'linear-gradient(138.72deg, #053466  0%, #056566 95.83%)',
          boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
         }} >
            <p>Halaman Favorit</p>
            <BookmarkIcon/>
        </IconButton>
        </Link>
    </Box>
  )
}

export default Home