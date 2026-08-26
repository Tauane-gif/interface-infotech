interface LoginPayload {
  email: string;
  senha: string;
}

const AuthRequests = {
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
      return Boolean(data?.sucesso ?? true);
    } catch {
      return false;
    }
  },
};

export default AuthRequests;
