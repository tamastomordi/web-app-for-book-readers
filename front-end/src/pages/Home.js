import Header from '../layouts/Header';

const Home = () => {
   return (
      <div className="Home">
         <Header />
         <div className="container">
            <div className="card -wide">
               <h1>Minimalista közösségi platform könyvolvasók számára.</h1>
               <p>
                  Keress új könyveket, rendszerezd olvasmányaidat és oszd meg
                  őket legközelebbi barátaiddal, mindezt felesleges funkciók és
                  zavaró tényezők nélkül.
               </p>
            </div>
            <div className="card -wide right">
               <h1>Intuitív kezelőfelület.</h1>
               <p>
                  Keress új könyveket, rendszerezd olvasmányaidat és oszd meg
                  őket legközelebbi barátaiddal, mindezt felesleges funkciók és
                  zavaró tényezők nélkül.
               </p>
            </div>
         </div>
      </div>
   );
};

export default Home;
