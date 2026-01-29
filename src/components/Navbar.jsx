import { NavLink } from "react-router-dom";
import { LayoutDashboard, Search, CirclePlus, History } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabaseClient";

const Navbar = ({ className="" }) => {

    return (
        <div className={`bg-background min-h-screen w-20 md:w-64 flex flex-col gap-10 py-6 px-4 border-r ${className}`}>
            <div className="h-20">
                <div className="flex items-center pt-5 pl-6">
                    <img 
                        src="siply-logotext.png" 
                        className="hidden sm:block w-25" 
                    />
                    <img 
                        src="siply-logo.png" 
                        className="block md:hidden w-8" 
                    />
                </div>
            </div>
            <NavLink to="/" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-accent-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <LayoutDashboard />
                            <span className="hidden sm:inline">Overview</span>
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/search" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-accent-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <Search />
                            <span className="hidden sm:inline">Search</span>
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/add" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-accent-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <CirclePlus />
                            <span className="hidden sm:inline">Add</span>
                        </div>
                    </div>
                )}
            </NavLink>

            <NavLink to="/history" >
                {({isActive}) => (
                    <div className={`item ${isActive ? "bg-primary text-white" : "text-accent-foreground hover:bg-accent transition-all duration-300 ease-in-out"}`}>
                        <div className="flex gap-5">
                            <History />
                            <span className="hidden sm:inline">History</span>
                        </div>
                    </div>
                )}
            </NavLink>

            <Button onClick={() => supabase.auth.signOut()}>Log out</Button>
        </div>
    );
};

export default Navbar;