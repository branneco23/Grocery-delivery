import { XIcon } from "lucide-react"

const AddressForm = ({ resetForm, handleSubmit, form, setForm, editingId }: any) => {
    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-50">

                {/*form container*/}
                <div onClick={resetForm} className="fixed inset-0 z-50 flex-center p-4">
                    <form onClick={e => e.stopPropagation()} onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg animate-fade-in">
                        {/*form header*/}
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="text-lg font-semibold text-app-green">
                                {editingId ? "Editar Dirección" : "Agregar Nueva Dirección"}
                            </h2>
                            <button type="button" onClick={resetForm} className="p-2 hover:bg-app-cream rounded-lg">
                                <XIcon className="size-5" />
                            </button>
                        </div>

                        {/* Form input fiels */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-app-green mb-1.5">Label</label>
                                <input type="text" placeholder="Hogar, Trabajo, etc." required className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-app-green mb-1.5">Dirección</label>
                                <input type="text" required className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-app-green mb-1.5">Ciudad</label>
                                <input type="text" placeholder="Pitalito, Neiva, etc." required className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-app-green mb-1.5">Localidad (barrio)</label>
                                <input type="text" placeholder="Sta. Mónica, centro, etc." required className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-app-green mb-1.5">Zip Code</label>
                                <input type="text" required className="w-full px-4 py-2.5 text-sm rounded-xl border border-app-border focus:border-app-green outline-none" value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} />
                            </div>
                            <div className="flex items-end pb-1">
                                <label className="flex items-center gap-2 cursor-pointer">Zip Code</label>
                                <input type="checkbox" checked={form.isDefault} onChange={(e)=>setForm({...form, isDefault: e.target.checked})}/>
                                <span className="text-sm text-app-text">Establecer como Predeterminado</span>
                            </div>
                        </div>
                        
                        {/* submit button */}
                        <button type="submit" className="mt-6 w-full py-3 bg-app-green text-white font-semibold rounded-xl hover:bg-app-green-light transition-colors">
                            {editingId ? "Actualizar Dirección" : "Guardar Dirección"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddressForm