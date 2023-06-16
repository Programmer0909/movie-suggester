import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  fontFamily: 'Roboto, sans-serif',
  mainColors: {
    blue: '#FF8000',
    gray: '#0C7B2E',
    dark: '#41664D',
    red : '#FCD6A2',
    purple : '#FF3500'
  },
};

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${(props) => props.theme.fontFamily};
    font-size: 18px;
    margin: 0;
    padding-top: 40px;
    padding-left: 15px;
    padding-right: 15px;
    background-color: ${(props) => props.theme.mainColors.red};
  }
`;

export const GlobalTheme = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};