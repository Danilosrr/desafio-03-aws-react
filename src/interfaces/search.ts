export interface Suggestion {
  name: string;
  uid: string;
}

export interface Experiences {
  title: string;
  period: string;
  technologies: string[];
  summary: string;
  link: string;
}

export interface InfoUser extends Suggestion {
  linkedln: string | null;
  youtube: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  email: string | null;
  experiences: Experiences[];
  bio: string | null;
  pitch: string | null;
}
