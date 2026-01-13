import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export default async function listCategories({
  container,
}: {
  container: MedusaContainer
}) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  console.log("\n===========================================")
  console.log("📋 CATEGORÍAS EN LA BASE DE DATOS")
  console.log("===========================================\n")

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "name", "handle", "is_active", "parent_category_id"],
  })

  console.log(`Total de categorías: ${categories.length}\n`)

  // Separar categorías principales y subcategorías
  const mainCategories = categories.filter((cat: any) => !cat.parent_category_id)
  const subCategories = categories.filter((cat: any) => cat.parent_category_id)

  console.log("🏷️  CATEGORÍAS PRINCIPALES:")
  mainCategories.forEach((cat: any) => {
    console.log(`  ✓ ${cat.name}`)
    console.log(`    Handle: ${cat.handle}`)
    console.log(`    ID: ${cat.id}`)
    console.log(`    Activa: ${cat.is_active}`)
    console.log("")
  })

  console.log("\n📁 SUBCATEGORÍAS:")
  subCategories.forEach((cat: any) => {
    console.log(`  ✓ ${cat.name}`)
    console.log(`    Handle: ${cat.handle}`)
    console.log(`    ID: ${cat.id}`)
    console.log(`    Parent: ${cat.parent_category_id}`)
    console.log("")
  })

  console.log("===========================================\n")
}
