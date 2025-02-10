/**
 * Ana uygulama bileşeni
 * Bu bileşen, uygulamanın temel yapısını oluşturur ve aşağıdaki özellikleri sağlar:
 * - Redux store provider ile state yönetimi
 * - Material-UI tema desteği
 * - React Router ile sayfa yönlendirme
 * - Genel sayfa düzeni (Layout)
 */
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import theme from './theme';
import store from './store';

function App() {
  return (
    // Redux store'u tüm uygulamaya sağlanıyor
    <Provider store={store}>
      {/* Material-UI teması ve reset CSS */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Sayfa yönlendirme için Router */}
        <Router>
          {/* Ana sayfa düzeni */}
          <Layout />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
