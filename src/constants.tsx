
import { CaseStatus, Case, Medicine, Donation, AdoptionAnimal, ABCRecord, WildlifeCase, HousekeepingTask, HousekeepingSupply, MedicineUsage } from './types';

export const PRIMARY_COLOR = '#005F54'; 

export const MYSURU_AREAS = [
  "Vijayanagar", "Dattagalli", "J P Nagar", "Hootagalli",
  "Bogadi", "KRS Road", "Sriramapura", "Siddhartha Layout",
  "Hunsur Road", "Hebbal", "Kuvempu Nagar", "Rajiv Nagar",
  "Bogadi Road", "Sathagalli Layout", "Ramakrishna Nagar", "Rammanahalli",
  "Gokulam", "TK Layout", "T Narasipura Main Road", "Jayalakshmipuram",
  "Yadavagiri", "Ilavala Hobli", "BEML Nagar", "Bannimantap",
  "Kesare", "Vidyaranyapuram", "Roopa Nagar", "Nazarbad",
  "Sharadadevi Nagar", "Yaraganahalli", "Lalitha Mahal Palace", "Rajarajeshwari Nagar",
  "Alanahalli Layout", "Lakshmipuram", "KC Layout", "RT Nagar",
  "Udayagiri", "Bannur Road", "Bangalore Road", "Kalidasa Road",
  "JSS Layout", "Mahadevapura Road", "V. V. Mohalla", "Brindavan Extention",
  "Vivekananda Nagar", "Krishnarajasagara", "University Layout", "Nanjangud Highway",
  "Bannimantapa Road", "Kanakadasa Nagar", "Chamarajapuram", "Devanuru",
  "Saraswathipuram", "Niveditha Nagar", "Aravinda Nagar", "Bilikere",
  "Nadanahalli", "Chamundipuram", "N.R Mohalla", "Vishweshwara Nagar",
  "Ramanuja Road", "Elivala", "Mandi Mohalla", "M.S.Ramaiah Layout",
  "Kalyanagiri", "Bandipalya", "Jayanagar", "Nanjangudu",
  "Metagalli", "Kuppaluru", "Srinagara Layout", "Chamrajpura",
  "Shakti Nagar", "Alanahalli", "Tilak Nagar", "Hanchya",
  "Kote Hundi", "Kergalli", "Rajendra Nagar", "Vontikoppal",
  "Basavanahalli", "Huyilalu Road", "RS Naidu Nagar", "Gangothri Layout",
  "Somanath Nagar", "Ramachandra Agrahara", "Hinkal", "Naganahalli",
  "Kadakola", "Thaluru", "Bannur", "Elvala",
  "Dadaha Halli", "Sayyaji Rao Road", "Palahalli", "Madagalli",
  "Ittige Gudu", "Heggadadevankote", "Periyapatna", "Nagawala",
  "Hosahundi", "Rajajinagara", "Jantagalli", "Shivaji Road",
  "Beechanakuppe", "Adipampa Road", "Mentagalli Airport", "Jayalaxmipuram",
  "Airport Road", "Jettihundi", "Mirza Road", "Pragathi Nagar",
  "Rajeevnagar 2nd Stage", "Mogarahalli", "Ashokpuram", "Devaraja Mohalla",
  "Shyadanahalli", "Gaddige", "Bettadapura", "Halladakallahalli",
  "Utanahalli", "Bandipur", "Kabini",
  "Gundu Rao Nagar", "KR Pet", "KS Town", "Naguvanahalli",
  "Krishnamurthy Puram", "JC Nagar", "Kurubara Halli", "Madapura",
  "Vinayakanagara", "Marase", "Gayathripuram", "Jyothi Nagar",
  "Shankara Nagar", "Dadadahalli", "Huskur", "Tirumakudalu Narasipura",
  "Rangasamudra", "BMIC Road", "Hannahalli", "Karkanahalli Village",
  "100 feet road", "Bannmantap C Layout", "Khari Town", "Ganga Nagar",
  "Halalu", "Hadajana", "Gejjagalli", "Doddakaturu",
  "Murudagalli", "Varuna", "Bettagalli Road"
].sort();

export interface StaffMember {
  id: string;
  userName?: string;
  name: string;
  email: string;
  phone: string;
  phone2?: string;
  age: string;
  gender: string;
  role: string;
  dept?: string;
  status: 'Active' | 'On Field' | 'On Leave' | 'Pending';
  type: 'Employee' | 'Staff' | 'Volunteer';
  image: string;
  homeAddress: string;
  idProofNumber?: string;
  idProofPhoto?: string;
  qualification?: string;
  purpose?: string;
  // Bank Details
  bankFullName?: string;
  bankName?: string;
  bankBranch?: string;
  accountNumber?: string;
  ifscCode?: string;
  // HR Details
  dob?: string;
  doj?: string;
  salary?: string;
}

