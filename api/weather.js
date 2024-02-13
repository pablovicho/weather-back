import axios from "axios";
import WeatherSchema from "@models/WeatherSchema";
import { monthParse, dayParse } from "@/utils/utils";

export default async function weather() {
    const dates = []
    const forecast = [];
    for(let i = 0; i < 5; i++) {
        let UTFDate = new Date();
        let month = monthParse(UTFDate.getMonth());
        let day = dayParse(UTFDate.getDate()+i);
         dates.push(`${UTFDate.getFullYear()}-${month}-${day}`);
    }
    
  for(const date of dates) {
    const req = `${process.env.API_URL}?lat=${process.env.LAT}&lon=${process.env.LON}&date=${date}&appid=${process.env.API_KEY}&lang=${process.env.LANG}&units=${process.env.UNITS}`;
    try {
        const response = await axios.get(req);
        forecast.push(response.data );
      } catch (err) {
        console.error("error fetching from the weather API: ", err);
      }
    };
return forecast;

  // Save to MongoDB
  // for (const result of results) {
  //   try {
  //     await result.save();
  //     console.log(`Weather data for ${result.date} saved.`);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}