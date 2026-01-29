function Register() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border-2 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-center m-6">
                    Tela de Registro
                </h1>
                <form
                    action=""
                    className="border-2 flex flex-col justify-center items-center"
                >
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Digite seu nome"
                        className="border-2 text-md rounded-2xl p-3 w-9/10"
                    />
                    <input
                        type="email"
                        name=""
                        id=""
                        placeholder="Digite seu Email"
                        className="border-2 text-md rounded-2xl p-3 w-9/10"
                    />
                    <input
                        type="password"
                        name=""
                        id=""
                        placeholder="Digite sua Senha"
                        className="border-2 text-md rounded-2xl p-3 w-9/10"
                    />
                </form>
            </div>
        </div>
    );
}
export default Register;
