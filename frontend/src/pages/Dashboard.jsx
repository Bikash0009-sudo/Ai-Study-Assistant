import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Target,
} from "lucide-react";

const tools = [
  {
    to: "/chat",
    icon: MessageCircle,
    title: "AI Tutor",
    text: "Ask anything and get a clear explanation.",
  },
  {
    to: "/notes",
    icon: BookOpen,
    title: "Smart Notes",
    text: "Turn a topic into revision-ready notes.",
  },
  {
    to: "/quiz",
    icon: Brain,
    title: "Quiz Lab",
    text: "Generate MCQs and test your knowledge.",
  },
  {
    to: "/flashcards",
    icon: Sparkles,
    title: "Flashcards",
    text: "Build active-recall cards in seconds.",
  },
  {
    to: "/planner",
    icon: CalendarDays,
    title: "Study Planner",
    text: "Create a realistic plan around your exam.",
  },
];

export default function Dashboard({ stats }) {
  return (
    <div>
      {/* Hero Section */}
      <section className="flex min-h-[400px] items-center justify-between gap-10 max-[950px]:min-h-0 max-[600px]:flex-col max-[600px]:items-start max-[600px]:py-6">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            <Sparkles size={14} />
            Your personal AI study partner
          </div>

          <h1 className="font-[Space_Grotesk,sans-serif] text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[-.045em] [&_span]:bg-gradient-to-r [&_span]:from-[#a78bfa] [&_span]:to-[#22d3ee] [&_span]:bg-clip-text [&_span]:text-transparent max-[600px]:text-[43px]">
            Study less randomly.
            <br />
            <span>Learn with purpose.</span>
          </h1>

          <p className="text-base leading-[1.7] text-[#8f99ad]">
            Understand difficult topics, create notes,
            practice with quizzes, and plan your
            preparation from one focused workspace.
          </p>

          <div className="mt-6 flex gap-2.5 max-[600px]:w-full max-[600px]:flex-col">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 border-0 bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_10px_30px_#7c3aed25]"
              to="/chat"
            >
              Start studying
              <ArrowRight size={17} />
            </Link>

            <Link
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#232b3e] bg-[#141a29] px-4 py-[11px] text-[13px] font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:border-[#39445d] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 bg-transparent"
              to="/planner"
            >
              Build a plan
            </Link>
          </div>
        </div>

        {/* Animated Orb */}
        <motion.div
          className="grid h-[250px] w-[250px] shrink-0 place-items-center rounded-full bg-[radial-gradient(circle,#312e81_0,#1b1742_42%,#101425_68%)] shadow-[0_0_100px_#7c3aed2c] max-[950px]:hidden"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="grid h-[92px] w-[92px] place-items-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#22d3ee] shadow-[0_0_50px_#22d3ee55]">
            <Sparkles size={34} />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <div className="mb-[55px] mt-[5px] grid grid-cols-4 gap-3 max-[950px]:grid-cols-2 max-[600px]:grid-cols-1">
        <Stat
          icon={Target}
          value={`${stats.sessions}`}
          label="Study sessions"
        />

        <Stat
          icon={Brain}
          value={`${stats.quizBest}%`}
          label="Best quiz"
        />

        <Stat
          icon={CheckCircle2}
          value={`${stats.cards}`}
          label="Cards reviewed"
        />

        <Stat
          icon={BookOpen}
          value="∞"
          label="Topics to explore"
        />
      </div>

      {/* Workspace Heading */}
      <section className="mb-[18px]">
        <div>
          <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[#a78bfa]">
            Workspace
          </div>

          <h2>
            Everything you need to learn
          </h2>
        </div>
      </section>

      {/* Tools */}
      <div className="grid grid-cols-3 gap-3 max-[950px]:grid-cols-2 max-[600px]:grid-cols-1">
        {tools.map(
          (
            {
              to,
              icon: Icon,
              title,
              text,
            },
            i
          ) => (
            <motion.div
              key={to}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.06,
              }}
            >
              <Link
                to={to}
                className="flex min-h-[135px] h-full flex-col justify-between gap-3.5 rounded-[15px] border border-[#232b3e] bg-[linear-gradient(145deg,#111725,#0d121d)] p-[19px] text-white no-underline transition duration-200 hover:-translate-y-1 hover:border-[#3b4560] hover:shadow-[0_18px_45px_#0005]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] shadow-[0_8px_30px_#7c3aed30]">
                  <Icon size={21} />
                </div>

                <div>
                  <h3>{title}</h3>

                  <p className="m-0 text-[13px] leading-[1.5] text-[#8f99ad]">{text}</p>
                </div>

                <ArrowRight
                  className="ml-auto text-[#657087]"
                  size={18}
                />
              </Link>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}) {
  return (
    <div className="flex items-center gap-3 rounded-[13px] border border-[#232b3e] bg-[#0e1420] p-4 [&>svg]:text-[#a78bfa]">
      <Icon size={19} />

      <div>
        <b>{value}</b>
        <span>{label}</span>
      </div>
    </div>
  );
}