export const INITIAL_STAFF: StaffMember[] = [
  { 
    id: '1', 
    userName: 'anita_vet',
    name: 'Dr. Anita Desai', 
    email: 'anita@pfa.org', 
    phone: '9876543210', 
    phone2: '9988776655',
    age: '42', 
    gender: 'Female', 
    role: 'Senior Vet', 
    dept: 'Medical', 
    status: 'Active', 
    type: 'Employee', 
    image: 'https://i.pravatar.cc/150?u=anita', 
    homeAddress: '12/A, Gokulam 3rd Stage, Mysuru, Karnataka 570002',
    bankFullName: 'Anita Desai',
    bankName: 'SBI',
    bankBranch: 'Mysuru Main',
    accountNumber: '12345678901',
    ifscCode: 'SBIN0001234',
    dob: '1982-05-15',
    doj: '2023-01-10',
    salary: '45000'
  },
  { 
    id: '2', 
    name: 'Prateek Yadav', 
    email: 'prateek@pfa.org', 
    phone: '9876543211', 
    age: '35', 
    gender: 'Male', 
    role: 'Rescue Lead', 
    dept: 'Operations', 
    status: 'On Field', 
    type: 'Staff', 
    image: 'https://i.pravatar.cc/150?u=prateek', 
    homeAddress: 'Flat 402, Elite Residency, Vijayanagar, Mysuru',
    bankFullName: 'Prateek Yadav',
    bankName: 'HDFC',
    bankBranch: 'Hebbal',
    dob: '1989-08-22',
    doj: '2023-02-01',
    salary: '28000'
  },
  { 
    id: 'v1', 
    name: 'Amit Varma', 
    email: 'amit@gmail.com', 
    phone: '9876543213', 
    age: '22', 
    gender: 'Male', 
    role: 'Volunteer', 
    dept: 'Socialization', 
    status: 'Active', 
    type: 'Volunteer', 
    purpose: 'Cleaning and socialization of new rescues.', 
    image: 'https://i.pravatar.cc/150?u=amit', 
    homeAddress: 'Near Infosys Campus, Hootagalli, Mysuru',
    dob: '2002-04-05',
    doj: '2024-01-20'
  },
];

export const INITIAL_CASES: Case[] = [
  {
    id: '1',
    caseNumber: 'CASE-2024-001',
    dateTime: '2024-01-10 10:30',
    location: 'Central Park, Delhi',
    animalType: 'Dog',
    description: 'Golden Retriever, limping on front left leg, possibly a hairline fracture.',
    age: 'Adult',
    gender: 'Male',
    status: CaseStatus.UNDER_TREATMENT,
    ward: 'Ward A',
    photoUrl: 'https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Rahul Sharma', phone: '9876543210', address: 'H-42, Lajpat Nagar' },
    treatmentLog: []
  },
  {
    id: '2',
    caseNumber: 'CASE-2024-002',
    dateTime: '2024-01-12 14:15',
    location: 'Sector 15, Rohini',
    animalType: 'Cat',
    description: 'Calico cat found with severe dehydration and skin infection.',
    age: 'Young',
    gender: 'Female',
    status: CaseStatus.RECOVERY,
    ward: 'Ward B',
    photoUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Priya Verma', phone: '9123456789', address: 'Flat 204, Green View Apartments' },
    treatmentLog: []
  },
  {
    id: '3',
    caseNumber: 'CASE-2024-003',
    dateTime: '2024-01-15 08:45',
    location: 'Chandni Chowk Market',
    animalType: 'Bird',
    description: 'Pigeon with a broken wing and entangled in manjha (string).',
    age: 'Adult',
    gender: 'Unknown',
    status: CaseStatus.CRITICAL,
    ward: 'Ward A',
    photoUrl: 'https://images.unsplash.com/photo-1522720833979-0c79d3328579?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Mohit Das', phone: '9234567890', address: 'Shop 12, Main Bazaar' },
    treatmentLog: []
  },
  {
    id: '4',
    caseNumber: 'CASE-2024-004',
    dateTime: '2024-01-18 11:00',
    location: 'NH-44 Highway',
    animalType: 'Cow',
    description: 'Injured in a hit-and-run, deep gash on hind leg.',
    age: 'Adult',
    gender: 'Female',
    status: CaseStatus.UNDER_TREATMENT,
    ward: 'Ward C',
    photoUrl: 'https://images.unsplash.com/photo-1545468241-76478950c406?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Highway Patrol', phone: '100', address: 'Patrol Station 4' },
    treatmentLog: []
  },
  {
    id: '5',
    caseNumber: 'CASE-2024-005',
    dateTime: '2024-01-20 16:30',
    location: 'Cyber City, Gurugram',
    animalType: 'Dog',
    description: 'Stray puppy found stuck in a construction pipe, very weak.',
    age: 'Kitten/Puppy',
    gender: 'Female',
    status: CaseStatus.RELEASED,
    releasedDate: '2024-01-25',
    photoUrl: 'https://images.unsplash.com/photo-1591160674255-fc8b9f792975?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Surbhi Gupta', phone: '9345678901', address: 'Building 10C, DLF Phase 3' },
    treatmentLog: []
  },
  {
    id: '6',
    caseNumber: 'CASE-2023-012',
    dateTime: '2023-11-05 09:00',
    location: 'Mysuru Outskirts',
    animalType: 'Dog',
    description: 'Senior dog found with advanced stage of illness.',
    age: 'Senior',
    gender: 'Male',
    status: CaseStatus.DECEASED,
    photoUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?q=80&w=1000&auto=format&fit=crop',
    complainant: { name: 'Local Resident', phone: '9845012345', address: 'Bogadi Road' },
    treatmentLog: []
  }
];

