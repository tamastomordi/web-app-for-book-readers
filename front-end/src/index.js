import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
      <RecoilRoot>
         <React.Suspense fallback={<div>loading...</div>}>
            <App />
         </React.Suspense>
      </RecoilRoot>
   </React.StrictMode>
);
