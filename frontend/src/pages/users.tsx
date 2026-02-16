import { useEffect, useState } from "react";
import api from "../services/axios";

interface User {
    id: string;
    name: string;
    email: string;
}

function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const getUser = async () => {
            const res = await api.get("/users");
            setUsers(res.data);
        };
        getUser();
    }, []);

    return (
        <div>
            {users.map((user) => {
                return (
                    <div key={user.id}>
                        <h3>{user.name}</h3>
                        <h3>{user.email}</h3>
                    </div>
                );
            })}
        </div>
    );
}

export default Users;
