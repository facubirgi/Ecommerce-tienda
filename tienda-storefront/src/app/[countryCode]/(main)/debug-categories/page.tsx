import { listCategories } from "@lib/data/categories"

export default async function DebugCategories() {
  const categories = await listCategories()

  return (
    <div className="content-container py-12">
      <h1 className="text-2xl font-bold mb-6">Debug: Categorías en la Base de Datos</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Categorías Principales:</h2>
        {categories
          .filter((cat) => !cat.parent_category_id)
          .map((category) => (
            <div key={category.id} className="border p-4 rounded">
              <p><strong>Nombre:</strong> {category.name}</p>
              <p><strong>Handle:</strong> {category.handle}</p>
              <p><strong>ID:</strong> {category.id}</p>
              <p><strong>Activa:</strong> {category.is_active ? "Sí" : "No"}</p>

              {category.category_children && category.category_children.length > 0 && (
                <div className="ml-6 mt-2">
                  <p className="font-semibold">Subcategorías:</p>
                  {category.category_children.map((child) => (
                    <div key={child.id} className="ml-4 text-sm">
                      <p>- {child.name} (handle: {child.handle})</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
