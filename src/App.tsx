/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  History, 
  User, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Play, 
  Plus, 
  Check, 
  ChevronRight,
  Sun,
  Moon,
  Database,
  Key,
  Fingerprint,
  AudioLines,
  FileAudio,
  Clapperboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Types
type Page = 'studio' | 'profile' | 'subscription' | 'history' | 'ids' | 'clone' | 'select' | 'help' | 'logout';

interface Character {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface HistoryItem {
  id: string;
  title: string;
  date: string;
  type: 'SIMPLE' | 'FILM';
  duration: string;
}

const CHARACTERS: Character[] = [
  { id: '1', name: 'Rachel', description: 'Warm and friendly female voice', image: 'https://picsum.photos/seed/rachel/200' },
  { id: '2', name: 'Marcus', description: 'Deep and authoritative male voice', image: 'https://picsum.photos/seed/marcus/200' },
  { id: '3', name: 'Sarah', description: 'Professional and clear female voice', image: 'https://picsum.photos/seed/sarah/200' },
  { id: '4', name: 'James', description: 'Energetic and youthful male voice', image: 'https://picsum.photos/seed/james/200' },
  { id: '5', name: 'Elena', description: 'Soft and calming female voice', image: 'https://picsum.photos/seed/elena/200' },
  { id: '6', name: 'David', description: 'Narrator style male voice', image: 'https://picsum.photos/seed/david/200' },
  { id: '7', name: 'Sophie', description: 'Cheerful and bright female voice', image: 'https://picsum.photos/seed/sophie/200' },
  { id: '8', name: 'Robert', description: 'Sophisticated and mature male voice', image: 'https://picsum.photos/seed/robert/200' },
  { id: '9', name: 'Lily', description: 'Sweet and gentle female voice', image: 'https://picsum.photos/seed/lily/200' },
  { id: '10', name: 'Thomas', description: 'Casual and relatable male voice', image: 'https://picsum.photos/seed/thomas/200' },
];

const HISTORY_DATA: HistoryItem[] = [
  { id: '1', title: 'Marketing Video Script', date: '2024-03-20', type: 'FILM', duration: '12:45' },
  { id: '2', title: 'Podcast Intro', date: '2024-03-19', type: 'SIMPLE', duration: '0:30' },
  { id: '3', title: 'Audiobook Chapter 1', date: '2024-03-18', type: 'FILM', duration: '18:20' },
  { id: '4', title: 'Quick Voice Note', date: '2024-03-17', type: 'SIMPLE', duration: '0:15' },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('studio');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(CHARACTERS[0]);
  const [script, setScript] = useState('');
  const [isSimpleMode, setIsSimpleMode] = useState(true);

  const [apiSettings] = useState({
    falKey: import.meta.env.VITE_FAL_KEY || '',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  });

  // Theme management
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navigate = (page: Page) => {
    if (page === 'logout') {
      setIsLoggedIn(false);
      setCurrentPage('studio');
    } else {
      setCurrentPage(page);
    }
    closeSidebar();
  };

  // Auth Screen
  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${isDarkMode ? 'bg-[#050a18] text-white' : 'bg-[#f3f4f6] text-[#1f2937]'}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white'}`}
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
              <Mic className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">VocalClone AI</h1>
            <p className="text-blue-500 font-medium">Pro Studio</p>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium opacity-70 ml-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className={`w-full px-6 py-4 outline-none border-2 transition-all ${isDarkMode ? 'bg-[#1f2937] border-transparent focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 text-gray-900'}`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium opacity-70 ml-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className={`w-full px-6 py-4 outline-none border-2 transition-all ${isDarkMode ? 'bg-[#1f2937] border-transparent focus:border-blue-500 text-white' : 'bg-gray-50 border-gray-200 focus:border-blue-500 text-gray-900'}`}
              />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-3xl transition-all shadow-lg shadow-blue-500/30 active:scale-95 mt-4"
            >
              Enter Pro Studio
            </button>
          </div>
          
          <p className="text-center mt-6 text-sm opacity-50">
            Don't have an account? <span className="text-blue-500 cursor-pointer hover:underline">Sign up</span>
          </p>
        </motion.div>
      </div>
    );
  }

  const SidebarItem = ({ icon: Icon, label, page, active }: { icon: any, label: string, page: Page, active: boolean }) => (
    <button 
      onClick={() => navigate(page)}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
        active 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
          : isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
      {active && <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />}
    </button>
  );

