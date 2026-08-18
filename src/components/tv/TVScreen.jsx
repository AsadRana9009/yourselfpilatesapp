"use client";

import { Music2, Pause, Phone, Play, QrCode, Wifi } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { fetchNowPlaying, fetchScreen } from "@/lib/tvApi";

import "./tv-screen.css";

/** How often the whole payload is refreshed so new uploads appear by themselves. */
const PLAYLIST_REFRESH_MS = 10 * 60 * 1000;

/**
 * Everything on this screen is rendered in the gym's timezone, never the
 * viewer's. The backend resolves booking windows in that same zone, so a TV
 * (or a laptop previewing one) sitting in another country still shows a clock
 * that agrees with when the class actually starts and ends.
 */
function formatClock(date, timeZone) {
  return date.toLocaleTimeString("pt-PT", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  });
}

function formatDate(date, timeZone) {
  // Formatted one part at a time on purpose: asking for day+month together
  // makes pt-PT switch to a numeric "17/08" instead of "17 AGO".
  const weekday = date.toLocaleDateString("pt-PT", { weekday: "long", timeZone });
  const day = date.toLocaleDateString("pt-PT", { day: "2-digit", timeZone });
  const month = date
    .toLocaleDateString("pt-PT", { month: "short", timeZone })
    .replace(".", "");
  return `${weekday}, ${day} ${month}`.toUpperCase();
}

/** "Ana", "Ana e Rui", "Ana, Rui e Sofia" — how the rail names a class. */
function joinNames(names = []) {
  const clean = names.filter(Boolean);
  if (clean.length <= 1) return clean[0] ?? "";
  return `${clean.slice(0, -1).join(", ")} e ${clean.at(-1)}`;
}

function toMillis(value) {
  if (!value) return null;
  const ms = new Date(value).getTime();
  return Number.isFinite(ms) ? ms : null;
}

function toDate(value) {
  const ms = toMillis(value);
  return ms === null ? null : new Date(ms);
}

