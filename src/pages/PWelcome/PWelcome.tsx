import type { JSX } from "react";
import { API_URL } from "../../config/api";

function PWelcome(): JSX.Element {
    const loginAuthUrl = `${API_URL}/auth/login`;
    const loginUrl = `${API_URL}/login`;
    const usuarioUrl = `${API_URL}/usuario`;

    return (
        <main className="min-h-screen bg-black px-6 py-12 text-white">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-sm uppercase tracking-[0.2em] text-teal-400">
                    Welcome
                </p>

                <h1 className="mb-6 text-4xl font-bold text-white">
                    API configurada
                </h1>

                <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-300">
                    <p>
                        Base atual: <span className="text-teal-300">{API_URL}</span>
                    </p>
                    <p>
                        Login: <span className="text-green-300">{loginAuthUrl}</span>
                    </p>
                    <p>
                        Login admin: <span className="text-green-300">{loginUrl}</span>
                    </p>
                    <p>
                        Usuário: <span className="text-green-300">{usuarioUrl}</span>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default PWelcome;
