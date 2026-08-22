"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  MapPin,
  Compass,
  Star,
  Sparkles,
  Clock,
  Tag,
  ChevronDown,
  Building2,
  Ticket,
  Bot,
  User,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Flame
} from "lucide-react";
import {
  localGuruService,
  SUPPORTED_CITIES,
  DEFAULT_CITY,
  LocalGuruResponse,
  PlaceRecommendation
} from "@/lib/services/localGuruService";
import { useSpeech } from "@/lib/hooks/useSpeech";

interface LocalGuruChatbotProps {
  initialCity?: string;
  className?: string;
  onAddPlaceToTrip?: (place: PlaceRecommendation) => void;
}

export function LocalGuruChatbot({
  initialCity = DEFAULT_CITY,
  className = "",
  onAddPlaceToTrip
}: LocalGuruChatbotProps) {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [customCityInput, setCustomCityInput] = useState("");
  const [isCustomCityMode, setIsCustomCityMode] = useState(false);
  const [messages, setMessages] = useState<LocalGuruResponse[]>([]);
  const [inputQuery, setInputQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [addedPlaces, setAddedPlaces] = useState<Record<string, boolean>>({});

  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    isSpeaking,
    speechSupported,
    voiceOutputEnabled,
    transcript,
    toggleListening,
    speakText,
    stopSpeaking,
    toggleVoiceOutput,
    error: speechError
  } = useSpeech();

  // Handle voice transcript update
  useEffect(() => {
    if (transcript) {
      setInputQuery(transcript);
    }
  }, [transcript]);

  // Initial welcome message on city change
  useEffect(() => {
    const cityInfo = localGuruService.getCityInfo(selectedCity);
    const welcomeMsg: LocalGuruResponse = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      content: `Namaste! 🙏 I am **Travel Guru**, your local travel guide for **${cityInfo.name}**.\n\n${cityInfo.description}\n\nAsk me about famous places to visit, iconic food spots, hidden gems, or best evening sunset views in ${cityInfo.name}! You can also speak to me directly using the voice microphone.`,
      city: selectedCity,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      recommendations: cityInfo.places,
      audioText: `Namaste! I am Travel Guru, your personal travel guide for ${cityInfo.name}. Ask me about famous places to visit or speak to me directly using the microphone button!`
    };
    setMessages([welcomeMsg]);
  }, [selectedCity]);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isThinking) return;

    // Add user message
    const userMsg: LocalGuruResponse = {
      id: `user-${Date.now()}`,
      role: "assistant", // Using assistant/user role structure
      content: query,
      city: selectedCity,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsThinking(true);

    try {
      const botResponse = await localGuruService.queryLocalGuru(query, selectedCity);
      setMessages((prev) => [...prev, botResponse]);

      // Speak response if voice output is enabled
      if (voiceOutputEnabled && botResponse.audioText) {
        speakText(botResponse.audioText);
      }
    } catch (err) {
      console.error("Local Guru error:", err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuickChip = (chipPrompt: string) => {
    handleSendMessage(chipPrompt);
  };

  const handleCustomCitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customCityInput.trim()) {
      setSelectedCity(customCityInput.trim());
      setIsCustomCityMode(false);
      setCustomCityInput("");
    }
  };

  const handleAddTrip = (place: PlaceRecommendation) => {
    setAddedPlaces((prev) => ({ ...prev, [place.id]: true }));
    if (onAddPlaceToTrip) {
      onAddPlaceToTrip(place);
    }
  };

  const cityData = localGuruService.getCityInfo(selectedCity);

  return (
    <div className={`flex flex-col h-[750px] max-h-[85vh] bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden ${className}`}>
      
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 border-b border-slate-800 p-4 md:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Title & Guru Status */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-lg shadow-orange-950/50 text-white font-bold">
                <Compass className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Travel Guru AI
                </h2>
                <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Famous Tourist Guide
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span>{cityData.tagline}</span>
              </p>
            </div>
          </div>

          {/* City Selector & Controls */}
          <div className="flex items-center gap-2.5 self-end md:self-auto">
            {/* Voice Output Toggle */}
            <button
              onClick={toggleVoiceOutput}
              title={voiceOutputEnabled ? "Mute Voice Response" : "Enable Voice Response"}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                voiceOutputEnabled
                  ? "bg-indigo-600/20 border-indigo-500/40 text-indigo-400 hover:bg-indigo-600/30"
                  : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              {voiceOutputEnabled ? (
                <Volume2 className={`w-5 h-5 ${isSpeaking ? "text-amber-400 animate-bounce" : ""}`} />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>

            {/* City Dropdown / Search Toggle */}
            {!isCustomCityMode ? (
              <div className="relative">
                <div className="flex items-center bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-1.5 text-sm text-slate-200">
                  <MapPin className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
                  <select
                    value={SUPPORTED_CITIES.includes(selectedCity) ? selectedCity : "custom"}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        setIsCustomCityMode(true);
                      } else {
                        setSelectedCity(e.target.value);
                      }
                    }}
                    className="bg-transparent text-white font-medium focus:outline-none cursor-pointer pr-6 appearance-none"
                  >
                    {SUPPORTED_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        📍 {c}
                      </option>
                    ))}
                    <option value="custom" className="bg-slate-900 text-amber-400">
                      🔍 Type Other City...
                    </option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2 pointer-events-none" />
                </div>
              </div>
            ) : (
              <form onSubmit={handleCustomCitySubmit} className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value={customCityInput}
                  onChange={(e) => setCustomCityInput(e.target.value)}
                  autoFocus
                  className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 text-sm text-white focus:outline-none focus:border-amber-500 w-36"
                />
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-white px-2.5 py-1.5 rounded-xl text-xs font-semibold"
                >
                  Set
                </button>
                <button
                  type="button"
                  onClick={() => setIsCustomCityMode(false)}
                  className="text-slate-400 hover:text-white px-2 text-xs"
                >
                  ✕
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Audio Wave Bar when Speaking */}
        {isSpeaking && (
          <div className="mt-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-1.5 flex items-center justify-between text-xs text-amber-300">
            <span className="flex items-center gap-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
              Travel Guru is speaking...
            </span>
            <button
              onClick={stopSpeaking}
              className="text-amber-400 hover:underline text-[11px] font-medium"
            >
              Stop Audio
            </button>
          </div>
        )}
      </div>

      {/* QUICK SUGGESTIONS BAR */}
      <div className="bg-slate-950/70 border-b border-slate-800/80 px-4 py-2.5 overflow-x-auto flex items-center gap-2 no-scrollbar scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-amber-500" /> Ask Guru:
        </span>
        {[
          { label: " Top Famous Places", prompt: `What are top famous tourist places in ${selectedCity}?` },
          { label: "🍽️ Famous Food Markets", prompt: `What is famous street food and iconic food places in ${selectedCity}?` },
          { label: "🌅 Evening & Sunset Views", prompt: `Where are the best sunset points and evening viewpoints in ${selectedCity}?` },
          { label: "✨ Secret Local Gems", prompt: `Tell me hidden local gems and offbeat spots in ${selectedCity}.` }
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleQuickChip(chip.prompt)}
            className="shrink-0 bg-slate-800/70 hover:bg-amber-500/20 hover:border-amber-500/40 border border-slate-700/60 text-slate-300 hover:text-amber-200 text-xs px-3 py-1 rounded-full transition-all"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* CHAT MESSAGES LOG */}
      <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {messages.map((msg, index) => {
          const isGuru = msg.id.startsWith("guru") || msg.id.startsWith("welcome");

          return (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${isGuru ? "justify-start" : "justify-end"} max-w-full`}
            >
              {isGuru && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`space-y-3 max-w-[90%] md:max-w-[80%] ${!isGuru ? "items-end" : ""}`}>
                {/* Text Bubble */}
                <div
                  className={`p-4 rounded-2xl text-sm leading-relaxed ${
                    isGuru
                      ? "bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-tl-none shadow-md"
                      : "bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-none shadow-lg shadow-orange-950/40"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                  
                  <div className="mt-2 text-[10px] text-right opacity-60 flex items-center justify-end gap-1">
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {/* Place Recommendation Cards */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3">
                    {msg.recommendations.map((place) => (
                      <div
                        key={place.id}
                        className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition-all hover:shadow-lg hover:shadow-amber-950/20 group flex flex-col justify-between"
                      >
                        <div>
                          {/* Header & Category */}
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {place.category}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{place.rating}</span>
                              <span className="text-[10px] font-normal text-slate-400">
                                ({place.reviewCount})
                              </span>
                            </div>
                          </div>

                          {/* Place Title */}
                          <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                            {place.name}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-slate-300 mt-1.5 line-clamp-3 leading-relaxed">
                            {place.description}
                          </p>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {place.highlights.map((h, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                              >
                                ✓ {h}
                              </span>
                            ))}
                          </div>

                          {/* Logistics Info */}
                          <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                              <Clock className="w-3 h-3 shrink-0" />
                              <span>Best Time: {place.bestTime}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Ticket className="w-3 h-3 text-amber-400 shrink-0" />
                              <span>Entry: {place.entryFee}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                              <span className="truncate">{place.address}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between gap-2">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              `${place.name} ${place.address}`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 py-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Map View
                          </a>

                          <button
                            onClick={() => handleAddTrip(place)}
                            disabled={addedPlaces[place.id]}
                            className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all ${
                              addedPlaces[place.id]
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default"
                                : "bg-amber-600 hover:bg-amber-500 text-white shadow-sm"
                            }`}
                          >
                            {addedPlaces[place.id] ? (
                              <>✓ Added to Trip</>
                            ) : (
                              <>
                                <PlusCircle className="w-3.5 h-3.5" /> Add to Trip
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Thinking Indicator */}
        {isThinking && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0 text-white animate-pulse">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-800 text-slate-300 p-4 rounded-2xl rounded-tl-none border border-slate-700/80 flex items-center gap-2 text-xs">
              <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
              <span>Travel Guru is gathering famous recommendations for {selectedCity}...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* SPEECH & INPUT BAR */}
      <div className="p-3 md:p-4 bg-slate-950 border-t border-slate-800 space-y-2">
        
        {/* Listening Indicator Bar */}
        {isListening && (
          <div className="bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-red-500/40 rounded-xl px-3 py-2 flex items-center justify-between text-xs text-red-200 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="font-semibold">Microphone Active:</span> Speak now (Travel Guru is listening...)
            </div>
            <button
              onClick={toggleListening}
              className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded text-[11px] font-bold"
            >
              Done Speaking
            </button>
          </div>
        )}

        {speechError && (
          <div className="text-xs text-amber-400 bg-amber-950/50 border border-amber-800/60 px-3 py-1 rounded-lg">
            ⚠️ {speechError}
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Microphone Button */}
          {speechSupported ? (
            <button
              type="button"
              onClick={toggleListening}
              title={isListening ? "Stop listening" : "Speak to Travel Guru"}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center shrink-0 ${
                isListening
                  ? "bg-red-600 border-red-400 text-white shadow-lg shadow-red-950/50 scale-105"
                  : "bg-slate-800 hover:bg-amber-600 border-slate-700 text-amber-400 hover:text-white"
              }`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 animate-spin" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          ) : (
            <div title="Voice input not supported in this browser" className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl text-slate-600 cursor-not-allowed">
              <MicOff className="w-5 h-5" />
            </div>
          )}

          {/* Text Input */}
          <input
            type="text"
            placeholder={
              isListening
                ? "Listening... Speak your prompt"
                : `Ask about famous places, food, or sights in ${selectedCity}...`
            }
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            disabled={isThinking}
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
          />

          {/* Submit Send Button */}
          <button
            type="submit"
            disabled={!inputQuery.trim() || isThinking}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white p-3 rounded-xl font-medium shadow-md shadow-orange-950/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-1">
          <span>💡 Tip: Click the microphone to speak your question directly.</span>
          <span className="text-amber-500/80 font-medium">Travel Guru v1.0 • SafarSet AI</span>
        </div>
      </div>
    </div>
  );
}
