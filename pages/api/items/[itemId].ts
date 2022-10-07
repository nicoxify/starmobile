import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../../db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const itemId = req.query.itemId
  if (req.method === "PUT") {
    try {
      const { name, brand, price, isActive } = req.body
      const mongoId = new ObjectId(String(itemId))
      const client = await connectToDatabase()
      await client
        .db()
        .collection("starmobile")
        .updateOne({ _id: mongoId }, { $set: { name, brand, price, isActive } })
      await client.close()
      return res.json({ message: "updated" })
    } catch (error) {
      return res.json({ error })
    }
  }

  if (req.method === "DELETE") {
    try {
      const mongoId = new ObjectId(String(itemId))
      const client = await connectToDatabase()
      const a = await client.db().collection("starmobile").deleteOne({ _id: mongoId })
      await client.close()
      return res.json({ message: "deleted" })
    } catch (error) {
      return res.json(error)
    }
  }
}

export default handler
