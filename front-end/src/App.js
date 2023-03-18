import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Home from './pages/Home';
import './styles/_reset.scss';
import './styles/_global.scss';

const App = () => {
   return (
      <div className="App">
         <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Home />}></Route>
            </Routes>
         </BrowserRouter>
      </div>
   );
};

export default App;
