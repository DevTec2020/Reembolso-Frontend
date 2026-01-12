import { Loading } from "../components/Loading";
import { useAuth } from "../hooks/useAuth";

import { AuthRoutes } from "./AuthRoutes";
import { EmployeeRoutes } from "./EmployeeRoutes";
import { ManagerRoutes } from "./ManagerRoutes";

export function AppRoutes() {
    const { session, isLoading } = useAuth();

    if (isLoading) {
        return <Loading />;
    }

    switch (session?.user.role) {
        case "employee":
            return <EmployeeRoutes />;

        case "manager":
            return <ManagerRoutes />;

        default:
            return <AuthRoutes />;
    }
}