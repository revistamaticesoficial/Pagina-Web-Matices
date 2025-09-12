export default function Page() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-muted-foreground">Datos de perfil (demo, sin persistencia).</p>
      </header>

      <form className="grid max-w-2xl grid-cols-1 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2" style={{ borderColor: '#005B82' }} defaultValue="Nombre" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Apellido</label>
          <input className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2" style={{ borderColor: '#005B82' }} defaultValue="Apellido" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input type="email" className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2" style={{ borderColor: '#005B82' }} defaultValue="usuario@correo.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Color de acento</label>
          <div className="flex items-center gap-3">
            <span className="h-6 w-6 rounded-full" style={{ backgroundColor: '#005B82' }} />
            <span className="text-sm">#005B82 (principal)</span>
          </div>
        </div>
        <div className="pt-2">
          <button type="button" className="rounded-md bg-black px-4 py-2 text-white hover:opacity-90">Guardar cambios (demo)</button>
        </div>
      </form>
    </div>
  )
}


