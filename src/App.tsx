/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, X, User, LayoutDashboard, CreditCard, History, 
  Fingerprint, Mic, Users, Settings, HelpCircle, LogOut, 
  Sun, Moon, Search, Play, Check, Upload, Save, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type PageId = 
  | 'login' 
  | 'signup'
  | 'editor' 
  | 'profile' 
  | 'plans' 
  | 'history' 
  | 'character-ids' 
  | 'clone' 
  | 'character-select' 
  | 'api-settings' 
  | 'help' 
  | 'logout';

interface Character {
  id: string;
  name: string;
  role: string;
  image: string;
}

const CHARACTERS: Character[] = [
  { id: '1', name: 'James', role: 'Narrator', image: 'https://picsum.photos/seed/james/100/100' },
  { id: '2', name: 'Sarah', role: 'Commercial', image: 'https://picsum.photos/seed/sarah/100/100' },
  { id: '3', name: 'Marcus', role: 'Deep Voice', image: 'https://picsum.photos/seed/marcus/100/100' },
  { id: '4', name: 'Elena', role: 'Soft & Calm', image: 'https://picsum.photos/seed/elena/100/100' },
  { id: '5', name: 'David', role: 'News Anchor', image: 'https://picsum.photos/seed/david/100/100' },
  { id: '6', name: 'Sophia', role: 'Storyteller', image: 'https://picsum.photos/seed/sophia/100/100' },
  { id: '7', name: 'Robert', role: 'Corporate', image: 'https://picsum.photos/seed/robert/100/100' },
  { id: '8', name: 'Lily', role: 'Youthful', image: 'https://picsum.photos/seed/lily/100/100' },
  { id: '9', name: 'Arthur', role: 'Vintage', image: 'https://picsum.photos/seed/arthur/100/100' },
  { id: '10', name: 'Grace', role: 'Inspirational', image: 'https://picsum.photos/seed/grace/100/100' },
];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('login');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([CHARACTERS[0]]);
  const [editorMode, setEditorMode] = useState<'simple' | 'film'>('simple');
  
  // API Settings State
  const [apiSettings, setApiSettings] = useState({
    falKey: import.meta.env.VITE_FAL_KEY || '',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL || '',
    supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
  });


  useEffect(() => {
    const saved = localStorage.getItem('vocalclone_api_settings');
    if (saved) {
      setApiSettings(JSON.parse(saved));
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light');
  };

  const navigate = (page: PageId) => {
    if (page === 'logout') {
      setActivePage('login');
    } else {
      setActivePage(page);
    }
    setIsSidebarOpen(false);
  };

  const toggleCharacterSelection = (char: Character) => {
    setSelectedCharacters(prev => {
      const isSelected = prev.find(c => c.id === char.id);
      if (isSelected) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter(c => c.id !== char.id);
      } else {
        if (prev.length >= 10) return prev; // Limit to 10
        return [...prev, char];
      }
    });
  };

  const autoDetectCharacters = (text: string) => {
    const lines = text.split('\n');
    const detectedNames = new Set<string>();
    
    lines.forEach(line => {
      const match = line.match(/^(\w+):/);
      if (match) {
        detectedNames.add(match[1].toLowerCase());
      }
    });

    const matchedChars = CHARACTERS.filter(char => 
      detectedNames.has(char.name.toLowerCase())
    );

    if (matchedChars.length > 0) {
      setSelectedCharacters(matchedChars.slice(0, 10));
    }
  };

  const saveApiSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vocalclone_api_settings', JSON.stringify(apiSettings));
    alert('Settings saved to LocalStorage!');
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: PageId, icon: any, label: string }) => (
    <button 
      onClick={() => navigate(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        activePage === id 
          ? 'bg-blue-600 text-white' 
          : 'hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-200'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  if (activePage === 'login' || activePage === 'signup') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="card w-full max-w-md p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-500 mb-2">VocalClone AI</h1>
            <p className="text-gray-400">{activePage === 'login' ? 'Pro Studio Access' : 'Create Pro Account'}</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); navigate('editor'); }} className="space-y-4">
            {activePage === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none transition-all"
                placeholder="studio@vocalclone.ai"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-700 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 mt-4"
            >
              {activePage === 'login' ? 'Enter Pro Studio' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button 
              onClick={() => navigate(activePage === 'login' ? 'signup' : 'login')}
              className="text-sm text-blue-500 hover:underline font-medium"
            >
              {activePage === 'login' ? "Don't have an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-opacity-80 backdrop-blur-md border-b border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-800 rounded-lg">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-xl tracking-tight">VocalClone <span className="text-blue-500">AI</span></h1>
        </div>
        <button onClick={toggleTheme} className="p-2 hover:bg-gray-800 rounded-lg">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0b1120] border-r border-gray-800 p-4 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8 px-2">
          <span className="font-bold text-lg">Menu</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1">
          <SidebarItem id="editor" icon={LayoutDashboard} label="Studio Editor" />
          <SidebarItem id="profile" icon={User} label="User Profile" />
          <SidebarItem id="plans" icon={CreditCard} label="Subscription Plans" />
          <SidebarItem id="history" icon={History} label="Audio History" />
          <SidebarItem id="character-ids" icon={Fingerprint} label="Character IDs" />
          <SidebarItem id="clone" icon={Mic} label="Clone My Voice" />
          <SidebarItem id="character-select" icon={Users} label="Character Select" />
          <SidebarItem id="api-settings" icon={Settings} label="API Settings" />
          <SidebarItem id="help" icon={HelpCircle} label="Help & Support" />
          <div className="pt-4 mt-4 border-t border-gray-800">
            <SidebarItem id="logout" icon={LogOut} label="Logout" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activePage === 'editor' && (
            <motion.div 
              key="editor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Studio Editor</h2>
                <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800">
                  <button 
                    onClick={() => setEditorMode('simple')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editorMode === 'simple' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}
                  >
                    Simple Mode
                  </button>
                  <button 
                    onClick={() => setEditorMode('film')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${editorMode === 'film' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400'}`}
                  >
                    Film (20 min)
                  </button>
                </div>
              </div>

              <div className="card p-6 rounded-2xl space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Selected Voices ({selectedCharacters.length}/10)</p>
                    <button onClick={() => navigate('character-select')} className="text-blue-500 font-medium text-sm hover:underline">Manage Characters</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCharacters.map(char => (
                      <div key={char.id} className="flex items-center gap-2 p-2 bg-gray-900/50 rounded-xl border border-gray-800">
                        <img src={char.image} alt="" className="w-8 h-8 rounded-full object-cover border border-blue-500" />
                        <span className="text-sm font-bold">{char.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedCharacters.length > 1 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400 italic">Multi-Voice Studio: Assign script parts to each character below.</p>
                        <button 
                          onClick={() => {
                            const allText = selectedCharacters.map(c => `${c.name}: ...`).join('\n');
                            autoDetectCharacters(allText); // This is just a placeholder, real logic would be on a main textarea
                          }}
                          className="hidden"
                        />
                      </div>
                      {selectedCharacters.map((char, idx) => (
                        <div key={char.id} className="space-y-2 p-4 bg-gray-900/30 rounded-xl border border-gray-800/50">
                          <div className="flex items-center gap-2">
                            <img src={char.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                            <span className="text-sm font-bold text-blue-400">{char.name}'s Part</span>
                          </div>
                          <textarea 
                            className="w-full h-24 p-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none resize-none transition-all text-sm"
                            placeholder={`Enter script for ${char.name}...`}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-400">Script Content</label>
                        <button 
                          onClick={() => {
                            const textarea = document.getElementById('main-script') as HTMLTextAreaElement;
                            if (textarea) autoDetectCharacters(textarea.value);
                          }}
                          className="text-xs font-bold text-blue-500 flex items-center gap-1 hover:underline"
                        >
                          <Search size={12} /> Auto-Detect Characters
                        </button>
                      </div>
                      <textarea 
                        id="main-script"
                        className="w-full h-48 p-4 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none resize-none transition-all"
                        placeholder="Example: James: Hello there! Sarah: Hi James, how are you?"
                      />
                    </div>
                  )}
                </div>

                <button className="w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                  <Play size={20} fill="currentColor" />
                  {selectedCharacters.length > 1 
                    ? `Generate ${selectedCharacters.length} Voices` 
                    : (editorMode === 'simple' ? 'Generate Audio' : 'Generate Film Voiceover')}
                </button>
              </div>
            </motion.div>
          )}

          {activePage === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">User Profile</h2>
              <div className="card p-8 rounded-2xl text-center space-y-6">
                <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500">
                  <User size={48} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Pro Studio Member</h3>
                  <p className="text-gray-400">qaiskhan8002@gmail.com</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                    <p className="font-medium">03102089259</p>
                  </div>
                  <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                    <p className="text-xs text-gray-500 uppercase font-bold">Plan</p>
                    <p className="font-medium text-blue-400">Pro Active</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activePage === 'plans' && (
            <motion.div 
              key="plans"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Subscription Plans</h2>
              <div className="space-y-4">
                {[
                  { name: 'Free', price: '$0', features: ['3 Voices', '10 mins/mo', 'Standard Quality'], current: false },
                  { name: 'Pro', price: '$29', features: ['Unlimited Voices', '500 mins/mo', 'Ultra HD Quality', 'Voice Cloning'], current: true },
                  { name: 'Enterprise', price: '$199', features: ['API Access', 'Unlimited Mins', 'Dedicated Support', 'Custom Models'], current: false },
                ].map((plan) => (
                  <div key={plan.name} className={`card p-6 rounded-2xl border-2 ${plan.current ? 'border-blue-500' : 'border-gray-800'}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-2xl font-black mt-1">{plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
                      </div>
                      {plan.current && <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-bold">CURRENT PLAN</span>}
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                          <Check size={14} className="text-green-500" /> {f}
                        </li>
                      ))}
                    </ul>
                    <button className={`w-full py-3 rounded-xl font-bold ${plan.current ? 'bg-gray-800 text-gray-400 cursor-not-allowed' : 'btn-primary'}`}>
                      {plan.current ? 'Active' : 'Upgrade Now'}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'history' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold">Audio History</h2>
              <div className="space-y-3">
                {[
                  { name: 'Intro.mp3', date: '2024-03-20', mode: 'SIMPLE' },
                  { name: 'Podcast_Ep1.mp3', date: '2024-03-18', mode: 'FILM' },
                  { name: 'Ad_Campaign.wav', date: '2024-03-15', mode: 'SIMPLE' },
                  { name: 'Narrative_Story.mp3', date: '2024-03-10', mode: 'FILM' },
                ].map((item, i) => (
                  <div key={i} className="card p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                        <Play size={16} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.mode === 'SIMPLE' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500'}`}>
                      {item.mode}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activePage === 'character-ids' && (
            <motion.div key="ids" className="space-y-6">
              <h2 className="text-2xl font-bold">Character IDs</h2>
              <div className="card p-6 rounded-2xl space-y-4">
                <p className="text-gray-400 text-sm">Manage your custom voice identifiers for API integrations.</p>
                <div className="space-y-3">
                  {[
                    { name: 'Custom_James_V2', id: 'vc_8829_x92' },
                    { name: 'Marketing_Sarah', id: 'vc_1102_a31' }
                  ].map(id => (
                    <div key={id.id} className="p-4 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
                      <div>
                        <p className="font-bold">{id.name}</p>
                        <code className="text-xs text-blue-400">{id.id}</code>
                      </div>
                      <button className="p-2 hover:bg-gray-800 rounded-lg text-gray-400"><Save size={18} /></button>
                    </div>
                  ))}
                </div>
                <button className="w-full py-3 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 font-medium hover:border-blue-500 hover:text-blue-500 transition-all">
                  + Add New ID
                </button>
              </div>
            </motion.div>
          )}

          {activePage === 'clone' && (
            <motion.div key="clone" className="space-y-6">
              <h2 className="text-2xl font-bold">Clone My Voice</h2>
              <div className="card p-8 rounded-2xl text-center border-2 border-dashed border-blue-500/30 bg-blue-500/5">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload size={32} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Audio Samples</h3>
                <p className="text-gray-400 text-sm mb-6">Provide at least 60 seconds of clear audio for the best cloning results.</p>
                <input type="file" className="hidden" id="audio-upload" />
                <label htmlFor="audio-upload" className="btn-primary px-8 py-3 rounded-xl font-bold cursor-pointer inline-block">
                  Select Files
                </label>
              </div>
              <div className="card p-6 rounded-2xl">
                <h4 className="font-bold mb-4">Requirements</h4>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> No background noise or music</li>
                  <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> Consistent tone and pace</li>
                  <li className="flex gap-2"><Check size={16} className="text-green-500 shrink-0" /> High quality WAV or MP3 format</li>
                </ul>
              </div>
            </motion.div>
          )}

          {activePage === 'character-select' && (
            <motion.div key="select" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Select Characters</h2>
                  <p className="text-sm text-gray-400">Select 1 to 10 characters for multi-voice generation.</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {CHARACTERS.map((char) => {
                  const isSelected = selectedCharacters.find(c => c.id === char.id);
                  return (
                    <button 
                      key={char.id}
                      onClick={() => toggleCharacterSelection(char)}
                      className={`card p-4 rounded-2xl text-left transition-all hover:scale-[1.02] active:scale-95 relative ${isSelected ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1 z-10">
                          <Check size={12} />
                        </div>
                      )}
                      <img src={char.image} alt="" className="w-full aspect-square rounded-xl object-cover mb-3" />
                      <p className="font-bold">{char.name}</p>
                      <p className="text-xs text-gray-500">{char.role}</p>
                    </button>
                  );
                })}
              </div>
              <div className="sticky bottom-4">
                <button 
                  onClick={() => navigate('editor')}
                  className="w-full btn-primary py-4 rounded-xl font-bold text-lg shadow-xl"
                >
                  Confirm Selection ({selectedCharacters.length})
                </button>
              </div>
            </motion.div>
          )}

          {activePage === 'api-settings' && (
            <motion.div key="api" className="space-y-6">
              <h2 className="text-2xl font-bold">API Settings</h2>
              <form onSubmit={saveApiSettings} className="card p-6 rounded-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">Fal API Key</label>
                  <input 
                    type="password" 
                    value={apiSettings.falKey}
                    onChange={(e) => setApiSettings({...apiSettings, falKey: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                    placeholder="fal_..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">Supabase URL</label>
                  <input 
                    type="text" 
                    value={apiSettings.supabaseUrl}
                    onChange={(e) => setApiSettings({...apiSettings, supabaseUrl: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                    placeholder="https://xyz.supabase.co"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-400">Supabase Key</label>
                  <input 
                    type="password" 
                    value={apiSettings.supabaseKey}
                    onChange={(e) => setApiSettings({...apiSettings, supabaseKey: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-blue-500 outline-none"
                    placeholder="eyJ..."
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2">
                  <Save size={20} /> Save Settings
                </button>
              </form>
            </motion.div>
          )}

          {activePage === 'help' && (
            <motion.div key="help" className="space-y-6">
              <h2 className="text-2xl font-bold">Help & Support</h2>
              <div className="space-y-4">
                {[
                  { q: 'How do I clone my voice?', a: 'Go to "Clone My Voice" page, upload your samples, and wait for processing.' },
                  { q: 'What is Film Mode?', a: 'Film mode allows for longer scripts up to 20 minutes with cinematic pacing.' },
                  { q: 'Can I use the API?', a: 'Yes, API access is available for Pro and Enterprise plans.' }
                ].map((faq, i) => (
                  <div key={i} className="card p-5 rounded-xl">
                    <p className="font-bold mb-2 flex items-center gap-2 text-blue-400">
                      <HelpCircle size={16} /> {faq.q}
                    </p>
                    <p className="text-sm text-gray-400">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="card p-6 rounded-2xl bg-blue-500/5 border-blue-500/20">
                <h4 className="font-bold mb-2">Still need help?</h4>
                <p className="text-sm text-gray-400 mb-4">Our support team is available 24/7 for Pro members.</p>
                <button className="text-blue-500 font-bold flex items-center gap-2">
                  Contact Support <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
