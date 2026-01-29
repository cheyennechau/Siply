import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user) navigate("/", { replace: true });
    }, [loading, user, navigate]);

    if (loading) return null;
    if (user) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async(e) => {
        e.preventDefault();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) return alert(error.message);

        navigate("/");
    };

    const signInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        //     options: {
        //     redirectTo: window.location.origin + "/overview",
        // },
        });

        if (error) {
            console.error("Google login error:", error.message);
        }
    }
    

    return (
        <div className="h-screen flex justify-center items-center">
            <Card
                className="h-120 w-96 p-10 flex justify-center items-center bg-background outline-2 outline-primary"
            >
                <div className="flex justify-center items-center">
                    <p className="geist-500 text-2xl text-primary mb-1">
                        Login
                    </p>
                </div>

                <form onSubmit={handleEmailLogin} className="p-5 grid gap-5 w-full">
                    <div>
                        <Input 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <Input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <p className="text-sm text-muted-foreground mt-3 hover:underline cursor-pointer">Having trouble signing in?</p>
                    </div>

                    <Button type="submit">Log In</Button>

                    <div className="flex justify-center items-center text-sm text-muted-foreground">
                        <p>or</p>
                    </div>

                    <div className="flex flex-col gap-5">
                        <Button type="button" onClick={signInWithGoogle}>
                            <img src="/google.svg" alt="Google" className="h-5 w-5" />
                            Sign in with Google
                        </Button>
                    </div>

                    <p className="flex items-center justify-center gap-1 text-sm">
                        Don't have an account? 
                        <NavLink to="/signup">
                            <span className="hover:underline cursor-pointer">Sign up</span>
                        </NavLink>
                    </p>
                </form>
            </Card>
        </div>
    );
};

export default Login;