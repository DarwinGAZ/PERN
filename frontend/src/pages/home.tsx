import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const [isLogged, setIsLogged] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged === false) {
            navigate("/login");
        }
    }, [isLogged, navigate]);

    return <h1>Isso é um Home</h1>;
}
export default Home;
