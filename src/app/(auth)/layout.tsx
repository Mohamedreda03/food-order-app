interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
