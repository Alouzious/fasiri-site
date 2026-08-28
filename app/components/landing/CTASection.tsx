export function FAQSection() {
  const faqs = [
    {
      question: "What is Fasiri?",
      answer:
        "Fasiri (Swahili: to interpret) is a unified API and Python SDK for African language translation, speech-to-text, and text-to-speech. It brings together providers like Sunbird AI, Khaya AI, and HuggingFace into a single interface.",
    },
    {
      question: "What capabilities does Fasiri support?",
      answer:
        "Fasiri supports text translation for over 19 African languages, Speech-to-Text (STT) transcription for Ugandan languages (Luganda, Acholi, Ateso, Runyankore, Lugbara, Swahili), and Text-to-Speech (TTS) synthesis.",
    },
    {
      question: "What is the difference between Cloud Mode and Direct Mode?",
      answer:
        "Cloud Mode uses the hosted Fasiri API with a single key while handling fallback and routing automatically. Direct Mode lets you bring your own provider keys (Sunbird AI, Khaya AI, HuggingFace) to manage your own billing with zero account dependencies.",
    },
    {
      question: "How does provider routing work?",
      answer:
        "Requests are dynamically routed based on language strengths (e.g., Sunbird AI for Ugandan languages, Khaya AI for West African languages, HuggingFace for Swahili). If a primary provider fails, Fasiri automatically attempts the next provider in the chain.",
    },
    {
      question: "How can I get started with the Python SDK?",
      answer:
        "You can install the SDK via PyPI, initialize the client using your API key (or provider keys), and call method endpoints such as client.translate('Good morning', target='lug') sync or async with full type safety.",
    },
  ];

  return (
    <section className="bg-white text-black py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center tracking-tight mb-10 uppercase">
        FAQ
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-gray-50 border border-gray-100 rounded-lg p-5 [&_summary::-webkit-details-marker]:hidden cursor-pointer transition-all"
          >
            <summary className="flex items-center gap-4 text-left font-semibold text-gray-900 list-none">
              <span className="text-xl font-normal group-open:hidden">+</span>
              <span className="text-xl font-normal hidden group-open:inline">−</span>
              <span>{faq.question}</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 pl-7">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Optional export alias if your app/page.tsx still imports CTASection
export { FAQSection as CTASection };