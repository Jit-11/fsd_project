import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./component/Navigation";
import AddProduct from "./component/AddProduct.jsx";
import RecycleTrail from "./component/RecycleTrail";
import Feedback from "./component/Feedback";
import MarketPlace from "./component/MarketPlace.jsx";
import AdminLogin from "./component/AdminLogin";
import AdminSignup from "./component/AdminSignup";
import Login from "./component/Login";
import Signup from "./component/Signup";

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<></>} />
                <Route path="/recycle-trail" element={<RecycleTrail />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/marketplace" element={<MarketPlace />} />
                <Route path="/feedback" element={<Feedback />} />

                {/* Added User and Admin Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<Signup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-sign-up" element={<AdminSignup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
