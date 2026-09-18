// Web Audio API Continuous Repeating Sound Alert for New Orders
// Runs until the user explicitly stops it by clicking "Seen" ("رأيته")

class OrderAlarmService {
  private audioCtx: AudioContext | null = null;
  private intervalId: any = null;
  private isRunning: boolean = false;

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;

    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const playBeep = () => {
        if (!this.isRunning || !this.audioCtx) return;

        try {
          if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
          }

          const now = this.audioCtx.currentTime;

          // First tone (880Hz -> A5)
          const osc1 = this.audioCtx.createOscillator();
          const gain1 = this.audioCtx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(880, now);
          osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
          gain1.gain.setValueAtTime(0.35, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc1.connect(gain1);
          gain1.connect(this.audioCtx.destination);
          osc1.start(now);
          osc1.stop(now + 0.3);

          // Second tone (1046Hz -> C6) after 180ms
          const osc2 = this.audioCtx.createOscillator();
          const gain2 = this.audioCtx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1046.5, now + 0.18);
          osc2.frequency.exponentialRampToValueAtTime(1567.98, now + 0.35);
          gain2.gain.setValueAtTime(0.4, now + 0.18);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc2.connect(gain2);
          gain2.connect(this.audioCtx.destination);
          osc2.start(now + 0.18);
          osc2.stop(now + 0.5);
        } catch (err) {
          console.error('Audio chime play error', err);
        }
      };

      // Play immediately
      playBeep();
      // Repeat every 1.5 seconds continuously until stop() is invoked
      this.intervalId = setInterval(playBeep, 1500);
    } catch (e) {
      console.error('Failed to initialize AudioContext', e);
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public isActive(): boolean {
    return this.isRunning;
  }
}

export const orderAlarm = new OrderAlarmService();

// LocalStorage helpers for tracking acknowledged orders
const KEY_ACKNOWLEDGED = 'sotra_acknowledged_orders';

export function getAcknowledgedOrderIds(): string[] {
  try {
    const raw = localStorage.getItem(KEY_ACKNOWLEDGED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markOrdersAsAcknowledged(orderIds: string[]) {
  try {
    const current = getAcknowledgedOrderIds();
    const merged = Array.from(new Set([...current, ...orderIds]));
    localStorage.setItem(KEY_ACKNOWLEDGED, JSON.stringify(merged));
    orderAlarm.stop();
  } catch (e) {
    console.error(e);
  }
}
