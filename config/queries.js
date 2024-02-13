import axios from "axios";

// Insert one document
async function insertDocument(client, data) {
  const result = await client
    .db("weather")
    .collection("weather")
    .insertOne(data);
  console.log(`Inserted document with _id: ${result.insertedId}`);
}

// Find one document by date
async function findDocumentByDate(client, date) {
  const result = await client
    .db("weather")
    .collection("weather")
    .findOne({ date: date });
  return result || null;
}

export const getForecastData = async (client, date) => {
  const document = await findDocumentByDate(client, date);
  // Date already exists, push to forecast
  if (document) {
    return document;
  } else {
    // Date doesn't exist, get info from API
    const req = `${process.env.API_URL}?lat=${process.env.LAT}&lon=${process.env.LON}&date=${date}&appid=${process.env.API_KEY}&lang=${process.env.LANG}&units=${process.env.UNITS}`;
    const response = await axios.get(req);
    const data = { ...response.data, date: date, likes: 0 };
    await insertDocument(client, data);
    return data;
  }
};

export const addLikesToForecast = async (client, date1) => {
    console.log(date1)
//   const document = await findDocumentByDate(client, date1);
//   if (!document) {
//     return "date not found";
//   } else {
    const result = await client
      .db("weather")
      .collection("weather")
      .updateOne({ date: String(date1) }, { $inc: { likes: 1 } });
    console.log(`Updated likes in document with date: ${date1}`);
  
};