export const INITIAL_WILDLIFE: WildlifeCase[] = [
  {
    id: 'w1',
    caseNumber: 'WILD-2024-001',
    dateTime: '2024-02-15 09:00',
    location: 'Asola Bhatti Sanctuary',
    animalType: 'Monkey',
    species: 'Rhesus Macaque',
    description: 'Found with electric burn on right limb.',
    age: 'Sub-Adult',
    gender: 'Female',
    status: CaseStatus.UNDER_TREATMENT,
    schedule: 'Schedule I',
    isReadyForRelease: false,
    complainant: { name: 'Forest Ranger Sunil', phone: '9988776655', address: 'Bhatti Mines Range' },
    treatmentLog: []
  }
];

export const INITIAL_HOUSEKEEPING: HousekeepingTask[] = [
  { id: 'h1', area: 'Ward A (Critical)', task: 'Morning Sanitation', assignedTo: 'Suresh Kumar', frequency: 'Daily', lastDone: '2024-05-20', status: 'Completed' },
];

export const INITIAL_HOUSEKEEPING_SUPPLIES: HousekeepingSupply[] = [
  { id: 'hk1', name: 'White Phenyl', stock: 25, minStock: 10, unit: 'Liters', category: 'Chemical' },
  { id: 'hk2', name: 'Bleaching powder', stock: 15, minStock: 5, unit: 'Kg', category: 'Chemical' },
  { id: 'hk3', name: 'Acid', stock: 10, minStock: 5, unit: 'Liters', category: 'Chemical' },
  { id: 'hk4', name: 'Mop set', stock: 8, minStock: 5, unit: 'Sets', category: 'Tool' },
  { id: 'hk5', name: 'Long Brush', stock: 12, minStock: 5, unit: 'Units', category: 'Tool' },
  { id: 'hk6', name: 'Garbage bags (Extra Large)', stock: 200, minStock: 50, unit: 'Pcs', category: 'Consumable' },
  { id: 'hk7', name: 'Bio medical waste bags', stock: 150, minStock: 50, unit: 'Pcs', category: 'Consumable' },
  { id: 'hk8', name: 'Lizol', stock: 20, minStock: 5, unit: 'Liters', category: 'Chemical' },
  { id: 'hk9', name: 'Pine oil', stock: 10, minStock: 3, unit: 'Liters', category: 'Chemical' },
  { id: 'hk10', name: 'Soap oil – Gel', stock: 15, minStock: 5, unit: 'Liters', category: 'Chemical' },
  { id: 'hk11', name: 'Sodium Hypochlorite (ALA)', stock: 30, minStock: 10, unit: 'Liters', category: 'Chemical' },
  { id: 'hk12', name: 'Tissue Roll', stock: 50, minStock: 20, unit: 'Rolls', category: 'Consumable' },
  { id: 'hk13', name: 'Wiper', stock: 15, minStock: 5, unit: 'Units', category: 'Tool' },
  { id: 'hk14', name: 'Bombay broomstick', stock: 20, minStock: 10, unit: 'Units', category: 'Tool' },
  { id: 'hk15', name: 'Toilet cleaner', stock: 25, minStock: 8, unit: 'Bottles', category: 'Chemical' },
  { id: 'hk16', name: 'Hand wash liquid', stock: 30, minStock: 10, unit: 'Liters', category: 'Chemical' },
  { id: 'hk17', name: 'Hand wash soap', stock: 40, minStock: 15, unit: 'Bars', category: 'Consumable' },
  { id: 'hk18', name: 'Detergent soap', stock: 45, minStock: 20, unit: 'Bars', category: 'Consumable' },
  { id: 'hk19', name: 'Steel scrubber', stock: 30, minStock: 10, unit: 'Pcs', category: 'Tool' },
  { id: 'hk20', name: 'Dusting cloth', stock: 50, minStock: 20, unit: 'Pcs', category: 'Tool' },
  { id: 'hk21', name: 'IFB – Liquid washing detergent', stock: 5, minStock: 2, unit: 'Bottles', category: 'Chemical' },
  { id: 'hk22', name: 'Sabena packet', stock: 60, minStock: 20, unit: 'Packets', category: 'Consumable' },
];

