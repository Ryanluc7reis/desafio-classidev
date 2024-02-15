import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '../theme'

const GlobalStyles = createGlobalStyle`
* { 
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html{
 font-size: 62.5%;
}
body {
  font-family: 'Open Sans', sans-serif;
}
;
`
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default MyApp
