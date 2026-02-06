import { NavLink, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const SignUp = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const handleEmailSignUp = async(e) => {
        e.preventDefault();

        if (password != confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name: firstName, last_name: lastName },
            },
        });

        if (error) {
            setErrorMsg(error.message);
        }

        alert("Account created!");
        navigate("/login");
    }

    const signInWithGoogle = async() => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };

    return (
        <div className="h-full w-full grid grid-cols-2">
            <div>
                image
            </div>
            <div className="p-10">
                <Card className="h-full flex flex-col justify-center items-center outline-2 outline-primary bg-background">
                    <p className="geist-500 text-2xl text-primary mb-1">
                        Get started with Siply
                    </p>

                    <form onSubmit={handleEmailSignUp} className="px-10 pt-10 grid gap-5 w-full">
                        <Input
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Input
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Input
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            required
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Input
                            type="password"
                            required
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        {errorMsg && (
                            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
                        )}

                        <Button type="submit" className="mt-5">Sign Up</Button>
                    </form>

                    <div className="flex flex-col gap-5 justify-center items-center">
                        <p className="text-sm text-muted-foreground">or</p>
                        <Button onClick={signInWithGoogle}>
                            <img src="/google.svg" alt="Google" className="h-5 w-5" />
                            Sign in with Google
                        </Button>
                    </div>

                    <p className="flex justify-center items-center gap-1 mt-5 text-sm">
                        Already have an account?

                        <NavLink to="/login">
                            <span className="hover:underline">
                                Log in
                            </span>
                        </NavLink>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default SignUp;