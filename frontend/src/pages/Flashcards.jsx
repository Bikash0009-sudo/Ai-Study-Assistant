import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Sparkles,
} from "lucide-react";

import { api } from "../api";
import Loading from "../components/Loading";

export default function Flashcards({ setStats }) {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(8);

  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      setData(
        await api.flashcards({
          topic,
          count,
        })
      );

      setIndex(0);
      setFlipped(false);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (data) {
    const card = data.cards[index];

    function next(dir) {
      setFlipped(false);

      setIndex((i) =>
        Math.min(
          Math.max(i + dir, 0),
          data.cards.length - 1
        )
      );

      setStats((s) => ({
        ...s,
        cards: Math.max(s.cards, index + 1),
      }));
    }

    return (
      <div >
        {/* Page Heading */}
        <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
              <Sparkles size={14} />
              Flashcards
            </div>

            <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">{data.title}</h1>

            <p className="text-base leading-[1.7] text-[#8f99ad]">
              Tap the card to reveal the answer.
              Active recall beats passive rereading.
            </p>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 bg-transparent"
            onClick={() => setData(null)}
          >
            New deck
          </button>
        </div>

        {/* Flashcard */}
        <div className="mx-auto max-w-[750px] text-center">
          <div className="mb-2.5 text-xs text-[#7f8a9e]">
            {index + 1} / {data.cards.length}
          </div>

          <motion.button
            className="h-[390px] w-full [perspective:1200px] max-[600px]:h-[330px]"
            onClick={() =>
              setFlipped((v) => !v)
            }
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.99,
            }}
          >
            <motion.div
              className="relative h-full w-full [transform-style:preserve-3d]"
              animate={{
                rotateY: flipped ? 180 : 0,
              }}
              transition={{
                duration: 0.5,
              }}
            >
              {/* Front */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] border border-[#232b3e] bg-[radial-gradient(circle_at_50%_10%,#252044,#111725_50%)] p-[35px] [backface-visibility:hidden] [&>span]:text-[10px] [&>span]:tracking-[.15em] [&>span]:text-[#a78bfa] [&>h2]:max-w-[620px] [&>h2]:text-[29px] [&>h2]:leading-[1.35] [&>small]:text-[#6f7b91] max-[600px]:[&>h2]:text-[23px] ">
                <span>QUESTION</span>

                <h2>{card.front}</h2>

                <small>
                  Tap to reveal
                </small>
              </div>

              {/* Back */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[20px] border border-[#232b3e] bg-[radial-gradient(circle_at_50%_10%,#252044,#111725_50%)] p-[35px] [backface-visibility:hidden] [&>span]:text-[10px] [&>span]:tracking-[.15em] [&>span]:text-[#a78bfa] [&>h2]:max-w-[620px] [&>h2]:text-[29px] [&>h2]:leading-[1.35] [&>small]:text-[#6f7b91] max-[600px]:[&>h2]:text-[23px] [transform:rotateY(180deg)] bg-[radial-gradient(circle_at_50%_10%,#063c46,#111725_55%)] [&>span]:text-[#67e8f9]">
                <span>ANSWER</span>

                <h2>{card.back}</h2>

                <small>
                  Tap to flip back
                </small>
              </div>
            </motion.div>
          </motion.button>

          {/* Controls */}
          <div className="mt-[18px] flex items-center justify-center gap-3.5">
            <button
              className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-[#232b3e] bg-[#111827] text-[#aeb8ca] hover:border-[#3b4560] hover:text-white disabled:opacity-50"
              disabled={index === 0}
              onClick={() => next(-1)}
            >
              <ArrowLeft />
            </button>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25]"
              onClick={() =>
                setFlipped((v) => !v)
              }
            >
              <RotateCw size={17} />
              Flip
            </button>

            <button
              className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-[#232b3e] bg-[#111827] text-[#aeb8ca] hover:border-[#3b4560] hover:text-white disabled:opacity-50"
              disabled={
                index === data.cards.length - 1
              }
              onClick={() => next(1)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div >
      {/* Page Heading */}
      <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <Sparkles size={14} />
            Flashcards
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">
            Remember more, reread less
          </h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Generate an active-recall deck from
            any topic.
          </p>
        </div>
      </div>

      {/* Flashcard Form */}
      <form
        className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] h-max mx-auto my-5 max-w-[650px] [&_label]:mb-[15px] [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#aeb6c6] [&_input]:mt-2 [&_input]:w-full [&_input]:rounded-[9px] [&_input]:border [&_input]:border-[#232b3e] [&_input]:bg-[#090e18] [&_input]:p-[11px_12px] [&_input]:text-white [&_input]:outline-none [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-[#232b3e] [&_textarea]:bg-[#090e18] [&_textarea]:p-[11px_12px] [&_textarea]:text-white [&_textarea]:outline-none [&_select]:mt-2 [&_select]:w-full [&_select]:rounded-[9px] [&_select]:border [&_select]:border-[#232b3e] [&_select]:bg-[#090e18] [&_select]:p-[11px_12px] [&_select]:text-white [&_select]:outline-none"
        onSubmit={generate}
      >
        <label>
          Topic

          <input
            value={topic}
            onChange={(e) =>
              setTopic(e.target.value)
            }
            placeholder="e.g. Computer Networks"
          />
        </label>

        <label>
          Number of cards

          <select
            value={count}
            onChange={(e) =>
              setCount(e.target.value)
            }
          >
            <option>6</option>
            <option>8</option>
            <option>12</option>
            <option>16</option>
          </select>
        </label>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25] min-h-11 w-full"
          disabled={loading}
        >
          {loading ? (
            <Loading text="Creating cards..." />
          ) : (
            <>
              <Sparkles size={17} />
              Generate flashcards
            </>
          )}
        </button>

        {error && (
          <div className="mt-3 rounded-[9px] border border-[#5b202b] bg-[#2a1218] p-2.5 text-xs text-[#fca5a5]">
            {error}
          </div>
        )}
      </form>
    </div>
  );
}