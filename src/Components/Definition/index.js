import { useState, useEffect, Fragment } from 'react'
import { Stack, Typography, Box, IconButton, Divider, CircularProgress } from "@mui/material"
import { ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon, Bookmark as BookmarkedIcon, PlayArrow as PlayIcon } from "@mui/icons-material"
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'



const Definition = ({ bookmarks,
  addBookmark, 
  removeBookmark }) => {
  const { word } = useParams();
  const navigate = useNavigate();
  const [definitions, setDefinitions] = useState([])
  const [loading, setLoading] = useState(true)
  const [exist, setExist] = useState(true)

  const isBookmarked = Object.keys(bookmarks).includes(word)

  useEffect(()=> {
      const fetchDefinition = async () => {
        try {
          const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          setDefinitions(resp.data)
          setLoading(false);
        } catch(err){
          setExist(false)
        }
      }
      fetchDefinition();
  }, [])

  if(!exist) return <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  }}><h1>Kata Tidak Ditemukan</h1>
  <IconButton onClick={() => navigate(-1)}>
          <p>Kembali</p>
        </IconButton>
  </Box>
  if(loading) return <Box sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
 }}>
    <CircularProgress />
    </Box>

    return (
      <Box sx={{ width: '360' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <IconButton onClick={() => navigate(-1)}>
          <BackIcon/>
        </IconButton>
        <IconButton onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)}>
          {isBookmarked ? <BookmarkedIcon sx={{ color: 'black' }}/> : <BookmarkIcon sx={{ color: 'black' }}/>}
        </IconButton>
      </Stack>
      <Stack direction="column" justifyContent="space-between" sx={{ 
        mt: 3,
        background: 'linear-gradient(138.72deg, #053466  0%, #056566 95.83%)',
        boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
        px: 4,
        py: 5,
        color: 'white',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
       }}>
        <Typography sx={{ textTransform: 'capitalize' }} variant="h5">{word}</Typography>
          {definitions.map((def, idx) =>
        <Fragment key={idx}>
          <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }}/>
          {def.phonetics.map(phonetic =>
            <Box key={phonetic.text}>
              <Typography color="white" variant="subtitle1">{phonetic.text}</Typography>
            </Box>
            )} 
        </Fragment>
        )}
        <IconButton sx={{ 
           borderRadius: 2,
           p: 2,
           mt: 3,
           color: '#fff',
           background: 'red',
           boxShadow: '0px 10px 10px rgba(188, 113, 113, 0.2)',
         }} ><PlayIcon/></IconButton>
      </Stack>

      {definitions.map((def, idx) =>
        <Fragment key={idx}>
          <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }}/>
          {def.meanings.map(meaning =>
            <Box key={meaning.partOfSpeech} sx={{ 
              boxShadow: '0px 10 px 25px rgba(0, 0, 0, 0.05)',
              backgroundColor: '#fff',
              p: 2,
              borderRadius:2,
              mt: 3
             }}>
              <Typography color="GrayText" variant="subtitle1">{meaning.partOfSpeech}</Typography>
              {meaning.definitions.map(definition => <Typography key={definition}>{meaning.definitions.length > 1 && `-  `}{definition.definition}</Typography>)}
            </Box>
            )}
        </Fragment>
        )}
      </Box>
    )
  }
  
export default Definition