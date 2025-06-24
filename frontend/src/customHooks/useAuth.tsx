import { useAtom } from "jotai"
import { userAtom } from "../store/userAtom"

export const useAuth = () => {
    const [ user, setUser ] = useAtom(userAtom);

    const login = (data: never) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data))
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user")
    }

    return { user, login, logout}
}