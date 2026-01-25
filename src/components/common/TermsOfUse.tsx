import { useLanguage } from "../../i18n";

interface TermsOfUseProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsOfUse({ isOpen, onClose }: TermsOfUseProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{t.termsOfUse.title}</h2>
            <p className="text-slate-300 text-sm mt-1">
              {t.termsOfUse.lastUpdated}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-slate-300 transition-colors"
            aria-label={t.termsOfUse.close}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Introduction */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.introduction.title}
            </h3>
            {t.termsOfUse.sections.introduction.content.map((text, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {text}
              </p>
            ))}
          </section>

          {/* Purpose and Scope */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.purposeAndScope.title}
            </h3>
            {t.termsOfUse.sections.purposeAndScope.content.map(
              (text, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {text}
                </p>
              ),
            )}
          </section>

          {/* Disclaimer */}
          <section className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.disclaimer.title}
            </h3>
            {t.termsOfUse.sections.disclaimer.content.map((text, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {text}
              </p>
            ))}
          </section>

          {/* No Warranty */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.noWarranty.title}
            </h3>
            {t.termsOfUse.sections.noWarranty.content.map((text, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {text}
              </p>
            ))}
          </section>

          {/* Limitation of Liability */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.limitationOfLiability.title}
            </h3>
            {t.termsOfUse.sections.limitationOfLiability.content.map(
              (text, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {text}
                </p>
              ),
            )}
          </section>

          {/* User Responsibility */}
          <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.userResponsibility.title}
            </h3>
            {t.termsOfUse.sections.userResponsibility.content.map(
              (text, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {text}
                </p>
              ),
            )}
          </section>

          {/* Data and Privacy */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.dataAndPrivacy.title}
            </h3>
            {t.termsOfUse.sections.dataAndPrivacy.content.map((text, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {text}
              </p>
            ))}
          </section>

          {/* Intellectual Property */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.intellectualProperty.title}
            </h3>
            {t.termsOfUse.sections.intellectualProperty.content.map(
              (text, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {text}
                </p>
              ),
            )}
          </section>

          {/* Modifications and Updates */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.modificationsAndUpdates.title}
            </h3>
            {t.termsOfUse.sections.modificationsAndUpdates.content.map(
              (text, index) => (
                <p key={index} className="text-gray-700 mb-2">
                  {text}
                </p>
              ),
            )}
          </section>

          {/* Governing Law */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {t.termsOfUse.sections.governingLaw.title}
            </h3>
            {t.termsOfUse.sections.governingLaw.content.map((text, index) => (
              <p key={index} className="text-gray-700 mb-2">
                {text}
              </p>
            ))}
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-4 flex justify-end border-t">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
          >
            {t.termsOfUse.close}
          </button>
        </div>
      </div>
    </div>
  );
}
