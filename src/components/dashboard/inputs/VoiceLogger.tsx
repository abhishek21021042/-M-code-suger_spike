'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useOnboardingStore } from '@/lib/store';
import { analyzeVoiceLog } from '@/lib/actions/voiceAnalysis';

export default function VoiceLogger({ onClose }: { onClose: () => void }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);
    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);
    const { addLog } = useOnboardingStore();

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];

            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async () => {
                    const base64Audio = (reader.result as string).split(',')[1];
                    setIsAnalyzing(true);

                    try {
                        const analysis = await analyzeVoiceLog(base64Audio);
                        setResult(analysis);
                    } catch (error) {
                        console.error(error);
                        // TODO: Handle error state in UI
                    } finally {
                        setIsAnalyzing(false);
                    }
                };
            };

            mediaRecorder.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && isRecording) {
            mediaRecorder.current.stop();
            setIsRecording(false);
        }
    };

    const handleConfirm = () => {
        if (result && result.items) {
            result.items.forEach((item: any) => {
                addLog({
                    emoji: item.emoji || '🍽️',
                    name: item.name,
                    xp: 10, // Base XP for voice logs
                    sugar: item.sugar || 0,
                    // timestamps handled in store
                });
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="w-full max-w-sm"
            >
                <GlassCard className="p-6 flex flex-col items-center gap-6 relative overflow-hidden">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/40 hover:text-white"
                    >
                        <span className="material-icons">close</span>
                    </button>

                    {!result ? (
                        <>
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Voice Log</h3>
                                <p className="text-sm text-white/50">
                                    {isRecording ? "Listening..." : isAnalyzing ? "Analyzing..." : "Tap to start recording"}
                                </p>
                            </div>

                            <div className="relative">
                                {isRecording && (
                                    <div className="absolute inset-0 bg-brand-teal/20 rounded-full animate-ping" />
                                )}
                                <button
                                    onClick={isRecording ? stopRecording : startRecording}
                                    disabled={isAnalyzing}
                                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isRecording
                                            ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
                                            : isAnalyzing
                                                ? 'bg-white/10 animate-pulse'
                                                : 'bg-brand-teal shadow-[0_0_30px_rgba(78,205,196,0.3)] hover:scale-105'
                                        }`}
                                >
                                    <span className="material-icons text-3xl text-white">
                                        {isRecording ? 'stop' : 'mic'}
                                    </span>
                                </button>
                            </div>

                            {isAnalyzing && (
                                <p className="text-xs text-brand-teal animate-pulse">
                                    Consulting with Gemini AI...
                                </p>
                            )}
                        </>
                    ) : (
                        // Results View
                        <>
                            <div className="w-full">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <span className="text-brand-teal">✨</span> Analysis Complete
                                </h3>

                                <div className="space-y-3 mb-6 max-h-[40vh] overflow-y-auto">
                                    {result.items.map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{item.emoji}</span>
                                                <div>
                                                    <p className="font-bold text-sm">{item.name}</p>
                                                    <p className="text-xs text-white/50">{item.sugar}g sugar</p>
                                                </div>
                                            </div>
                                            <div className="w-4 h-4 rounded-full border-2 border-brand-teal flex items-center justify-center">
                                                <div className="w-2 h-2 bg-brand-teal rounded-full" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-3 rounded-xl bg-brand-teal/10 border border-brand-teal/20 mb-6">
                                    <p className="text-xs text-brand-teal italic">
                                        "{result.insight}"
                                    </p>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    className="w-full py-3 rounded-xl bg-brand-teal text-bg-base font-bold shadow-lg shadow-brand-teal/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Log Meals
                                </button>
                            </div>
                        </>
                    )}
                </GlassCard>
            </motion.div>
        </div>
    );
}

// Ensure store types handle optional timestamp if needed, but 'addLog' usually generates it.
