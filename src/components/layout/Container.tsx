import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <main className="max-w-5xl mx-auto px-4 py-6 pb-32">{children}</main>;
}
