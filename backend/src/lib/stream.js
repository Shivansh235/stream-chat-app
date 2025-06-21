import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STEAM_API_KEY;
const apiSecret = process.env.STEAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or secret is missing");
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUsers([userData]); // if the user does not exist then this function can create else update
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    //ensure that id is in string format
    const userIdstr = userId.toString();
    return streamClient.createToken(userIdstr);
  } catch (error) {
    console.log(error);
  }
};
