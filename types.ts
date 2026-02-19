
export type Role = 'Admin' | 'Doctor' | 'Data Entry';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
}

export enum CaseStatus {
  CRITICAL = 'Critical',
  UNDER_TREATMENT = 'Under Treatment',
  RECOVERY = 'Recovery',
  RELEASED = 'Released',
  PERMANENT = 'Permanent',
  DECEASED = 'Deceased'
}

export interface Case {
  id: string;
  caseNumber: string;
  dateTime: string;
  releasedDate?: string;
  location: string;
  animalType: string;
  description: string;
  age: string;
  gender: string;
  status: CaseStatus;
  ward?: 'Ward A' | 'Ward B' | 'Ward C';
  photoUrl?: string;
  complainant: {
    name: string;
    phone: string;
    address: string;
  };
  treatmentLog: TreatmentEntry[];
  medicalHistory?: string;
  clinicalSymptoms?: string;
  tentativeDiagnosis?: string;
  doctorName?: string;
}

export interface WildlifeCase extends Case {
  species: string;
  schedule: 'Schedule I' | 'Schedule II' | 'Schedule III' | 'Schedule IV';
  forestDeptContact?: string;
  releasePlan?: string;
  isReadyForRelease: boolean;
}

export interface HousekeepingTask {
  id: string;
  area: string;
  task: string;
  assignedTo: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  lastDone: string;
  status: 'Pending' | 'Completed';
}

export interface HousekeepingSupply {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  unit: string;
  category: 'Chemical' | 'Tool' | 'Consumable';
  expiryDate?: string;
}

export interface ABCRecord {
  id: string;
  animalType: string;
  surgeryDate: string;
  maleCount: number;
  femaleCount: number;
  total: number;
  location: string;
  remarks?: string;
}

export interface TreatmentItem {
  medicine: string;
  category: string;
}

export interface TreatmentEntry {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  administeredBy: string; // The person logging it
  medicines: TreatmentItem[];
  remarks: string;
}

export interface Medicine {
  id: string;
  name: string;
  stock: number;
  minStock: number;
  category: string;
}

export interface MedicineUsage {
  id: string;
  medicineId: string;
  medicineName: string;
  quantity: string;
  takenBy: string;
  dateTime: string;
  purpose: string; // e.g., "Treatment for CASE-2024-001"
  ward?: string;
}

export interface Donation {
  id: string;
  donor: string;
  phone: string;
  idProof: string; // Legacy field
  aadhar?: string;
  pan?: string;
  type: 'Money' | 'Medicine' | 'Food' | 'Other';
  amount: number;
  date: string;
  paymentMode?: 'Cash' | 'UPI' | 'Cheque';
}

export interface AdoptionAnimal {
  id: string;
  name: string;
  type: string;
  gender: string;
  status: 'In Sanctuary' | 'Adopted';
  adoptionDate?: string;
  image: string;
}
