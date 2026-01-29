import './index.css';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import AppLayout from './layouts/AppLayout';
import AuthLayout from './layouts/AuthLayout';

import Overview from './pages/Overview';
import Search from './pages/Search';
import Add from './pages/Add';
import History from './pages/History';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import RedirectIfAuthed from './components/RedirectIfAuthed';

const App = () => {

  return (
    <Routes>
      <Route element={<RedirectIfAuthed />}>
        <Route element={ <AuthLayout /> } >
          <Route path="/login" element={ <Login />} />
          <Route path="/signup" element={ <SignUp />} />
        </Route>
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={ <AppLayout /> } >
          <Route path="/" element={ <Overview />} />
          <Route path="/search" element={ <Search />} />
          <Route path="/add" element={ <Add />} />
          <Route path="/history" element={ <History />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
