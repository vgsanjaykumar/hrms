export interface EducationEntry {
  course: string;
  organization: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

export interface User {
  name: string;
  phone: string;
  email: string;
  password: string;
  dob?: string;
  gender?: string;
  location?: string;
  image?: string;
  skills?: string[];
  education?: EducationEntry[];
}
