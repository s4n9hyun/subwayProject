import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/pages/Main/Main";
import WeatherSearch from "./components/pages/WeatherSearch/WeatherSearch";
import About from "./components/pages/About/About";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/weather" element={<WeatherSearch />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
