import axios from "axios";

const config = {
  baseURL: "https://api.github.com",
};

const api = axios.create(config);

export async function getUserInfo(uid: string) {
  try {
    const { data } = await api.get(`/user/${uid}`);
    return data;
  } catch (error) {
    throw new Error("api request failed!");
  }
}
