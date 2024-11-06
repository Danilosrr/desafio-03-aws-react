export interface Suggestion {
  name: string;
  uid: string
}

export interface InfoUser extends Suggestion {
  linkedln: string | null;
  youtube: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  email: string | null;
  experiences: string | null;
  bio: string | null;
  pitch: string | null;
}
