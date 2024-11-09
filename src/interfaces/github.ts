export interface GithubUserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  email: string | null;
  location: string | null;
}
