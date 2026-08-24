import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-14 px-6 text-center bg-dark-bg text-white rounded-none my-10 mx-6">
      <p className="text-brand-gold font-bold text-xs uppercase tracking-wide mb-2">Live demo</p>
      <h2 className="font-display text-[28px] font-extrabold mb-3 tracking-tight text-white">See Fasiri in action</h2>
      <p className="text-dark-text2 max-w-[560px] mx-auto mb-8 leading-relaxed text-sm">
        Try the interactive demo — translate English to any African language, hear the audio, and chat with an AI that responds in your chosen language.
      </p>
      <Link
        href="/demo"
        className="inline-flex items-center gap-1.5 bg-brand-green text-white px-5 py-2.5 rounded-[10px] no-underline font-semibold text-sm"
      >
        Try the live demo
      </Link>

      <div className="mt-10">
        <h2 className="font-display text-[26px] font-extrabold text-white">Ready to build for African users?</h2>
        <p className="text-dark-text2">Join developers building the next generation of African language applications. Your API key is ready in seconds.</p>
        <div className="flex justify-center gap-3 flex-wrap mt-4">
          <a
            className="inline-flex items-center gap-1.5 bg-brand-green text-white px-5 py-2.5 rounded-[10px] no-underline font-semibold text-sm"
            href="https://fasiri-bu9u.onrender.com/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Your Free Key
          </a>
          <a
            className="border border-dark-line text-white px-5 py-2.5 rounded-[10px] no-underline font-semibold text-sm"
            href="https://github.com/umarkhemis/fasiri"
            target="_blank"
            rel="noopener noreferrer"
          >
            Star on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
