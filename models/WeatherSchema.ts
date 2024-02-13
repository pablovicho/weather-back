import mongoose, { Schema, Document } from 'mongoose';

interface IWeather {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: Date,
        sunset: Date
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
}

const WeatherSchema: Schema = new mongoose.Schema({
    coord: {
        lon: { type: Number },
        lat: { type: Number }
    },
    weather: [
        {
            id: { type: Number },
            main: { type: String },
            description: { type: String },
            icon: { type: String }
        }
    ],
    base: { type: String },
    main: {
        temp: { type: Number },
        feels_like: { type: Number },
        temp_min: { type: Number },
        temp_max: { type: Number },
        pressure: { type: Number },
        humidity: { type: Number }
    },
    visibility: { type: Number },
    wind: {
        speed: { type: Number },
        deg: { type: Number }
    },
    clouds: {
        all: { type: Number }
    },
    dt: { type: Number },
    sys: {
        type: { type: Number },
        id: { type: Number },
        message: { type: Number },
        country: { type: String },
        sunrise: { type: Date },
        sunset: { type: Date }
    },
    timezone: { type: Number },
    id: { type: Number },
    name: { type: String },
    cod: { type: Number },
});

export default mongoose.model<IWeather & Document>('Weather', WeatherSchema);
