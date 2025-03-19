import './App.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Outlet } from "react-router-dom";

function App() {
  
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Renders page-specific content */}
      </main>
      <Footer />
    </>
  );
}

export default App;
