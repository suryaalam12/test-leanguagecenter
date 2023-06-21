import { createTheme } from '@mui/material'

export default createTheme({
    palette: {
        background :{
            default: '#e0ebeb',
        },
        primary: {
            main: "#00706F",
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h4: {
            fontWeight: 600
        },
        h5: {
            fontWeight: 200
        }
    }
})