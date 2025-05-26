// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import APIContractService from "@/lib/services/api-contract-service";
import { HTTPMethodOptioType } from "@/resources/options";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method === "GET") {
      const data = await APIContractService.get();
      return res.status(200).json(data);
    }
    if (req.method === "POST") {
      const body = req.body;
      const data = await APIContractService.create(JSON.parse(body));
      return res.status(201).json({
        message: "success",
        code: 201,
        data,
      });
    }
    return res.status(403).json({ message: "Method not supported" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An erro occured" });
  }
}
