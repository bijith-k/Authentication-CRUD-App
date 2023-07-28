import {BrowserRouter,Routes,Route} from 'react-router-dom'

import SignUpPage from './pages/signUpPage';
import SignInPage from './pages/signInPage';
import HomePage from './pages/homePage';

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
