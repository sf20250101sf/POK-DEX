import React, { useState, useEffect, useRef } from "react";
import { 
  Fingerprint, 
  User, 
  Key, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  Bell, 
  History, 
  Shield, 
  Map, 
  Grid, 
  Star, 
  Settings, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Lock, 
  Wifi, 
  Zap, 
  Heart, 
  Dna, 
  Clock, 
  Maximize2, 
  Filter, 
  CornerDownRight, 
  Code,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { initialPokemonDatabase, mockNearbyWildList } from "./data";
import { Pokemon, Trainer } from "./types";
import { useAuth } from "./hooks/useAuth";
import LoginScreen from "./components/LoginScreen";

export default function App() {
  const auth = useAuth();

  // --- INITIAL STATES ---
  const [trainer, setTrainer] = useState<Trainer>(() => {
    const saved = localStorage.getItem("trainer_data");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      trainerId: "8829-01",
      accessKey: "kanto_pass",
      name: "S. Redfield",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB48w5EsP4vozUZbvFg_qsMXdbeEJJntgjLDK0kUNK6i9t0ycBZiSkKRxf93_lb7nBhNBxwIRa6vRnm66w961WIZuuekqLmAgtjmb65tbKzNHrVeSqyyXctCemfvD-prkWGy63Ao7m-ha6MPnD1uCfkmHh9Yhvez7gCuA5gT7UwpqIXcoO5-GLZeC6CVoS5G18jrbKyL6xCRmkJPozWV0so8KDEJAUjlVyuOWHbXpj8dd7a0V7jBZfJ6llSl0u_B9ecWaD1wZOKdJw",
      isAwaitingVerification: false,
      systemLogs: [
        "SYSTEM ACCESS INITIALIZED // SECURITY STACK SECURE",
        "CONNECTING TO KANTO-PRIMARY SATELLITE NODE...",
        "DECRYPTING STANDARD DEX DATABASE PROTOCOLS v2.0.4...",
        "AWAITING BIOMETRIC TRANS-RESPONSE..."
      ],
      uptimeSeconds: 142201
    };
  });

  const [pokemonDB, setPokemonDB] = useState<Pokemon[]>(() => {
    const saved = localStorage.getItem("pokemon_db");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialPokemonDatabase;
  });

  const [activeTab, setActiveTab] = useState<"regions" | "types" | "favorites" | "settings">("regions");
  const [selectedRegion, setSelectedRegion] = useState<"Kanto" | "Johto" | "Hoenn">("Kanto");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom states
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isShinyDetailMode, setIsShinyDetailMode] = useState(false);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [showLogsPopup, setShowLogsPopup] = useState(false);
  const [showBellNotifications, setShowBellNotifications] = useState(false);
  
  // System Help overlay
  const [showHelpOverlay, setShowHelpOverlay] = useState(false);

  // Capture engine simulator
  const [isCaptureModalOpen, setIsCaptureModalOpen] = useState(false);
  const [capturePhase, setCapturePhase] = useState<"scan" | "acquire" | "attempt" | "success" | "fail">("scan");
  const [scannedPokemon, setScannedPokemon] = useState<Partial<Pokemon> | null>(null);
  const [captureProgress, setCaptureProgress] = useState(0);
  const [captureLogs, setCaptureLogs] = useState<string[]>([]);
  const [stabilizerValue, setStabilizerValue] = useState(50);
  const [capturedCountThisSession, setCapturedCountThisSession] = useState(0);

  // Notifications bell mock list
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Satellite handshake secure. Signal latency: 14ms.", read: false },
    { id: 2, text: "Rare Mewtwo #0150 telemetry successfully localized.", read: false },
    { id: 3, text: "Database sync complete. 10 files synchronized.", read: false }
  ]);

  // References and intervals
  const voiceSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem("trainer_data", JSON.stringify(trainer));
  }, [trainer]);

  useEffect(() => {
    localStorage.setItem("pokemon_db", JSON.stringify(pokemonDB));
  }, [pokemonDB]);

  // Uptime mock counter
  useEffect(() => {
    if (!auth.isAuthenticated) return;
    const timer = setInterval(() => {
      setTrainer(prev => ({
        ...prev,
        uptimeSeconds: prev.uptimeSeconds + 1
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, [auth.isAuthenticated]);

  // System Logs stream generator
  useEffect(() => {
    if (!auth.isAuthenticated) return;
    const items = [
      "Synchronizing satellite geo-positioning telemetry...",
      "Monitoring biological radiation markers in sector VII...",
      "Decrypting biometric access parameters...",
      "Kanto research node ping successful. Uptime secure.",
      "Warning: High gravitational density waves detected near Hoenn skybox.",
      "Scanning regional atmospheric indices for wild anomalies...",
      "Encrypted packet sync: Mewtwo stasis tube temperature nominal."
    ];
    const logTimer = setInterval(() => {
      const idx = Math.floor(Math.random() * items.length);
      setTrainer(prev => {
        const updatedLogs = [...prev.systemLogs, `[${new Date().toLocaleTimeString()}] ${items[idx]}`];
        // keep last 20
        return {
          ...prev,
          systemLogs: updatedLogs.slice(-20)
        };
      });
    }, 15000);
    return () => clearInterval(logTimer);
  }, [auth.isAuthenticated]);

  // Sync auth user identity to trainer runtime state
  useEffect(() => {
    if (auth.currentUser) {
      setTrainer(prev => {
        if (prev.trainerId === auth.currentUser!.trainerId &&
            prev.name === auth.currentUser!.name &&
            prev.avatarUrl === auth.currentUser!.avatarUrl &&
            prev.accessKey === auth.currentUser!.accessKey) {
          return prev;
        }
        return {
          ...prev,
          trainerId: auth.currentUser!.trainerId,
          accessKey: auth.currentUser!.accessKey,
          name: auth.currentUser!.name,
          avatarUrl: auth.currentUser!.avatarUrl
        };
      });
    }
  }, [auth.currentUser]);

  // Sync trainer identity changes back to auth store
  useEffect(() => {
    if (auth.isAuthenticated) {
      auth.updateUser({
        trainerId: trainer.trainerId,
        name: trainer.name,
        avatarUrl: trainer.avatarUrl
      });
    }
  }, [trainer.trainerId, trainer.name, trainer.avatarUrl]);

  // Format uptime (HH:MM:SS format)
  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Sound Assist / Web Speech Synthesis Description Reader
  const handleSpeakDescription = (text: string) => {
    if (isVoiceMuted) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 0.85;
      utterance.volume = 0.75;
      voiceSynthesisRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error or unsupported", e);
    }
  };

  // Captured count
  const totalCapturedCount = pokemonDB.filter(p => p.isCaptured).length;

  // --- CAPTURE SIMULATOR FLOW ---
  const triggerCaptureEncounter = () => {
    setIsCaptureModalOpen(true);
    setCapturePhase("scan");
    setCaptureProgress(0);
    setCaptureLogs([
      "INITIALIZING SCANNER TELEMETRY SECTOR XIV...",
      "BROADCASTING SUB-GRAVITY PHEROMONE SIGNALS...",
      "LISTENING TO ELECTROMAGNETIC GRID NOISE..."
    ]);

    // Timer scanning
    let scanProgress = 0;
    const interval = setInterval(() => {
      scanProgress += 20;
      if (scanProgress >= 100) {
        clearInterval(interval);
        const randomTarget = mockNearbyWildList[Math.floor(Math.random() * mockNearbyWildList.length)];
        setScannedPokemon(randomTarget);
        setCapturePhase("acquire");
        setCaptureLogs(prev => [
          ...prev,
          `TARGET ACQUIRED: Wild ${randomTarget.name} - Sign ${randomTarget.indexStr}`,
          `ATMOSPHERIC DEVIATION: Nominal`,
          `DEPLOYING CAPTURE DECK...`
        ]);
      }
    }, 400);
  };

  // Capture attempts
  const executeCaptureBeam = () => {
    if (!scannedPokemon) return;
    setCapturePhase("attempt");
    setCaptureProgress(0);
    setCaptureLogs(prev => [
      ...prev,
      "DEPLOYING CYBERNETIC CAPTURE CONTAINER...",
      "STABILIZING QUANTUM FORCEFIELDS...",
      `ALIGNING SUB-SPACE FREQUENCY AT LEVEL: ${stabilizerValue}%`
    ]);

    let attemptProgress = 0;
    const interval = setInterval(() => {
      attemptProgress += 25;
      setCaptureProgress(attemptProgress);
      if (attemptProgress >= 100) {
        clearInterval(interval);
        
        // Stabilizer value alignment calculations (sweet spot between 40 and 80)
        const isOptimal = stabilizerValue >= 35 && stabilizerValue <= 85;
        const rollRate = Math.random() * 100;
        const captureSuccessProbability = isOptimal ? 85 : 45;
        
        const isSuccess = rollRate <= captureSuccessProbability;

        if (isSuccess) {
          setCapturePhase("success");
          setCapturedCountThisSession(prev => prev + 1);
          setCaptureLogs(prev => [
            ...prev,
            "COUPLING RATIO: 100% MAXIMUM CAPTURED NOMINAL!",
            `SUCCESS // REGISTERING ${scannedPokemon.name} IN DATACARDS.`
          ]);

          // Save Pokemon database matching scanned target
          setPokemonDB(prevDB => {
            const index = prevDB.findIndex(p => p.id === scannedPokemon.id);
            if (index !== -1) {
              const updated = [...prevDB];
              updated[index] = {
                ...updated[index],
                isCaptured: true,
                capturedAt: new Date().toLocaleDateString()
              };
              return updated;
            } else {
              // Create brand new Entry for database if captured customized
              const customNew: Pokemon = {
                id: scannedPokemon.id ?? Math.floor(Math.random()*1000 + 400),
                indexStr: scannedPokemon.indexStr ?? "#0999",
                name: scannedPokemon.name ?? "WILD_UNKNOWN",
                types: scannedPokemon.types ?? ["Normal"],
                stats: scannedPokemon.stats ?? {
                  hp: 80, attack: 80, defense: 80, spAtk: 80, speed: 80, total: 480
                },
                description: scannedPokemon.description ?? "Newly localized wild asset tracked by system access.",
                imageUrl: scannedPokemon.imageUrl ?? "https://lh3.googleusercontent.com/aida-public/AB6AXuCNNLFpiHKdJS1IHC8UDiytWaGEJTiLEspdh9EIDqUHr6Js2QktBInzs5m5vAMmUPN_7yq2K2VoK46WkGwy5b8EoW5AgqtZ4cBN0Z4Rysqk785xVYbW5gxMK9zL08WHhy_vJBqFcmgM5HBDdHyq73577hO3MTPQOxsLYVU5w9asSKob6a8JQvGnTFUKaNc4t5zgRbegqIjUAoDmwR3MmYszJMeDY9T4-cYFpEKyPUmcveElvhS7wcmVK3UYG36RpG0l7HMqgTX0fOU",
                isLegendary: scannedPokemon.name?.includes("MEWTWO") || scannedPokemon.name?.includes("CELEBI") || scannedPokemon.name?.includes("HO-OH") || scannedPokemon.name?.includes("KYOGRE") ? true : false,
                height: scannedPokemon.height ?? "1.0m",
                weight: scannedPokemon.weight ?? "30kg",
                abilities: scannedPokemon.abilities ?? ["None"],
                evolutionaryChain: [
                  { name: scannedPokemon.name ?? "WILD_UNKNOWN", stage: 1, isCurrent: true }
                ],
                region: scannedPokemon.region as "Kanto" | "Johto" | "Hoenn" ?? "Kanto",
                isCaptured: true,
                capturedAt: new Date().toLocaleDateString()
              };
              return [...prevDB, customNew];
            }
          });

          // Add customized local notification
          setNotifications(prev => [
            { id: Date.now(), text: `Telemetry: Successfully integrated ${scannedPokemon.name} into database!`, read: false },
            ...prev
          ]);
        } else {
          setCapturePhase("fail");
          setCaptureLogs(prev => [
            ...prev,
            "CONTAINER DEPOLARIZED // GRAVITY CORE LEAKED.",
            `DEFIANT TARGET BREAKOUT: ${scannedPokemon.name} escaped planetary grids.`
          ]);
        }
      }
    }, 450);
  };

  // Filter logic pokemon cards matching search queries and active selections
  const filteredPokemonList = pokemonDB.filter(p => {
    // Region tab filter
    if (activeTab === "regions" && p.region !== selectedRegion) return false;
    
    // Type filter
    if (selectedTypeFilter !== "ALL") {
      const matchType = p.types.some(t => t.toUpperCase() === selectedTypeFilter.toUpperCase());
      if (!matchType) return false;
    }

    // Search input query match
    if (searchQuery.trim()) {
      const matchName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIndex = p.indexStr.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTypeTag = p.types.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      if (!matchName && !matchIndex && !matchTypeTag) return false;
    }

    return true;
  });

  // Filter shiny pokemon listing
  const shinyFavoritesList = pokemonDB.filter(p => {
    if (!p.isFavorite) return false;
    if (searchQuery.trim()) {
      const matchName = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchName) return false;
    }
    return true;
  });

  // Toggle favorite pokecard
  const handleToggleFavorite = (pokemonId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPokemonDB(prev => prev.map(p => {
      if (p.id === pokemonId) {
        return { ...p, isFavorite: !p.isFavorite };
      }
      return p;
    }));
  };

  // Simple type category definitions
  const typeCounts = pokemonDB.reduce((acc, curr) => {
    curr.types.forEach(type => {
      const key = type.toUpperCase();
      acc[key] = (acc[key] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const typeThemes: Record<string, string> = {
    FIRE: "bg-red-950/40 text-red-400 border border-red-800/50 hover:bg-red-900/40",
    WATER: "bg-blue-950/40 text-blue-400 border border-blue-800/50 hover:bg-blue-900/40",
    GRASS: "bg-green-950/40 text-green-400 border border-green-800/50 hover:bg-green-900/40",
    ELECTRIC: "bg-yellow-950/40 text-yellow-300 border border-yellow-800/50 hover:bg-yellow-900/40",
    PSYCHIC: "bg-purple-950/40 text-purple-400 border border-purple-800/50 hover:bg-purple-900/40",
    GHOST: "bg-indigo-950/40 text-indigo-400 border border-indigo-800/50 hover:bg-indigo-900/40",
    POISON: "bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/40",
    DRAGON: "bg-orange-950/40 text-orange-400 border border-orange-850/50 hover:bg-orange-900/40",
    STEEL: "bg-slate-950/40 text-slate-400 border border-slate-800/50 hover:bg-slate-900/40",
    FLYING: "bg-sky-950/40 text-sky-400 border border-sky-800/50 hover:bg-sky-900/40",
    NORMAL: "bg-stone-900/40 text-stone-300 border border-stone-800/50 hover:bg-stone-800/40"
  };

  // Triggering text-to-speech description whenever details opens
  useEffect(() => {
    if (selectedPokemon) {
      handleSpeakDescription(`${selectedPokemon.name}. ${selectedPokemon.description}`);
    } else {
      try { window.speechSynthesis.cancel(); } catch(e) {}
    }
  }, [selectedPokemon, isVoiceMuted]);

  return (
    <div className="bg-background text-on-background font-sans overflow-x-hidden min-h-screen w-screen flex flex-col relative grid-bg selection:bg-primary-container selection:text-white">
      
      {/* BACKGROUND GRAPHIC WORLD MAP OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] brightness-[0.45] mix-blend-screen bg-cover bg-center"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbCUwy4VnhVl74yeZJmIHZ_e-Hv42_S7Za1LxcFUDV-I2OQhox7LJUVcQ_F_3TOn6cfh2mjaGOByry6nb19_36-6c8EVwnhqAq-e0x1FerMu8J-2JvrmsBtRXy4ED5jUYwk6VlRPM-2KeJ5sHCUtgbD7pUTc4r7wDk4IyLUvC9-epnV5ff18_eWC78DoPh8IN9ppiaXU3dgPzniRTC-fYg0I77tRNS903qRtD-GL9VsuGFQhBBBoK1Q1-SGHGtHBMsXUmcSJUc-zk')` }}
      />

      {/* AUTHENTICATION GATE */}
      <AnimatePresence mode="wait">
        {!auth.isAuthenticated ? (
          <LoginScreen 
            key="login-screen"
            onValidate={auth.validate}
            onLogin={auth.login}
            onRegister={auth.register}
            defaultCredentials={{ id: '8829-01', key: 'kanto_pass' }}
          />
        ) : (
          
          /* ========================================================
             AUTHENTICATED POKEDEX ENGINE - SCREENS 2, 3, 4
             ======================================================== */
          <motion.div 
            key="pokedex-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col z-10 w-full"
          >
            {/* Top Navigation Bar Component (Mock Screen 2 Setup) */}
            <header className="flex justify-between items-center w-full px-4 md:px-10 py-5 sticky top-0 z-40 bg-background/60 backdrop-blur-md border-b border-white/10 shadow-lg">
              <div className="flex items-center gap-10">
                <span className="font-display font-black text-2xl tracking-tighter text-primary-container cursor-pointer" onClick={() => { setActiveTab("regions"); setSelectedTypeFilter("ALL"); }}>
                  POKÉDEX-OS
                </span>
                
                {/* Custom Region Switch tabs */}
                {activeTab === "regions" && (
                  <nav className="hidden md:flex items-center gap-8">
                    {(["Kanto", "Johto", "Hoenn"] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setSelectedRegion(r)}
                        className={`text-sm font-mono tracking-widest uppercase transition-all border-b-2 pb-1 bg-transparent border-none cursor-pointer ${selectedRegion === r ? "text-primary-container font-black border-primary-container" : "text-outline/70 border-transparent hover:text-white"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </nav>
                )}
              </div>

              {/* Central search, notifications & avatar actions block */}
              <div className="flex items-center gap-6">
                {/* Search archives widget */}
                <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-white/5 group focus-within:border-primary-container/50 transition-all">
                  <Search size={16} className="text-outline mr-2" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="SCAN DATABASE..."
                    className="bg-transparent border-none focus:outline-none focus:ring-0 text-xs font-mono text-on-background w-44 placeholder:text-outline/40 uppercase"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="text-stone-500 hover:text-white bg-transparent border-none ml-1">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Voice Assist indicator feedback */}
                  <button 
                    onClick={() => setIsVoiceMuted(!isVoiceMuted)}
                    className={`p-1.5 rounded transition-all bg-transparent border-none cursor-pointer ${isVoiceMuted ? "text-red-500 hover:text-red-400" : "text-cyan-400 hover:text-cyan-300"}`}
                    title={isVoiceMuted ? "Unmute Voice telemetry" : "Mute Voice telemetry"}
                  >
                    {!isVoiceMuted ? <Volume2 size={18} className="animate-bounce" /> : <VolumeX size={18} />}
                  </button>

                  {/* Alarm system logs popover trigger */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowBellNotifications(!showBellNotifications)}
                      className="p-1.5 text-on-surface-variant hover:text-primary-container transition-all relative bg-transparent border-none cursor-pointer"
                    >
                      <Bell size={18} />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-primary-container rounded-full animate-ping"></span>
                      )}
                    </button>
                    {showBellNotifications && (
                      <div className="absolute right-0 mt-3 w-72 glass-panel p-4 rounded-lg shadow-2xl z-50 text-xs font-mono border border-white/10">
                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/10 uppercase tracking-widest text-[#ffb4a4]">
                          <span>Signal System Telemetry</span>
                          <button onClick={() => setShowBellNotifications(false)} className="text-stone-500 hover:text-white bg-transparent border-none">
                            <X size={12} />
                          </button>
                        </div>
                        <ul className="space-y-2.5">
                          {notifications.map((n) => (
                            <li key={n.id} className="text-[11px] opacity-80 border-b border-stone-800/40 pb-1 flex gap-2">
                              <span className="text-[#00dbe7] shrink-0">◇</span>
                              <span>{n.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Capture Button trigger */}
                  <button 
                    onClick={triggerCaptureEncounter}
                    className="bg-primary-container text-on-primary-container font-mono text-xs font-black px-5 py-2.5 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,86,50,0.3)] select-none uppercase tracking-wider rounded border-none cursor-pointer"
                  >
                    Capture
                  </button>

                  {/* Profile Picture card with quick summary breakdown dropdown */}
                  <div className="relative group/avatar">
                    <div className="w-9 h-9 rounded-full border border-primary-container overflow-hidden cursor-pointer shadow-[0_0_8px_rgba(255,86,50,0.3)]">
                      <img src={trainer.avatarUrl} className="w-full h-full object-cover" alt="trainer portrait" />
                    </div>
                    {/* Hover Card info popup */}
                    <div className="absolute right-0 mt-2.5 w-64 glass-card p-4 rounded-lg border border-white/10 opacity-0 pointer-events-none group-hover/avatar:opacity-100 group-hover/avatar:pointer-events-auto transition-all duration-300 z-50 shadow-2xl font-mono text-xs">
                      <div className="flex items-center gap-3 mb-3 border-b border-white/5 pb-3">
                        <img src={trainer.avatarUrl} className="w-10 h-10 rounded-full border border-primary/40 object-cover" alt="trainer portrait" />
                        <div>
                          <p className="text-white font-bold">{trainer.name}</p>
                          <span className="text-[10px] text-primary/70">CLASS: DECK_OFFICER</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-[11px] text-on-surface-variant/80">
                        <p>ID_SECURE: {trainer.trainerId}</p>
                        <p>STREAK: 42 SECONDS</p>
                        <p>DEX_INTEG: {totalCapturedCount} / {pokemonDB.length} COMPLETED</p>
                        <p>BIOMETRICS: LOCKED</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Application Segment Split - Left Nav Sidebar, Right Content */}
            <div className="flex-1 flex max-w-full">
              
              {/* SIDEBAR NAVIGATION - RESPONSIVE (MOCK SCREEN 2) */}
              <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-surface-container-low/80 backdrop-blur-lg z-20">
                
                {/* Active Trainer status badge */}
                <div className="p-6 border-b border-white/5">
                  <h2 className="font-display text-lg font-black tracking-tighter text-primary-container">DEX-COM V.2</h2>
                  <p className="font-mono text-xs text-outline/70">ID: {trainer.trainerId}</p>
                </div>

                {/* Main Link Menus */}
                <nav className="flex-1 py-4 space-y-1.5 select-none font-mono">
                  <button 
                    onClick={() => { setActiveTab("regions"); setSelectedTypeFilter("ALL"); }}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left border-none cursor-pointer bg-transparent transition-all duration-150 ${activeTab === "regions" ? "text-primary-container border-r-2 border-primary-container bg-primary-container/10 font-bold" : "text-on-surface-variant hover:bg-white/5"}`}
                  >
                    <Map size={18} className={activeTab === "regions" ? "text-primary-container" : "text-stone-500"} />
                    <span>Regions</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("types")}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left border-none cursor-pointer bg-transparent transition-all duration-150 ${activeTab === "types" ? "text-primary-container border-r-2 border-primary-container bg-primary-container/10 font-bold" : "text-on-surface-variant hover:bg-white/5"}`}
                  >
                    <Grid size={18} className={activeTab === "types" ? "text-primary-container" : "text-stone-500"} />
                    <span>Types</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("favorites")}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left border-none cursor-pointer bg-transparent transition-all duration-150 ${activeTab === "favorites" ? "text-primary-container border-r-2 border-primary-container bg-primary-container/10 font-bold" : "text-on-surface-variant hover:bg-white/5"}`}
                  >
                    <Star size={18} className={activeTab === "favorites" ? "text-primary-container" : "text-stone-500"} />
                    <span>Favorites</span>
                  </button>

                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`w-full flex items-center gap-4 px-6 py-4 text-left border-none cursor-pointer bg-transparent transition-all duration-150 ${activeTab === "settings" ? "text-primary-container border-r-2 border-primary-container bg-primary-container/10 font-bold" : "text-on-surface-variant hover:bg-white/5"}`}
                  >
                    <Settings size={18} className={activeTab === "settings" ? "text-primary-container" : "text-stone-500"} />
                    <span>Settings</span>
                  </button>
                </nav>

                {/* Sidebar manual scan helper trigger */}
                <div className="p-4 border-t border-white/5 space-y-4">
                  <button 
                    onClick={triggerCaptureEncounter}
                    className="w-full bg-primary-container/15 border border-primary-container/30 text-primary-container font-mono text-xs font-black py-3 tracking-widest hover:bg-primary-container/25 transition-all outline-none"
                  >
                    SCAN NEARBY
                  </button>

                  {/* Syncing coordinates logs stream panel */}
                  <div className="pt-2 border-t border-stone-850 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono opacity-60">
                      <div className="flex items-center gap-1.5">
                        <RefreshCw size={12} className="animate-spin text-tertiary" />
                        <span>Sync Status</span>
                      </div>
                      <span className="text-tertiary">ONLINE</span>
                    </div>

                    <div 
                      onClick={() => setShowHelpOverlay(true)}
                      className="flex items-center gap-1.5 text-[11px] font-mono opacity-50 hover:opacity-100 hover:text-white cursor-pointer"
                    >
                      <HelpCircle size={12} />
                      <span>Diagnostics Protocol</span>
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT AREA BODY */}
              <main className="flex-1 bg-background/50 p-6 md:p-8 flex flex-col overflow-y-auto max-w-full">
                
                {/* 1. REGIONS TAB PANEL CONTROLLING FILTERING */}
                {activeTab === "regions" && (
                  <div className="space-y-6">
                    {/* Tab Selection Filter Chips for Elements */}
                    <div className="flex flex-wrap gap-2.5 border-b border-stone-900 pb-5">
                      {["ALL", "FIRE", "WATER", "GRASS", "ELECTRIC", "PSYCHIC"].map((el) => {
                        const count = el === "ALL" 
                          ? filteredPokemonList.length 
                          : pokemonDB.filter(p => p.region === selectedRegion && p.types.some(t => t.toUpperCase() === el)).length;

                        return (
                          <button
                            key={el}
                            onClick={() => setSelectedTypeFilter(el)}
                            className={`px-5 py-2 rounded-full border text-xs font-mono font-bold tracking-widest transition-all cursor-pointer ${selectedTypeFilter === el ? "bg-primary-container text-on-primary-container border-primary-container shadow-[0_0_12px_rgba(255,86,50,0.25)]" : "bg-surface-container-high hover:border-primary-container/50 text-on-surface-variant border-white/10"}`}
                          >
                            {el} <span className="opacity-40 text-[9px] font-normal">({count})</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Responsive mobile region selector */}
                    <div className="md:hidden flex justify-between bg-stone-950 p-3.5 border border-white/10 rounded font-mono text-xs">
                      {(["Kanto", "Johto", "Hoenn"] as const).map((r) => (
                        <button 
                          key={r}
                          onClick={() => setSelectedRegion(r)}
                          className={`${selectedRegion === r ? "text-primary-container font-black" : "text-stone-500"}`}
                        >
                          {r.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Quick Summary state counter */}
                    <div className="flex justify-between items-center bg-white/5 border border-white/5 rounded-lg px-4 py-3 font-mono text-xs">
                      <span className="text-on-surface-variant">Archived entries inside {selectedRegion} nodes</span>
                      <span className="text-secondary font-bold font-display text-primary-container">
                        Captured: {pokemonDB.filter(p => p.region === selectedRegion && p.isCaptured).length} / 
                        {pokemonDB.filter(p => p.region === selectedRegion).length}
                      </span>
                    </div>

                    {/* Grid of Pokemon Species in Active Selection */}
                    {filteredPokemonList.length === 0 ? (
                      <div className="text-center py-20 bg-stone-950/20 rounded border border-dashed border-stone-800">
                        <AlertTriangle size={36} className="mx-auto text-stone-600 mb-3" />
                        <p className="font-mono text-xs text-stone-500 uppercase tracking-widest">No Database Telemetry localized for selection.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 select-none">
                        {filteredPokemonList.map((poke) => {
                          const isPokeLegendary = poke.isLegendary;
                          return (
                            <motion.div
                              key={poke.id}
                              whileHover={{ y: -6 }}
                              onClick={() => { setSelectedPokemon(poke); setIsShinyDetailMode(false); }}
                              className={`group cursor-pointer relative bg-surface-container-low rounded-xl overflow-hidden glass-panel flex flex-col transition-all duration-300 ${isPokeLegendary ? "border-2 border-primary-container/55 shadow-[0_0_15px_rgba(255,86,50,0.12)]" : "border border-white/10"}`}
                            >
                              <div className="scan-line pointer-events-none"></div>
                              
                              {/* Background colorized overlays for aesthetics */}
                              <div className="h-60 relative overflow-hidden bg-stone-900/60 p-4 shrink-0 [image-rendering:pixelated]">
                                <img 
                                  src={poke.imageUrl} 
                                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none" 
                                  alt={poke.name} 
                                />

                                {/* Interactive ID badge top left */}
                                <div className="absolute top-4 left-4 bg-stone-950/75 text-white border border-white/10 px-2.5 py-0.5 font-mono text-[10px] rounded">
                                  {poke.indexStr}
                                </div>

                                {/* Bookmark toggle favorite top right */}
                                <button
                                  type="button"
                                  onClick={(e) => handleToggleFavorite(poke.id, e)}
                                  className="absolute top-4 right-4 p-1 rounded-full bg-stone-950/70 border border-white/10 text-stone-400 hover:text-red-500 transition-colors z-30"
                                >
                                  <Heart size={14} className={poke.isFavorite ? "fill-red-500 text-red-500" : ""} />
                                </button>

                                {/* Type element badges absolute inside image block */}
                                <div className="absolute bottom-4 right-4 flex gap-1.5">
                                  {poke.types.map((t) => (
                                    <span 
                                      key={t} 
                                      className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-mono font-bold ${
                                        t.toUpperCase() === "FIRE" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                                        t.toUpperCase() === "WATER" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                                        t.toUpperCase() === "GRASS" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                                        t.toUpperCase() === "ELECTRIC" ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" :
                                        t.toUpperCase() === "PSYCHIC" ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" :
                                        "bg-neutral-800 text-neutral-300"
                                      }`}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>

                                {poke.isLegendary && (
                                  <span className="absolute bottom-4 left-4 font-mono text-[8px] bg-amber-500/20 border border-amber-500/35 text-amber-300 px-1.5 py-0.5 rounded uppercase tracking-widest animate-pulse">
                                    LEGENDARY
                                  </span>
                                )}

                                {!poke.isCaptured && (
                                  <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] flex flex-col items-center justify-center p-3 text-center">
                                    <Lock size={22} className="text-outline/65 mb-1.5 animate-pulse" />
                                    <span className="font-mono text-[10px] text-outline/80 tracking-widest uppercase">Telemetry Unacquired</span>
                                    <span className="text-[9px] text-stone-500 font-mono italic mt-1 bg-black/40 px-2 py-0.5">Capture nearby wild instance</span>
                                  </div>
                                )}
                              </div>

                              {/* Card text details block */}
                              <div className="p-4 flex-1 flex flex-col justify-between bg-stone-900/40">
                                <div>
                                  <h3 className="font-display font-black text-white group-hover:text-primary-container transition-colors uppercase tracking-tight text-base mb-1">
                                    {poke.name}
                                  </h3>
                                  <p className="font-mono text-[11px] text-on-surface-variant/70 min-h-8 line-clamp-2">
                                    {poke.description}
                                  </p>
                                </div>

                                {poke.isCaptured && (
                                  <div className="space-y-2.5 mt-4 pt-4 border-t border-white/5 font-mono text-xs">
                                    <div className="flex justify-between items-end text-neutral-400">
                                      <span className="text-[10px] text-outline uppercase tracking-wider block">ATTACK LIMITS</span>
                                      <span className="text-primary-container text-[11px] font-bold">{poke.stats.attack} / 150</span>
                                    </div>
                                    
                                    {/* Attack bar segments representation */}
                                    <div className="h-1 bg-stone-850 flex gap-0.5 rounded overflow-hidden">
                                      {Array.from({ length: 10 }).map((_, segmentIdx) => {
                                        const filledSegments = Math.round((poke.stats.attack / 150) * 10);
                                        return (
                                          <div 
                                            key={segmentIdx} 
                                            className={`h-full flex-1 transition-all duration-300 ${segmentIdx < filledSegments ? "bg-primary-container" : "bg-stone-800"}`}
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* 2. TYPES MATRIX INDEX (NEW VISUALIZATION SECTION) */}
                {activeTab === "types" && (
                  <div className="space-y-6">
                    <div className="mb-4">
                      <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded">Elemental Database Matrix</span>
                      <h2 className="font-display text-2xl text-white font-bold mt-2 uppercase tracking-tight">Types Frequency Matrix</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {Object.keys(typeThemes).map((type) => {
                        const count = typeCounts[type] || 0;
                        return (
                          <div 
                            key={type}
                            onClick={() => { setSelectedTypeFilter(type); setActiveTab("regions"); }}
                            className={`p-4 rounded-xl cursor-pointer text-center font-mono transition-all duration-150 relative overflow-hidden group ${typeThemes[type] || "bg-stone-900 border border-white/5 text-stone-300"}`}
                          >
                            <span className="font-display text-sm font-bold block mb-1 group-hover:scale-105 transition-transform">{type}</span>
                            <span className="text-white/60 font-mono text-xs">{count === 0 ? "NO DATA" : `${count} SPECIES`}</span>
                            <div className="absolute right-2 bottom-1.5 opacity-10 font-bold text-4xl group-hover:opacity-20 transition-all pointer-events-none">
                              {type.charAt(0)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-16 h-16 rounded-full bg-primary-container/20 border border-primary-container flex items-center justify-center text-primary-container shrink-0">
                        <Zap size={28} />
                      </div>
                      <div className="space-y-1 sm:text-left text-center">
                        <p className="font-mono text-sm text-white font-bold uppercase">System Integration Advisory</p>
                        <p className="font-mono text-xs text-on-surface-variant/75">
                          Selecting any element block initiates targeted database queries, allowing rapid extraction of Kanto-Johto biological matrices. Verify type resistance diagnostics before deployment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SHINY GALLERY / FAVORITES (MOCK SCREEN 4) */}
                {activeTab === "favorites" && (
                  <div className="space-y-8">
                    
                    {/* Header stats bar */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="bg-primary-container/15 text-primary-container border border-primary-container/30 px-3 py-0.5 font-mono text-[10px] tracking-widest uppercase">RARE SHINY REGISTRY</span>
                          <span className="text-tertiary font-mono text-xs">Total Captured Favorites: {pokemonDB.filter(p => p.isFavorite).length}</span>
                        </div>
                        <h2 className="font-display text-3xl font-black text-white uppercase tracking-tighter">Shiny Collection</h2>
                      </div>
                      <div className="flex gap-4 font-mono text-xs select-none">
                        <button 
                          onClick={triggerCaptureEncounter}
                          className="bg-primary/10 border border-primary/20 text-primary px-5 py-3 tracking-widest hover:bg-primary/20 hover:text-white transition-all rounded outline-none"
                        >
                          CAPTURE NEW SHINY
                        </button>
                      </div>
                    </div>

                    {/* Shiny Grid section */}
                    {shinyFavoritesList.length === 0 ? (
                      <div className="text-center py-24 glass-panel border border-dashed border-stone-850 rounded">
                        <Star size={42} className="mx-auto text-[#fff185] mb-4 animate-pulse" />
                        <p className="font-mono text-sm text-stone-300 uppercase tracking-widest mb-1">Shiny Archive is currently empty.</p>
                        <span className="font-mono text-xs text-[#ac8880] opacity-70">
                          Toggle the favorite standard species in Regions, or localize rare entities via Capture to register shiny telemetry!
                        </span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
                        {shinyFavoritesList.map((poke) => (
                          <div 
                            key={poke.id} 
                            onClick={() => { setSelectedPokemon(poke); setIsShinyDetailMode(true); }}
                            className="group cursor-pointer relative glass-card p-6 rounded-lg hover:border-primary-container/50 hover:-translate-y-1 transition-all overflow-hidden"
                          >
                            <div className="scan-line pointer-events-none"></div>

                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <span className="font-mono text-[11px] text-outline opacity-60 block">{poke.indexStr}</span>
                                <h3 className="font-display font-medium text-lg text-white tracking-tight group-hover:text-[#ffb4a4] transition-colors">{poke.name}</h3>
                                <div className="flex gap-1.5 mt-2">
                                  {poke.types.map((t) => (
                                    <span key={t} className="text-[9px] bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 px-2 py-0.5 rounded font-mono font-bold uppercase select-none">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-col items-end">
                                <Sparkles size={16} className="text-primary-container mb-1 animate-pulse" />
                                <span className="font-mono text-[10px] text-primary-container tracking-widest uppercase font-bold">SHINY</span>
                              </div>
                            </div>

                            {/* Center image section with sparkle glow */}
                            <div className="relative h-60 flex items-center justify-center mb-6 overflow-hidden bg-stone-950/60 rounded-xl p-4 border border-white/5">
                              <div className="absolute inset-0 shiny-sparkle rounded-full scale-110 opacity-30"></div>
                              <img 
                                src={poke.shinyImageUrl || poke.imageUrl} 
                                className="relative z-10 w-44 h-44 object-contain filter drop-shadow-[0_0_20px_rgba(255,86,50,0.3)] group-hover:scale-110 transition-transform duration-500" 
                                alt={poke.name} 
                              />
                              
                              {/* Glowing target reticle matching Screen 4 layout */}
                              <div className="absolute inset-4 border border-primary-container/10 rounded-full animate-[spin_25s_linear_infinite] pointer-events-none"></div>
                              <div className="absolute inset-8 border border-dashed border-white/5 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none"></div>
                            </div>

                            {/* Stat block matching Screen 4 bottom layouts */}
                            <div className="space-y-3">
                              <div className="flex justify-between font-mono text-xs">
                                <span className="text-outline uppercase tracking-wider block opacity-70">ATTACK SCORE</span>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, idx) => {
                                    const attackSegment = Math.round((poke.stats.attack / 150) * 5);
                                    return (
                                      <div key={idx} className={`w-3.5 h-2.5 rounded-sm ${idx < attackSegment ? "bg-primary-container" : "bg-stone-800"}`} />
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex justify-between font-mono text-xs">
                                <span className="text-outline uppercase tracking-wider block opacity-70">SPD STAT</span>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, idx) => {
                                    const speedSegment = Math.round((poke.stats.speed / 150) * 5);
                                    return (
                                      <div key={idx} className={`w-3.5 h-2.5 rounded-sm ${idx < speedSegment ? "bg-tertiary" : "bg-stone-800"}`} />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                )}

                {/* 4. SETTINGS TERMINAL TERMINUS SECTION */}
                {activeTab === "settings" && (
                  <div className="space-y-6 max-w-2xl mx-auto">
                    
                    <div className="mb-4">
                      <span className="bg-[#00dbe7]/10 text-[#00dbe7] border border-[#00dbe7]/30 px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded">Console Settings</span>
                      <h2 className="font-display text-2xl text-white font-bold mt-2 uppercase tracking-tight">OS Diagnostics Configuration</h2>
                    </div>

                    <div className="glass-panel p-6 rounded-xl space-y-6">
                      
                      {/* Trainer metadata fields customization */}
                      <div className="space-y-4">
                        <h3 className="font-mono text-xs text-primary-container font-bold tracking-widest uppercase border-b border-white/5 pb-2">
                          Identity Specifications Override
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-mono text-[11px] text-on-surface-variant block mb-1">TRAINER RECORD ID</label>
                            <input 
                              type="text"
                              value={trainer.trainerId}
                              onChange={(e) => setTrainer(prev => ({ ...prev, trainerId: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:border-primary-container focus:outline-none"
                            />
                          </div>
                          
                          <div>
                            <label className="font-mono text-[11px] text-on-surface-variant block mb-1">TRAINER DISPLAY DESIGNATION</label>
                            <input 
                              type="text"
                              value={trainer.name}
                              onChange={(e) => setTrainer(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:border-primary-container focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive system audio/voice alerts switches list */}
                      <div className="space-y-3.5">
                        <h3 className="font-mono text-xs text-primary-container font-bold tracking-widest uppercase border-b border-white/5 pb-2">
                          Diagnostic Flag Configurations
                        </h3>

                        <div className="flex justify-between items-center bg-white/5 p-3 rounded text-xs font-mono">
                          <div>
                            <p className="text-white font-bold uppercase">Synthesized OS Voice Telemetry</p>
                            <span className="text-[10px] text-on-surface-variant opacity-75">Enable TTS narration readout on inspected pokemon card telemetry</span>
                          </div>
                          <button 
                            onClick={() => setIsVoiceMuted(!isVoiceMuted)}
                            className={`w-12 h-6 rounded-full relative p-0.5 border border-white/10 transition-colors ${!isVoiceMuted ? "bg-primary-container" : "bg-neutral-800"}`}
                          >
                            <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${!isVoiceMuted ? "translate-x-6" : "translate-x-0"}`}></div>
                          </button>
                        </div>

                        <div className="flex justify-between items-center bg-white/5 p-3 rounded text-xs font-mono">
                          <div>
                            <p className="text-white font-bold uppercase">Database Auto-Refresher</p>
                            <span className="text-[10px] text-on-surface-variant opacity-75">Simulate rapid background file synchronization across Kanto-Hoenn servers</span>
                          </div>
                          <span className="text-[10px] bg-green-950/40 border border-green-800/60 text-green-400 px-2 py-0.5 font-bold uppercase rounded animate-pulse select-none">
                            ACTIVE
                          </span>
                        </div>
                      </div>

                      {/* System logs console prompt block */}
                      <div className="space-y-2">
                        <h3 className="font-mono text-xs text-primary-container font-bold tracking-widest uppercase">
                          Deck Security Logs Terminus
                        </h3>
                        <div className="bg-stone-950 p-4 rounded-lg font-mono text-[11px] text-stone-400 space-y-1.5 max-h-48 overflow-y-auto border border-white/10 [image-rendering:pixelated]">
                          {trainer.systemLogs.map((log, idx) => (
                            <p key={idx} className="leading-relaxed flex gap-2">
                              <span className="text-primary-container">{">>"}</span>
                              <span>{log}</span>
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs font-mono text-neutral-500 border-t border-white/5 pt-4">
                        <span>Dex-OS Terminal V2.0.4 SPEC</span>
                        <button 
                          onClick={() => {
                            if (window.confirm("CONFIRM DATABASE RESET TO FACTORY PRESETS?")) {
                              localStorage.removeItem("pokemon_db");
                              setPokemonDB(initialPokemonDatabase);
                              alert("System resets complete.");
                            }
                          }}
                          className="text-red-500 hover:text-red-400 font-bold bg-transparent border-none cursor-pointer"
                        >
                          FACTOR-RESET OS DATABASE
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </main>
            </div>

            {/* Global Footer metadata parameters */}
            <footer className="w-full py-4 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center mt-auto border-t border-white/5 bg-surface-container-lowest relative z-35 font-mono text-xs">
              <div className="flex flex-col items-center md:items-start mb-3 md:mb-0">
                <span className="text-primary-container tracking-widest uppercase font-bold">
                  V2.0.4-STABLE // TRAINER ID: #{trainer.trainerId} // USER NAME: {trainer.name.toUpperCase()}
                </span>
                <p className="text-[10px] text-outline/50 mt-1">SYSTEM UPTIME: {formatUptime(trainer.uptimeSeconds)}</p>
              </div>
              <div className="flex gap-6 text-on-surface-variant text-[11px]">
                <button onClick={() => setShowHelpOverlay(true)} className="hover:text-primary-container transition-all uppercase tracking-widest font-mono bg-transparent border-none cursor-pointer select-none">
                  Help / Diagnostics
                </button>
                <div className="h-4 w-[1px] bg-white/10"></div>
                <button onClick={() => { 
                  auth.logout();
                  try { window.speechSynthesis.cancel(); } catch(e) {}
                }} className="text-red-400 hover:text-red-300 font-bold tracking-widest uppercase bg-transparent border-none cursor-pointer">
                  Disconnect Deck
                </button>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>

      
      {/* ========================================================
         MODALS & FLOATING DIAGNOSTICS OVERLAYS
         ======================================================== */}
      
      {/* A. SIDE-BY-SIDE POKEMON DETAIL MODAL - SCREEN 3 COMPLIATION */}
      <AnimatePresence>
        {selectedPokemon && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row border border-primary-container/30 h-[90vh]"
            >
              <div className="scan-line pointer-events-none"></div>

              {/* Close Button top right */}
              <button 
                onClick={() => { setSelectedPokemon(null); setIsShinyDetailMode(false); }}
                className="absolute top-4 right-4 text-stone-400 hover:text-white z-50 bg-stone-900 border border-white/10 p-2.5 rounded-full hover:border-[#ff5632] transition-colors"
              >
                <X size={18} />
              </button>

              {/* Left Side: Large 3D style viewport */}
              <div className="w-full md:w-[45%] bg-[#121111] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden select-none shrink-0 h-1/2 md:h-full">
                {/* Decorative retro targeting brackets */}
                <div className="absolute inset-4 border border-white/5 rounded-lg pointer-events-none"></div>
                
                <div className="relative flex-1 flex items-center justify-center">
                  {/* Rotating scanner telemetry effects behind pokemon */}
                  <div className={`absolute w-72 h-72 rounded-full border border-[#ff5632]/10 animate-[spin_30s_linear_infinite] ${isShinyDetailMode ? "border-[#ff5632]/20 opacity-80" : "opacity-30"}`}></div>
                  <div className={`absolute w-60 h-60 rounded-full border-2 border-dashed border-cyan-500/10 animate-[spin_20s_linear_infinite_reverse] ${isShinyDetailMode ? "border-cyan-500/15" : "opacity-40"}`}></div>

                  <img 
                    src={isShinyDetailMode ? (selectedPokemon.shinyImageUrl || selectedPokemon.imageUrl) : selectedPokemon.imageUrl} 
                    className="w-56 h-56 object-contain filter drop-shadow-[0_0_35px_rgba(255,86,50,0.35)] relative z-10 transition-transform duration-700 hover:scale-105 select-none pointer-events-none" 
                    alt={selectedPokemon.name} 
                  />

                  {/* Audio feedback voice assistant widget on bottom of viewport */}
                  <button 
                    onClick={() => handleSpeakDescription(`${selectedPokemon.name}. ${selectedPokemon.description}`)}
                    className="absolute bottom-4 left-4 p-2 bg-stone-900/80 hover:bg-stone-800 text-[#00dbe7] border border-[#00dbe7]/30 rounded-full cursor-pointer z-20 flex gap-2 items-center font-mono text-[10px]"
                    title="Speak Description"
                  >
                    <Volume2 size={14} className="animate-pulse" />
                    <span>AUDIO COUPLING</span>
                  </button>
                </div>

                {/* Sub Metadata footer parameters */}
                <div className="space-y-4 pt-4 border-t border-white/5 relative z-20 shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[11px] text-[#ac8880] tracking-wider uppercase">SHINY PREVIEW TRANSFORMS</span>
                    
                    {/* Shiny mode switch button toggle */}
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-stone-400">SHINY MODE</span>
                      <button 
                        onClick={() => setIsShinyDetailMode(!isShinyDetailMode)}
                        className={`w-12 h-6 rounded-full relative p-0.5 border border-white/10 transition-colors ${isShinyDetailMode ? "bg-[#ff5632]" : "bg-neutral-800"}`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${isShinyDetailMode ? "translate-x-6" : "translate-x-0"}`}></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Specifications Details (base stats, abilities, evolutionary chains) */}
              <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col justify-between overflow-y-auto h-1/2 md:h-full text-left">
                <div className="space-y-6">
                  {/* Class legendary identifier */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-stone-500 bg-white/5 border border-white/10 px-2.5 py-1 rounded">
                      {selectedPokemon.indexStr}
                    </span>
                    {selectedPokemon.isLegendary ? (
                      <span className="bg-primary-container/20 text-primary-container border border-primary-container/40 px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded legendary-pulse animate-pulse">
                        Class: Legendary // 神兽
                      </span>
                    ) : (
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 font-mono text-[10px] tracking-widest uppercase rounded">
                        Class: Standard // 常见
                      </span>
                    )}
                    {selectedPokemon.isFavorite && (
                      <span className="font-mono text-[10px] bg-red-950 text-red-400 border border-red-800 px-2 py-1 rounded tracking-wider">
                        ★ REGISTERED FAVORITE
                      </span>
                    )}
                  </div>

                  {/* Name and types badge indicator */}
                  <div>
                    <h2 className="font-display font-black text-3xl text-white uppercase tracking-tighter mb-2">
                      {selectedPokemon.name}
                    </h2>
                    
                    {/* Elements rows block */}
                    <div className="flex gap-2">
                      {selectedPokemon.types.map((type) => (
                        <span key={type} className="font-mono text-xs font-bold border border-white/10 hover:border-[#ff5632]/50 bg-stone-900 px-3 py-1 text-white opacity-85 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Height and weight parameters summary */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 p-3 rounded border border-white/5 text-center font-mono">
                      <span className="text-[10px] text-outline uppercase block mb-1">HEIGHT DEVICE</span>
                      <span className="text-sm font-bold text-white">{selectedPokemon.height}</span>
                    </div>

                    <div className="bg-white/5 p-3 rounded border border-white/5 text-center font-mono">
                      <span className="text-[10px] text-outline uppercase block mb-1">WEIGHT LOAD</span>
                      <span className="text-sm font-bold text-white">{selectedPokemon.weight}</span>
                    </div>

                    <div className="bg-white/5 p-3 rounded border border-white/5 text-center font-mono">
                      <span className="text-[10px] text-outline uppercase block mb-1">REGION ORIGIN</span>
                      <span className="text-sm font-bold text-primary-container">{selectedPokemon.region.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* Biological detail description paragraph */}
                  <div className="space-y-1.5 font-mono text-xs">
                    <span className="text-primary-container font-bold block uppercase tracking-wide">Biological Diagnostics</span>
                    <p className="text-on-surface-variant/85 leading-relaxed bg-stone-950 p-4 rounded-lg border border-white/5">
                      {selectedPokemon.description}
                    </p>
                  </div>

                  {/* Base Stats segmented matrix list */}
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center text-primary-container font-bold uppercase tracking-wide border-b border-white/5 pb-1">
                      <span>Base Statistics Status</span>
                      <span className="text-neutral-500 font-normal">TOTAL: {selectedPokemon.stats.total}</span>
                    </div>
                    
                    <div className="space-y-2.5 bg-stone-950 p-4 rounded-lg border border-white/5">
                      {[
                        { label: "HP STATUS", value: selectedPokemon.stats.hp },
                        { label: "ATTACK LIMIT", value: selectedPokemon.stats.attack },
                        { label: "DEFENSE VALUE", value: selectedPokemon.stats.defense },
                        { label: "SP. ATTACK POWER", value: selectedPokemon.stats.spAtk },
                        { label: "SPEED VELOCITY", value: selectedPokemon.stats.speed },
                      ].map((st, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-[11px] text-stone-400">
                            <span>{st.label}</span>
                            <span className="font-bold text-white">{st.value} / 150</span>
                          </div>
                          {/* Segmented bar widget */}
                          <div className="h-1.5 bg-stone-900 rounded overflow-hidden flex gap-0.5">
                            {Array.from({ length: 15 }).map((_, segmentIdx) => {
                              const segmentsCount = Math.round((st.value / 150) * 15);
                              return (
                                <div 
                                  key={segmentIdx} 
                                  className={`h-full flex-1 ${segmentIdx < segmentsCount ? "bg-primary-container" : "bg-neutral-800"}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Abilities features expansion container */}
                  <div className="space-y-2 font-mono text-xs">
                    <span className="text-primary-container font-bold block uppercase tracking-wide">Abilities Specs</span>
                    <div className="space-y-2">
                      {selectedPokemon.abilities.map((ab, idx) => (
                        <div key={ab} className="bg-stone-900 p-3 rounded border border-white/5 flex gap-3.5 items-start">
                          <span className="text-cyan-400 font-bold shrink-0">◇</span>
                          <div>
                            <p className="text-white font-bold mb-0.5">{ab.toUpperCase()}</p>
                            <p className="text-[11px] text-[#ac8880] opacity-80 leading-snug">
                              {selectedPokemon.abilityDescriptions?.[idx] || "Passive ability module successfully localized for this biological agent."}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evolutionary bio-chain interface */}
                  <div className="space-y-3 font-mono text-xs">
                    <span className="text-primary-container font-bold block uppercase tracking-wide">Evolutionary DNA Chain</span>
                    <div className="flex items-center gap-2 bg-stone-950 p-4 rounded-lg border border-white/5 justify-around overflow-x-auto">
                      {selectedPokemon.evolutionaryChain.map((ev, idx) => {
                        // Check if evolution step corresponds to standard database
                        const matchingItem = pokemonDB.find(p => p.name.toUpperCase() === ev.name.toUpperCase());
                        return (
                          <div key={idx} className="flex items-center gap-2 shrink-0">
                            {idx > 0 && (
                              <span className="text-primary-container mx-1 animate-pulse">▶</span>
                            )}
                            
                            <div 
                              onClick={() => {
                                if (matchingItem && matchingItem.id !== selectedPokemon.id) {
                                  setSelectedPokemon(matchingItem);
                                  setIsShinyDetailMode(false);
                                }
                              }}
                              className={`p-2.5 rounded border flex flex-col items-center justify-center min-w-28 text-center transition-all ${
                                ev.name.toUpperCase() === selectedPokemon.name.toUpperCase()
                                  ? "border-primary-container bg-primary-container/10 text-white font-bold"
                                  : matchingItem
                                    ? "border-white/10 hover:border-primary-container/50 bg-stone-900 cursor-pointer text-stone-300"
                                    : "border-stone-850 bg-stone-900/30 text-stone-500 cursor-not-allowed select-none"
                              }`}
                            >
                              <Dna size={14} className={ev.name.toUpperCase() === selectedPokemon.name.toUpperCase() ? "text-primary-container mb-1" : "text-stone-500 mb-1"} />
                              <span className="text-[10px] tracking-wider block">{ev.name}</span>
                              <span className="text-[8px] opacity-50 block mt-0.5">STAGE {ev.stage}</span>
                              {!matchingItem && !ev.isCurrent && (
                                <span className="text-[7px] text-stone-605 block text-[#ac8880] mt-0.5 font-normal italic">UNACQUIRED SEC</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Main button tools overlay */}
                <div className="mt-8 border-t border-white/5 pt-4 flex gap-4">
                  <button 
                    onClick={() => {
                      setPokemonDB(prev => prev.map(p => {
                        if (p.id === selectedPokemon.id) {
                          return { ...p, isFavorite: !p.isFavorite };
                        }
                        return p;
                      }));
                      setSelectedPokemon(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
                    }}
                    className={`flex-1 font-mono text-xs font-bold py-3 text-center border cursor-pointer select-none ${selectedPokemon.isFavorite ? "bg-red-950/40 text-red-400 border-red-800" : "bg-white/5 text-stone-300 border-white/10 hover:bg-white/10"}`}
                  >
                    {selectedPokemon.isFavorite ? "UNREGISTER FAVORITE" : "REGISTER FAVORITE star"}
                  </button>
                  <button 
                    onClick={() => { setSelectedPokemon(null); setIsShinyDetailMode(false); }}
                    className="flex-1 bg-primary-container text-on-primary-container font-mono text-xs font-bold py-3 text-center hover:brightness-110 cursor-pointer select-none"
                  >
                    CLOSE TELEMETRY INSPECTIONX
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* B. WILD ENCOUNTER CAPTURE SIMULATOR POPUP */}
      <AnimatePresence>
        {isCaptureModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative border border-primary-container/30 overflow-hidden"
            >
              <div className="scan-line pointer-events-none"></div>

              {/* Header */}
              <div className="bg-[#1a1919] p-4 border-b border-white/10 flex justify-between items-center [image-rendering:pixelated]">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <RefreshCw className="animate-spin text-primary-container" size={16} />
                  <span className="text-white font-bold tracking-widest uppercase">WILD_DEX_RADAR SCANNING</span>
                </div>
                <button 
                  onClick={() => setIsCaptureModalOpen(false)}
                  className="text-stone-500 hover:text-white bg-transparent border-none"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Main Content split by Encounter Phase */}
              <div className="p-6 text-center space-y-6">
                
                {/* PHASE 1: TARGET RADAR SCAN */}
                {capturePhase === "scan" && (
                  <div className="py-8 space-y-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full border border-primary-container/20 flex items-center justify-center animation-pulse">
                      <div className="absolute inset-0 border border-dashed border-primary-container/40 rounded-full animate-spin"></div>
                      <div className="absolute inset-4 bg-primary-container/10 rounded-full flex items-center justify-center">
                        <Search size={32} className="text-primary-container animate-bounce" />
                      </div>
                    </div>
                    <div>
                      <p className="font-mono text-sm text-cyan-400 font-bold uppercase tracking-wider">Broadcasting planet frequencies...</p>
                      <p className="font-mono text-xs text-neutral-500 mt-1 uppercase">Localizing raw electromagnetic biosignals nearby</p>
                    </div>
                    {/* Live capture scan logs list */}
                    <div className="bg-stone-950 p-4 rounded w-full font-mono text-[10px] text-stone-500 text-left h-24 overflow-y-auto space-y-1 select-none pointer-events-none">
                      {captureLogs.map((logStr, idx) => (
                        <p key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-primary-container">{">>"}</span>
                          <span>{logStr}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* PHASE 2: WILD ENCOUNTER LOCATED */}
                {capturePhase === "acquire" && scannedPokemon && (
                  <div className="space-y-6">
                    <div className="relative h-48 bg-stone-950 rounded-xl p-4 flex items-center justify-center border border-white/10">
                      <img src={scannedPokemon.imageUrl} className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_15px_rgba(255,86,50,0.25)] select-none pointer-events-none" alt="scanned target" />
                      <div className="absolute top-3 left-3 bg-[#ff5632]/10 border border-[#ff5632]/35 text-[#ff5632] font-mono text-[10px] px-2 py-0.5 rounded uppercase">
                        WILD ENCOUNTER DETECTED
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-white text-2xl uppercase tracking-tighter mb-1 select-none">
                        WILD {scannedPokemon.name}
                      </h3>
                      <span className="font-mono text-xs text-on-surface-variant block opacity-75">
                        Region: {scannedPokemon.region} // Type: {scannedPokemon.types?.join(", ")}
                      </span>
                    </div>

                    {/* Stabilizer calibration slider minigame */}
                    <div className="bg-[#151414] p-4 rounded-lg space-y-3 border border-white/5 text-left font-mono text-xs">
                      <div className="flex justify-between font-bold text-stone-300">
                        <span>CALIBRATE QUANTUM COUPLING</span>
                        <span className="text-primary-container">{stabilizerValue}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="100" 
                        value={stabilizerValue}
                        onChange={(e) => setStabilizerValue(Number(e.target.value))}
                        className="w-full accent-primary-container cursor-pointer py-1"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500">
                        <span>LOW SIGNAL</span>
                        <span className="text-[#00dbe7] font-bold">OPTIMAL ZONE (40% - 80%)</span>
                        <span>HIGH EMISSION</span>
                      </div>
                    </div>

                    {/* Button trigger attempt */}
                    <div className="pt-2">
                      <button 
                        onClick={executeCaptureBeam}
                        className="w-full bg-primary-container text-on-primary-container font-mono text-xs font-black py-4 select-none tracking-widest hover:brightness-110 pulse-red uppercase border-none cursor-pointer"
                      >
                        ACTIVATE CAPTURE COUPLING
                      </button>
                    </div>
                  </div>
                )}

                {/* PHASE 3: CAPTURING IN PROGRESS */}
                {capturePhase === "attempt" && (
                  <div className="py-8 space-y-6 flex flex-col items-center">
                    <div className="relative w-32 h-32 rounded-full border-4 border-dashed border-primary-container animate-[spin_10s_linear_infinite] flex items-center justify-center">
                      <RefreshCw size={36} className="text-primary-container animate-spin duration-1000" />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-cyan-400 font-bold uppercase tracking-wider">Coupling database signals...</p>
                      <p className="font-mono text-xs text-stone-500 mt-1 uppercase">Synchronizing satellite node: {captureProgress}%</p>
                    </div>
                    {/* Live logs stream */}
                    <div className="bg-stone-950 p-4 rounded w-full font-mono text-[10px] text-stone-500 text-left h-24 overflow-y-auto space-y-1 select-none pointer-events-none">
                      {captureLogs.map((logStr, idx) => (
                        <p key={idx} className="flex gap-2 leading-relaxed">
                          <span className="text-primary-[#ff5632] font-bold">{">>"}</span>
                          <span>{logStr}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* PHASE 4: SUCCESS AC QUIRED */}
                {capturePhase === "success" && scannedPokemon && (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-green-950/50 text-green-400 border border-green-800 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(34,197,94,0.25)] animate-bounce">
                      <CheckCircle size={44} />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter mb-1">
                        CAPTURE COMPLETED!
                      </h3>
                      <p className="font-mono text-sm text-on-surface-variant leading-relaxed">
                        Successfully added wild <span className="text-primary-container font-bold">{scannedPokemon.name}</span> into local database cards registry. Ready for diagnostics!
                      </p>
                    </div>

                    <div className="bg-stone-950 p-4 rounded text-left font-mono text-xs text-stone-400 border border-white/5 max-h-36 overflow-y-auto">
                      <p className="text-green-400 font-bold">✓ INTEGRATED: Wild telemetry recorded successfully.</p>
                      <p className="mt-1">ID: #{scannedPokemon.id}</p>
                      <p>Element: {scannedPokemon.types?.join(" / ")}</p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={triggerCaptureEncounter} 
                        className="flex-1 font-mono text-xs font-bold py-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 select-none cursor-pointer text-stone-300"
                      >
                        SCAN AGAIN
                      </button>
                      <button 
                        onClick={() => { setIsCaptureModalOpen(false); setActiveTab("regions"); }} 
                        className="flex-1 bg-primary-container text-on-primary-container font-mono text-xs font-bold py-3 text-center hover:brightness-110 select-none cursor-pointer"
                      >
                        VIEW DATACARDS
                      </button>
                    </div>
                  </div>
                )}

                {/* PHASE 5: CAPTURE ESCAPED FAIL */}
                {capturePhase === "fail" && scannedPokemon && (
                  <div className="space-y-6">
                    <div className="w-20 h-20 bg-red-950/50 text-red-400 border border-red-800 rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(220,38,38,0.25)] animate-pulse">
                      <AlertTriangle size={44} />
                    </div>

                    <div>
                      <h3 className="font-display font-black text-2xl text-white uppercase tracking-tighter mb-1">
                        WILD ASSET ESCAPED
                      </h3>
                      <p className="font-mono text-sm text-on-surface-variant leading-relaxed">
                        Wild <span className="text-primary-container font-bold">{scannedPokemon.name}</span> resisted stasis forcefields and telemetry was permanently lost. Re-coupling required.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={triggerCaptureEncounter} 
                        className="flex-1 font-mono text-xs font-bold py-3 text-center bg-primary-container text-on-primary-container select-none cursor-pointer"
                      >
                        RETRY RE-COUPLE
                      </button>
                      <button 
                        onClick={() => setIsCaptureModalOpen(false)} 
                        className="flex-1 bg-white/5 border border-white/10 text-stone-300 font-mono text-xs font-bold py-3 text-center hover:bg-white/10 select-none cursor-pointer"
                      >
                        CLOSE ACTIVE RADAR
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* C. DIAGNOSTICS PROTOCOL DIAGRAM HELP OVERLAY */}
      <AnimatePresence>
        {showHelpOverlay && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative border border-primary-container/20 p-6 md:p-8 space-y-6 text-left"
            >
              <h2 className="font-display text-xl font-bold text-white uppercase border-b border-white/5 pb-2">
                DEX-OS Diagnostics Protocol (v2.0.4-S)
              </h2>

              <div className="space-y-4 font-mono text-xs text-on-surface-variant/90 leading-relaxed">
                <p>Welcome, field researcher. Review these system instructions for operating the console:</p>
                
                <div className="space-y-2">
                  <p className="text-white font-bold uppercase text-primary-container">◇ Standard Database Access</p>
                  <p className="pl-4">Navigate through Regions (Kanto, Johto, Hoenn) to stream localized species details. Click standard elem chips (Fire, Water, Grass...) to target search indices.</p>
                </div>

                <div className="space-y-2">
                  <p className="text-white font-bold uppercase text-primary-container">◇ Specimen Telemetry & Shiny Toggle</p>
                  <p className="pl-4">Inspect individual species cards to inspect stats meters, height parameters, and biological notes. Flip the SHINY MODE toggle switch inside viewport to extract mutant variants.</p>
                </div>

                <div className="space-y-2">
                  <p className="text-white font-bold uppercase text-primary-container">◇ Biometric Wild Tracking</p>
                  <p className="pl-4">Click "Capture" or "Scan Nearby" to dispatch sub-gravity fields. Calibrate the quantum sliders in optimal safe levels (35% to 85%) to maximize stasis success rates.</p>
                </div>

                <div className="space-y-2">
                  <p className="text-white font-bold uppercase text-primary-container">◇ Security Status Overwrite</p>
                  <p className="pl-4">Access settings cog panels to customize Trainer record designations, toggle synthesized android voices, or wipe local database cards presets.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setShowHelpOverlay(false)}
                  className="bg-primary-container text-on-primary-container font-mono text-xs font-bold px-6 py-2.5 hover:brightness-110 tracking-widest border-none cursor-pointer"
                >
                  ACKNOWLEDGE PROTOCOLS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
