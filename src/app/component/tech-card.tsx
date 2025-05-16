"use client"

interface TechCardProps {
  name: string
  icon: string
  color: string
}

export function TechCard({ name, icon, color }: TechCardProps) {
  return (
    <div className={`${color} rounded-lg p-4 flex items-center gap-3 transition-transform hover:scale-105`}>
      <span className="text-2xl">{icon}</span>
      <span>{name}</span>
    </div>
  )
}
