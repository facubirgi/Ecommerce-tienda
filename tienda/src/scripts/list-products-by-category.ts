import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function listProductsByCategory({
  container,
}: {
  container: MedusaContainer
}) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  console.log("\n===========================================")
  console.log("📦 PRODUCTOS POR CATEGORÍA")
  console.log("===========================================\n")

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle", "products.*"],
  })

  for (const category of categories) {
    const productCount = category.products?.length || 0
    console.log(`\n📁 ${category.name} (${category.handle})`)
    console.log(`   Total productos: ${productCount}`)

    if (productCount > 0) {
      console.log(`   Productos:`)
      category.products.slice(0, 5).forEach((product: any) => {
        console.log(`     - ${product.title}`)
      })
      if (productCount > 5) {
        console.log(`     ... y ${productCount - 5} más`)
      }
    }
  }

  console.log("\n===========================================\n")
}
