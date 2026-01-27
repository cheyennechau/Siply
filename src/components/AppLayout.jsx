import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {

    return (
        <div className="h-screen flex overflow-hidden">
            <Navbar />

            <main className="flex-1 p-10 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;