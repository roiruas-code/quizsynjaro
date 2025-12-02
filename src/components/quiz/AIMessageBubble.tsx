interface AIMessageBubbleProps {
  message: string;
}

export const AIMessageBubble = ({ message }: AIMessageBubbleProps) => {
  return (
    <div className="bg-card border-l-4 border-primary rounded-r-xl p-3 my-3 animate-fade-in">
      <div className="flex items-start gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xs">AI</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground mb-0.5">Synjaro AI</p>
          <p className="text-xs text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
