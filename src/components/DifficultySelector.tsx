import { motion, AnimatePresence } from "framer-motion";
import BattleAnimation from "./BattleAnimation";
import { Language, TranslationKey, translations } from "@/i18n/translations";
import { Difficulty } from "@/types/game";
import { Scroll, Timer, ChevronDown } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import { useState } from "react";

interface DifficultySelectorProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const DifficultySelector = ({ onSelectDifficulty, currentLanguage, onLanguageChange }: DifficultySelectorProps) => {
  const [rulesOpen, setRulesOpen] = useState(false);
  const t = (key: TranslationKey) => translations[currentLanguage][key];
  
  const DIFFICULTY_SETTINGS = {
    easy: { time: 60, label: t("easy"), color: "from-green-500 to-emerald-600", emoji: "😇" },
    medium: { time: 30, label: t("medium"), color: "from-yellow-500 to-orange-600", emoji: "😈" },
    hard: { time: 15, label: t("hard"), color: "from-red-500 to-rose-600", emoji: "👿" }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center space-y-12 max-w-3xl mx-auto">
        <motion.div 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-6xl font-bold neon-glow bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              {t("title")}
            </h1>
            <motion.div
              animate={{ 
                rotate: [0, 14, -14, 0],
                scale: [1, 1.2, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="text-6xl"
            >
              😈
            </motion.div>
          </div>
          <p className="text-xl text-white/80">{t("subtitle")}</p>
        </motion.div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 justify-center text-2xl font-semibold text-white">
            <Timer className="w-6 h-6" />
            {t("timeLimit")}
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectDifficulty(level)}
                className={`game-card p-6 text-center bg-gradient-to-br ${DIFFICULTY_SETTINGS[level].color} hover:opacity-90`}
              >
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {DIFFICULTY_SETTINGS[level].label}
                  </h3>
                  <motion.span
                    className="text-3xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {DIFFICULTY_SETTINGS[level].emoji}
                  </motion.span>
                </div>
                <div className="text-white/90 mt-2">
                  {DIFFICULTY_SETTINGS[level].time} {t("seconds")}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        <BattleAnimation />
        
        {/* Collapsible Rules Section */}
        <div className="relative">
          <motion.button
            onClick={() => setRulesOpen(!rulesOpen)}
            className="game-card w-full py-4 px-6 flex items-center justify-between gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2 text-xl font-semibold text-white">
              <Scroll className="w-6 h-6" />
              {t("rules")}
            </div>
            <motion.div
              animate={{ rotate: rulesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-6 h-6 text-white" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {rulesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="game-card mt-2 space-y-3 text-left text-white/80 p-6">
                  <p>{t("rule1")}</p>
                  <p>{t("rule2")}</p>
                  <p>{t("rule3")}</p>
                  <p>{t("rule4")}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="pt-8">
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default DifficultySelector;