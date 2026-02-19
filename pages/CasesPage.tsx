
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  MapPin, 
  Stethoscope, 
  BriefcaseMedical, 
  X, 
  FileImage,
  Loader2,
  Trash2,
  AlertCircle,
  Edit2,
  Edit3,
  Check,
  MinusCircle,
  ChevronDown,
  Filter,
  Calendar,
  Clock,
  ArrowRight,
  Layout,
  PawPrint,
  FileText,
  Printer,
  ChevronLeft,
  User,
  History,
  Save
} from 'lucide-react';
import { INITIAL_CASES, INITIAL_MEDS } from '../constants';
import { CaseStatus, Case, User as UserType, TreatmentEntry, TreatmentItem } from '../types';

const DOCTOR_OPTIONS = ['Dr. Anita Desai', 'Dr. Suresh Babu', 'Other'];

// --- High Fidelity Form Preview Component (Printable) ---
const CaseSheetPreview = ({ caseItem, onClose }: { caseItem: Case; onClose: () => void }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-center items-start p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto pt-10 md:pt-20 no-print-modal">
      <div className="relative w-full max-w-4xl bg-[#F8FAF9] rounded-[2.5rem] shadow-2xl p-6 md:p-12 animate-in slide-in-from-bottom-8 duration-300 print:shadow-none print:my-0 print:p-0 mb-20">
        
        <div className="mb-10 no-print flex justify-between items-start">
          <div className="max-w-xl">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Official Case Sheet</h1>
            <p className="text-slate-500 font-medium text-lg mt-2">Comprehensive registry record for legal and clinical documentation.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="p-3 bg-white text-[#005F54] hover:bg-emerald-50 rounded-2xl shadow-sm border border-slate-100 transition-all hover:scale-110 flex items-center gap-2 text-xs font-black uppercase tracking-widest"
            >
              <Printer size={20} /> Print
            </button>
            <button 
              onClick={onClose}
              className="p-3 bg-white text-slate-400 hover:text-rose-500 rounded-2xl shadow-sm border border-slate-100 transition-all hover:scale-110"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 space-y-12 shadow-sm print:border-none print:p-0">
          {/* Header Section */}
          <div className="flex justify-between items-center border-b-4 border-[#005F54] pb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#005F54] rounded-full flex items-center justify-center text-white font-black text-2xl">PFA</div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight uppercase">People For Animals</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mysuru Sanctuary • Animal Rescue Registry</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Case Registry #</p>
              <p className="text-2xl font-black text-[#005F54]">{caseItem.caseNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Col: Reporter & Location */}
            <section className="space-y-6">
              <h3 className="text-xs font-black text-[#005F54] uppercase tracking-[0.25em] flex items-center gap-2">
                <User size={14} /> Intake Details
              </h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reporter Name</p>
                  <p className="text-sm font-black text-slate-800">{caseItem.complainant.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Contact Identity</p>
                  <p className="text-sm font-bold text-slate-600">{caseItem.complainant.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rescue Location</p>
                  <p className="text-sm font-medium text-slate-600 italic flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#005F54]" /> {caseItem.location}
                  </p>
                </div>
              </div>
            </section>

            {/* Right Col: Animal Info */}
            <section className="space-y-6">
              <h3 className="text-xs font-black text-[#005F54] uppercase tracking-[0.25em] flex items-center gap-2">
                <PawPrint size={14} /> Animal Profile
              </h3>
              <div className="space-y-4">
                <div className="flex gap-8">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Species</p>
                    <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
                      {caseItem.animalType}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Age / Gender</p>
                    <p className="text-sm font-black text-slate-800">{caseItem.age} • {caseItem.gender}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Initial Assessment</p>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium italic">"{caseItem.description}"</p>
                </div>
              </div>
            </section>
          </div>

          {/* Clinical Log Section */}
          <section className="space-y-6 pt-6 border-t border-slate-100">
            <h3 className="text-xs font-black text-[#005F54] uppercase tracking-[0.25em] flex items-center gap-2">
              <Stethoscope size={14} /> Full Clinical History
            </h3>
            
            {caseItem.treatmentLog.length > 0 ? (
              <div className="space-y-4">
                {caseItem.treatmentLog.map((log, index) => (
                  <div key={log.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-6 print:bg-white">
                    <div className="md:w-32 shrink-0">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Session {index + 1}</p>
                      <p className="text-xs font-black text-slate-800">{log.date}</p>
                      <p className="text-[10px] font-bold text-slate-400">{log.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="text-[9px] font-black text-[#005F54] uppercase tracking-widest mb-2">Attending: {log.doctorName}</p>
                      <div className="flex wrap gap-2 mb-3">
                        {log.medicines.map((m, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 shadow-sm">
                            {m.medicine} <span className="text-[8px] text-slate-400 uppercase ml-1">{m.category}</span>
                          </span>
                        ))}
                      </div>
                      {log.remarks && (
                        <p className="text-xs text-slate-600 font-medium italic border-l-2 border-slate-200 pl-3">"{log.remarks}"</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No clinical logs recorded in registry.</p>
              </div>
            )}
          </section>

          {/* Footer Info */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 pt-12 mt-12 border-t border-slate-100">
            <div className="space-y-4">
               <div className="flex gap-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Assigned Ward</p>
                    <p className="text-sm font-black text-slate-800">{caseItem.ward || 'General'}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Registry Date</p>
                    <p className="text-sm font-black text-slate-800">{caseItem.dateTime.split(' ')[0]}</p>
                  </div>
               </div>
               <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
                 Generated via PFA Management Portal • Secure Digital Ledger Asset
               </p>
            </div>
            
            <div className="text-center">
               <div className="w-48 border-b-2 border-slate-300 pb-2 mb-1"></div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:my-0 { margin: 0 !important; }
          .print\\:p-0 { padding: 0 !important; }
          .print\\:border-none { border: none !important; }
          .print\\:bg-white { background: white !important; }
          .fixed.inset-0, .fixed.inset-0 * { visibility: visible; }
          .fixed.inset-0 { position: absolute; left: 0; top: 0; width: 100%; height: auto; background: white !important; }
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

// --- Helper Dropdown Component for Doctors ---
const DoctorDropdown = ({ value, onChange, placeholder, className = "" }: { value: string, onChange: (val: string) => void, placeholder?: string, className?: string }) => {
  const [isOther, setIsOther] = useState(!DOCTOR_OPTIONS.includes(value) && value !== '');
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'Other') {
      setIsOther(true);
      onChange('');
    } else {
      setIsOther(false);
      onChange(val);
    }
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      <div className="relative">
        <select 
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005F54]/10 focus:border-[#005F54] appearance-none cursor-pointer"
          value={isOther ? 'Other' : value}
          onChange={handleSelectChange}
        >
          <option value="" disabled>{placeholder || 'Select Doctor...'}</option>
          {DOCTOR_OPTIONS.map(doc => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
      </div>
      {isOther && (
        <input 
          type="text"
          placeholder="Enter Name Manually"
          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005F54]/10 focus:border-[#005F54] animate-in slide-in-from-top-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
      )}
    </div>
  );
};

// --- Specialized Image Component ---
const SanctuaryImage = ({ src, alt, className, onClick }: { src?: string, alt?: string, className?: string, onClick?: () => void }) => {
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>(src ? 'loading' : 'error');

  useEffect(() => {
    if (!src) setStatus('error');
    else setStatus('loading');
  }, [src]);

  return (
    <div 
      className={`relative flex items-center justify-center bg-slate-100 overflow-hidden group ${className} ${src && status === 'success' ? 'cursor-zoom-in' : ''}`}
      onClick={() => status === 'success' && onClick && onClick()}
    >
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-50/50 animate-pulse space-y-4">
           <div className="relative w-16 h-16 bg-white rounded-3xl flex items-center justify-center border border-emerald-100 shadow-sm">
             <Loader2 className="text-[#005F54] animate-spin" size={24} />
           </div>
        </div>
      )}
      {status === 'error' && (
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <FileImage size={24} className="text-slate-300" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NO IMAGE</span>
        </div>
      )}
      {src && (
        <img 
          src={src} 
          alt={alt || "Animal Image"} 
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${status === 'success' ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setStatus('success')}
          onError={() => setStatus('error')}
        />
      )}
    </div>
  );
};

const StatusBadge = ({ status }: { status: CaseStatus }) => {
  const styles = {
    [CaseStatus.CRITICAL]: 'bg-rose-100 text-rose-700 border border-rose-200',
    [CaseStatus.UNDER_TREATMENT]: 'bg-amber-100 text-amber-700 border border-amber-200',
    [CaseStatus.RECOVERY]: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    [CaseStatus.RELEASED]: 'bg-blue-100 text-blue-700 border border-blue-200',
    [CaseStatus.PERMANENT]: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    [CaseStatus.DECEASED]: 'bg-slate-200 text-slate-700 border border-slate-300',
  };
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${styles[status]}`}>
      {status}
    </span>
  );
};

interface CasesPageProps {
  user: UserType;
}

const CasesPage: React.FC<CasesPageProps> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  
  // -- ADVANCED FILTERS --
  const [filterAnimal, setFilterAnimal] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterTimeRange, setFilterTimeRange] = useState('All');

  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  // -- NEW ENTRY FORM STATE --
  const [newEntryDoctor, setNewEntryDoctor] = useState('');
  const [newEntryDate, setNewEntryDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEntryRemarks, setNewEntryRemarks] = useState('');
  
  const createEmptyMedItem = () => ({
    id: Math.random().toString(36).substr(2, 9),
    category: '',
    medicine: ''
  });

  const [pendingMedItems, setPendingMedItems] = useState([createEmptyMedItem()]);

  // -- EDITING STATE --
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TreatmentEntry | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    const state = location.state as { openCaseId?: string } | null;
    if (state?.openCaseId) {
      const caseToOpen = INITIAL_CASES.find(c => c.id === state.openCaseId);
      if (caseToOpen) {
        setSelectedCase(caseToOpen);
        window.history.replaceState({}, document.title);
      }
    }
  }, [location]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterAnimal, filterStatus, filterYear, filterMonth, filterTimeRange]);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(INITIAL_MEDS.map(m => m.category));
    return Array.from(cats).sort();
  }, []);

  const uniqueAnimals = useMemo(() => {
    const animals = new Set(INITIAL_CASES.map(c => c.animalType));
    return ['All', ...Array.from(animals).sort()];
  }, []);

  const years = useMemo(() => {
    const ys = new Set(INITIAL_CASES.map(c => c.dateTime.split('-')[0]));
    return ['All', ...Array.from(ys).sort().reverse()];
  }, []);

  const months = [
    { label: 'All', value: 'All' },
    { label: 'Jan', value: '01' }, { label: 'Feb', value: '02' }, { label: 'Mar', value: '03' },
    { label: 'Apr', value: '04' }, { label: 'May', value: '05' }, { label: 'Jun', value: '06' },
    { label: 'Jul', value: '07' }, { label: 'Aug', value: '08' }, { label: 'Sep', value: '09' },
    { label: 'Oct', value: '10' }, { label: 'Nov', value: '11' }, { label: 'Dec', value: '12' }
  ];

  const timeRanges = [
    { label: 'Any Time', value: 'All' },
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'This Week', value: 'This Week' },
    { label: 'Last Week', value: 'Last Week' },
  ];

  const getFilteredMedicines = (category: string) => {
    if (!category) return INITIAL_MEDS;
    return INITIAL_MEDS.filter(m => m.category === category);
  };

  const handleUpdateCaseField = (field: keyof Case, value: any) => {
    if (selectedCase) {
      const updatedCase = { ...selectedCase, [field]: value };
      setSelectedCase(updatedCase);
      const index = INITIAL_CASES.findIndex(c => c.id === selectedCase.id);
      if (index !== -1) {
        INITIAL_CASES[index] = updatedCase;
      }
    }
  };

  const handleSaveClinicalSummary = () => {
    alert("Clinical information successfully updated in registry.");
  };

  // --- Functions for ADDING New Entry ---
  const handleAddMedItem = () => {
    setPendingMedItems([...pendingMedItems, createEmptyMedItem()]);
  };

  const handleRemoveMedItem = (id: string) => {
    if (pendingMedItems.length > 1) {
      setPendingMedItems(pendingMedItems.filter(t => t.id !== id));
    } else {
      setPendingMedItems([createEmptyMedItem()]);
    }
  };

  const handleUpdatePendingMed = (id: string, field: string, value: string) => {
    setPendingMedItems(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleCommitEntry = () => {
    if (!selectedCase) return;
    if (!newEntryDoctor) {
      alert("Please select or type a Doctor's name.");
      return;
    }
    const validMeds = pendingMedItems.filter(t => t.medicine);
    if (validMeds.length === 0) {
      alert("Please add at least one medicine.");
      return;
    }

    const newEntry: TreatmentEntry = {
      id: `e-${Date.now()}`,
      date: newEntryDate,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
      doctorName: newEntryDoctor,
      administeredBy: user.name,
      medicines: validMeds.map(m => ({ medicine: m.medicine, category: m.category })),
      remarks: newEntryRemarks
    };

    const updatedLog = [...selectedCase.treatmentLog, newEntry];
    handleUpdateCaseField('treatmentLog', updatedLog);
    setPendingMedItems([createEmptyMedItem()]);
    setNewEntryRemarks('');
    alert("Record successfully saved.");
  };

  // --- Functions for EDITING Previous Entry ---
  const handleStartEdit = (entry: TreatmentEntry) => {
    setEditingId(entry.id);
    setEditForm(JSON.parse(JSON.stringify(entry)));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleUpdateEditMed = (idx: number, field: string, value: string) => {
    if (!editForm) return;
    const updatedMeds = editForm.medicines.map((m, i) => i === idx ? { ...m, [field]: value } : m);
    setEditForm({ ...editForm, medicines: updatedMeds });
  };

  const handleAddEditMedRow = () => {
    if (!editForm) return;
    setEditForm({ ...editForm, medicines: [...editForm.medicines, { medicine: '', category: '' }] });
  };

  const handleRemoveEditMedRow = (idx: number) => {
    if (!editForm) return;
    if (editForm.medicines.length > 1) {
      if (window.confirm("Are you sure you want to remove this medicine from the list?")) {
        const updatedMeds = editForm.medicines.filter((_, i) => i !== idx);
        setEditForm({ ...editForm, medicines: updatedMeds });
      }
    } else {
      alert("At least one medicine row is required.");
    }
  };

  const handleSaveEdit = () => {
    if (selectedCase && editForm) {
      const updatedLog = selectedCase.treatmentLog.map(t => t.id === editForm.id ? editForm : t);
      handleUpdateCaseField('treatmentLog', updatedLog);
      setEditingId(null);
      setEditForm(null);
      alert("Record updated successfully.");
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (selectedCase && window.confirm("Delete this treatment record forever?")) {
      const updatedLog = selectedCase.treatmentLog.filter(t => t.id !== id);
      handleUpdateCaseField('treatmentLog', updatedLog);
    }
  };

  const filteredCases = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Current Week Range (Start Sunday)
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay());
    currentWeekStart.setHours(0,0,0,0);

    // Last Week Range
    const lastWeekEnd = new Date(currentWeekStart);
    lastWeekEnd.setMilliseconds(-1);
    const lastWeekStart = new Date(currentWeekStart);
    lastWeekStart.setDate(currentWeekStart.getDate() - 7);

    return INITIAL_CASES
      .filter(c => {
        const matchesSearch = c.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              c.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              c.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesAnimal = filterAnimal === 'All' || c.animalType === filterAnimal;
        const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
        
        const dateParts = c.dateTime.split('-');
        const matchesYear = filterYear === 'All' || dateParts[0] === filterYear;
        const matchesMonth = filterMonth === 'All' || dateParts[1] === filterMonth;

        let matchesTimeRange = true;
        const caseDate = new Date(c.dateTime.replace(' ', 'T'));
        const caseDateStr = c.dateTime.split(' ')[0];

        if (filterTimeRange === 'Today') {
          matchesTimeRange = caseDateStr === todayStr;
        } else if (filterTimeRange === 'Yesterday') {
          matchesTimeRange = caseDateStr === yesterdayStr;
        } else if (filterTimeRange === 'This Week') {
          matchesTimeRange = caseDate >= currentWeekStart;
        } else if (filterTimeRange === 'Last Week') {
          matchesTimeRange = caseDate >= lastWeekStart && caseDate <= lastWeekEnd;
        }

        return matchesSearch && matchesAnimal && matchesStatus && matchesYear && matchesMonth && matchesTimeRange;
      })
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
  }, [searchTerm, filterAnimal, filterStatus, filterYear, filterMonth, filterTimeRange]);

  const paginatedCases = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCases.slice(start, start + PAGE_SIZE);
  }, [filteredCases, currentPage]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterAnimal('All');
    setFilterStatus('All');
    setFilterYear('All');
    setFilterMonth('All');
    setFilterTimeRange('All');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Search and Navigation */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Rescue List</h1>
          <p className="text-slate-500 font-medium">Monitoring and medical log for sanctuary residents.</p>
        </div>
        <button onClick={() => navigate('/cases/new')} className="flex items-center gap-2 px-6 py-3 bg-[#005F54] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:bg-[#004a42] transition-all">
          <Plus size={18} /> Add New Case
        </button>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Search */}
          <div className="lg:col-span-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#005F54]/10 text-sm font-bold text-slate-700 shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Time Range Filter */}
          <div className="relative">
            <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm"
              value={filterTimeRange}
              onChange={(e) => setFilterTimeRange(e.target.value)}
            >
              {timeRanges.map(tr => <option key={tr.value} value={tr.value}>{tr.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Animal Filter */}
          <div className="relative">
            <PawPrint size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm"
              value={filterAnimal}
              onChange={(e) => setFilterAnimal(e.target.value)}
            >
              <option value="All">All Animals</option>
              {uniqueAnimals.filter(a => a !== 'All').map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              {Object.values(CaseStatus).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="All">All Years</option>
              {years.filter(y => y !== 'All').map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Month Filter */}
          <div className="relative">
            <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="All">All Months</option>
              {months.filter(m => m.value !== 'All').map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
             Found <span className="text-[#005F54]">{filteredCases.length}</span> matching cases
           </p>
           <button 
             onClick={resetFilters}
             className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-1"
           >
             <X size={12} /> Clear All Filters
           </button>
        </div>
      </div>

      {/* Main Records Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
              <tr>
                <th className="px-10 py-6">Case ID</th>
                <th className="px-10 py-6">Animal Type</th>
                <th className="px-10 py-6">Last Treated Date</th>
                <th className="px-10 py-6">Room / Ward</th>
                <th className="px-10 py-8 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedCases.map((c) => (
                <tr key={c.id} onClick={() => setSelectedCase(c)} className="group cursor-pointer hover:bg-emerald-50/10 transition-colors">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-1 h-10 bg-[#005F54] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div>
                        <p className="text-base font-black text-slate-900 tracking-tight leading-none mb-2">{c.caseNumber}</p>
                        <StatusBadge status={c.status} />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <span className="inline-block px-3 py-1 bg-[#005F54] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">{c.animalType}</span>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col">
                      {c.treatmentLog.length > 0 ? (
                        <>
                          <p className="text-sm font-black text-slate-800 flex items-center gap-2">
                            <Calendar size={14} className="text-[#005F54]" /> 
                            {(() => {
                              const sorted = [...c.treatmentLog].sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime());
                              return sorted[0].date;
                            })()}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 ml-5 flex items-center gap-1">
                            <Clock size={10} /> 
                            {(() => {
                              const sorted = [...c.treatmentLog].sort((a, b) => new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime());
                              return sorted[0].time;
                            })()}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-bold text-slate-300 flex items-center gap-2 italic">
                            <AlertCircle size={14} className="text-slate-200" /> Not Logged
                          </p>
                          <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest mt-1 ml-5">Awaiting Clinic</p>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2">
                       <Layout size={16} className={c.ward ? 'text-[#005F54]' : 'text-slate-300'} />
                       <p className={`text-xs font-black uppercase tracking-widest ${c.ward ? 'text-slate-800' : 'text-slate-300 italic'}`}>{c.ward || 'Unassigned'}</p>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl group-hover:bg-[#005F54] group-hover:text-white transition-all shadow-sm">
                       <ArrowRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {paginatedCases.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-300">
                       <Search size={48} className="opacity-20" />
                       <p className="text-xs font-black uppercase tracking-widest">No cases found matching these filters</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination Footer for list */}
        {filteredCases.length > PAGE_SIZE && (
          <div className="p-6 border-t border-slate-50 flex items-center justify-center gap-4">
             <button 
               onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.max(1, prev - 1)); }}
               disabled={currentPage === 1}
               className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-[#005F54] transition-all disabled:opacity-30"
             >
                <X size={16} className="rotate-45" /> 
             </button>
             <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Page {currentPage} of {Math.ceil(filteredCases.length / PAGE_SIZE)}</span>
             <button 
               onClick={(e) => { e.stopPropagation(); setCurrentPage(prev => Math.min(Math.ceil(filteredCases.length / PAGE_SIZE), prev + 1)); }}
               disabled={currentPage === Math.ceil(filteredCases.length / PAGE_SIZE)}
               className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-[#005F54] transition-all disabled:opacity-30"
             >
                <ArrowRight size={16} />
             </button>
          </div>
        )}
      </div>

      {selectedCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setSelectedCase(null)}></div>
          <div className="relative w-full max-w-7xl max-h-[95vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-12 duration-500 border border-white/20">
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#005F54] border border-emerald-100">
                  <BriefcaseMedical size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedCase.caseNumber}</h2>
                  <div className="flex items-center gap-3 mt-1">
                    <StatusBadge status={selectedCase.status} />
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1"><Clock size={12}/> {selectedCase.dateTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                  <div className="relative min-w-[200px]">
                    <select 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-black text-[#005F54] focus:outline-none focus:ring-2 focus:ring-[#005F54]/10 appearance-none cursor-pointer"
                      value={selectedCase.status}
                      onChange={(e) => handleUpdateCaseField('status', e.target.value as CaseStatus)}
                    >
                      <option value={CaseStatus.UNDER_TREATMENT}>Under Treatment</option>
                      <option value={CaseStatus.RECOVERY}>Recovery</option>
                      <option value={CaseStatus.RELEASED}>Released</option>
                      <option value={CaseStatus.PERMANENT}>Permanent</option>
                      <option value={CaseStatus.DECEASED}>Deceased</option>
                      <option value={CaseStatus.CRITICAL}>Critical</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#005F54] pointer-events-none" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsPreviewing(true)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#005F54]/5 text-[#005F54] border border-[#005F54]/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#005F54] hover:text-white transition-all shadow-sm active:scale-95 group"
                  >
                    <FileText size={16} className="group-hover:scale-110 transition-transform" />
                    View Case Sheet
                  </button>

                  <button 
                    onClick={() => navigate(`/cases/${selectedCase.id}/edit`)}
                    className="flex items-center gap-2 px-6 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 hover:text-white transition-all shadow-sm active:scale-95 group"
                  >
                    <Edit3 size={16} className="group-hover:scale-110 transition-transform" />
                    Edit Registry Info
                  </button>
                </div>

                <button onClick={() => setSelectedCase(null)} className="p-3 hover:bg-rose-50 hover:text-rose-500 rounded-2xl text-slate-300 transition-all"><X size={24} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Stethoscope size={14} /> Assigned Main Doctor
                    </h3>
                    <DoctorDropdown 
                      placeholder="Select / Assign Main Vet"
                      value={selectedCase.doctorName || ''}
                      onChange={(val) => handleUpdateCaseField('doctorName', val)}
                    />
                 </div>
                 <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex gap-6">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 overflow-hidden shrink-0">
                       <SanctuaryImage src={selectedCase.photoUrl} alt="Animal" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-3 flex-1">
                       <div>
                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</span>
                         <p className="text-base font-black text-slate-800">{selectedCase.animalType}</p>
                       </div>
                       <div className="flex justify-between items-end">
                         <div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Location</span>
                            <p className="text-xs font-bold text-slate-600">{selectedCase.location}</p>
                         </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Diagnosis and Registry Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#005F54] rounded-full"></div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Clinical Summary & Ward</h3>
                </div>

                <div className="bg-white border-2 border-slate-50 p-8 rounded-[2.5rem] shadow-sm space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <AlertCircle size={14} className="text-rose-500" /> Symptoms / Signs
                      </label>
                      <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all text-sm font-medium text-slate-700" placeholder="Clinical signs observed..." value={selectedCase.clinicalSymptoms || ''} onChange={(e) => handleUpdateCaseField('clinicalSymptoms', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Stethoscope size={14} className="text-[#005F54]" /> Diagnosis
                      </label>
                      <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all text-sm font-bold text-slate-800" placeholder="Confirmed or tentative diagnosis..." value={selectedCase.tentativeDiagnosis || ''} onChange={(e) => handleUpdateCaseField('tentativeDiagnosis', e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Layout size={14} className="text-[#005F54]" /> Ward Details
                      </label>
                      <div className="relative">
                        <select 
                          className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all text-sm font-bold text-slate-800 appearance-none cursor-pointer"
                          value={selectedCase.ward || ''}
                          onChange={(e) => handleUpdateCaseField('ward', e.target.value)}
                        >
                          <option value="">Unassigned / General</option>
                          <option value="Ward A">Ward A</option>
                          <option value="Ward B">Ward B</option>
                          <option value="Ward C">Ward C</option>
                        </select>
                        <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <History size={14} /> Past History (Optional)
                      </label>
                      <textarea rows={2} className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all text-sm font-medium text-slate-700" placeholder="Previous medical history if known..." value={selectedCase.medicalHistory || ''} onChange={(e) => handleUpdateCaseField('medicalHistory', e.target.value)} />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={handleSaveClinicalSummary}
                      className="flex items-center gap-3 px-10 py-4 bg-[#005F54] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#004a42] transition-all active:scale-95"
                    >
                      <Save size={18} /> Save Clinical Information
                    </button>
                  </div>
                </div>
              </div>

              {/* Treatment Table Section */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] flex items-center gap-3">
                  <div className="w-6 h-0.5 bg-[#005F54]"></div> Consolidated Treatment Log
                </h3>

                <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-10 py-5 w-[20%]">Date & Time</th>
                        <th className="px-10 py-5 w-[20%]">Doctor</th>
                        <th className="px-10 py-5 w-[40%]">Administered Items</th>
                        <th className="px-10 py-5 w-[20%] text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {selectedCase.treatmentLog.map((log) => (
                        <React.Fragment key={log.id}>
                          <tr className={`group transition-colors ${editingId === log.id ? 'bg-amber-50/30' : 'hover:bg-slate-50/50'}`}>
                            {editingId === log.id ? (
                              /* --- EDITING ROW VIEW --- */
                              <td colSpan={4} className="p-10 bg-amber-50/50 border-y-2 border-amber-200">
                                <div className="flex flex-col gap-6">
                                  <div className="flex items-center justify-between">
                                     <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg"><Edit2 size={20} /></div>
                                        <h4 className="text-sm font-black text-amber-700 uppercase tracking-widest">Editing Record</h4>
                                     </div>
                                     <div className="flex gap-4">
                                        <button onClick={handleCancelEdit} className="px-6 py-2 rounded-xl text-xs font-black uppercase text-slate-500 hover:bg-slate-200 transition-all">Cancel</button>
                                        <button onClick={handleSaveEdit} className="flex items-center gap-2 px-8 py-2 bg-amber-600 text-white rounded-xl text-xs font-black uppercase shadow-lg hover:bg-amber-700 transition-all"><Check size={16} /> Save Changes</button>
                                     </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                     <div className="space-y-4">
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                                          <input type="date" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700" value={editForm?.date} onChange={e => setEditForm(prev => prev ? {...prev, date: e.target.value} : null)} />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Doctor</label>
                                          <DoctorDropdown value={editForm?.doctorName || ''} onChange={(val) => setEditForm(prev => prev ? {...prev, doctorName: val} : null)} />
                                        </div>
                                        <div className="space-y-1">
                                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Remarks</label>
                                          <textarea rows={2} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-700" value={editForm?.remarks} onChange={e => setEditForm(prev => prev ? {...prev, remarks: e.target.value} : null)} />
                                        </div>
                                     </div>
                                     <div className="md:col-span-2 space-y-3">
                                        <div className="flex items-center justify-between mb-2">
                                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Medicine List</label>
                                           <button onClick={handleAddEditMedRow} className="text-[9px] font-black text-amber-600 bg-white px-3 py-1 rounded-lg border border-amber-200 hover:bg-amber-100 transition-all">+ Add Row</button>
                                        </div>
                                        {editForm?.medicines.map((m, idx) => (
                                          <div key={idx} className="flex gap-2 items-center">
                                             <select className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold" value={m.category} onChange={e => handleUpdateEditMed(idx, 'category', e.target.value)}>
                                                <option value="">Category...</option>
                                                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                             </select>
                                             <div className="flex-[2] relative">
                                                <input 
                                                  type="text" 
                                                  list={`edit-med-datalist-${log.id}-${idx}`} 
                                                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold" 
                                                  value={m.medicine} 
                                                  onChange={e => handleUpdateEditMed(idx, 'medicine', e.target.value)} 
                                                  placeholder="Medicine Name" 
                                                />
                                                <datalist id={`edit-med-datalist-${log.id}-${idx}`}>
                                                  {getFilteredMedicines(m.category).map(med => <option key={med.id} value={med.name} />)}
                                                </datalist>
                                             </div>
                                             <button onClick={() => handleRemoveEditMedRow(idx)} className="p-2.5 text-rose-300 hover:text-rose-500 transition-all"><MinusCircle size={20} /></button>
                                          </div>
                                        ))}
                                     </div>
                                  </div>
                                </div>
                              </td>
                            ) : (
                              /* --- NORMAL ROW VIEW --- */
                              <>
                                <td className="px-10 py-7 align-top">
                                  <span className="text-sm font-black text-slate-800 block mb-1">{log.date}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1"><Clock size={10} /> {log.time}</span>
                                </td>
                                <td className="px-10 py-7 align-top">
                                   <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#005F54] flex items-center justify-center font-black text-[10px] border border-emerald-100 uppercase">{log.doctorName.charAt(log.doctorName.startsWith('Dr.') ? 4 : 0)}</div>
                                      <span className="text-sm font-black text-slate-700">{log.doctorName}</span>
                                   </div>
                                </td>
                                <td className="px-10 py-7 align-top">
                                  <div className="flex wrap gap-2">
                                     {log.medicines.map((m, idx) => (
                                       <div key={idx} className="flex items-center gap-2 bg-white border border-slate-100 px-3 py-1.5 rounded-xl shadow-sm">
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                          <span className="text-xs font-bold text-slate-800">{m.medicine}</span>
                                          <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest ml-1">{m.category}</span>
                                       </div>
                                     ))}
                                  </div>
                                  {log.remarks && <p className="text-xs font-medium text-slate-500 italic mt-3 border-l-2 border-slate-100 pl-3">"{log.remarks}"</p>}
                                </td>
                                <td className="px-10 py-7 text-right align-top">
                                   <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button onClick={() => handleStartEdit(log)} className="p-3 text-slate-400 hover:text-[#005F54] hover:bg-emerald-50 rounded-2xl transition-all"><Edit2 size={18} /></button>
                                      <button onClick={() => handleDeleteEntry(log.id)} className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"><Trash2 size={18} /></button>
                                   </div>
                                </td>
                              </>
                            )}
                          </tr>
                        </React.Fragment>
                      ))}

                      {/* RECORD NEW SESSION FORM */}
                      <tr className="bg-emerald-50/20 border-t-4 border-emerald-100">
                        <td colSpan={4} className="px-10 py-10">
                           <div className="flex flex-col gap-8">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-[#005F54] text-white flex items-center justify-center shadow-lg"><Plus size={20} /></div>
                                    <h4 className="text-sm font-black text-[#005F54] uppercase tracking-[0.2em]">Record Treatment Session</h4>
                                 </div>
                                 <div className="flex items-center gap-4">
                                    <input type="date" className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-black text-slate-700 outline-none shadow-sm focus:border-[#005F54]" value={newEntryDate} onChange={e => setNewEntryDate(e.target.value)} />
                                    <button onClick={handleCommitEntry} className="flex items-center gap-3 px-10 py-4 bg-[#005F54] text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-[#004a42] transition-all active:scale-95"><Check size={18} /> Finish & Log Entry</button>
                                 </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                 <div className="space-y-6">
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Attending Vet</label>
                                       <DoctorDropdown value={newEntryDoctor} onChange={setNewEntryDoctor} placeholder="Who attended?" />
                                    </div>
                                    <div className="space-y-2">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Session Notes</label>
                                       <textarea rows={3} className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-700 focus:outline-none shadow-sm placeholder:text-slate-300" placeholder="Patient status, reaction..." value={newEntryRemarks} onChange={e => setNewEntryRemarks(e.target.value)} />
                                    </div>
                                 </div>

                                 <div className="md:col-span-2 space-y-4">
                                    <div className="flex items-center justify-between">
                                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Add Medicines</label>
                                       <button onClick={handleAddMedItem} className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-[#005F54] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-200 transition-all">+ Add Row</button>
                                    </div>
                                    <div className="space-y-3">
                                       {pendingMedItems.map((item) => (
                                         <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 items-end animate-in fade-in zoom-in-95 duration-200">
                                            <div className="space-y-1">
                                               <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 focus:outline-none" value={item.category} onChange={e => handleUpdatePendingMed(item.id, 'category', e.target.value)}>
                                                 <option value="">Category...</option>
                                                 {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                               </select>
                                            </div>
                                            <div className="space-y-1 flex-1 relative">
                                               <input 
                                                  type="text" 
                                                  list={`new-med-datalist-${item.id}`} 
                                                  placeholder="Select Medicine..." 
                                                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 focus:outline-none" 
                                                  value={item.medicine} 
                                                  onChange={e => handleUpdatePendingMed(item.id, 'medicine', e.target.value)} 
                                               />
                                               <datalist id={`new-med-datalist-${item.id}`}>
                                                  {getFilteredMedicines(item.category).map(m => <option key={m.id} value={m.name} />)}
                                               </datalist>
                                            </div>
                                            <div className="flex gap-2">
                                               <button onClick={() => handleRemoveMedItem(item.id)} className="p-3 text-rose-300 hover:text-rose-500 bg-white border border-slate-200 rounded-xl transition-all"><MinusCircle size={20} /></button>
                                            </div>
                                         </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedCase && isPreviewing && (
        <CaseSheetPreview caseItem={selectedCase} onClose={() => setIsPreviewing(false)} />
      )}
    </div>
  );
};

export default CasesPage;
