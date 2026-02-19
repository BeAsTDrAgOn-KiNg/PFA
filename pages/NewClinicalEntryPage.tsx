
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Stethoscope, 
  Save, 
  Clock, 
  Calendar, 
  Pill, 
  Activity, 
  User, 
  AlertCircle,
  ChevronDown,
  PlusCircle,
  Trash2,
  Package
} from 'lucide-react';
import { INITIAL_CASES, INITIAL_MEDS } from '../constants';
import { Case, TreatmentEntry } from '../types';

const NewClinicalEntryPage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [targetCase, setTargetCase] = useState<Case | null>(null);

  const medicationTypes = [
    'Tablet', 'Vial', 'Syrup', 'Injection', 'Ointment', 'Drops', 'Capsule', 'Other'
  ];

  // Added doctorName to initial entry state to match TreatmentEntry interface requirements
  const createInitialEntry = () => ({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    medicine: '',
    doctorName: 'Dr. Anita Desai',
    medicationType: 'Tablet',
    customMedicationType: '',
    dosage: '',
    administeredBy: 'Staff',
    remarks: ''
  });

  const [entries, setEntries] = useState([createInitialEntry()]);

  useEffect(() => {
    const found = INITIAL_CASES.find(c => c.id === caseId);
    if (found) {
      setTargetCase(found);
    }
  }, [caseId]);

  const handleAddEntry = () => {
    setEntries([...entries, createInitialEntry()]);
  };

  const handleRemoveEntry = (index: number) => {
    if (entries.length > 1) {
      setEntries(entries.filter((_, i) => i !== index));
    }
  };

  const handleUpdateEntry = (index: number, field: string, value: string) => {
    const updatedEntries = entries.map((entry, i) => {
      if (i === index) {
        return { ...entry, [field]: value };
      }
      return entry;
    });
    setEntries(updatedEntries);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetCase) {
      const invalidEntry = entries.find(e => !e.medicine || !e.dosage);
      if (invalidEntry) {
        alert("Please select medicine and amount for all entries.");
        return;
      }

      // Fixed: Map form entries to valid TreatmentEntry objects with required properties
      const newEntries: TreatmentEntry[] = entries.map(e => {
        // Find category from INITIAL_MEDS to satisfy TreatmentItem type requirement
        const med = INITIAL_MEDS.find(m => m.name === e.medicine);
        const category = med ? med.category : 'General';
        
        return {
          id: `t-${Date.now()}-${Math.random()}`,
          date: e.date,
          time: e.time,
          doctorName: e.doctorName,
          administeredBy: e.administeredBy,
          // Mapping single medicine selection to TreatmentItem array
          medicines: [{ medicine: e.medicine, category }],
          // Consolidating dosage and medication type into remarks for the log
          remarks: `${e.dosage} (${e.medicationType === 'Other' ? (e.customMedicationType || 'Other') : e.medicationType}). ${e.remarks}`.trim()
        };
      });

      targetCase.treatmentLog.push(...newEntries);
      alert(`Saved ${entries.length} treatments.`);
      
      // Navigate back to CasesPage and tell it to re-open this specific case sheet
      navigate('/cases', { state: { openCaseId: caseId } });
    }
  };

  if (!targetCase) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
        <AlertCircle size={48} className="mb-4" />
        <p className="font-black uppercase tracking-[0.2em] text-xs">Case not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all text-slate-500 shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Add Treatments</h1>
          <p className="text-slate-500 font-medium">Add medicines given to {targetCase.caseNumber}</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-[#005F54] p-8 text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <Stethoscope size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Case</p>
              <h3 className="text-xl font-black tracking-tight">{targetCase.caseNumber} • {targetCase.animalType}</h3>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Status</p>
            <p className="text-xs font-black bg-white/20 px-4 py-1.5 rounded-xl mt-1 uppercase tracking-wider">{targetCase.status}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
          {entries.map((entry, index) => (
            <div key={index} className={`space-y-8 relative ${index > 0 ? 'pt-12 border-t border-slate-100' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#005F54] flex items-center justify-center text-xs font-black border border-emerald-100">
                    {index + 1}
                  </div>
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Treatment</h4>
                </div>
                {entries.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => handleRemoveEntry(index)}
                    className="p-2 text-rose-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Calendar size={12} /> Date
                  </label>
                  <input 
                    type="date"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner"
                    value={entry.date}
                    onChange={e => handleUpdateEntry(index, 'date', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                    <Clock size={12} /> Time
                  </label>
                  <input 
                    type="text"
                    required
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner"
                    value={entry.time}
                    onChange={e => handleUpdateEntry(index, 'time', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Pill size={12} /> Medicine Name
                    </label>
                    <div className="relative">
                      <select 
                        required
                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner appearance-none"
                        value={entry.medicine}
                        onChange={e => handleUpdateEntry(index, 'medicine', e.target.value)}
                      >
                        <option value="" disabled>Select medicine...</option>
                        {INITIAL_MEDS.map((med) => (
                          <option key={med.id} value={med.name}>
                            {med.name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Package size={12} /> Form
                    </label>
                    <div className="relative">
                      <select 
                        required
                        className="w-full pl-5 pr-12 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner appearance-none"
                        value={entry.medicationType}
                        onChange={e => handleUpdateEntry(index, 'medicationType', e.target.value)}
                      >
                        {medicationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                    </div>
                    {entry.medicationType === 'Other' && (
                      <input 
                        type="text"
                        placeholder="Specify form"
                        className="w-full mt-2 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none animate-in fade-in"
                        value={entry.customMedicationType}
                        onChange={e => handleUpdateEntry(index, 'customMedicationType', e.target.value)}
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <Activity size={12} /> Dosage
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. 500mg, 5ml"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner"
                      value={entry.dosage}
                      onChange={e => handleUpdateEntry(index, 'dosage', e.target.value)}
                    />
                  </div>
                  {/* Added Attending Doctor field to ensure user provides required TreatmentEntry.doctorName */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <User size={12} /> Attending Doctor
                    </label>
                    <input 
                      type="text"
                      required
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner"
                      value={entry.doctorName}
                      onChange={e => handleUpdateEntry(index, 'doctorName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-1">
                      <User size={12} /> Administered By
                    </label>
                    <input 
                      type="text"
                      required
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-bold text-black shadow-inner"
                      value={entry.administeredBy}
                      onChange={e => handleUpdateEntry(index, 'administeredBy', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Remarks / Observations</label>
                  <textarea 
                    rows={2}
                    placeholder="Patient reaction, specific notes..."
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:bg-white focus:outline-none transition-all text-sm font-medium text-black shadow-inner"
                    value={entry.remarks}
                    onChange={e => handleUpdateEntry(index, 'remarks', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row gap-4">
            <button 
              type="button" 
              onClick={handleAddEntry}
              className="flex-1 py-5 bg-slate-50 text-slate-600 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-2 border border-slate-200"
            >
              <PlusCircle size={18} />
              Add Another Drug
            </button>
            <button 
              type="submit"
              className="flex-1 py-5 bg-[#005F54] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:bg-[#004a42] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Save size={18} />
              Save Treatments
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewClinicalEntryPage;
