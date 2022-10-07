import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../../db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, brand, price, isActive } = req.body

    try {
      const client = await connectToDatabase()
      await client.db().collection("starmobile").insertOne({ name, brand, price, isActive })
      await client.close()
      return res.json({ message: "new item added" })
    } catch (error) {
      return res.json(error)
    }
  }

  if (req.method === "GET") {
    try {
      const client = await connectToDatabase()
      const response = await client.db().collection("starmobile").find().toArray()
      await client.close()
      return res.json(response)
    } catch (error) {
      return res.json(error)
    }
  }
}

export default handler