export default function TVScreen({ token, initialData }) {
  const [data, setData] = useState(initialData);
  const [nowPlaying, setNowPlaying] = useState(initialData.now_playing);
  // Seeded from the backend's own "now", so the first paint already carries a
  // real time instead of a placeholder that lingers until the page hydrates.
  // Server and client both start from that same fixed string, so the markup
  // still matches; the tick below takes over from there.
  const [clock, setClock] = useState(() => toDate(initialData.server_time));
  const [videoIndex, setVideoIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const videos = useMemo(() => data.videos ?? [], [data.videos]);
  const tracks = useMemo(() => data.tracks ?? [], [data.tracks]);
  const screen = data.screen ?? {};
  // Falls back to the viewer's zone only if the backend did not say.
  const timeZone = data.timezone || undefined;

  const currentVideo = videos.length ? videos[videoIndex % videos.length] : null;
  const currentTrack = tracks.length ? tracks[trackIndex % tracks.length] : null;

  // --- Clock: the browser's own time from here on, to the second ---
  useEffect(() => {
    const tick = () => setClock(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // --- Welcome banner: poll the lightweight endpoint ---
  const refreshNowPlaying = useCallback(async () => {
    try {
      const res = await fetchNowPlaying(token);
      setNowPlaying(res.now_playing);
    } catch {
      // Keep showing the last known state until the backend is reachable.
    }
  }, [token]);

  useEffect(() => {
    const intervalMs = Math.max(10, screen.refresh_interval_seconds || 60) * 1000;
    // Straight away as well as on the interval: the page was server-rendered a
    // moment ago, and a booking edited since then should not wait a full cycle.
    refreshNowPlaying();
    const id = setInterval(refreshNowPlaying, intervalMs);

    // A TV that was asleep, or a tab left in the background, comes back to a
    // frozen screen otherwise — timers there are throttled or stopped.
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshNowPlaying();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshNowPlaying, screen.refresh_interval_seconds]);

  // The rail must turn over on the slot boundary itself, not on the next poll:
  // the class that just ended leaves the screen, and the one starting takes its
  // place. Both edges are scheduled, whichever comes first.
  useEffect(() => {
    const endMs = nowPlaying?.active ? toMillis(nowPlaying.ends_at) : null;
    const startMs = toMillis(nowPlaying?.up_next?.starts_at);
    const boundaries = [endMs, startMs].filter((ms) => ms !== null);
    if (!boundaries.length) return undefined;

    const boundary = Math.min(...boundaries);
    // Dropping the finished class locally as well means it never lingers on
    // screen just because the backend happened to be unreachable.
    const turnOver = () => {
      if (boundary === endMs) {
        setNowPlaying((prev) => (prev?.active ? { ...prev, active: false } : prev));
      }
      refreshNowPlaying();
    };

    const msLeft = boundary - Date.now();
    if (msLeft <= 0) {
      turnOver();
      return undefined;
    }
    // A second of slack so the backend agrees the boundary has passed.
    const id = setTimeout(turnOver, msLeft + 1000);
    return () => clearTimeout(id);
  }, [
    nowPlaying?.active,
    nowPlaying?.ends_at,
    nowPlaying?.up_next?.starts_at,
    refreshNowPlaying,
  ]);

  // --- Pick up newly uploaded media, and edits to the region's own details,
  //     without anyone touching the TV ---
  const refreshScreen = useCallback(async () => {
    try {
      const fresh = await fetchScreen(token);
      if (!fresh) return;
      setData((prev) => {
        const sameVideos =
          JSON.stringify(prev.videos.map((v) => v.id)) ===
          JSON.stringify(fresh.videos.map((v) => v.id));
        const sameTracks =
          JSON.stringify(prev.tracks.map((t) => t.id)) ===
          JSON.stringify(fresh.tracks.map((t) => t.id));
        // Restart the playlists only when their contents actually changed,
        // so a routine refresh never interrupts what is playing.
        if (!sameVideos) setVideoIndex(0);
        if (!sameTracks) setTrackIndex(0);
        return fresh;
      });
    } catch {
      // Ignore — the screen keeps playing what it already has.
    }
  }, [token]);

  useEffect(() => {
    const id = setInterval(refreshScreen, PLAYLIST_REFRESH_MS);
    // The footer rides on this payload, so a screen someone walks back to
    // shows the region's current phone and Wi-Fi rather than a ten-minute-old
    // copy of them.
    const onVisible = () => {
      if (document.visibilityState === "visible") refreshScreen();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refreshScreen]);

  // --- QR code for the booking card ---
  useEffect(() => {
    if (!screen.booking_url) {
      setQrDataUrl(null);
      return;
    }
    let cancelled = false;
    import("qrcode")
      .then((QRCode) =>
        QRCode.toDataURL(screen.booking_url, {
          margin: 1,
          width: 320,
          color: { dark: "#0b1f3a", light: "#ffffff" },
        })
      )
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [screen.booking_url]);

  // --- Music: never starts on its own; it follows the user's choice ---
  // The video is muted and plays by itself, but sound is not something to
  // impose on a room. `musicOn` is that choice, and the playlist keeps
  // honouring it as one track rolls into the next.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!musicOn) {
      audio.pause();
      return;
    }
    // A rejected play() means the browser blocked it despite the click, so
    // fall back to "off" rather than showing a Stop button over silence.
    audio.play().catch(() => setMusicOn(false));
  }, [musicOn, currentTrack?.id]);

  const toggleMusic = useCallback(() => setMusicOn((on) => !on), []);

  // --- Keep the TV awake ---
  useEffect(() => {
    let lock = null;
    const request = async () => {
      try {
        lock = await navigator.wakeLock?.request("screen");
      } catch {
        // Not supported or denied — harmless.
      }
    };
    request();
    const onVisible = () => {
      if (document.visibilityState === "visible") request();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      lock?.release?.().catch(() => {});
    };
  }, []);

  const nextVideo = useCallback(() => {
    setVideoIndex((i) => (videos.length ? (i + 1) % videos.length : 0));
  }, [videos.length]);

  const nextTrack = useCallback(() => {
    setTrackIndex((i) => (tracks.length ? (i + 1) % tracks.length : 0));
  }, [tracks.length]);

  const welcomeActive = Boolean(nowPlaying?.active && nowPlaying?.message);

  // Who the room belongs to right now — nobody is named on the rail outside
  // their own hour. The backend resolves this against the region's confirmed
  // bookings and the slot's real start/end, and the timer above swaps the
  // block over the moment one class ends and the next begins.
  const sessionName = joinNames(nowPlaying?.students);
  const sessionActive = Boolean(
    nowPlaying?.active && (sessionName || nowPlaying?.time_slot)
  );

  return (
    <div className="tv-screen">
      {/* ---------------- Left rail ---------------- */}
      <aside className="tv-rail">
        <div className="tv-rail__brand">
          {/* Ylogo.png is opaque white edge to edge, so on this dark rail it
              reads as a pale box rather than a mark. This one carries a real
              alpha channel. */}
          <Image
            src="/logos/yourself-mark-light.png"
            alt=""
            width={512}
            height={512}
            className="tv-rail__mark"
            priority
          />
          <Image
            src="/images/HeroSectionLogo.png"
            alt="YourSelf Pilates"
            width={324}
            height={68}
            className="tv-rail__wordmark"
            priority
          />
          <p className="tv-rail__tagline">Simplifying your pilates</p>
        </div>

        <div className="tv-rail__clock">
          <div className="tv-clock">
            {clock ? formatClock(clock, timeZone) : "--:--"}
          </div>
          <div className="tv-date">
            {clock ? formatDate(clock, timeZone) : ""}
          </div>

          {sessionActive && (
            <div className="tv-session">
              <span className="tv-rail__rule" />
              <p className="tv-session__label">Em aula</p>
              {sessionName && <p className="tv-session__name">{sessionName}</p>}
              {nowPlaying.time_slot && (
                <p className="tv-session__slot">{nowPlaying.time_slot}</p>
              )}
            </div>
          )}
        </div>

        <div className="tv-rail__quote">
          <span className="tv-rail__rule" />
          {screen.quote_text && <p className="tv-quote">“{screen.quote_text}”</p>}
          {screen.quote_author && (
            <p className="tv-quote__author">{screen.quote_author}</p>
          )}
        </div>
      </aside>

      {/* ---------------- Main ---------------- */}
      <main className="tv-main">
        <SectionLabel>Inspiração · Pilates</SectionLabel>

        <section className="tv-video">
          {currentVideo ? (
            <video
              ref={videoRef}
              key={currentVideo.id}
              src={currentVideo.src}
              className="tv-video__el"
              autoPlay
              muted
              playsInline
              onEnded={nextVideo}
              onError={nextVideo}
            />
          ) : (
            <div className="tv-video__empty">
              <p>Sem vídeos para esta localização</p>
            </div>
          )}
          {currentVideo?.caption && (
            <span className="tv-video__caption">{currentVideo.caption}</span>
          )}
        </section>

        <div className="tv-cards">
          {/* First rectangle: music, or the welcome message while a class runs */}
          <section className="tv-card">
            <SectionLabel>
              {welcomeActive ? "Aula a decorrer" : "Música ambiente"}
            </SectionLabel>
            <div className="tv-card__body">
              {welcomeActive ? (
                <div className="tv-welcome">
                  <p className="tv-welcome__message">{nowPlaying.message}</p>
                  {nowPlaying.teacher && (
                    <p className="tv-welcome__teacher">
                      Com {nowPlaying.teacher}
                      {nowPlaying.time_slot ? ` · ${nowPlaying.time_slot}` : ""}
                    </p>
                  )}
                  {currentTrack && (
                    <p className="tv-welcome__track">
                      <Music2 className="tv-icon-sm" /> {currentTrack.title}
                      <MusicToggle on={musicOn} onToggle={toggleMusic} />
                    </p>
                  )}
                </div>
              ) : (
                <div className="tv-music">
                  <span className="tv-music__badge">
                    <Music2 className="tv-icon" />
                  </span>
                  <div className="tv-music__meta">
                    <p className="tv-music__title">
                      {currentTrack ? currentTrack.title : "Sem música"}
                    </p>
                    <p className="tv-music__sub">
                      {!currentTrack
                        ? "Nenhuma faixa carregada"
                        : musicOn
                          ? "A tocar…"
                          : "Toque em Tocar para ouvir"}
                    </p>
                  </div>
                  {currentTrack && (
                    <MusicToggle on={musicOn} onToggle={toggleMusic} />
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Booking / QR card */}
          <section className="tv-card tv-card--accent">
            <SectionLabel>Agendar</SectionLabel>
            <div className="tv-card__body tv-booking">
              <div className="tv-booking__qr">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={qrDataUrl} alt="QR code para agendar" />
                ) : (
                  <QrCode className="tv-booking__qr-placeholder" />
                )}
              </div>
              <div className="tv-booking__meta">
                <p className="tv-booking__eyebrow">Próxima aula</p>
                <p className="tv-booking__title">
                  {screen.booking_cta_title || "Agendar Online"}
                </p>
                <p className="tv-booking__sub">{screen.booking_cta_subtitle}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ---------------- Footer bar ---------------- */}
      <footer className="tv-footer">
        {screen.contact_phone && (
          <span className="tv-footer__item">
            <Phone className="tv-icon-sm" /> <strong>{screen.contact_phone}</strong>
          </span>
        )}
        {screen.wifi_name && (
          <span className="tv-footer__item">
            <Wifi className="tv-icon-sm" /> Rede: <strong>{screen.wifi_name}</strong>
          </span>
        )}
        {screen.wifi_password && (
          <span className="tv-footer__item">
            Senha: <strong>{screen.wifi_password}</strong>
          </span>
        )}
      </footer>

      {/* Drives the playlist. Deliberately no `autoPlay` — the Tocar/Parar
          button above is the only thing that starts it. */}
      {currentTrack && (
        <audio
          ref={audioRef}
          key={currentTrack.id}
          src={currentTrack.src}
          onEnded={nextTrack}
          onError={nextTrack}
        />
      )}
    </div>
  );
}

function MusicToggle({ on, onToggle }) {
  return (
    <button
      type="button"
      className="tv-music__toggle"
      onClick={onToggle}
      aria-pressed={on}
    >
      {on ? (
        <Pause className="tv-icon-sm" />
      ) : (
        <Play className="tv-icon-sm" />
      )}
      <span>{on ? "Parar" : "Tocar"}</span>
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="tv-label">
      <span>{children}</span>
      <span className="tv-label__rule" />
    </div>
  );
}
