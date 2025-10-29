interface AIMessageBubbleProps {
  message: string;
}

export const AIMessageBubble = ({ message }: AIMessageBubbleProps) => {
  return (
    <div className="bg-card border-l-4 border-primary rounded-r-xl p-4 my-4 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold">IA</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-1">Synjaro IA</p>
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};