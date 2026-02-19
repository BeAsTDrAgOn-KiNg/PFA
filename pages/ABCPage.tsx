
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Scissors, 
  Search, 
  Plus, 
  Calendar, 
  BarChart, 
  ChevronDown, 
  X, 
  FileSearch, 
  MapPin, 
  Save, 
  AlertCircle,
  Layers,
  Edit3,
  PawPrint,
  Filter
} from 'lucide-react';
import { INITIAL_ABC_RECORDS, MYSURU_AREAS as GLOBAL_MYSURU_AREAS } from '../constants';
import { ABCRecord } from '../types';

const ABCPage: React.FC = () => {
  const [records, setRecords] = useState<ABCRecord[]>(INITIAL_ABC_RECORDS);
  const [view, setView] = useState<'log' | 'summaries'>('log');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [filterAnimal, setFilterAnimal] = useState('All');
  const [filterArea, setFilterArea] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Searchable Dropdown States
  const areaRef = useRef<HTMLDivElement>(null);
  const [availableAreas, setAvailableAreas] = useState<string[]>(GLOBAL_MYSURU_AREAS);
  const [areaSearch, setAreaSearch] = useState('');
  const [showAreaSuggestions, setShowAreaSuggestions] = useState(false);
  const [isCustomAreaMode, setIsCustomAreaMode] = useState(false);
  const [customAreaInput, setCustomAreaInput] = useState('');

  const [formData, setFormData] = useState({
    animalType: 'Dog',
    surgeryDate: new Date().toISOString().split('T')[0],
    maleCount: 0,
    femaleCount: 0,
    total: 0,
    rescueArea: '',
    detailedAddress: ''
  });

  // Handle outside clicks to close area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (areaRef.current && !areaRef.current.contains(event.target as Node)) {
        setShowAreaSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAreasList = useMemo(() => {
    if (!areaSearch) return availableAreas;
    return availableAreas.filter(a => a.toLowerCase().includes(areaSearch.toLowerCase()));
  }, [areaSearch, availableAreas]);

  const handleAreaSelect = (area: string) => {
    if (area === 'Others') {
      setIsCustomAreaMode(true);
      setShowAreaSuggestions(false);
      return;
    }
    setFormData({ ...formData, rescueArea: area });
    setAreaSearch(area);
    setShowAreaSuggestions(false);
  };

  const handleAddCustomArea = () => {
    if (!customAreaInput.trim()) return;
    const newArea = customAreaInput.trim();
    if (!availableAreas.includes(newArea)) {
      setAvailableAreas(prev => [...prev, newArea].sort());
    }
    setFormData({ ...formData, rescueArea: newArea });
    setAreaSearch(newArea);
    setIsCustomAreaMode(false);
    setCustomAreaInput('');
  };

  // Derive unique options for filters
  const uniqueAnimalTypes = useMemo(() => {
    const types = new Set(records.map(r => r.animalType));
    return ['All', ...Array.from(types).sort()];
  }, [records]);

  const uniqueAreas = useMemo(() => {
    const areas = new Set(records.map(r => r.location.split(',')[0]));
    return ['All', ...Array.from(areas).sort()];
  }, [records]);

  // Automatically calculate total whenever male or female count changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      total: Number(prev.maleCount) + Number(prev.femaleCount)
    }));
  }, [formData.maleCount, formData.femaleCount]);

  const handleRegisterClick = () => {
    setEditingId(null);
    setFormData({
      animalType: 'Dog',
      surgeryDate: new Date().toISOString().split('T')[0],
      maleCount: 0,
      femaleCount: 0,
      total: 0,
      rescueArea: '',
      detailedAddress: ''
    });
    setAreaSearch('');
    setIsCustomAreaMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (record: ABCRecord) => {
    setEditingId(record.id);
    const locParts = record.location.split(',');
    const area = locParts[0].trim();
    const details = locParts.slice(1).join(',').trim();

    setFormData({
      animalType: record.animalType,
      surgeryDate: record.surgeryDate,
      maleCount: record.maleCount,
      femaleCount: record.femaleCount,
      total: record.total,
      rescueArea: area,
      detailedAddress: details
    });
    setAreaSearch(area);
    setIsCustomAreaMode(false);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.rescueArea) {
      alert("Please select a Rescue Area.");
      return;
    }

    const combinedLocation = `${formData.rescueArea}${formData.detailedAddress ? `, ${formData.detailedAddress}` : ''}`;

    if (editingId) {
      setRecords(prev => prev.map(r => r.id === editingId ? { ...r, ...formData, location: combinedLocation } : r));
      alert("Surgery record updated.");
    } else {
      const newRecord: ABCRecord = {
        id: `abc-${Date.now()}`,
        animalType: formData.animalType,
        surgeryDate: formData.surgeryDate,
        maleCount: formData.maleCount,
        femaleCount: formData.femaleCount,
        total: formData.total,
        location: combinedLocation
      };
      setRecords([newRecord, ...records]);
      alert("New entry successfully saved.");
    }
    
    setIsModalOpen(false);
    setEditingId(null);
  };

  const stats = useMemo(() => {
    const monthly: Record<string, number> = {};
    const yearly: Record<string, number> = {};
    records.forEach(r => {
      const date = new Date(r.surgeryDate);
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      const year = date.getFullYear().toString();
      monthly[monthYear] = (monthly[monthYear] || 0) + r.total;
      yearly[year] = (yearly[year] || 0) + r.total;
    });
    return { monthly, yearly };
  }, [records]);

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const matchesSearch = r.animalType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            r.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAnimal = filterAnimal === 'All' || r.animalType === filterAnimal;
      const matchesArea = filterArea === 'All' || r.location.includes(filterArea);

      return matchesSearch && matchesAnimal && matchesArea;
    });
  }, [records, searchTerm, filterAnimal, filterArea]);

  const resetFilters = () => {
    setSearchTerm('');
    setFilterAnimal('All');
    setFilterArea('All');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Birth Control Program</h1>
          <p className="text-slate-500 font-medium">Tracking surgeries to control animal population.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white p-1 border border-slate-200 rounded-2xl shadow-sm">
            <button 
              onClick={() => setView('log')} 
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'log' ? 'bg-[#005F54] text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              Surgery List
            </button>
            <button 
              onClick={() => setView('summaries')} 
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${view === 'summaries' ? 'bg-[#005F54] text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              Summary
            </button>
          </div>
          <button 
            onClick={handleRegisterClick} 
            className="flex items-center gap-2 bg-[#005F54] text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:bg-[#004a42] transition-all"
          >
            <Plus size={18} /> Add Surgery
          </button>
        </div>
      </div>

      {view === 'log' ? (
        <div className="space-y-6">
          {/* Advanced Filters */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search animal or location..." 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#005F54]/10 focus:border-[#005F54] text-slate-700 font-bold shadow-inner"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="relative">
                <PawPrint size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select 
                  className="w-full pl-14 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm cursor-pointer"
                  value={filterAnimal}
                  onChange={(e) => setFilterAnimal(e.target.value)}
                >
                  <option value="All">All Species</option>
                  {uniqueAnimalTypes.filter(t => t !== 'All').map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select 
                  className="w-full pl-14 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none text-sm font-bold text-slate-700 appearance-none shadow-sm cursor-pointer"
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                >
                  <option value="All">All Areas/Locations</option>
                  {uniqueAreas.filter(a => a !== 'All').map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Filter size={14} className="text-[#005F54]" />
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Found <span className="text-[#005F54] font-black">{filteredRecords.length}</span> matching surgery records
                </p>
              </div>
              {(searchTerm || filterAnimal !== 'All' || filterArea !== 'All') && (
                <button 
                  onClick={resetFilters}
                  className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-1.5 transition-all"
                >
                  <X size={14} /> Reset All Filters
                </button>
              )}
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                  <tr>
                    <th className="px-10 py-6">Animal</th>
                    <th className="px-10 py-6 text-center">Date</th>
                    <th className="px-10 py-6 text-center">M Count</th>
                    <th className="px-10 py-6 text-center">F Count</th>
                    <th className="px-10 py-6 text-center">Total</th>
                    <th className="px-10 py-6">Location/Area</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-emerald-50/5 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#005F54] flex items-center justify-center font-black shadow-sm group-hover:bg-[#005F54] group-hover:text-white transition-all">
                            {r.animalType.charAt(0)}
                          </div>
                          <span className="text-base font-black text-slate-800 tracking-tight">{r.animalType}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-bold text-slate-500 text-center">{r.surgeryDate}</td>
                      <td className="px-10 py-6 text-sm font-black text-blue-600 text-center">{r.maleCount}</td>
                      <td className="px-10 py-6 text-sm font-black text-rose-600 text-center">{r.femaleCount}</td>
                      <td className="px-10 py-6 text-center">
                        <span className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-sm font-black shadow-md">{r.total}</span>
                      </td>
                      <td className="px-10 py-6">
                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 flex items-center gap-2 w-fit">
                          <MapPin size={10} className="text-slate-300" />
                          {r.location}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right">
                        <button 
                          onClick={() => handleEditClick(r)}
                          className="p-3 text-slate-300 hover:text-[#005F54] hover:bg-emerald-50 rounded-2xl transition-all shadow-sm border border-transparent hover:border-emerald-100"
                        >
                          <Edit3 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-32 text-center">
                        <div className="flex flex-col items-center gap-5 text-slate-300">
                          <div className="p-10 bg-slate-50 rounded-full">
                            <FileSearch size={64} className="opacity-10" />
                          </div>
                          <div>
                            <p className="text-base font-black uppercase tracking-[0.2em] text-slate-400">Registry search returned zero results</p>
                            <p className="text-sm text-slate-400 font-medium mt-2 italic">Try adjusting your filters or search term.</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                <Calendar className="text-[#005F54]" size={18} /> Monthly (Total Animals)
              </h3>
              <div className="space-y-4">
                {Object.entries(stats.monthly).map(([month, count]) => (
                  <div key={month} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group">
                    <span className="text-sm font-black text-slate-700">{month}</span>
                    <div className="flex items-center gap-3">
                      <span className="px-4 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-black text-[#005F54] shadow-sm">{count}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total ABC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3 mb-8">
                <BarChart className="text-[#005F54]" size={18} /> Yearly (Total Animals)
              </h3>
              <div className="space-y-8">
                {Object.entries(stats.yearly).map(([year, count]) => (
                  <div key={year} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-slate-700">{year} Total</span>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">{count}</span>
                    </div>
                    <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-1">
                      <div 
                        className="h-full bg-gradient-to-r from-[#005F54] to-emerald-400 rounded-full"
                        style={{ width: `${Math.min(((count as any) / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <AlertCircle size={16} className="text-[#005F54]" />
                      <p className="text-[10px] text-emerald-800 font-bold leading-tight">{count} total surgeries tracked this year.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REGISTRATION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-visible animate-in zoom-in duration-300 border border-white/20">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10 rounded-t-[2.5rem]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#005F54] text-white rounded-xl flex items-center justify-center shadow-lg">
                  <Scissors size={20} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase">
                  {editingId ? 'Edit Surgery' : 'Add New Surgery'}
                </h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-2xl transition-all">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Animal Type</label>
                    <div className="relative">
                      <select 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] appearance-none cursor-pointer transition-all"
                        value={formData.animalType}
                        onChange={e => setFormData({...formData, animalType: e.target.value})}
                      >
                        <option>Dog</option>
                        <option>Cat</option>
                        <option>Other</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Surgery Date</label>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                      <input 
                        type="date"
                        required
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] transition-all"
                        value={formData.surgeryDate}
                        onChange={e => setFormData({...formData, surgeryDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-1">Male Count</label>
                    <input 
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-blue-600 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all"
                      value={formData.maleCount}
                      onChange={e => setFormData({...formData, maleCount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest ml-1">Female Count</label>
                    <input 
                      type="number"
                      min="0"
                      required
                      placeholder="0"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-black text-rose-600 focus:ring-4 focus:ring-rose-500/5 focus:border-rose-500 outline-none transition-all"
                      value={formData.femaleCount}
                      onChange={e => setFormData({...formData, femaleCount: parseInt(e.target.value) || 0})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-1">Total</label>
                    <input 
                      readOnly
                      className="w-full px-5 py-4 bg-slate-900 border border-slate-900 rounded-2xl text-sm font-black text-white outline-none cursor-not-allowed shadow-inner"
                      value={formData.total}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Typeable Area Dropdown */}
                  <div className="space-y-2 relative" ref={areaRef}>
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rescue Area (Mysuru) *</label>
                    <div className="relative">
                       <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-opacity ${areaSearch ? 'opacity-0' : 'opacity-100'}`}>
                          <Search size={16} />
                       </div>
                       <input 
                         type="text"
                         placeholder="Search or select area..."
                         className="w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all text-sm font-bold text-black"
                         value={areaSearch}
                         onFocus={() => setShowAreaSuggestions(true)}
                         onChange={(e) => { setAreaSearch(e.target.value); setShowAreaSuggestions(true); }}
                       />
                       <ChevronDown size={16} className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform ${showAreaSuggestions ? 'rotate-180' : ''}`} />
                    </div>

                    {showAreaSuggestions && (
                      <div className="absolute z-[110] left-0 right-0 top-full mt-2 bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] max-h-48 overflow-y-auto">
                        {filteredAreasList.map(area => (
                          <button 
                            key={area}
                            type="button"
                            onClick={() => handleAreaSelect(area)}
                            className="w-full text-left px-6 py-3 text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#005F54] transition-colors border-b border-slate-50 last:border-none"
                          >
                            {area}
                          </button>
                        ))}
                        <button 
                          type="button"
                          onClick={() => handleAreaSelect('Others')}
                          className="w-full text-left px-6 py-3 text-sm font-black text-[#005F54] bg-emerald-50/30 hover:bg-emerald-50 transition-colors flex items-center justify-between"
                        >
                          <span>Others (Add New Area)</span>
                          <Plus size={14} />
                        </button>
                      </div>
                    )}

                    {isCustomAreaMode && (
                      <div className="mt-3 p-4 bg-[#005F54]/5 border-2 border-dashed border-[#005F54]/20 rounded-2xl">
                         <div className="flex items-center justify-between mb-2">
                           <label className="text-[9px] font-black text-[#005F54] uppercase tracking-widest">Enter New Area</label>
                           <button type="button" onClick={() => setIsCustomAreaMode(false)} className="text-emerald-600"><X size={12} /></button>
                         </div>
                         <div className="flex gap-2">
                           <input 
                             autoFocus
                             className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none"
                             value={customAreaInput}
                             onChange={e => setCustomAreaInput(e.target.value)}
                             onKeyDown={e => e.key === 'Enter' && handleAddCustomArea()}
                           />
                           <button type="button" onClick={handleAddCustomArea} className="px-4 bg-[#005F54] text-white text-[10px] font-black rounded-xl">Add</button>
                         </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Address / Landmark</label>
                    <input 
                      type="text"
                      placeholder="Street, Landmark..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-black focus:ring-4 focus:ring-[#005F54]/5 focus:border-[#005F54] focus:outline-none transition-all"
                      value={formData.detailedAddress}
                      onChange={e => setFormData({...formData, detailedAddress: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-50">
                <button 
                  type="submit" 
                  className="w-full py-5 bg-[#005F54] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-900/10 hover:bg-[#004a42] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <Save size={18} />
                  {editingId ? 'Update Record' : 'Save Surgery Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ABCPage;