export const INITIAL_ABC_RECORDS: ABCRecord[] = [
  { id: 'abc1', animalType: 'Dog', surgeryDate: '2023-11-01', maleCount: 12, femaleCount: 15, total: 27, location: 'Bogadi Area', remarks: 'Community camp successful' }
];

export const INITIAL_MEDS: Medicine[] = [
  // Antibiotics
  { id: 'ab1', name: 'Injection Amoxycillin Cloxacillin', stock: 50, minStock: 10, category: 'Antibiotics' },
  { id: 'ab2', name: 'Injection Ceftriaxone tazobactum', stock: 8, minStock: 10, category: 'Antibiotics' }, // Low stock
  { id: 'ab3', name: 'Injection Enrofloxacin', stock: 50, minStock: 10, category: 'Antibiotics' },
  { id: 'ab4', name: 'Tablet CEFPODOXIME', stock: 100, minStock: 20, category: 'Antibiotics' },
  { id: 'ab5', name: 'Tablet Enrofloxacin', stock: 100, minStock: 20, category: 'Antibiotics' },
  { id: 'ab6', name: 'Injection Amoxycillin Clavulanate', stock: 50, minStock: 10, category: 'Antibiotics' },
  { id: 'ab7', name: 'Injection DOXYCYCLINE', stock: 5, minStock: 10, category: 'Antibiotics' }, // Low stock
  { id: 'ab8', name: 'Tab DOXYCYCLINE', stock: 100, minStock: 20, category: 'Antibiotics' },
  { id: 'ab9', name: 'Tablet Cephalexin', stock: 100, minStock: 20, category: 'Antibiotics' },
  { id: 'ab10', name: 'Tab Amoxycillin Potassium Clavulanate', stock: 100, minStock: 20, category: 'Antibiotics' },
  { id: 'ab11', name: 'Inj FPP', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab12', name: 'Inj Gentamicin', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab13', name: 'Inj Dicrysticin', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab14', name: 'Inj Metronidazole', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab15', name: 'Inj Oxytetracycline', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab16', name: 'Inj Clindamycin', stock: 30, minStock: 5, category: 'Antibiotics' },
  { id: 'ab17', name: 'Tab Clindamycin', stock: 50, minStock: 10, category: 'Antibiotics' },
  { id: 'ab18', name: 'Zedox syrup', stock: 20, minStock: 5, category: 'Antibiotics' },
  { id: 'ab19', name: 'Toxomox Syrup', stock: 20, minStock: 5, category: 'Antibiotics' },

  // NSAIDs
  { id: 'ns1', name: 'Injection Flunixin Meglumin', stock: 20, minStock: 5, category: 'NSAIDs' },
  { id: 'ns2', name: 'Injection Meloxicam', stock: 30, minStock: 5, category: 'NSAIDs' },
  { id: 'ns3', name: 'Injection Phenylbutazone', stock: 20, minStock: 5, category: 'NSAIDs' },
  { id: 'ns4', name: 'Syrup Meloxicam', stock: 15, minStock: 5, category: 'NSAIDs' },
  { id: 'ns5', name: 'Syrup Himpyrin', stock: 15, minStock: 5, category: 'NSAIDs' },

  // Vaccines
  { id: 'vac1', name: 'DHPPi & Lepto', stock: 50, minStock: 10, category: 'Vaccines' },
  { id: 'vac2', name: 'Puppy DP', stock: 50, minStock: 10, category: 'Vaccines' },
  { id: 'vac3', name: 'Anti - Rabies', stock: 100, minStock: 20, category: 'Vaccines' },
  { id: 'vac4', name: 'Ticat Trio (Cat vaccine)', stock: 30, minStock: 5, category: 'Vaccines' },
  { id: 'vac5', name: 'Tetanus toxoid vaccine', stock: 30, minStock: 5, category: 'Vaccines' },

  // Anaesthetics
  { id: 'an1', name: 'Ketamine', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an2', name: 'Xylazine', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an3', name: 'Propofol', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an4', name: 'Midazolam', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an5', name: 'Diazepam', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an6', name: 'Isoflurane', stock: 5, minStock: 1, category: 'Anaesthetics' },
  { id: 'an7', name: 'Butorphanol', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an8', name: 'Tremadol', stock: 10, minStock: 2, category: 'Anaesthetics' },
  { id: 'an9', name: 'Buprenorphine', stock: 10, minStock: 2, category: 'Anaesthetics' },

  // Steroids
  { id: 'st1', name: 'INJ Dexamethasone', stock: 30, minStock: 5, category: 'Steroids' },
  { id: 'st2', name: 'INJ Prednisolone', stock: 30, minStock: 5, category: 'Steroids' },
  { id: 'st3', name: 'INJ Adrenaline', stock: 20, minStock: 5, category: 'Steroids' },

  // Antiparasitic
  { id: 'ap1', name: 'Injection Ivermectin', stock: 50, minStock: 10, category: 'Antiparasitic' },
  { id: 'ap2', name: 'Tablet Ivermectin', stock: 100, minStock: 20, category: 'Antiparasitic' },
  { id: 'ap3', name: 'Tab Bandystar plus', stock: 50, minStock: 10, category: 'Antiparasitic' },
  { id: 'ap4', name: 'Nimocid syrup', stock: 20, minStock: 5, category: 'Antiparasitic' },
  { id: 'ap5', name: 'Syrup Bandystar pup', stock: 20, minStock: 5, category: 'Antiparasitic' },

  // Gastrointestinal (GI) drugs
  { id: 'gi1', name: 'INJ Pantoprazole', stock: 40, minStock: 10, category: 'Gastrointestinal (GI) drugs' },
  { id: 'gi2', name: 'INJ Ranitidine', stock: 40, minStock: 10, category: 'Gastrointestinal (GI) drugs' },
  { id: 'gi3', name: 'INJ Ondansetron', stock: 40, minStock: 10, category: 'Gastrointestinal (GI) drugs' },

  // Others
  { id: 'ot1', name: 'Vincristine sulphate', stock: 10, minStock: 2, category: 'Others' },
  { id: 'ot2', name: 'Tribivet', stock: 30, minStock: 5, category: 'Others' },
  { id: 'ot3', name: 'Chlorpheniramine maleate', stock: 30, minStock: 5, category: 'Others' },
  { id: 'ot4', name: 'INJ Neuroxin M', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot5', name: 'INJ Berenil', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot6', name: 'Antivenom', stock: 10, minStock: 2, category: 'Others' },
  { id: 'ot7', name: 'Deriphyllin', stock: 30, minStock: 5, category: 'Others' },
  { id: 'ot8', name: 'Atropine Sulphate', stock: 30, minStock: 5, category: 'Others' },
  { id: 'ot9', name: 'Tranexamic acid', stock: 30, minStock: 5, category: 'Others' },
  { id: 'ot10', name: 'Botropase', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot11', name: 'Potassium Permanganate powder', stock: 15, minStock: 5, category: 'Others' },
  { id: 'ot12', name: 'Eye drops - Ophtocare M pet', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot13', name: 'Ear - drops - Pamisol', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot14', name: 'Ear cleanser - Ambiflush', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot15', name: 'Injection Tonophosphan', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot16', name: 'Inj Doramectin', stock: 20, minStock: 5, category: 'Others' },
  { id: 'ot17', name: 'Notix powder', stock: 25, minStock: 5, category: 'Others' },
  { id: 'ot18', name: 'Spoton', stock: 25, minStock: 5, category: 'Others' },
  { id: 'ot19', name: 'Tick/fleas spray', stock: 25, minStock: 5, category: 'Others' },

  // Supplements
  { id: 'sup1', name: 'Calcium syrup', stock: 30, minStock: 5, category: 'Supplements' },
  { id: 'sup2', name: 'Multivitamin syrup', stock: 30, minStock: 5, category: 'Supplements' },
  { id: 'sup3', name: 'Immunol', stock: 20, minStock: 5, category: 'Supplements' },
  { id: 'sup4', name: 'Liver tonic', stock: 30, minStock: 5, category: 'Supplements' },
  { id: 'sup5', name: 'UT kid', stock: 20, minStock: 5, category: 'Supplements' },
  { id: 'sup6', name: 'aRBC pet', stock: 20, minStock: 5, category: 'Supplements' },
  { id: 'sup7', name: 'Easibreath', stock: 20, minStock: 5, category: 'Supplements' },
  { id: 'sup8', name: 'Advaplat', stock: 20, minStock: 5, category: 'Supplements' },
  { id: 'sup9', name: 'Cremaffin', stock: 20, minStock: 5, category: 'Supplements' },

  // IV Fluids
  { id: 'iv1', name: 'Ringer lactate', stock: 50, minStock: 10, category: 'IV Fluids' },
  { id: 'iv2', name: 'Normal saline', stock: 50, minStock: 10, category: 'IV Fluids' },
  { id: 'iv3', name: 'DNS', stock: 40, minStock: 10, category: 'IV Fluids' },
  { id: 'iv4', name: 'Vetplasma', stock: 20, minStock: 5, category: 'IV Fluids' },
  { id: 'iv5', name: 'Mannitol', stock: 20, minStock: 5, category: 'IV Fluids' },
  { id: 'iv6', name: 'D 25', stock: 20, minStock: 5, category: 'IV Fluids' },
  { id: 'iv7', name: 'D 5', stock: 20, minStock: 5, category: 'IV Fluids' },

  // Wound disinfectants
  { id: 'wd1', name: 'Povidone iodine', stock: 20, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd2', name: 'Aluspray', stock: 20, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd3', name: 'D- mag spray', stock: 20, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd4', name: 'Betadine ointment', stock: 30, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd5', name: 'Tr.Benzoin', stock: 15, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd6', name: 'Tr.Iodine', stock: 15, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd7', name: 'KMNO4 powder', stock: 15, minStock: 5, category: 'Wound disinfectants' },
  { id: 'wd8', name: 'Turpentine oil', stock: 15, minStock: 5, category: 'Wound disinfectants' },
];

export const INITIAL_MEDICINE_USAGE: MedicineUsage[] = [
  { id: 'u1', medicineId: 'm1', medicineName: 'Amoxycillin Cloxacillin Inj', quantity: '2 Vials', takenBy: 'Dr. Anita Desai', dateTime: '20/05/2025 10:15', purpose: 'Scheduled dose for CASE-2024-001', ward: 'Ward A' },
  { id: 'u2', medicineId: 'm5', medicineName: 'Meloxicam Inj', quantity: '5ml', takenBy: 'Rohan Sharma', dateTime: '20/05/2025 11:30', purpose: 'Pain management for CASE-2024-004', ward: 'Ward C' },
  { id: 'u3', medicineId: 'm23', medicineName: 'Povidone Iodine', quantity: '100ml', takenBy: 'Amit Varma', dateTime: '21/05/2025 09:00', purpose: 'Routine wound cleaning in Critical Ward', ward: 'Ward A' },
  { id: 'u4', medicineId: 'm7', medicineName: 'Anti-Rabies Vaccine', quantity: '1 Vial', takenBy: 'Prateek Yadav', dateTime: '21/05/2025 16:45', purpose: 'Field vaccination for new street rescue', ward: 'Mobile unit' },
  { id: 'u5', medicineId: 'm1', medicineName: 'Amoxycillin Cloxacillin Inj', quantity: '1 Vial', takenBy: 'Dr. Anita Desai', dateTime: '22/05/2025 08:30', purpose: 'Follow-up for CASE-2024-001', ward: 'Ward A' },
];

export const INITIAL_ADOPTIONS: AdoptionAnimal[] = [
  { id: 'a1', name: 'Buddy', type: 'Dog', gender: 'Male', status: 'In Sanctuary', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800' }
];

export const INITIAL_DONATIONS: Donation[] = [
  { id: 'D102', donor: 'Sameer Malhotra', phone: '9876543210', idProof: 'XXXX-XXXX-1234', type: 'Money', amount: 25000, date: '2023-10-25' }
];
