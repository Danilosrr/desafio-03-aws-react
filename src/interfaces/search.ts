export interface Suggestion {
  name: string;
  uid: string;
}

export interface Experience {
  title: string;
  period: string;
  technologies: string[];
  summary: string;
  link: string;
}

export interface InfoUser extends Suggestion {
  linkedin: string | null;
  youtube: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  email: string | null;
  experiences: Experience[];
  bio: string | null;
  pitch: string | null;
}

export type enumKeys = "title"|"period"|"technologies"|"summary"|"link"|"linkedin"|"youtube"|"twitter"|"instagram"|"facebook";
