import React from 'react'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

const theme = extendTheme({
    fonts: {
        heading: `'Inter', sans-serif`,
        body: `'Inter', sans-serif`,
    },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App/>
        </ChakraProvider>
    </React.StrictMode>,
)
