
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Camera, 
  MapPin, 
  Phone, 
  User, 
  Info, 
  Save,
  PawPrint,
  ChevronDown,
  AlertCircle,
  Clock
} from 'lucide-react';
import { INITIAL_CASES } from '../constants';
import { Case, CaseStatus } from '../types';

const EditCasePage: React.FC = () => {
  const { caseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    caseNumber: '',
    dateTime: '',
    location: '',
    compName: '',
    compPhone: '',
    compAddress: '',
    animalType: 'Dog',
    customAnimalType: '',
    age: 'Unknown',
    gender: 'Male',
    description: '',
    status: CaseStatus.UNDER_TREATMENT
  });

  useEffect(() => {
    const foundCase = INITIAL_CASES.find(c => c.id === caseId);
    if (foundCase) {
      setFormData({
        caseNumber: foundCase.caseNumber,
        dateTime: foundCase.dateTime,
        location: foundCase.location,
        compName: foundCase.complainant.name,
        compPhone: foundCase.complainant.phone,
        compAddress: foundCase.complainant.address,
        animalType: ['Dog', 'Cat', 'Cow'].includes(foundCase.animalType) ? foundCase.animalType : 'Other',
        customAnimalType: ['Dog', 'Cat', 'Cow'].includes(foundCase.animalType) ? '' : foundCase.animalType,
        age: foundCase.age,
        gender: foundCase.gender,
        description: foundCase.description,
        status: foundCase.status
      });
      setLoading(false);
    } else {
      alert("Case not found.");
      navigate('/cases');
    }
  }, [caseId, navigate]);

  const handleUpdate = () => {
    if (!formData.caseNumber.trim()) {
      alert("Please enter a Case Number.");
      return;
    }

    if (formData.compPhone && formData.compPhone.length !== 10) {
      alert("Reporter phone number must be exactly 10 digits.");
      return;
    }

    const finalAnimalType = formData.animalType === 'Other' ? (formData.customAnimalType || 'Other') : formData.animalType;
    const index = INITIAL_CASES.findIndex(c => c.id === caseId);

    if (index !== -1) {
      const updatedCase: Case = {
        ...INITIAL_CASES[index],
        caseNumber: formData.caseNumber,
        location: formData.location,
        animalType: finalAnimalType,
        description: formData.description,
        age: formData.age,
        gender: formData.gender,
        status: formData.status,
        complainant: {
          name: formData.compName,
          phone: formData.compPhone,
          address: formData.compAddress
        }
      };

      INITIAL_CASES[index] = updatedCase;
      alert(`Case ${formData.caseNumber} has been updated.`);
      navigate('/cases', { state: { openCaseId: caseId } });
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition-all text-slate-500 shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Edit Case Registry</h1>
          <p className="text-slate-500 font-medium">Modifying official intake records for {formData.caseNumber}.</p>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        
        {/* Section 1: Rescue Information */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Rescue Details</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Case Number *</label>
                <input 
                  required
                  placeholder="Enter Case ID..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                  value={formData.caseNumber}
                  onChange={e => setFormData({...formData, caseNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Status</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black appearance-none"
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value as CaseStatus})}
                  >
                    {Object.values(CaseStatus).map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rescue Location</label>
              <textarea 
                rows={3}
                placeholder="Enter detailed rescue location..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-slate-100"></div>

        {/* Section 2: Complainant Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <User size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Reporter Details</h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Reporter Name</label>
                <input 
                  type="text" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                  value={formData.compName}
                  onChange={e => setFormData({...formData, compName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <input 
                  type="tel" 
                  minLength={10}
                  maxLength={10}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                  value={formData.compPhone}
                  onChange={e => setFormData({...formData, compPhone: e.target.value.replace(/\D/g, '')})}
                  placeholder="10-digit Number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Address Detail</label>
              <textarea 
                rows={2}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                value={formData.compAddress}
                onChange={e => setFormData({...formData, compAddress: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="my-12 h-px bg-slate-100"></div>

        {/* Section 3: Animal Details */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
              <PawPrint size={20} />
            </div>
            <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">Animal Details</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Animal Category</label>
              <div className="relative">
                <select 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black appearance-none"
                  value={formData.animalType}
                  onChange={e => setFormData({...formData, animalType: e.target.value})}
                >
                  {['Dog', 'Cat', 'Cow', 'Other'].map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            {formData.animalType === 'Other' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Specify Species</label>
                <input 
                  type="text" 
                  placeholder="Enter specific animal type..."
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                  value={formData.customAnimalType}
                  onChange={e => setFormData({...formData, customAnimalType: e.target.value})}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estimated Age</label>
                <div className="relative">
                  <select 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black appearance-none"
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: e.target.value})}
                  >
                    <option>Kitten/Puppy</option>
                    <option>Young</option>
                    <option>Adult</option>
                    <option>Senior</option>
                    <option>Unknown</option>
                  </select>
                  <Info size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                <div className="flex gap-2">
                  {['Male', 'Female'].map(g => (
                    <button 
                      key={g}
                      type="button"
                      onClick={() => setFormData({...formData, gender: g})}
                      className={`flex-1 py-4 bg-slate-50 rounded-2xl border-2 font-black text-[10px] uppercase tracking-wider transition-all ${formData.gender === g ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description / History Details</label>
              <textarea 
                rows={4}
                placeholder="Markings, scars, color, trauma history..."
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 focus:outline-none transition-all text-sm font-bold text-black"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Update Action */}
        <div className="mt-16 pt-8 border-t border-slate-100">
          <button 
            onClick={handleUpdate}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.25em] shadow-2xl shadow-amber-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Save size={20} />
            Update Registry Record
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditCasePage;
