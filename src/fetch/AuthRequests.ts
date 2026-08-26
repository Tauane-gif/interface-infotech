interface LoginPayload {
  email: string;
  senha: string;
}

const clearAuthStorage = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuth");
  localStorage.removeItem("nome");
  localStorage.removeItem("email");
};

const AuthRequests = {
  checkTokenExpiry(): boolean {
    const token = localStorage.getItem("token");

    if (!token) {
      clearAuthStorage();
      return false;
    }

    try {
      const [, payload] = token.split(".");

      if (!payload) {
        clearAuthStorage();
        return false;
      }

      const decoded = JSON.parse(atob(payload));
      const exp = decoded?.exp as number | undefined;

      if (exp && Date.now() >= exp * 1000) {
        clearAuthStorage();
        return false;
      }

      localStorage.setItem("isAuth", "true");
      return true;
    } catch {
      clearAuthStorage();
      return false;
    }
  },

  removeToken(): void {
    clearAuthStorage();
  },

  async login(login: LoginPayload): Promise<boolean> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json().catch(() => ({}));
      const token = data?.token ?? data?.accessToken ?? data?.jwt ?? "";
      const nome = data?.nome ?? data?.user?.nome ?? "";
      const email = data?.email ?? data?.user?.email ?? login.email;

      if (!token) {
        return Boolean(data?.sucesso ?? true);
      }

      localStorage.setItem("token", token);
      localStorage.setItem("isAuth", "true");

      if (nome) {
        localStorage.setItem("nome", String(nome));
      }

      if (email) {
        localStorage.setItem("email", String(email));
      }

      return true;
    } catch {
      return false;
    }
  },
};

export default AuthRequests;
