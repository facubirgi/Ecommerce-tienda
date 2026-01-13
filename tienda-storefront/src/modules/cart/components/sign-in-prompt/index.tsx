import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between font-serif">
      <div>
        <Heading level="h2" className="font-serif txt-xlarge">
          ¿Ya tienes una cuenta?
        </Heading>
        <Text className="font-serif txt-medium text-ui-fg-subtle mt-2">
          Inicia sesión para una mejor experiencia.
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <button className="bg-white border border-gray-300 text-black font-serif text-xs tracking-[0.15em] uppercase px-6 py-2 hover:bg-gray-50 transition-colors" data-testid="sign-in-button">
            Iniciar sesión
          </button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
