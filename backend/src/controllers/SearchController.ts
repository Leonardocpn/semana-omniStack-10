import { Request, Response } from "express";
import { ParseStrinAsArray } from "../utils/PaserStringAsArray";
import { Dev } from "../models/Dev";

export const indexSearch = async (request: Request, response: Response) => {
  try {
    const { longitude, latitude, techs } = request.query;
    const techsArray = ParseStrinAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    });

    return response.status(200).json({ devs });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
};
