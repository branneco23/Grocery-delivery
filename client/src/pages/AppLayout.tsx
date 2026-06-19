import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "./Home";

const AppLoyout = () => {
    return (
        <>
            <Banner />
            <Navbar />
            <Home />
            <main className="min-h-screen">
                <Outlet />
            </main>
            <Footer/>
            <p>chatsidebar</p>
        </>
    )
};

export default AppLoyout;
