import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, CirclePlus, History } from "lucide-react";

const Navbar = ({ className="" }) => {

    return (
        <div className={`bg-background min-h-screen w-3xs flex flex-col gap-10 py-6 px-4 border-r ${className}`}>
            <div className="h-20">
                <div className="flex items-center pt-5 pl-6">
                    <img src="siply-logotext.png" className="w-25" />
                </div>
            </div>
            <NavLink to="/" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <LayoutDashboard />
                            Overview
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/search" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <Search />
                            Search
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/add" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <CirclePlus />
                            Add
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/history" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <History />
                            History
                        </div>
                    </div>
                )}
            </NavLink>
        </div>
    );
};

export default Navbar;