import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow" data-testid="checkout-container">
        {children}
      </div>
      <Footer />
    </div>
  )
}
