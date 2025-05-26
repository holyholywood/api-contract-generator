import { apiContract } from "@/model/API/type";

class ClientAPIContractService {
  public static async create(data: apiContract) {
    const response = await fetch("/api/contract", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = (await response.json()) as { data: { id: string } };
    return result.data;
  }

  public static async edit(id: string, data: apiContract) {
    const response = await fetch(`/api/contract/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const result = (await response.json()) as { id: string };
    return result.id;
  }
}

export default ClientAPIContractService;
