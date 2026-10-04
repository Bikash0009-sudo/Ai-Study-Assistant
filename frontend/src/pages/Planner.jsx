import { useState } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

import { api } from "../api";
import Loading from "../components/Loading";

export default function Planner() {
  const [subjects, setSubjects] = useState("");
  const [examDate, setExamDate] = useState("");
  const [hours, setHours] = useState(2);

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      setPlan(
        await api.plan({
          subjects,
          examDate,
          hoursPerDay: hours,
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
      {/* Page Heading */}
      <div className="mb-7 flex items-start justify-between gap-5 max-[600px]:mb-5 [&_h1]:text-[40px] [&_h1]:leading-[1.02] max-[600px]:[&_h1]:text-[32px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <CalendarDays size={14} />
            Study Planner
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">
            Make your preparation concrete
          </h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Tell the AI what you need to study and
            when your exam is.
          </p>
        </div>
      </div>

      {/* Planner */}
      <div className="grid grid-cols-[330px_1fr] gap-4 max-[950px]:grid-cols-1">
        {/* Form */}
        <form
          className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] h-max [&_label]:mb-[15px] [&_label]:block [&_label]:text-xs [&_label]:font-semibold [&_label]:text-[#aeb6c6] [&_input]:mt-2 [&_input]:w-full [&_input]:rounded-[9px] [&_input]:border [&_input]:border-[#232b3e] [&_input]:bg-[#090e18] [&_input]:p-[11px_12px] [&_input]:text-white [&_input]:outline-none [&_textarea]:mt-2 [&_textarea]:w-full [&_textarea]:resize-y [&_textarea]:rounded-[9px] [&_textarea]:border [&_textarea]:border-[#232b3e] [&_textarea]:bg-[#090e18] [&_textarea]:p-[11px_12px] [&_textarea]:text-white [&_textarea]:outline-none [&_select]:mt-2 [&_select]:w-full [&_select]:rounded-[9px] [&_select]:border [&_select]:border-[#232b3e] [&_select]:bg-[#090e18] [&_select]:p-[11px_12px] [&_select]:text-white [&_select]:outline-none]"
          onSubmit={generate}
        >
          <label>
            Subjects

            <textarea
              value={subjects}
              onChange={(e) =>
                setSubjects(e.target.value)
              }
              placeholder="Java, DBMS, Operating Systems, Computer Networks"
              rows="5"
            />
          </label>

          <label>
            Exam date

            <input
              type="date"
              value={examDate}
              onChange={(e) =>
                setExamDate(e.target.value)
              }
            />
          </label>

          <label>
            Hours per day

            <input
              type="number"
              min="1"
              max="12"
              value={hours}
              onChange={(e) =>
                setHours(e.target.value)
              }
            />
          </label>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25] min-h-11 w-full"
            disabled={loading}
          >
            {loading ? (
              <Loading text="Planning..." />
            ) : (
              <>
                <Sparkles size={17} />
                Generate plan
              </>
            )}
          </button>

          {error && (
            <div className="mt-3 rounded-[9px] border border-[#5b202b] bg-[#2a1218] p-2.5 text-xs text-[#fca5a5]">
              {error}
            </div>
          )}
        </form>

        {/* Plan Results */}
        {plan && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="grid gap-2.5"
          >
            {/* Plan Summary */}
            <div className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] [&_h2]:my-2 [&_h2]:font-[Space_Grotesk,sans-serif] [&_p]:leading-[1.6] [&_p]:text-[#9ba6b8]">
              <span className="rounded-[5px] border border-[#155e75] bg-[#083344] px-2 py-1 text-[9px] tracking-[.13em] text-[#67e8f9]">
                YOUR PLAN
              </span>

              <h2>Study roadmap</h2>

              <p className="text-base leading-[1.7] text-[#8f99ad]">{plan.summary}</p>
            </div>

            {/* Daily Plans */}
            {plan.days?.map((day, i) => (
              <motion.div
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: i * 0.04,
                }}
                className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px] [&_h3]:my-2.5 [&_h3]:font-[Space_Grotesk,sans-serif] [&_ul]:m-0 [&_ul]:grid [&_ul]:list-none [&_ul]:gap-2 [&_ul]:p-0 [&_li]:flex [&_li]:gap-2 [&_li]:text-[13px] [&_li]:leading-[1.5] [&_li]:text-[#aab4c5] [&_li_svg]:mt-0.5 [&_li_svg]:shrink-0 [&_li_svg]:text-[#34d399]"
                key={i}
              >
                <div className="flex justify-between text-[13px] text-[#d9e0ec] [&_span]:flex [&_span]:items-center [&_span]:gap-1 [&_span]:text-[11px] [&_span]:text-[#8b96a9]">
                  <b>{day.date}</b>

                  <span>
                    <Clock3 size={14} />
                    {day.hours}h
                  </span>
                </div>

                <h3>{day.focus}</h3>

                <ul>
                  {day.tasks?.map((task, j) => (
                    <li key={j}>
                      <CheckCircle2 size={16} />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Planning Tips */}
            {plan.tips?.length > 0 && (
              <div className="rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[22px]">
                <h3>Planning tips</h3>

                <ul className="pl-5 text-[13px] leading-[1.8] text-[#aeb8c8]">
                  {plan.tips.map((x, i) => (
                    <li key={i}>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}