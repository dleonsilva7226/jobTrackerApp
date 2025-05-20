import { type UserInterface } from "./UserInterface";

const logInAttempt = async (userInfo: UserInterface): Promise<string | undefined> => {
    try {
        const apiLink = "http://localhost:8000/auth/login";
        const response = await fetch(apiLink, 
            {
                method: "POST",
                body: JSON.stringify(userInfo),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response);

        if (!response.ok) {
            console.log("error in getting secret token response");
            return;
        }

        const secretKey: string = await response.json();
        //secret key here
        return secretKey;
    } catch (error: unknown) {
        console.log("Error with calling auth/login POST API call");
    }
}

export default logInAttempt;