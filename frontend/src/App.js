import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Header from './Components/Header'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
