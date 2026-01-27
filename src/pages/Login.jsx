import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {

    return (
        <div className="h-screen flex justify-center items-center">
            <Card
                className="h-120 w-96 grid-rows-6 p-10"
            >
                <div className="flex justify-center items-center">
                    <p>
                        Login
                    </p>
                </div>

                <div>
                    <Input 
                        placeholder="Email"
                    />
                </div>

                <div>
                    <Input 
                        placeholder="Password"
                    />

                    <p className="text-sm text-muted-foreground mt-3">Having trouble signing in?</p>
                </div>

                <Button>Log In</Button>

                <div className="flex justify-center items-center text-sm">
                    <p>Or Log In With</p>
                </div>

                <div className="flex flex-col gap-5">
                    <Button>
                        Google
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default Login;