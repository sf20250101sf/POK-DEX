import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, User, Key, HelpCircle, ArrowRight, AlertTriangle, Shield, Wifi } from 'lucide-react';

interface LoginScreenProps {
  onValidate: (id: string, key: string) => { success: boolean; error?: string };
  onLogin: (id: string, key: string) => { success: boolean; error?: string };
  onRegister: (trainer: {
    trainerId: string;
    accessKey: string;
    name: string;
    avatarUrl: string;
  }) => { success: boolean; error?: string };
  defaultCredentials?: { id: string; key: string };
}

const avatarUrls = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB48w5EsP4vozUZbvFg_qsMXdbeEJJntgjLDK0kUNK6i9t0ycBZiSkKRxf93_lb7nBhNBxwIRa6vRnm66w961WIZuuekqLmAgtjmb65tbKzNHrVeSqyyXctCemfvD-prkWGy63Ao7m-ha6MPnD1uCfkmHh9Yhvez7gCuA5gT7UwpqIXcoO5-GLZeC6CVoS5G18jrbKyL6xCRmkJPozWV0so8KDEJAUjlVyuOWHbXpj8dd7a0V7jBZfJ6llSl0u_B9ecWaD1wZOKdJw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAz-nR4tDkl5rpPobSJ7CbuB5qfeIFzdHTkzeFx611y13FX0xPw75ZqIJ9q_m5lvg1IEVn4uRTW0U6an_RTd9D5VSY1yBe4z38XpuKy_vkxCm9r2kuawNNHo5ibInmo2dkMSYMhGEvxAzPbJlIkgHmMQGQtR8Dx91yuxfe0Q3AKZqnp30EFpkMUAe6mhgJnBp9z3rEIbL_hYQJnLiffUuke90VmC0Fx8VnPq-IX5ixGYLRhF5q0-23lF6dhOQHgITVW1n05N0CNBCw",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAbCUwy4VnhVl74yeZJmIHZ_e-Hv42_S7Za1LxcFUDV-I2OQhox7LJUVcQ_F_3TOn6cfh2mjaGOByry6nb19_36-6c8EVwnhqAq-e0x1FerMu8J-2JvrmsBtRXy4ED5jUYwk6VlRPM-2KeJ5sHCUtgbD7pUTc4r7wDk4IyLUvC9-epnV5ff18_eWC78DoPh8IN9ppiaXU3dgPzniRTC-fYg0I77tRNS903qRtD-GL9VsuGFQhBBBoK1Q1-SGHGtHBMsXUmcSJUc-zk"
];

