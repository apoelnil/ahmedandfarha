/**
 * Dedicated Wedding Music Player
 * Plays /wedding_music.mp3 directly from the public folder.
 */

type StateCallback = (isPlaying: boolean, isMuted: boolean) => void;

class WeddingAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private userMuted: boolean = false;
  private listeners: Set<StateCallback> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    if (this.audio) return;
    try {
      this.audio = new Audio(`/wedding_music.mp3?t=${Date.now()}`);
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0.9;

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        if (!this.userMuted && this.audio) {
          this.audio.currentTime = 0;
          this.audio.play().catch(() => {});
        }
      });
    } catch (err) {
      console.warn('Audio init error:', err);
    }
  }

  public subscribe(cb: StateCallback): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying, this.userMuted);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.userMuted));
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public isExplicitlyMuted(): boolean {
    return this.userMuted;
  }

  /**
   * Synchronously starts playback on user touch/gesture.
   * Required for iOS Safari / WebKit which blocks async autoplay.
   */
  public unlockAndPlay(): boolean {
    if (this.userMuted) return false;
    this.init();
    if (!this.audio) return false;

    try {
      const promise = this.audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            this.isPlaying = true;
            this.notify();
          })
          .catch((err) => {
            // Browser still awaiting interaction
            console.warn('Playback pending user interaction:', err);
          });
      }
      return true;
    } catch {
      return false;
    }
  }

  /**
   * User manually hits the mute/unmute button.
   */
  public toggle(): boolean {
    this.init();
    if (!this.audio) return false;

    if (this.isPlaying) {
      this.userMuted = true;
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
      return false;
    } else {
      this.userMuted = false;
      this.unlockAndPlay();
      this.isPlaying = true;
      this.notify();
      return true;
    }
  }
}

export const ambientPlayer = new WeddingAudioPlayer();
