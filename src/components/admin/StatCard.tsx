import { Card, CardContent } from "@/components/ui/Card"

interface StatCardProps {
  title: string
  stats: {
    label: string
    value: number
  }[]
}

export function StatCard({ title, stats }: StatCardProps) {
  return (
    <Card className="border-2 border-black rounded-3xl">
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-base text-muted-foreground">{stat.label}:</span>
              <span className="text-lg font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
