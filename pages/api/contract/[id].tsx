import APIContractService from "@/lib/services/api-contract-service";
import { HTTPMethodOptioType } from "@/resources/options";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method === "GET") {
      const data = await APIContractService.findByID(req.query.id as string);
      return res.status(200).json(data);
    }
    if (req.method === "PUT") {
      const data = await APIContractService.update(req.query.id as string, JSON.parse(req.body));
      return res.status(200).json(data);
    }
    return res.status(403).json({ message: "Method not supported" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An erro occured" });
  }
}
