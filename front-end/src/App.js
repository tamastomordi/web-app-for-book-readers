import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignupForm from './layouts/Signup/SignupForm';
import './styles/_reset.scss';
import './styles/_global.scss';
import './styles/App.scss';

const App = () => {
   return (
      <div className="App">
         <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/signup" element={<SignupForm />} />
               <Route path="*" element={<NoPage />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
