import { Stack, IconButton, Typography, Box } from '@mui/material'
import { ArrowBack as BackIcon } from '@mui/icons-material'
import {Link} from 'react-router-dom'

const Bookmarks = ({bookmarks}) => {
    return (
      <>
      <Stack sx={{ mb:2 }} direction="row" alignItems="center">
        <IconButton to="/" component={Link} sx={{ color:'black', mr: 2 }}>
          <BackIcon/>
        </IconButton>
        <Typography variant='h4'>
          Halaman Favorit
        </Typography>
      </Stack>
      {
        Object.keys(bookmarks).map(b=>
          <Box key={b} to={`/search/${b}`} component={Link} sx={{ 
              p:2,
              cursor: 'pointer',
              backgroundColor: 'white',
              borderRadius: 2,
              textTransform: 'capitalize',
              mb: 2,
              display: 'block',
              color: 'black',
              textDecoration: 'none'
           }}>
            {b}
          </Box>)
      }
      </>
    )
  }
  
  export default Bookmarks