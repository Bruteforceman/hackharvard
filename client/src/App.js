import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register';
import NoPage from "./NoPage";
import Main from "./Main";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1 className="title">Sports Buddy</h1>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Main />} />
            <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
