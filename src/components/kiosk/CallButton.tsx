import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, PhoneOff, Loader2 } from 'lucide-react';

interface CallButtonProps {
  restaurantName: string;
  status: 'available' | 'busy';
  onCallStart?: () => void;
  onCallEnd?: () => void;
}

export function CallButton({ restaurantName, status, onCallStart, onCallEnd }: CallButtonProps) {
  const { t } = useLanguage();
  const [callState, setCallState] = useState<'idle' | 'connecting' | 'active'>('idle');
  const [duration, setDuration] = useState(0);

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'active') {
      interval = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = useCallback(() => {
    if (status === 'busy') return;
    
    setCallState('connecting');
    // Simulate connection delay
    setTimeout(() => {
      setCallState('active');
      setDuration(0);
      onCallStart?.();
    }, 1500);
  }, [status, onCallStart]);

  const handleEndCall = useCallback(() => {
    setCallState('idle');
    setDuration(0);
    onCallEnd?.();
  }, [onCallEnd]);

  if (status === 'busy' && callState === 'idle') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-busy/10 rounded-2xl border border-busy/30">
        <div className="w-16 h-16 rounded-full bg-busy/20 flex items-center justify-center">
          <PhoneOff className="w-8 h-8 text-busy" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-busy">{t('busy')}</p>
          <p className="text-sm text-muted-foreground">
            {restaurantName}
          </p>
        </div>
      </div>
    );
  }

  if (callState === 'connecting') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-primary/10 rounded-2xl border border-primary/30">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-primary">{t('calling')}</p>
          <p className="text-sm text-muted-foreground">{restaurantName}</p>
        </div>
      </div>
    );
  }

  if (callState === 'active') {
    return (
      <div className="flex flex-col items-center gap-4 p-6 bg-success/10 rounded-2xl border border-success/30">
        <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center animate-pulse-glow">
          <Phone className="w-8 h-8 text-success-foreground" />
        </div>
        <div className="text-center">
          <p className="font-semibold text-success">{t('callInProgress')}</p>
          <p className="text-2xl font-mono font-bold text-foreground">
            {formatDuration(duration)}
          </p>
        </div>
        <button
          onClick={handleEndCall}
          className="touch-button bg-busy hover:bg-busy/90 text-busy-foreground flex items-center gap-2 w-full justify-center"
        >
          <PhoneOff className="w-5 h-5" />
          {t('endCall')}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleStartCall}
      className="touch-button bg-success hover:bg-success/90 text-success-foreground flex items-center gap-3 w-full justify-center pulse-ring"
    >
      <Phone className="w-6 h-6" />
      <span className="text-lg">{t('startCall')}</span>
    </button>
  );
}
