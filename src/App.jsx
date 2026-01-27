import './index.css';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import AuthLayout from './components/AuthLayout';

import Overview from './pages/Overview';
import Search from './pages/Search';
import Add from './pages/Add';
import History from './pages/History';
import Login from './pages/Login';

const App = () => {

  return (
    <Routes>
      <Route element={ <AppLayout /> } >
        <Route path="/" element={ <Overview />} />
        <Route path="/search" element={ <Search />} />
        <Route path="/add" element={ <Add />} />
        <Route path="/history" element={ <History />} />
      </Route>

      <Route element={ <AuthLayout /> } >
        <Route path="/login" element={ <Login />} />
      </Route>
    </Routes>
  );
};

export default App;
