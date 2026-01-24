import { useLanguage } from "../../i18n";

interface HeaderProps {
  onReset: () => void;
}

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
