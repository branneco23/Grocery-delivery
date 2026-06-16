import { Outlet } from "react-router-dom";

const AppLoyout = () => {
    return (
        <>
            <p>banner</p>
            <p>navbar</p>
            <main className="min-h-screen">
                <Outlet />
            </main>
            <p>footer</p>
            <p>chatsidebar</p>
        </>
    )
};

export default AppLoyout;
