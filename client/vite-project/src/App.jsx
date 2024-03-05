import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DBComponent from './components/DBcomponent/DBcomponent';
import UserInput from './components/UserInput/UserInput';
import UpdateItem from './components/UpdateItem/UpdateItem';

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
          {/* Pass the destination_id parameter to the UpdateItem component */}
          <Route path="/update/:destination_id" element={<UpdateItem />} />
          <Route path="/login"/>
          <Route path="/logout"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