export default function LoginScreen({ onValidate, onLogin, onRegister, defaultCredentials }: LoginScreenProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Login states
  const [authIdInput, setAuthIdInput] = useState('');
  const [authKeyInput, setAuthKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isVerifyingBiometrics, setIsVerifyingBiometrics] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [currentVerificationLog, setCurrentVerificationLog] = useState('');

  // Register states
  const [regTrainerId, setRegTrainerId] = useState('8829-01');
  const [regAccessKey, setRegAccessKey] = useState('kanto_pass');
  const [regConfirmKey, setRegConfirmKey] = useState('kanto_pass');
  const [regName, setRegName] = useState('S. Redfield');
  const [regAvatar, setRegAvatar] = useState(avatarUrls[0]);

  const handleAuthenticate = () => {
    if (!authIdInput.trim() || !authKeyInput.trim()) {
      setAuthError('ERROR: TRAINER ID AND ACCESS KEY ARE MANDATORY.');
      return;
    }

    // First validate without creating session (for animation)
    const validation = onValidate(authIdInput, authKeyInput);
    if (!validation.success) {
      setAuthError(validation.error || 'SECURITY MISMATCH: PROTOCOLS DECLINED.');
      return;
    }

    setAuthError('');
    setIsVerifyingBiometrics(true);
    setBiometricProgress(0);
    setCurrentVerificationLog('SCAN ATTAINED: LOCK IDENT DATA...');

    let prog = 0;
    const interval = setInterval(() => {
      prog += 15;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        // Now actually create the session
        onLogin(authIdInput, authKeyInput);
        setIsVerifyingBiometrics(false);
      }
      setBiometricProgress(prog);
      const logMocks = [
        'ACQUIRING RETINAL MARKERS...',
        'MATCHING FINGERPRINT HEURISTICS...',
        'DECRYPTING CRYPTOGRAPHIC HANDSHAKE...',
        'VERIFYING NODE AUTHORIZATION...',
        'SYSTEM ACCESS NOMINAL // ESTABLISHING CONSOL-DECK...'
      ];
      const logIdx = Math.floor((prog / 100) * (logMocks.length - 1));
      setCurrentVerificationLog(logMocks[logIdx]);
    }, 300);
  };

  const handleQuickAuthenticate = () => {
    const id = defaultCredentials?.id || '8829-01';
    const key = defaultCredentials?.key || 'kanto_pass';
    
    setAuthIdInput(id);
    setAuthKeyInput(key);
    setAuthError('');
    setIsVerifyingBiometrics(true);
    setBiometricProgress(0);
    setCurrentVerificationLog('INITIATING RAPID DIRECT IDENTSCAN...');

    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        onLogin(id, key);
        setIsVerifyingBiometrics(false);
      }
      setBiometricProgress(prog);
    }, 150);
  };

  const handleRegisterNewTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regTrainerId.trim() || !regAccessKey.trim() || !regName.trim()) {
      setAuthError('Please fill all trainer specifications.');
      return;
    }
    if (regAccessKey !== regConfirmKey) {
      setAuthError('ENCRYPTION MISMATCH: ACCESS KEYS DO NOT ALIGN.');
      return;
    }
    
    const result = onRegister({
      trainerId: regTrainerId,
      accessKey: regAccessKey,
      name: regName,
      avatarUrl: regAvatar
    });
    
    if (!result.success) {
      setAuthError(result.error || 'REGISTRATION FAILED.');
      return;
    }
    
    setIsRegistering(false);
    setAuthIdInput(regTrainerId);
    setAuthKeyInput(regAccessKey);
    setAuthError('REGISTRATION SUCCESSFUL. AUTHENTICATE TO ACCESS.');
  };

  return (
    <motion.div 
      key="login-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col z-10 w-full"
    >
      {/* Top Bar simulated from mockup */}
      <header className="flex justify-between items-center w-full px-4 md:px-10 py-6 border-b border-white/5 bg-background/50 backdrop-blur-md">
        <div className="flex flex-col">
          <h1 className="font-display font-black text-2xl tracking-tighter text-primary-container">POKÉDEX-OS</h1>
          <span className="font-mono text-xs text-on-surface-variant opacity-60 tracking-widest">SYSTEM STATUS: RESTRICTED</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="font-mono text-sm text-primary-container font-mono">DEX-COM V.2</span>
            <span className="font-mono text-xs text-on-surface-variant opacity-50">NODE: KANTO-PRIMARY</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="flex gap-4 text-primary opacity-80">
            <Shield size={20} className="text-primary-container animate-pulse" />
            <Wifi size={20} className="text-cyan-400" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-[480px] flex flex-col items-center">
          
          {/* Visual Biometric Scanner ring widget */}
          <div 
            onClick={handleQuickAuthenticate}
            title="Dev Quick Scan Bypass"
            className="mb-8 cursor-pointer biometric-scanner h-24 w-24 rounded-full flex items-center justify-center border border-white/10 glass-panel group relative hover:border-primary-container/40 transition-colors"
          >
            <div className="scanner-ring absolute inset-0 rounded-full"></div>
            <div className="scan-line"></div>
            <Fingerprint size={42} className="text-primary-container group-hover:scale-110 transition-transform duration-300" />
          </div>

          {/* Login or Register Card Container wrapper */}
          <AnimatePresence mode="wait">
            {!isRegistering ? (
              <motion.section 
                key="login-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-panel w-full rounded-xl p-6 md:p-10 relative overflow-hidden"
              >
                {/* Technical visual corner brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-container/40 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-container/40 rounded-br-lg"></div>
                
                <div className="mb-6 text-center">
                  <h2 className="font-display text-2xl text-on-background mb-1 tracking-tight">SYSTEM ACCESS</h2>
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-widest block opacity-70">Awaiting Identity Verification</span>
                </div>

                {authError && (
                  <div className={`mb-6 p-3 border text-xs font-mono rounded flex gap-2 items-center ${authError.includes('SUCCESSFUL') ? 'bg-green-950/50 border-green-800 text-green-200' : 'bg-red-950/50 border-red-800 text-red-200'}`}>
                    <AlertTriangle size={16} className="shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                {/* LOGIN FORM */}
                <div className="space-y-5">
                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1 tracking-wider">TRAINER ID</label>
                    <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-all pb-2 group">
                      <User size={18} className="text-outline mr-3 group-focus-within:text-primary-container" />
                      <input 
                        type="text" 
                        value={authIdInput}
                        onChange={(e) => setAuthIdInput(e.target.value)}
                        placeholder="E.G. 8829-01  (or 'test')" 
                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-on-background w-full placeholder:text-outline/30 font-mono text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1 tracking-wider">ACCESS KEY</label>
                    <div className="flex items-center border-b border-outline-variant focus-within:border-primary transition-all pb-2 group">
                      <Key size={18} className="text-outline mr-3 group-focus-within:text-primary-container" />
                      <input 
                        type="password" 
                        value={authKeyInput}
                        onChange={(e) => setAuthKeyInput(e.target.value)}
                        placeholder="••••••••  (or 'test')" 
                        className="bg-transparent border-none focus:outline-none focus:ring-0 text-on-background w-full placeholder:text-outline/30 font-mono text-sm"
                        onKeyDown={(e) => e.key === 'Enter' && handleAuthenticate()}
                      />
                    </div>
                  </div>

                  {isVerifyingBiometrics && (
                    <div className="pt-2 font-mono text-xs text-center">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                        <div className="h-full bg-primary-container transition-all duration-300" style={{ width: `${biometricProgress}%` }}></div>
                      </div>
                      <span className="text-primary-container animate-pulse">{currentVerificationLog}</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button 
                      onClick={handleAuthenticate}
                      disabled={isVerifyingBiometrics}
                      className="w-full bg-primary-container text-on-primary-container py-4 font-display text-lg font-black tracking-widest pulse-red hover:brightness-110 active:scale-[0.98] transition-all relative overflow-hidden group rounded shadow-[0_0_20px_rgba(255,86,50,0.25)]"
                    >
                      <span className="relative z-10 font-bold tracking-widest">AUTHENTICATE</span>
                      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/30"></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button 
                      type="button" 
                      onClick={() => {
                        setAuthIdInput('8829-01');
                        setAuthKeyInput('kanto_pass');
                        setAuthError('DEFAULT CREDENTIALS INJECTED. PRESS AUTHENTICATE.');
                      }}
                      className="font-mono text-xs text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      <HelpCircle size={14} /> FORGOT ID
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsRegistering(true)}
                      className="font-mono text-xs text-on-surface-variant hover:text-primary-container transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                    >
                      NEW TRAINER REGISTRY <ArrowRight size={14} className="animate-pulse" />
                    </button>
                  </div>
                </div>
              </motion.section>
            ) : (
              // NEW TRAINER REGISTRATION SCREEN
              <motion.section 
                key="register-box"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="glass-panel w-full rounded-xl p-6 md:p-10 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg"></div>

                <div className="mb-6">
                  <h2 className="font-display text-xl text-on-background mb-1 tracking-tight uppercase">REGISTRY PROTOCOLS</h2>
                  <span className="font-mono text-xs text-cyan-400 tracking-widest block">PROVISION NEW TRAINER CREDENTIALS</span>
                </div>

                {authError && !authError.includes('SUCCESSFUL') && (
                  <div className="mb-4 p-3 bg-red-950/50 border border-red-800 text-red-200 text-xs font-mono rounded flex gap-2 items-center">
                    <AlertTriangle size={16} className="shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterNewTrainer} className="space-y-4">
                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1">TRAINER ID</label>
                    <input 
                      value={regTrainerId} 
                      onChange={(e) => setRegTrainerId(e.target.value)} 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-primary-container focus:outline-none"
                      placeholder="E.G. 8829-01"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1">TRAINER DESIGNATION / NAME</label>
                    <input 
                      value={regName} 
                      onChange={(e) => setRegName(e.target.value)} 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-primary-container focus:outline-none"
                      placeholder="E.G. S. Redfield"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1">SECURE ENCRYPTION ACCESS KEY</label>
                    <input 
                      value={regAccessKey} 
                      onChange={(e) => setRegAccessKey(e.target.value)} 
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-primary-container focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-1">CONFIRM ACCESS KEY</label>
                    <input 
                      value={regConfirmKey} 
                      onChange={(e) => setRegConfirmKey(e.target.value)} 
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white font-mono focus:border-primary-container focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-on-surface-variant block mb-2">BIOLOGICAL USER AVATAR</label>
                    <div className="grid grid-cols-3 gap-3">
                      {avatarUrls.map((imgUrl, idx) => (
                        <button 
                          key={idx}
                          type="button"
                          onClick={() => setRegAvatar(imgUrl)}
                          className={`w-full aspect-square rounded border relative overflow-hidden bg-stone-900 ${regAvatar === imgUrl ? 'border-primary-container' : 'border-white/10'}`}
                        >
                          <img src={imgUrl} className="w-full h-full object-cover" alt="avatar" />
                          {regAvatar === imgUrl && (
                            <div className="absolute inset-0 bg-primary-container/20 flex items-center justify-center">
                              <span className="font-mono text-[9px] bg-primary-container text-white px-1 font-bold">ACTIVE</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsRegistering(false)} 
                      className="flex-1 bg-white/5 border border-white/10 text-on-surface-variant font-mono text-xs py-3 tracking-widest hover:bg-white/10"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="flex-1 bg-primary-container text-on-primary-container font-mono text-xs font-bold py-3 tracking-widest hover:brightness-110"
                    >
                      REGISTER
                    </button>
                  </div>
                </form>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Micro encrypted details footer for login page */}
          <div className="mt-8 flex gap-6 items-center justify-center opacity-50">
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] text-tertiary">ENCRYPTION</span>
              <span className="font-mono text-[11px] font-bold">AES-256</span>
            </div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] text-tertiary">PROTOCOL</span>
              <span className="font-mono text-[11px] font-bold">V.2.0.4-S</span>
            </div>
            <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] text-tertiary">SIGNAL</span>
              <span className="font-mono text-[11px] font-bold">SECURE</span>
            </div>
          </div>

        </div>
      </main>

      {/* Bottom bar coordinates logs line */}
      <footer className="w-full py-4 border-t border-white/5 bg-surface-container-lowest flex justify-center px-4">
        <span className="font-mono text-xs text-primary-container tracking-wider uppercase">
          V2.0.4-STABLE // MULTI-USER AUTH ENABLED // STATUS: AWAITING IDENT...
        </span>
      </footer>
    </motion.div>
  );
}
