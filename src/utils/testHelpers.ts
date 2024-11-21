import { IStorageContext } from "../contexts/storageContext";
import { Experience, InfoUser } from "../interfaces/search";

export const gitUser = {
  name: "john Doe",
  avatar_url: "avatarUrl",
  bio: "John Doe Bio",
  email: "email@email.com",
  id: 1,
  location: "location",
  login: "johnDoeLogin",
};

export const storedUser: InfoUser = {
  linkedin: "linkdin",
  youtube: "youtube",
  facebook: "facebook",
  twitter: "twitter",
  instagram: "instagram",
  email: "email@email.com",
  experiences: [],
  bio: "bio",
  pitch: "pitch",
  name: "storedName",
  uid: "uid",
};

export const experience:Experience = {
  title: "experience",
  period: "period",
  technologies: "TS, React, Jest",
  summary: "summary",
  link: "link"
};

export const initialStorageContext: IStorageContext = {
  userData: [],
  editable: false,
  addUserData: jest.fn(),
  getUserData: jest.fn(),
  editUserData: jest.fn(),
  editUserExperience: jest.fn(),
  deleteUserExperience: jest.fn(),
  setEditable: jest.fn(),
};

export const initialModalProps = {
  uid: undefined,
  index: undefined,
  title: undefined,
  keys: [],
  setState: jest.fn(),
};
