/*
  Analitycs

  Ranking de paises y visitas totales a la pagina wikipedia 
  Link: 
  https://wikimedia.org/api/rest_v1/metrics/pageviews/top-by-country/all-projects/all-access/2020/11

  ranking de articulos por lenguas
  https://wikimedia.org/api/rest_v1/metrics/pageviews/top/es.wikisource/all-access/2020/10/all-days

  eventos del dia muertes y sucesos importantes
  https://byabbe.se/on-this-day/#/default/get__month___day__events_json
  
*/

import './App.css';
import {Provider} from 'react-redux'
import { store } from './store/store';
import AppRouter from './routes/AppRouter';


const App = ()=>  {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;