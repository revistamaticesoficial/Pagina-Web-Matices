import { StatCard } from "@/components/admin/StatCard"

export default function AdminDashboard() {
  return (
    <>
      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">Inicio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Comercios"
            stats={[
              { label: "Activos", value: 33 },
              { label: "Innactivos", value: 14 },
              { label: "Total registrados", value: 47 },
            ]}
          />

          <StatCard
            title="Eventos"
            stats={[
              { label: "Proximo mes", value: 19 },
              { label: "Cancelados", value: 14 },
              { label: "Total registrados", value: 56 },
            ]}
          />

          <StatCard
            title="Beneficios"
            stats={[
              { label: "Activos", value: 12 },
              { label: "Canjes del ultimo mes", value: 104 },
              { label: "Total registrados", value: 88 },
            ]}
          />
        </div>
      </div>
    </>
  )
}
