import type { UserFromTokenInterface } from "./UserInterface";

const verifyToken = async (token: string): Promise<UserFromTokenInterface | undefined> => {
    try {
        const apiLink = "http://localhost:8000/auth/protect";
        const response = await fetch(apiLink, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("API GET /auth/protect response was not ok");
        }

        const data = await response.json();

        localStorage.setItem("loggedInId", data.id);
        localStorage.setItem("loggedInUser", data.username);
        localStorage.setItem("loggedInPassword", data.password);

        console.log("API GET /auth/protect Response successful")
        return data;
    } catch (error: unknown){
        console.log("API GET /auth/protect Call unsuccessful");
        return undefined;
    }
}

export default verifyToken;