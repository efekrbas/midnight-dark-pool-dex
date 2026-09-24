"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Star,
  Send,
  CheckCircle2,
  FileSpreadsheet,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1lJdl4-OgFB_uUNcVRz_UCP5-wMMWjORsupMcPhOHUAY/edit?usp=sharing";
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd-Dn6hy4C4p_jsU2KtNdebh_mUUYm03XKZFepFSLSD08yHjA/viewform";

type FeedbackCategory = "General" | "Bug Report" | "Feature Request" | "ZK Privacy" | "UI / UX";

export default function FeedbackWidget() {
  const { notify } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"quick" | "sheet" | "survey">("quick");
  const [type, setType] = useState<FeedbackCategory>("General");
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [returnedSheetUrl, setReturnedSheetUrl] = useState<string>(GOOGLE_SHEET_URL);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || rating === 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, rating, text }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus("success");
        if (data.sheetUrl) {
          setReturnedSheetUrl(data.sheetUrl);
        }
        notify("Saved to Google Sheets", "Your response has been synchronized to our live Google Sheet.", "success");
      } else {
        setStatus("idle");
        notify("Submission Failed", data.error || "Failed to sync to Google Sheets.", "error");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      setStatus("idle");
      notify("Network Error", error.message || "Could not reach feedback service.", "error");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setText("");
    setRating(5);
    setType("General");
  };

  return (
    <>
      {/* Minimalist Floating Trigger Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="fixed bottom-6 right-6 px-3.5 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-650 shadow-2xl z-50 flex items-center gap-2 cursor-pointer select-none text-xs font-mono backdrop-blur-md transition-colors"
        aria-label="Open User Feedback Dialog"
      >
        <MessageSquare className="w-4 h-4 text-zinc-300" />
        <span className="font-medium">Feedback</span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500" />
        </span>
      </motion.button>

      {/* Feedback Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl text-zinc-100 z-10 overflow-hidden font-sans"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-zinc-900">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-semibold text-white">
                      Trader Feedback
                    </h2>
                    <Badge variant="success" className="text-[10px] py-0 px-1.5">
                      Google Sheets
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-400 font-normal">
                    Synced in real-time to Google Sheets for governance & audit.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-1 text-zinc-500 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-black border border-zinc-850 rounded-lg my-4 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("quick")}
                  className={`py-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "quick"
                      ? "bg-zinc-850 text-white font-medium shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  Quick Sync
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sheet")}
                  className={`py-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "sheet"
                      ? "bg-zinc-850 text-white font-medium shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  Live Sheet
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("survey")}
                  className={`py-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === "survey"
                      ? "bg-zinc-850 text-white font-medium shadow-sm"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  Survey Form
                </button>
              </div>

              {/* Tab 1: Quick Sync Feedback */}
              {activeTab === "quick" && (
                <div>
                  {status === "success" ? (
                    <div className="py-6 flex flex-col items-center text-center space-y-4 font-sans">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-white">Recorded in Google Sheets</h3>
                        <p className="text-xs text-zinc-400 max-w-xs">
                          Your response has been appended to the public Google Sheet database.
                        </p>
                      </div>

                      <div className="w-full pt-2 flex flex-col sm:flex-row gap-2">
                        <a
                          href={returnedSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="default" size="sm" className="w-full gap-1.5">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            Open Google Sheet ↗
                          </Button>
                        </a>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleReset}
                          className="flex-1"
                        >
                          Submit Another
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Category Selection */}
                      <div className="space-y-1.5">
                        <label className="text-xs text-zinc-400 font-mono">Category</label>
                        <div className="flex flex-wrap gap-1.5">
                          {(
                            [
                              "General",
                              "Bug Report",
                              "Feature Request",
                              "ZK Privacy",
                              "UI / UX",
                            ] as FeedbackCategory[]
                          ).map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setType(cat)}
                              className={`text-xs px-2.5 py-1 rounded-md border transition-all cursor-pointer font-mono ${
                                type === cat
                                  ? "bg-white text-black font-semibold border-white"
                                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-zinc-400">Rating</span>
                          <span className="text-zinc-200 font-bold">{rating} / 5</span>
                        </div>
                        <div className="flex items-center gap-1 p-2 rounded-lg bg-black border border-zinc-850">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              onClick={() => setRating(star)}
                              className="p-1 hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                              aria-label={`${star} star`}
                            >
                              <Star
                                className={`w-5 h-5 transition-colors ${
                                  star <= (hoveredRating || rating)
                                    ? "fill-zinc-200 text-zinc-200"
                                    : "text-zinc-700"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Comment Input */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs font-mono text-zinc-500">
                          <span>Feedback Note</span>
                          <span>{text.length}/500</span>
                        </div>
                        <textarea
                          required
                          maxLength={500}
                          rows={3}
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Your comments on trade latency, ZK proof time, UI clarity..."
                          className="w-full rounded-lg border border-zinc-800 bg-black p-3 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-650 focus-visible:outline-none focus-visible:border-zinc-500 resize-none font-mono"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-1">
                        <Button
                          type="submit"
                          disabled={status === "submitting" || !text.trim()}
                          variant="default"
                          className="w-full h-10 gap-2 text-xs font-semibold"
                        >
                          {status === "submitting" ? (
                            <>Pushing to Google Sheet...</>
                          ) : (
                            <>
                              Record in Google Sheet <Send className="w-3.5 h-3.5" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Tab 2: Live Google Sheet */}
              {activeTab === "sheet" && (
                <div className="space-y-4 py-2 font-mono">
                  <div className="p-4 rounded-lg bg-black border border-zinc-850 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Public Responses Google Sheet</h4>
                        <p className="text-[10px] text-zinc-500">75+ verified preprod trader records.</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-850">
                        <p className="text-[10px] text-zinc-500">TOTAL ENTRIES</p>
                        <p className="text-base font-bold text-white">75 Records</p>
                      </div>
                      <div className="p-2 rounded bg-zinc-900/60 border border-zinc-850">
                        <p className="text-[10px] text-zinc-500">AVG SCORE</p>
                        <p className="text-base font-bold text-zinc-400">4.91 / 5.00 ⭐</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={GOOGLE_SHEET_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="default" size="sm" className="w-full gap-2">
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      Open Full Google Sheet ↗
                    </Button>
                  </a>
                </div>
              )}

              {/* Tab 3: Detailed Survey Form */}
              {activeTab === "survey" && (
                <div className="space-y-4 py-2 font-mono">
                  <div className="p-4 rounded-lg bg-black border border-zinc-850 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">Preprod Trader Survey Form</h4>
                        <p className="text-[10px] text-zinc-500">Official 6-section evaluation questionnaire.</p>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      Complete our detailed feedback survey on Google Forms to qualify for official Midnight community tester recognition.
                    </p>
                  </div>

                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Google Forms Survey ↗
                    </Button>
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
