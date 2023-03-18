import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import Signup from './pages/Signup';
import './styles/_reset.scss';
import './styles/_global.scss';
import './styles/App.scss';

const App = () => {
   return (
      <div className="App">
         <Header />
         <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NoPage />} />
         </Routes>
      </div>
   );
};

export default App;
