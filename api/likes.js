import { MongoClient, ServerApiVersion } from "mongodb";
import { addLikesToForecast } from "@/config/queries";

export default async function likes(req, res) {
  const date = req.query.date;
  res.send(date);
  const uri = `mongodb+srv://${process.env.USER2}:${process.env.DB_PW}@cluster0.qp9dsef.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await addLikesToForecast(client, date);

  // Ensures that the client will close when you finish/error
  await client.close();
}
