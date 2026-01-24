import { useLanguage } from "../../i18n";

interface HeaderProps {
  onReset: () => void;
}

const DOC_URLS = {
  ja: "https://github.com/shibuiwilliam/ai-agent-readiness-check/blob/main/AIAgentReadinessCheck_JA.md",
  en: "https://github.com/shibuiwilliam/ai-agent-readiness-check/blob/main/AIAgentReadinessCheck_EN.md",
};

export function Header({ onReset }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-6 px-4 shadow-lg">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{t.header.title}</h1>
            <p className="text-slate-300 mt-1 text-sm md:text-base">
              {t.header.subtitle}
            </p>
            <a
              href={DOC_URLS[language]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span>
                {language === "ja"
                  ? "ドキュメントを見る"
                  : "View Documentation"}
              </span>
              <span>↗</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage("ja")}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  language === "ja"
                    ? "bg-slate-500 text-white"
                    : "text-slate-300 hover:bg-slate-600"
                }`}
              >
                JA
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-sm transition-colors ${
                  language === "en"
                    ? "bg-slate-500 text-white"
                    : "text-slate-300 hover:bg-slate-600"
                }`}
              >
                EN
              </button>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
            >
              {t.header.reset}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
