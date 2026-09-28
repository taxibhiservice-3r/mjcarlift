interface AnswerBlockProps {
  children: React.ReactNode;
  lastUpdated?: string;
}

export default function AnswerBlock({ children, lastUpdated }: AnswerBlockProps) {
  return (
    <div className="bg-brand-50 border-l-4 border-brand-600 rounded-r-lg px-5 py-4 my-6 max-w-2xl">
      <p className="text-neutral-800 leading-relaxed text-base">{children}</p>
      {lastUpdated && (
        <p className="mt-2 text-xs text-neutral-500">Last updated: {lastUpdated}</p>
      )}
    </div>
  );
}
