'use client';

import { useState, useRef, useEffect } from 'react';
import { useOnboardingStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import { analyzeFoodImage } from '@/lib/actions/foodAnalysis';

export default function PhotoLogger({ onClose }: { onClose: () => void }) {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [detectedItem, setDetectedItem] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const addLog = useOnboardingStore(state => state.addLog);

    useEffect(() => {
        async function setupCamera() {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'environment' }
                });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (err) {
                console.error("Camera access error:", err);
            }
        }
        setupCamera();

        return () => {
            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const takePhoto = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // Compress slightly
        setCapturedImage(dataUrl);
        stream?.getTracks().forEach(track => track.stop());

        // Start Real AI Analysis
        analyzePhoto(dataUrl);
    };

    const analyzePhoto = async (image: string) => {
        setIsAnalyzing(true);
        setError(null);

        const result = await analyzeFoodImage(image);

        setIsAnalyzing(false);
        if (result.success) {
            setDetectedItem(result.data);
        } else {
            setError(result.error || 'Failed to detect food.');
        }
    };

    const confirmLog = () => {
        if (detectedItem) {
            addLog(detectedItem);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black">
            <div className="relative w-full h-full max-w-md mx-auto flex flex-col">
                {/* Camera View / Preview */}
                <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                    {!capturedImage ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img src={capturedImage} className="w-full h-full object-cover" />
                    )}

                    {/* Analysis Overlay */}
                    <AnimatePresence>
                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-brand-teal/20 backdrop-blur-sm flex flex-col items-center justify-center"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full mb-4"
                                />
                                <p className="text-white font-black italic tracking-widest">AI ANALYZING...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* UI Overlay */}
                <div className="absolute top-6 left-6 right-6 flex justify-between">
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white backdrop-blur-md">
                        <span className="material-icons">close</span>
                    </button>
                    <div className="px-4 py-2 rounded-full bg-black/40 text-white text-xs font-bold backdrop-blur-md flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        LIVE VISION
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="p-10 bg-gradient-to-t from-black to-transparent flex flex-col items-center gap-6">
                    {!capturedImage ? (
                        <button
                            onClick={takePhoto}
                            className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1"
                        >
                            <div className="w-full h-full bg-white rounded-full active:scale-90 transition-transform" />
                        </button>
                    ) : detectedItem ? (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="w-full"
                        >
                            <GlassCard className="p-6 border-brand-teal/30 bg-white/5">
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-4xl">{detectedItem.emoji}</span>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Detected: {detectedItem.name}</h4>
                                        <p className="text-brand-teal text-xs font-bold uppercase tracking-wider">
                                            Estimated {detectedItem.sugarAmount}g Sugar
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[10px] text-white/40 italic leading-relaxed mb-4 border-l-2 border-brand-teal/20 pl-3">
                                    {detectedItem.reasoning}
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setCapturedImage(null);
                                            setDetectedItem(null);
                                        }}
                                        className="flex-1 py-3 rounded-xl bg-white/10 text-white font-bold text-sm"
                                    >
                                        Retake
                                    </button>
                                    <button
                                        onClick={confirmLog}
                                        className="flex-2 py-3 px-8 rounded-xl bg-brand-teal text-bg-base font-black text-sm uppercase tracking-wider"
                                    >
                                        Log Item
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ) : error ? (
                        <div className="w-full text-center">
                            <p className="text-brand-coral text-xs font-bold mb-4">{error}</p>
                            <button
                                onClick={() => {
                                    setCapturedImage(null);
                                    setError(null);
                                }}
                                className="px-6 py-2 rounded-xl bg-white/10 text-white font-bold text-xs"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <p className="text-white/40 italic">Processing Vision...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
