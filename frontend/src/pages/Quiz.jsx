import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

import { api } from "../api";
import Loading from "../components/Loading";

export default function Quiz({ setStats }) {
  const [topic, setTopic] = useState("");
  const [count, setCount] = useState(5);
  const [difficulty, setDifficulty] = useState("medium");

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      setQuiz(
        await api.quiz({
          topic,
          count,
          difficulty,
        })
      );

      setAnswers({});
      setCurrent(0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  if (quiz) {
    const done =
      Object.keys(answers).length === quiz.questions.length;

    const score = quiz.questions.reduce(
      (n, q, i) =>
        n + (answers[i] === q.answer ? 1 : 0),
      0
    );

    const q = quiz.questions[current];

    return (
      <div >
        <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
          <div>
            <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
              <Brain size={14} />
              Quiz Lab
            </div>

            <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">{quiz.title}</h1>
          </div>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 bg-transparent"
            onClick={() => setQuiz(null)}
          >
            <RotateCcw size={16} />
            New quiz
          </button>
        </div>

        <div className="mx-auto max-w-[850px] rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px]">
          {/* Progress */}
          <div className="mb-8 [&>span]:text-xs [&>span]:text-[#8e99ad] [&>div]:mt-2 [&>div]:h-[5px] [&>div]:overflow-hidden [&>div]:rounded-full [&>div]:bg-[#1d2637] [&_i]:block [&_i]:h-full [&_i]:rounded-full [&_i]:bg-gradient-to-r [&_i]:from-[#8b5cf6] [&_i]:to-[#22d3ee]">
            <span>
              Question {current + 1} /{" "}
              {quiz.questions.length}
            </span>

            <div>
              <i
                style={{
                  width: `${
                    ((current + 1) /
                      quiz.questions.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: -25,
              }}
            >
              <h2>{q.question}</h2>

              {/* Options */}
              <div className="my-[25px] grid gap-2.5">
                {q.options.map((opt, i) => {
                  const selected =
                    answers[current] === i;

                  const reveal =
                    answers[current] !== undefined;

                  const correct = i === q.answer;

                  return (
                    <button
                      key={i}
                      className={`flex items-center gap-3 rounded-[10px] border border-[#232b3e] bg-[#0b111c] p-[13px] text-left text-[#bfc7d5] hover:border-[#4a5876] [&>span]:grid [&>span]:h-[27px] [&>span]:w-[27px] [&>span]:shrink-0 [&>span]:place-items-center [&>span]:rounded-[7px] [&>span]:bg-[#182034] [&>span]:text-xs [&>span]:font-bold [&>span]:text-[#9da8bc] [&>svg]:ml-auto ${selected ? "border-[#7c3aed] bg-[#1a1430]" : ""} ${reveal && correct ? "border-[#059669] bg-[#07271f]" : ""} ${reveal && selected && !correct ? "border-[#b91c1c] bg-[#2b1014]" : ""}`}
                      onClick={() =>
                        !reveal &&
                        setAnswers((a) => ({
                          ...a,
                          [current]: i,
                        }))
                      }
                    >
                      <span>
                        {String.fromCharCode(65 + i)}
                      </span>

                      {opt}

                      {reveal && correct && (
                        <Check size={17} />
                      )}

                      {reveal &&
                        selected &&
                        !correct && (
                          <X size={17} />
                        )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {answers[current] !== undefined && (
                <div className="rounded-[9px] border border-[#29405b] bg-[#0c1a29] px-3.5 py-3 text-xs text-[#aeb9c9] [&_p]:my-1">
                  <b>Why?</b>

                  <p className="text-base leading-[1.7] text-[#8f99ad]">{q.explanation}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-5 flex justify-between">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 bg-transparent"
              disabled={current === 0}
              onClick={() =>
                setCurrent((c) => c - 1)
              }
            >
              Previous
            </button>

            {current < quiz.questions.length - 1 ? (
              <button
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25]"
                disabled={
                  answers[current] === undefined
                }
                onClick={() =>
                  setCurrent((c) => c + 1)
                }
              >
                Next
              </button>
            ) : (
              <button
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25]"
                onClick={() => {
                  const best = Math.round(
                    (score / quiz.questions.length) * 100
                  );

                  setStats((s) => ({
                    ...s,
                    quizBest: Math.max(
                      s.quizBest,
                      best
                    ),
                  }));
                }}
              >
                {done
                  ? `Finish — ${score}/${quiz.questions.length}`
                  : "Review"}
              </button>
            )}
          </div>

          {/* Result */}
          {done && (
            <div className="mt-5 flex items-center gap-3 rounded-[10px] border border-[#334155] bg-[#101b2a] p-3.5 [&>svg]:text-[#67e8f9] [&_span]:mt-1 [&_span]:block [&_span]:text-xs [&_span]:text-[#8f9aac]">
              <Sparkles />

              <div>
                <b>
                  {score === quiz.questions.length
                    ? "Perfect score!"
                    : "Quiz complete"}
                </b>

                <span>
                  You scored{" "}
                  {Math.round(
                    (score / quiz.questions.length) *
                      100
                  )}
                  %
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div >
      {/* Page heading */}
      <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <Brain size={14} />
            Quiz Lab
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">Test what you know</h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Generate fresh questions for any subject
            and difficulty.
          </p>
        </div>
      </div>

      {/* Quiz form */}
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
            placeholder="e.g. React Hooks"
          />
        </label>

        <div className="grid grid-cols-2 gap-2.5 max-[600px]:grid-cols-1">
          <label>
            Questions

            <select
              value={count}
              onChange={(e) =>
                setCount(e.target.value)
              }
            >
              <option>5</option>
              <option>8</option>
              <option>10</option>
              <option>15</option>
            </select>
          </label>

          <label>
            Difficulty

            <select
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value)
              }
            >
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
          </label>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25] min-h-11 w-full"
          disabled={loading}
        >
          {loading ? (
            <Loading text="Building quiz..." />
          ) : (
            <>
              <Sparkles size={17} />
              Generate quiz
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