import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);