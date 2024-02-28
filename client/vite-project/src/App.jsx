import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import DBComponent from './components/DBcomponent/DBcomponent';
import DetailedDescriptionComponent from './components/DetailedDescription/DetailedDescriptionComponent';
import UserInput from './components/UserInput/UserInput';

function App() {
  const handleAdd = () => {
    console.log("Data added successfully");
  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DBComponent />} />
          <Route path="/create" element={<UserInput onAdd={handleAdd} />} />
          {/* <Route path="/detail" element={<YourDetailComponent />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
