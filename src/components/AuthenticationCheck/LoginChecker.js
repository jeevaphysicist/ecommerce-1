import { useSession } from "next-auth/react";


function AuthenticationChecker() { 
    const { data: session } = useSession();
    return session ? true : false;
}

export default AuthenticationChecker;
