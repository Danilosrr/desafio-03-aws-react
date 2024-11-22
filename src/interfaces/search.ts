export interface Suggestion {
  name: string;
  uid: string;
}

export interface Experience {
  title: string;
  period: string;
  technologies: string;
  summary: string;
  link: string;
}

export interface InfoUser extends Suggestion {
  linkedin: string;
  youtube: string ;
  facebook: string;
  twitter: string;
  instagram: string;
  email: string;
  experiences: Experience[];
  bio: string;
}

export type enumSocials = "linkedin"|"youtube"|"twitter"|"instagram"|"facebook";

export type enumExperience = "title"|"period"|"technologies"|"summary"|"link";
