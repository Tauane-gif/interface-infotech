const Produtorequest = {
  async listar(): Promise<unknown[]> {
    try {
      const baseUrl = import.meta.env.VITE_API_URL ?? "";
      const response = await fetch(`${baseUrl}/produtos`);
      if (!response.ok) {
        return [];
      }
      return (await response.json().catch(() => [])) as unknown[];
    } catch {
      return [];
    }
  },
};

export default Produtorequest;
