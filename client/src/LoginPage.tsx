import React from 'react';
import logInAttempt from './logInAttempt';

const LoginPage: React.FC = () => {
    const logInUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const currentUsername: string = formData.get("newusername") as string || "";
        const currentPassword: string = formData.get("newpassword") as string || "";
        const secretKey: any = await logInAttempt({
            username: currentUsername,
            password: currentPassword
        });

        if (secretKey === undefined) {
            console.log("Could not login user");
            return;
        }
        
        localStorage.setItem("userToken", secretKey.token);
        //have current users here, if valid, update the logged in page and return the secret key generated from the session.

    }

    return (
        <>
            <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-gray-500 bg-opacity-70">
            <form onSubmit={logInUser} className="relative w-[500px] h-[500px] bg-[#A9A9A9] rounded-xl gap-[20px] flex flex-col justify-center items-center">
                <div className="text-center font-bold text-[40px]">Login</div>
                <div className="font-bold text-[25px]">Fill in the details below</div>
                {["Username", "Password"].map((label) => {
                    return (
                        <div key={"new" + label.replace(" ", "").toLowerCase()} className="flex flex-col justify-center items-center border-2 border-gray-400 bg-white rounded-lg gap-[10px]">
                             <label className="flex text-center justify-center items-center h-[30px] w-[200px]">{label}</label>
                             <input type="text" name={"new" + label.replace(" ", "").toLowerCase()} className="bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>

                    )
                })}
                <button type="submit" className="bg-blue-100 w-[100px] h-[25px] rounded-xl">Login</button>
            </form>
        </div>
        </>
    )

}

export default LoginPage;