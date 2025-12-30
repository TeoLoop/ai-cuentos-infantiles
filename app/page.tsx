"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  Sparkles,
  Download,
  Moon,
  Sun,
  Rocket,
  Volume2,
  Minus,
  Plus,
  Crown,
  Footprints,
  Palmtree,
  Castle,
} from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Galaxy mode
  const [stars, setStars] = useState<
    {
      x: number;
      y: number;
      scale: number;
      opacity: number;
      duration: number;
      delay: number;
      size: number;
    }[]
  >([]);
  const [formData, setFormData] = useState({
    childName: "",
    age: "",
    theme: "Espacio",
  });

  // Hydration Fix: Generate stars only on client side
  useEffect(() => {
    const newStars = Array.from({ length: 50 }).map(() => ({
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
      y:
        Math.random() *
        (typeof window !== "undefined" ? window.innerHeight : 1000),
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random(),
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      size: Math.random() * 3 + 1,
    }));
    setStars(newStars);
  }, []);

  const themes = [
    { id: "Espacio", icon: Rocket, label: "Espacio" },
    { id: "Selva", icon: Palmtree, label: "Selva" },
    { id: "Dinosaurios", icon: Footprints, label: "Dinos" },
    { id: "Princesas", icon: Crown, label: "Princesas" },
    { id: "Fantasía", icon: Castle, label: "Fantasía" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAudioUrl(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: formData.childName,
          age: Number(formData.age),
          theme: formData.theme,
        }),
      });

      if (!response.ok) throw new Error("Error generating story");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error("Failed to generate story:", error);
      alert("Hubo un error al generar el cuento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        "relative min-h-screen overflow-hidden transition-colors duration-1000 font-sans",
        isDarkMode ? "bg-slate-950 text-white" : "bg-sky-50 text-slate-900"
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {isDarkMode ? (
          // Galaxy Background
          <>
            <motion.div
              animate={{
                background: [
                  "radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 50%)",
                  "radial-gradient(circle at 60% 40%, #4c1d95 0%, transparent 50%)",
                  "radial-gradient(circle at 40% 60%, #4c1d95 0%, transparent 50%)",
                  "radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-40 blur-3xl"
            />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            {/* Stars */}
            {stars.map((star, i) => (
              <motion.div
                key={i}
                className="absolute bg-white rounded-full"
                initial={{
                  x: star.x,
                  y: star.y,
                  scale: star.scale,
                  opacity: star.opacity,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                }}
                style={{ width: star.size, height: star.size }}
              />
            ))}
          </>
        ) : (
          // Cloudy Background
          <>
            <motion.div
              animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 5,
              }}
              className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
            />
          </>
        )}
      </div>

      {/* Navbar/Header */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 1 }}>
            <Sparkles
              className={clsx(
                "w-8 h-8",
                isDarkMode ? "text-violet-400" : "text-violet-600"
              )}
            />
          </motion.div>
          <span
            className={clsx(
              "text-xl font-bold tracking-tight",
              isDarkMode ? "text-white" : "text-slate-800"
            )}
          >
            Cuentos
            <span
              className={isDarkMode ? "text-violet-400" : "text-violet-600"}
            >
              Mágicos
            </span>
          </span>
        </div>

        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={clsx(
            "p-2 rounded-full transition-all duration-300",
            isDarkMode
              ? "bg-white/10 hover:bg-white/20 text-yellow-300"
              : "bg-slate-100 hover:bg-slate-200 text-slate-600"
          )}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-4 pb-20 min-h-[calc(100vh-160px)]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center text-center p-8"
            >
              {/* Galactic Spinner */}
              <div className="relative w-40 h-40 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className={clsx(
                    "absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent",
                    isDarkMode ? "border-violet-500" : "border-violet-300"
                  )}
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className={clsx(
                    "absolute inset-4 rounded-full border-4 border-r-transparent border-l-transparent",
                    isDarkMode ? "border-fuchsia-500" : "border-fuchsia-300"
                  )}
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-violet-400" />
                </motion.div>
              </div>

              <h2
                className={clsx(
                  "text-3xl font-bold mb-4",
                  isDarkMode ? "text-white" : "text-slate-800"
                )}
              >
                Escribiendo tu Historia...
              </h2>
              <p
                className={clsx(
                  "text-lg max-w-md",
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                )}
              >
                La IA está viajando por la galaxia de la imaginación para crear
                un cuento único sobre
                <span className="font-bold text-violet-500 mx-1">
                  {formData.theme}
                </span>
                para{" "}
                <span className="font-bold text-violet-500">
                  {formData.childName}
                </span>
                .
              </p>
            </motion.div>
          ) : !audioUrl ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl"
            >
              <div
                className={clsx(
                  "backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border transition-colors duration-500",
                  isDarkMode
                    ? "bg-white/5 border-white/10 shadow-violet-900/20"
                    : "bg-white/60 border-white/40 shadow-xl"
                )}
              >
                <div className="text-center mb-10">
                  <h1
                    className={clsx(
                      "text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r",
                      isDarkMode
                        ? "from-violet-200 via-white to-fuchsia-200"
                        : "from-violet-600 via-purple-600 to-fuchsia-600"
                    )}
                  >
                    Crea Cuentos Mágicos
                  </h1>
                  <p
                    className={clsx(
                      "text-lg",
                      isDarkMode ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    ¡Historias personalizadas narradas para tus pequeños!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Input */}
                    <div className="space-y-3">
                      <label
                        className={clsx(
                          "text-sm font-bold uppercase tracking-wider",
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        )}
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.childName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            childName: e.target.value,
                          })
                        }
                        placeholder="Ej: Esteban"
                        className={clsx(
                          "w-full px-6 py-4 rounded-2xl outline-none transition-all duration-300 border-2",
                          isDarkMode
                            ? "bg-slate-900/50 border-slate-700 focus:border-violet-500 text-white placeholder:text-slate-600 focus:bg-slate-900"
                            : "bg-white border-slate-200 focus:border-violet-500 text-slate-800 focus:bg-white"
                        )}
                      />
                    </div>

                    {/* Age Input (Custom Pro) */}
                    <div className="space-y-3">
                      <label
                        className={clsx(
                          "text-sm font-bold uppercase tracking-wider",
                          isDarkMode ? "text-slate-400" : "text-slate-500"
                        )}
                      >
                        Edad
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            const val = Number(formData.age) || 0;
                            if (val > 1)
                              setFormData({
                                ...formData,
                                age: String(val - 1),
                              });
                          }}
                          className={clsx(
                            "w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-sm border-2",
                            isDarkMode
                              ? "bg-slate-800 hover:bg-slate-700 text-violet-400 border-slate-700"
                              : "bg-white hover:bg-violet-50 text-violet-600 border-slate-100"
                          )}
                        >
                          <Minus className="w-6 h-6" />
                        </button>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            required
                            value={formData.age}
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "" || /^\d+$/.test(val)) {
                                setFormData({ ...formData, age: val });
                              }
                            }}
                            onBlur={() => {
                              if (!formData.age) return;
                              let val = parseInt(formData.age);
                              if (isNaN(val) || val < 1) val = 1;
                              if (val > 12) val = 12;
                              setFormData({ ...formData, age: String(val) });
                            }}
                            className={clsx(
                              "w-full px-6 py-4 rounded-xl text-center font-bold text-xl outline-none border-2 transition-all",
                              isDarkMode
                                ? "bg-slate-900/50 border-slate-700 focus:border-violet-500 text-white"
                                : "bg-white border-slate-200 focus:border-violet-500 text-slate-800"
                            )}
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const val = Number(formData.age) || 0;
                            if (val < 12)
                              setFormData({
                                ...formData,
                                age: String(val + 1),
                              });
                          }}
                          className={clsx(
                            "w-14 h-14 rounded-xl flex items-center justify-center transition-all active:scale-90 shadow-sm border-2",
                            isDarkMode
                              ? "bg-slate-800 hover:bg-slate-700 text-violet-400 border-slate-700"
                              : "bg-white hover:bg-violet-50 text-violet-600 border-slate-100"
                          )}
                        >
                          <Plus className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Theme Selector */}
                  <div className="space-y-3">
                    <label
                      className={clsx(
                        "text-sm font-bold uppercase tracking-wider",
                        isDarkMode ? "text-slate-400" : "text-slate-500"
                      )}
                    >
                      Temática
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {themes.map((theme) => {
                        const Icon = theme.icon;
                        const isSelected = formData.theme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            type="button"
                            onClick={() =>
                              setFormData({ ...formData, theme: theme.id })
                            }
                            className={clsx(
                              "flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all duration-300 gap-2",
                              isSelected
                                ? "border-violet-500 bg-violet-500/10 scale-105 shadow-lg shadow-violet-500/20"
                                : isDarkMode
                                ? "border-slate-800 bg-slate-900/40 hover:border-slate-600 hover:bg-slate-800"
                                : "border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50"
                            )}
                          >
                            <Icon
                              className={clsx(
                                "w-6 h-6",
                                isSelected
                                  ? "text-violet-500"
                                  : isDarkMode
                                  ? "text-slate-400"
                                  : "text-slate-400"
                              )}
                            />
                            <span
                              className={clsx(
                                "text-xs font-medium",
                                isSelected
                                  ? "text-violet-500"
                                  : isDarkMode
                                  ? "text-slate-400"
                                  : "text-slate-600"
                              )}
                            >
                              {theme.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="relative w-full py-5 rounded-2xl font-bold text-lg overflow-hidden group shadow-xl"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-transform duration-300 group-hover:scale-105" />
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                    <span className="relative z-10 text-white flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5 fill-white" />
                      Crear Historia Mágica
                    </span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          ) : (
            // Result View
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full max-w-md"
            >
              <div
                className={clsx(
                  "backdrop-blur-xl rounded-3xl p-8 shadow-2xl border text-center relative overflow-hidden",
                  isDarkMode
                    ? "bg-white/10 border-white/20"
                    : "bg-white/80 border-white/60"
                )}
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500" />

                <div className="w-20 h-20 mx-auto bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <Volume2 className="w-10 h-10 text-green-500" />
                </div>

                <h2
                  className={clsx(
                    "text-3xl font-bold mb-2",
                    isDarkMode ? "text-white" : "text-slate-800"
                  )}
                >
                  ¡Cuento Listo!
                </h2>
                <p
                  className={clsx(
                    "mb-8",
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  )}
                >
                  La historia de {formData.childName} está preparada para ser
                  escuchada.
                </p>

                <div className="bg-black/5 rounded-xl p-4 mb-8">
                  <audio src={audioUrl} controls className="w-full" autoPlay />
                </div>

                <div className="space-y-3">
                  <a
                    href={audioUrl}
                    download={`Cuento_de_${formData.childName}.mp3`}
                    className={clsx(
                      "block w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2",
                      isDarkMode
                        ? "bg-white text-slate-900 hover:bg-slate-200"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    )}
                  >
                    <Download className="w-5 h-5" />
                    Descargar MP3
                  </a>

                  <button
                    onClick={() => setAudioUrl(null)}
                    className="w-full py-4 rounded-xl font-bold text-violet-500 hover:bg-violet-500/10 transition-colors"
                  >
                    Crear otro cuento
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer
        className={clsx(
          "w-full py-6 text-center relative z-10",
          isDarkMode ? "text-slate-500" : "text-slate-400 font-medium"
        )}
      >
        <p>Desarrollado por Mateo Lopez Pagani</p>
      </footer>
    </div>
  );
}
