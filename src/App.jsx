import './App.css'
import Navigation from './components/Navigation';
import Products from './pages/Products';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Navigation/>
      <Products/>
      <ToastContainer/>
    </>
  )
}

export default App
