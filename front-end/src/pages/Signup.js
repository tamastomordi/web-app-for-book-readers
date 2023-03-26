import Header from '../layouts/Header';
import SignupForm from '../layouts/Signup/SignupForm';

const Signup = () => {
   return (
      <div className="Signup">
         <Header />
         <div className="container">
            <SignupForm />
         </div>
      </div>
   );
};

export default Signup;
