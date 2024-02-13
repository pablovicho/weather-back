import WeatherSchema from "@models/WeatherSchema";
import { monthParse, dayParse } from "@/utils/utils";
import { MongoClient, ServerApiVersion } from "mongodb";
import { getForecastData } from "../config/queries";

export default async function weather() {
  const dates = [];
  let forecast = [];
  const uri = `mongodb+srv://${process.env.USER2}:${process.env.DB_PW}@cluster0.qp9dsef.mongodb.net/?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  for (let i = 0; i < 5; i++) {
    let UTFDate = new Date();
    let month = monthParse(UTFDate.getMonth());
    let day = dayParse(UTFDate.getDate() + i);
    const date = `${UTFDate.getFullYear()}-${month}-${day}`;
    dates.push(date);
  }

  // TODO: Use Promise.all to fetch all data concurrently
  const forecastPromises = dates.map(date => getForecastData(client, date));
  forecast = await Promise.all(forecastPromises);

  // Ensures that the client will close when you finish/error
  await client.close();

  return forecast;
}