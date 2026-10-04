import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Bot, Send, Sparkles, User, Trash2 } from "lucide-react";
import { api } from "../api";

const starter = [
  "Explain deadlock in operating systems",
  "Teach me JavaScript closures with an example",
  "Give me a simple explanation of TCP vs UDP",
];

export default function Chat() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("chatMessages") || "[]");
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const end = useRef(null);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    end.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text = input) {
    if (!text.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setInput("");
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await api.chat({
        message: text,
        history: messages,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Sorry, I couldn't answer that.\n\n${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  }

  return (
    <div >
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <Bot size={14} />
            AI Tutor
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">Your study conversation</h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Ask for explanations, examples, comparisons, interview
            questions, or revision help.
          </p>
        </div>

        <button
          className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-[#232b3e] bg-[#111827] text-[#aeb8ca] hover:border-[#3b4560] hover:text-white disabled:opacity-50"
          onClick={clearChat}
          title="Clear chat"
        >
          <Trash2 size={17} />
        </button>
      </div>

      {/* Chat */}
      <div >
        <div className="overflow-hidden rounded-[15px] border border-[#232b3e] bg-[#0c121d]">
          <div className="max-h-[62vh] min-h-[520px] overflow-auto p-[25px] max-[600px]:min-h-[500px] max-[600px]:p-[15px]">
            {messages.length === 0 ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="mb-[13px] grid h-[55px] w-[55px] place-items-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_8px_30px_#7c3aed30]">
                  <Sparkles />
                </div>

                <h2>What are you learning today?</h2>

                <p className="text-base leading-[1.7] text-[#8f99ad]">Try one of these prompts:</p>

                <div className="flex max-w-[650px] flex-wrap justify-center gap-2 [&_button]:rounded-[9px] [&_button]:border [&_button]:border-[#232b3e] [&_button]:bg-[#111827] [&_button]:px-3 [&_button]:py-[9px] [&_button]:text-xs [&_button]:text-[#aeb8ca]">
                  {starter.map((prompt) => (
                    <motion.button
                      key={prompt}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => send(prompt)}
                    >
                      {prompt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className={`my-[15px] flex gap-2.5 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] ${message.role === "user" ? "bg-[#312e81]" : "bg-[#1d2740]"}`}>
                    {message.role === "user" ? (
                      <User size={16} />
                    ) : (
                      <Bot size={16} />
                    )}
                  </div>

                  <div className={`max-w-[78%] rounded-[13px] border px-3.5 py-1 max-[600px]:max-w-[88%] ${message.role === "user" ? "border-[#3b286a] bg-[#231b45]" : "border-[#1d2638] bg-[#111827]"}`}>
                    <div className="text-[13px] leading-[1.7] text-[#c6cedc]">
                      {message.content}
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {/* Loading */}
            {loading && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="my-[15px] flex gap-2.5"
              >
                <div className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px] bg-[#1d2740]">
                  <Bot size={16} />
                </div>

                <div className="max-w-[78%] rounded-[13px] border border-[#1d2638] bg-[#111827] px-3.5 py-1 max-[600px]:max-w-[88%]">
                  <div className="flex gap-1 [&_span]:h-2 [&_span]:w-2 [&_span]:rounded-full [&_span]:bg-white">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={end} />
          </div>

          {/* Input */}
          <form
            className="flex gap-2 border-t border-[#232b3e] p-[13px] [&_input]:flex-1 [&_input]:rounded-[10px] [&_input]:border [&_input]:border-[#232b3e] [&_input]:bg-[#080d16] [&_input]:p-3 [&_input]:text-white [&_input]:outline-none"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI tutor anything..."
              disabled={loading}
            />

            <button
              type="submit"
              className="grid h-11 w-11 place-items-center rounded-[10px] border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] text-white disabled:opacity-50"
              disabled={!input.trim() || loading}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}