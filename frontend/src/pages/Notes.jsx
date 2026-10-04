import { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Copy,
  FileText,
  Sparkles,
} from "lucide-react";

import { api } from "../api";
import Loading from "../components/Loading";

export default function Notes() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("college");
  const [length, setLength] = useState("medium");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();

    if (!topic.trim()) return;

    setLoading(true);
    setError("");

    try {
      setData(
        await api.notes({
          topic,
          level,
          length,
        })
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div >
      <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <BookOpen size={14} />
            Smart Notes
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">Turn topics into notes</h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Get structured, exam-friendly notes without staring at a blank
            page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[330px_1fr] gap-4 max-[950px]:grid-cols-1">
        <form
          className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] h-max [&_label]:mb-[15px] [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#aeb6c6] [&_input]:mt-2 [&_input]:w-full [&_input]:rounded-[9px] [&_input]:border [&_input]:border-[#232b3e] [&_input]:bg-[#090e18] [&_input]:p-[11px_12px] [&_input]:text-white [&_input]:outline-none [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-[#232b3e] [&_textarea]:bg-[#090e18] [&_textarea]:p-[11px_12px] [&_textarea]:text-white [&_textarea]:outline-none [&_select]:mt-2 [&_select]:w-full [&_select]:rounded-[9px] [&_select]:border [&_select]:border-[#232b3e] [&_select]:bg-[#090e18] [&_select]:p-[11px_12px] [&_select]:text-white [&_select]:outline-none]"
          onSubmit={generate}
        >
          <label>
            Topic

            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Java OOP, DBMS normalization"
            />
          </label>

          <div className="grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
            <label>
              Level

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>college</option>
                <option>beginner</option>
                <option>advanced</option>
              </select>
            </label>

            <label>
              Length

              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Detailed</option>
              </select>
            </label>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25] min-h-11 w-full"
            disabled={loading}
          >
            {loading ? (
              <Loading text="Generating..." />
            ) : (
              <>
                <Sparkles size={17} />
                Generate notes
              </>
            )}
          </button>

          {error && (
            <div className="mt-3 rounded-[9px] border border-[#5b202b] bg-[#2a1218] p-2.5 text-xs text-[#fca5a5]">
              {error}
            </div>
          )}
        </form>

        {data && (
          <motion.article
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] [&_h2]:my-[7px] [&_h2]:text-[28px] [&_h2]:font-[Space_Grotesk,sans-serif]"
          >
            <div className="flex justify-between">
              <div>
                <span className="rounded-[5px] border border-[#155e75] bg-[#083344] px-2 py-1 text-[9px] tracking-[.13em] text-[#67e8f9]">
                  AI GENERATED
                </span>

                <h2>{data.title}</h2>
              </div>

              <button
                className="grid h-[38px] w-[38px] place-items-center rounded-[9px] border border-[#232b3e] bg-[#111827] text-[#aeb8ca] hover:border-[#3b4560] hover:text-white disabled:opacity-50"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    JSON.stringify(data, null, 2)
                  )
                }
              >
                <Copy size={16} />
              </button>
            </div>

            <p className="leading-[1.7] text-[#adb6c7]">
              {data.overview}
            </p>

            <Section
              title="Key points"
              items={data.keyPoints}
            />

            <div className="[&_h3]:mb-2 [&_h3]:font-[Space_Grotesk,sans-serif]">
              <h3>Core concepts</h3>

              {data.concepts?.map((x, i) => (
                <div
                  className="my-2 rounded-[10px] border border-[#1b2435] bg-[#0b111c] p-[13px] [&_b]:text-[#e9d5ff] [&_p]:text-[13px] [&_p]:leading-[1.6] [&_p]:text-[#98a2b5]"
                  key={i}
                >
                  <b>{x.term}</b>

                  <p className="text-base leading-[1.7] text-[#8f99ad]">
                    {x.explanation}
                  </p>
                </div>
              ))}
            </div>

            <Section
              title="Examples"
              items={data.examples}
            />

            <Section
              title="Exam tips"
              items={data.examTips}
            />
          </motion.article>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  items = [],
}) {
  return (
    <section className="mt-[25px]">
      <h3>{title}</h3>

      <ul className="pl-5 leading-[1.8] text-[#b8c0cf]">
        {items.map((x, i) => (
          <li key={i}>
            {x}
          </li>
        ))}
      </ul>
    </section>
  );
}