  return (
    <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#050a18] text-white' : 'bg-[#f3f4f6] text-[#1f2937]'}`}>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-4 z-40 bg-inherit border-b border-white/5">
        <button onClick={toggleSidebar} className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Mic className="text-blue-500" size={20} />
          <span className="font-bold">VocalClone AI</span>
        </div>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        className={`fixed lg:static inset-y-0 left-0 w-72 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isDarkMode ? 'bg-[#111827] border-r border-white/5' : 'bg-white border-r border-gray-200'}`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Mic className="text-white" size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">VocalClone</h2>
                <p className="text-xs text-blue-500 font-semibold uppercase tracking-wider">Pro Studio</p>
              </div>
            </div>
            <button onClick={closeSidebar} className="lg:hidden p-2 rounded-xl hover:bg-gray-800">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto pr-2 -mr-2">
            <SidebarItem icon={AudioLines} label="Studio Editor" page="studio" active={currentPage === 'studio'} />
            <SidebarItem icon={User} label="User Profile" page="profile" active={currentPage === 'profile'} />
            <SidebarItem icon={CreditCard} label="Subscription Plans" page="subscription" active={currentPage === 'subscription'} />
            <SidebarItem icon={History} label="Audio History" page="history" active={currentPage === 'history'} />
            <SidebarItem icon={Fingerprint} label="Character IDs" page="ids" active={currentPage === 'ids'} />
            <SidebarItem icon={Mic} label="Clone My Voice" page="clone" active={currentPage === 'clone'} />
            <SidebarItem icon={Search} label="Character Select" page="select" active={currentPage === 'select'} />
            <SidebarItem icon={HelpCircle} label="Help & Support" page="help" active={currentPage === 'help'} />
          </div>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl mb-2 transition-all ${isDarkMode ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <SidebarItem icon={LogOut} label="Logout" page="logout" active={false} />
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col pt-16 lg:pt-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {currentPage === 'studio' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-4xl font-bold">Studio Editor</h1>
                      <p className="opacity-50">Create high-quality AI voiceovers in seconds.</p>
                    </div>
                    <div className={`p-1.5 rounded-3xl flex gap-1 ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <button 
                        onClick={() => setIsSimpleMode(true)}
                        className={`px-6 py-2.5 rounded-2xl font-bold transition-all ${isSimpleMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'opacity-50 hover:opacity-100'}`}
                      >
                        Simple Mode
                      </button>
                      <button 
                        onClick={() => setIsSimpleMode(false)}
                        className={`px-6 py-2.5 rounded-2xl font-bold transition-all flex items-center gap-2 ${!isSimpleMode ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'opacity-50 hover:opacity-100'}`}
                      >
                        <Clapperboard size={18} />
                        Film (20 min)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg">Script Editor</h3>
                          <span className="text-xs font-mono opacity-50 bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full">
                            {script.split(/\s+/).filter(w => w.length > 0).length} Words
                          </span>
                        </div>
                        <textarea 
                          value={script}
                          onChange={(e) => setScript(e.target.value)}
                          placeholder="Paste your script here..."
                          className={`w-full h-64 p-6 rounded-2xl outline-none resize-none transition-all border-2 ${isDarkMode ? 'bg-[#1f2937] border-transparent focus:border-blue-500' : 'bg-gray-50 border-gray-100 focus:border-blue-500'}`}
                        />
                        <div className="mt-6 flex items-center justify-between">
                          <div className="flex gap-2">
                            <button className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all">
                              <Play size={20} />
                            </button>
                            <button className="p-3 rounded-xl bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 transition-all">
                              <Plus size={20} />
                            </button>
                          </div>
                          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-10 py-4 rounded-3xl transition-all shadow-lg shadow-blue-500/30 active:scale-95">
                            Process Audio
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                        <h3 className="font-bold text-lg mb-6">Active Voice</h3>
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                          <img src={selectedVoice.image} alt={selectedVoice.name} className="w-16 h-16 rounded-2xl object-cover" />
                          <div>
                            <h4 className="font-bold text-xl">{selectedVoice.name}</h4>
                            <p className="text-sm opacity-50">{selectedVoice.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => navigate('select')}
                          className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-blue-500/30 text-blue-500 font-bold hover:bg-blue-500/5 transition-all"
                        >
                          Change Character
                        </button>
                      </div>

                      <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                        <h3 className="font-bold text-lg mb-4">Voice Settings</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="opacity-50">Stability</span>
                              <span className="text-blue-500 font-bold">75%</span>
                            </div>
                            <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-3/4" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="opacity-50">Clarity</span>
                              <span className="text-blue-500 font-bold">90%</span>
                            </div>
                            <div className="h-2 bg-blue-500/10 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[90%]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'profile' && (
                <div className="max-w-2xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold">User Profile</h1>
                  <div className={`p-10 rounded-3xl text-center ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                    <div className="w-32 h-32 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-2xl shadow-blue-500/20">
                      QK
                    </div>
                    <h2 className="text-2xl font-bold mb-1">Qais Khan</h2>
                    <p className="opacity-50 mb-8">qaiskhan8002@gmail.com</p>
                    
                    <div className="grid grid-cols-1 gap-4 text-left">
                      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-[#1f2937]' : 'bg-gray-50'}`}>
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Phone Number</p>
                        <p className="text-xl font-bold">03102089259</p>
                      </div>
                      <div className={`p-6 rounded-2xl ${isDarkMode ? 'bg-[#1f2937]' : 'bg-gray-50'}`}>
                        <p className="text-xs uppercase tracking-widest opacity-50 mb-1">Account Type</p>
                        <p className="text-xl font-bold text-blue-500">Professional Studio</p>
                      </div>
                    </div>
                    
                    <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-3xl transition-all shadow-lg shadow-blue-500/30">
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {currentPage === 'subscription' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold">Subscription Plans</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`p-10 rounded-3xl border-2 border-blue-500 relative overflow-hidden ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <div className="absolute top-0 right-0 bg-blue-500 text-white px-6 py-2 rounded-bl-3xl font-bold text-sm">
                        ACTIVE
                      </div>
                      <h2 className="text-3xl font-bold mb-2">Pro Plan</h2>
                      <p className="opacity-50 mb-8">Full access to all studio features.</p>
                      <div className="text-5xl font-bold mb-8">$49<span className="text-xl opacity-50">/mo</span></div>
                      <ul className="space-y-4 mb-10">
                        <li className="flex items-center gap-3"><Check className="text-blue-500" size={20} /> Unlimited Voice Cloning</li>
                        <li className="flex items-center gap-3"><Check className="text-blue-500" size={20} /> 20 Min Film Mode</li>
                        <li className="flex items-center gap-3"><Check className="text-blue-500" size={20} /> Commercial Rights</li>
                        <li className="flex items-center gap-3"><Check className="text-blue-500" size={20} /> API Access</li>
                      </ul>
                      <button className="w-full py-4 rounded-3xl border-2 border-blue-500 text-blue-500 font-bold hover:bg-blue-500/5 transition-all">
                        Manage Billing
                      </button>
                    </div>
                    
                    <div className={`p-10 rounded-3xl flex flex-col justify-center items-center text-center ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center mb-6">
                        <CreditCard size={40} />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Usage Statistics</h3>
                      <p className="opacity-50 mb-8">You have used 12.5 hours of synthesis this month.</p>
                      <div className="w-full h-4 bg-blue-500/10 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-blue-500 w-[65%]" />
                      </div>
                      <div className="flex justify-between w-full text-sm font-bold">
                        <span>65% Used</span>
                        <span>37.5h Remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'history' && (
                <div className="space-y-8">
                  <h1 className="text-4xl font-bold">Audio History</h1>
                  <div className={`rounded-3xl overflow-hidden ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                            <th className="px-8 py-6 font-bold opacity-50">Project Name</th>
                            <th className="px-8 py-6 font-bold opacity-50">Type</th>
                            <th className="px-8 py-6 font-bold opacity-50">Date</th>
                            <th className="px-8 py-6 font-bold opacity-50">Duration</th>
                            <th className="px-8 py-6 font-bold opacity-50">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {HISTORY_DATA.map((item) => (
                            <tr key={item.id} className={`border-b last:border-0 hover:bg-blue-500/5 transition-all ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                              <td className="px-8 py-6 font-bold">{item.title}</td>
                              <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  item.type === 'FILM' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'
                                }`}>
                                  {item.type}
                                </span>
                              </td>
                              <td className="px-8 py-6 opacity-50">{item.date}</td>
                              <td className="px-8 py-6 opacity-50">{item.duration}</td>
                              <td className="px-8 py-6">
                                <button className="p-2 rounded-xl hover:bg-blue-500/10 text-blue-500 transition-all">
                                  <Play size={20} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {currentPage === 'ids' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold">Character IDs</h1>
                  <p className="opacity-50">Manage your unique voice identity strings for API integration.</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {CHARACTERS.slice(0, 5).map((char) => (
                      <div key={char.id} className={`p-6 rounded-3xl flex items-center justify-between ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                          <img src={char.image} alt={char.name} className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <h3 className="font-bold">{char.name}</h3>
                            <p className="text-xs font-mono opacity-50">ID: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                          </div>
                        </div>
                        <button className="px-6 py-2 rounded-2xl bg-blue-500/10 text-blue-500 font-bold hover:bg-blue-500/20 transition-all">
                          Copy ID
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentPage === 'clone' && (
                <div className="max-w-3xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold">Clone My Voice</h1>
                  <div className={`p-12 rounded-3xl text-center border-4 border-dashed ${isDarkMode ? 'bg-[#111827] border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-full mx-auto mb-8 flex items-center justify-center">
                      <Mic size={48} />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Voice Training</h2>
                    <p className="opacity-50 mb-10 max-w-md mx-auto">
                      Upload at least 5 minutes of high-quality audio or record directly to train your AI voice clone.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-10 py-5 rounded-3xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-3">
                        <Play size={20} /> Start Recording
                      </button>
                      <button className={`font-bold px-10 py-5 rounded-3xl transition-all flex items-center justify-center gap-3 ${isDarkMode ? 'bg-[#1f2937] hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                        <Plus size={20} /> Upload Audio
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                    <h3 className="font-bold mb-4">Training Guidelines</h3>
                    <ul className="space-y-3 text-sm opacity-70">
                      <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" /> Use a high-quality condenser microphone.</li>
                      <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" /> Record in a quiet environment with minimal echo.</li>
                      <li className="flex items-start gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" /> Speak naturally with consistent tone and pace.</li>
                    </ul>
                  </div>
                </div>
              )}

              {currentPage === 'select' && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-4xl font-bold">Character Select</h1>
                    <div className={`flex items-center gap-3 px-6 py-3 rounded-3xl w-full md:w-96 ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <Search size={20} className="opacity-50" />
                      <input type="text" placeholder="Search voices..." className="bg-transparent outline-none w-full" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {CHARACTERS.map((char) => (
                      <motion.div 
                        key={char.id}
                        whileHover={{ y: -5 }}
                        onClick={() => {
                          setSelectedVoice(char);
                          navigate('studio');
                        }}
                        className={`p-6 rounded-3xl cursor-pointer transition-all border-2 ${
                          selectedVoice.id === char.id 
                            ? 'border-blue-500 bg-blue-500/5' 
                            : isDarkMode ? 'bg-[#111827] border-transparent hover:border-white/10' : 'bg-white border-transparent shadow-sm hover:shadow-md'
                        }`}
                      >
                        <img src={char.image} alt={char.name} className="w-full aspect-square rounded-2xl object-cover mb-4" />
                        <h3 className="font-bold text-lg">{char.name}</h3>
                        <p className="text-xs opacity-50 line-clamp-2">{char.description}</p>
                        {selectedVoice.id === char.id && (
                          <div className="mt-4 flex items-center gap-2 text-blue-500 text-xs font-bold uppercase">
                            <Check size={14} /> Selected
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {currentPage === 'help' && (
                <div className="max-w-4xl mx-auto space-y-8">
                  <h1 className="text-4xl font-bold">Help & Support</h1>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <h3 className="font-bold text-xl mb-4">Quick Start Guide</h3>
                      <p className="opacity-70 text-sm mb-6">Learn the basics of voice cloning and studio editing in under 5 minutes.</p>
                      <button className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Read Guide <ChevronRight size={18} />
                      </button>
                    </div>
                    <div className={`p-8 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                      <h3 className="font-bold text-xl mb-4">Video Tutorials</h3>
                      <p className="opacity-70 text-sm mb-6">Watch step-by-step videos on how to get the best results from our AI.</p>
                      <button className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        Watch Now <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`p-10 rounded-3xl ${isDarkMode ? 'bg-[#111827]' : 'bg-white shadow-sm'}`}>
                    <h3 className="font-bold text-2xl mb-8">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                      {[
                        "How many voices can I clone?",
                        "What is the maximum script length?",
                        "Can I use the audio for commercial purposes?",
                        "How do I integrate the API into my app?"
                      ].map((q, i) => (
                        <div key={i} className={`pb-6 border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                          <button className="w-full flex items-center justify-between text-left font-bold hover:text-blue-500 transition-all">
                            {q}
                            <Plus size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center p-12">
                    <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                    <p className="opacity-50 mb-8">Our support team is available 24/7 for Pro Studio users.</p>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-12 py-4 rounded-3xl transition-all shadow-lg shadow-blue-500/30">
                      Contact Support
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
