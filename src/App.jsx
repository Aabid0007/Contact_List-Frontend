
import './App.css'
import MainLayout from './components/Layouts/MainLayouts/MainLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  return (
    <div>
     <ToastContainer />
     <MainLayout />
    </div>
  )
}

export default App
