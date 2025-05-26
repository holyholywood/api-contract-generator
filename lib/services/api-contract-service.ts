import { HTTPMethodOptioType } from "@/resources/options";
import mongoClient from "../mongodb";
import { ObjectId } from "mongodb";

class APIContractService {
  public static async get() {
    const db_client = mongoClient();

    try {
      await db_client.connect();
      const database = db_client.db("api_contracts");
      const collection = database.collection("api_contract");
      const allData = await collection.find().toArray();

      return allData;
    } finally {
      await db_client.close();
    }
  }

  public static async create(data: apiContract) {
    const db_client = mongoClient();

    try {
      await db_client.connect();
      const database = db_client.db("api_contracts");
      const collection = database.collection("api_contract");
      const newAPiContractData = await collection.insertOne({ ...data, created_at: new Date().getTime(), updated_at: new Date().getTime() });

      return { id: newAPiContractData.insertedId };
    } finally {
      await db_client.close();
    }
  }

  public static async update(id: string, data: Partial<apiContract>) {
    const formattedData = { ...data, updated_at: new Date().getTime() };
    const db_client = mongoClient();

    try {
      await db_client.connect();
      const database = db_client.db("api_contracts");
      const collection = database.collection("api_contract");
      const updatedApiContract = await collection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: formattedData,
        }
      );
      return { id };
    } finally {
      await db_client.close();
    }
  }
  public static async findByID(id: string) {
    const db_client = mongoClient();

    try {
      await db_client.connect();
      const database = db_client.db("api_contracts");
      const collection = database.collection("api_contract");
      const search_id = new ObjectId(id);
      const newAPiContractData = await collection.findOne({
        _id: search_id,
      });

      return newAPiContractData;
    } finally {
      await db_client.close();
    }
  }
}

export default APIContractService;

export type apiContract = {
  title: string;
  method: HTTPMethodOptioType;
  baseURL: string;
  endpoint: string;
  query: Array<{
    key: string;
    example: string;
    option: string[];
  }>;
  params: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  responses: Array<{
    body: string;
    code: number;
    description: string;
    title: string;
  }>;
  created_at?: number;
  update_at?: SVGAnimatedNumber;
};
