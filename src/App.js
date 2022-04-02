import logo from './logo.svg';
import NameForm from './components/Form/FormCoding';
import Search from './components/Search/Search';
import { useInputValue } from './components/InputValue/useInputValue';
import './App.css';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<NameForm />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
