import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import Home from './components/Expense/Home';
import Main from './Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path='/home' element={<Home/> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
