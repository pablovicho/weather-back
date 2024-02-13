import axios from "axios";
import WeatherSchema from "@models/WeatherSchema";
import { monthParse, dayParse } from "@/utils/utils";
import { MongoClient } from "mongodb";
import { insertDocument, findDocumentByDate } from "./queries";

export default async function weather() {
  const dates = [];
  const forecast = [];

  const uri = `mongodb+srv://${process.env.USER}:${process.env.DB_PW}@cluster0.qp9dsef.mongodb.net/?retryWrites=true&w=majority`;
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

  for (const date of dates) {
    //look for the info from the date on the table
    const document = findDocumentByDate(client, date);
    // Date already exists, push to forecast
    if (document) {
      forecast.push(result);
    } else {
      // Date doesn't exist, get info from API
      const req = `${process.env.API_URL}?lat=${process.env.LAT}&lon=${process.env.LON}&date=${date}&appid=${process.env.API_KEY}&lang=${process.env.LANG}&units=${process.env.UNITS}`;
      axios.get(req).then((response) => {
        const data = { ...response.data, date: date, likes: 0 };
        forecast.push(data);
        insertDocument(client, data);
      });
    }
  }

  // Ensures that the client will close when you finish/error
  await client.close();

  return forecast;
}
