import { Request, Response } from "express";
import axios from "axios";
import { Dev } from "../models/Dev";
import { ParseStrinAsArray } from "../utils/PaserStringAsArray";
import { findConnections, sendMessage } from "../websocket";

export const storeDev = async (request: Request, response: Response) => {
  try {
    const { github_username, techs, latitude, longitude } = request.body;
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const responseFromGithubApi = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      let { name, avatar_url, bio } = responseFromGithubApi.data;
      if (!name) {
        name = responseFromGithubApi.data.login;
      }
      if (!bio) {
        bio = "sem biografia";
      }

      const techsArray = ParseStrinAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }
    return response.status(200).json(dev);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
};

export const indexDev = async (request: Request, response: Response) => {
  try {
    let devs = await Dev.find();
    return response.status(200).json({ devs });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
};
