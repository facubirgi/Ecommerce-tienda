import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Políticas y Términos - Store by Pauli",
  description:
    "Conoce nuestras políticas de privacidad, envíos, cambios, devoluciones y términos y condiciones. Compra con confianza.",
}

export default function ReturnsPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-[#c5c5c5] py-20 md:py-32">
        <div className="content-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight text-black leading-tight mb-6" style={{ fontWeight: 500 }}>
              POLÍTICAS Y TÉRMINOS
            </h1>
            <p className="text-sm tracking-[0.2em] uppercase text-gray-600 font-light">
              COMPRA CON CONFIANZA Y TRANSPARENCIA
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="content-container">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* POLÍTICA DE PRIVACIDAD */}
            <div className="space-y-6 border-b border-gray-200 pb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8" style={{ fontWeight: 500 }}>
                POLÍTICA DE PRIVACIDAD
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  En Store by Pauli valoramos la privacidad y seguridad de todos nuestros clientes. Esta Política explica cómo recopilamos, usamos y protegemos sus datos personales.
                </p>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    INFORMACIÓN QUE RECOPILAMOS
                  </h3>
                  <p className="leading-relaxed">
                    Recopilamos únicamente los datos necesarios para brindar nuestro servicio:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Nombre y apellido</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Email y teléfono</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Dirección para envíos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Información de pago (no almacenamos datos de tarjetas)</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    USO DE LA INFORMACIÓN
                  </h3>
                  <p className="leading-relaxed">
                    Sus datos serán utilizados para:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Procesar pedidos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Realizar envíos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Contactarlo por información relevante de su compra</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Mejorar su experiencia de compra</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed font-medium text-black mt-4">
                    Nunca vendemos ni cedemos sus datos a terceros.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    PROTECCIÓN DE DATOS
                  </h3>
                  <p className="leading-relaxed">
                    Store by Pauli utiliza medidas de seguridad para resguardar la información enviada por nuestros usuarios. Los datos se almacenan de forma segura y confidencial.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    CONSENTIMIENTO
                  </h3>
                  <p className="leading-relaxed">
                    Al utilizar nuestra página web o realizar una compra, el cliente acepta esta Política de Privacidad.
                  </p>
                </div>
              </div>
            </div>

            {/* POLÍTICA DE ENVÍOS */}
            <div className="space-y-6 border-b border-gray-200 pb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8" style={{ fontWeight: 500 }}>
                POLÍTICA DE ENVÍOS
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  En Store by Pauli trabajamos para que cada envío llegue seguro, rápido y en perfectas condiciones.
                </p>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    MODALIDADES DE ENVÍO
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-black mb-2">Envíos mediante Andreani (domicilio o sucursal):</p>
                      <p className="leading-relaxed">
                        Trabajamos con Andreani, empresa líder en logística del país, lo que garantiza seguridad y trazabilidad del envío.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-black mb-2">Retiro en domicilio:</p>
                      <p className="leading-relaxed">
                        Podés retirar tu compra personalmente en nuestro domicilio ubicado en: Rafaela, Santa Fe (Siempre con coordinación previa).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    TIEMPOS DE ENTREGA
                  </h3>
                  <div className="space-y-3">
                    <p className="font-medium text-black">Envíos por Andreani:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>El plazo estándar de entrega es de 2 a 3 días hábiles.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg mt-6">
                    <p className="font-medium text-black mb-3">IMPORTANTE:</p>
                    <p className="leading-relaxed mb-3">
                      Los envíos pueden sufrir demoras por situaciones de fuerza mayor tales como:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Factores climáticos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Feriados o fechas especiales</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Procesos aduaneros</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Medidas sanitarias</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Huelgas o retrasos operativos del correo</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mt-4">
                      En todos los casos, el seguimiento estará disponible mediante el código de seguimiento que recibirás una vez despachado el pedido.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    COSTOS DE ENVÍOS
                  </h3>
                  <p className="leading-relaxed">
                    El costo del envío se calcula automáticamente según:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Localidad</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Peso y volumen del paquete</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    El monto final se informa antes de completar la compra.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    REENVÍOS
                  </h3>
                  <p className="leading-relaxed">
                    Si el paquete es devuelto por:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Dirección incorrecta</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Falta de retiro en sucursal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Ausencia reiterada en el domicilio</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Datos incompletos de contacto</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4 font-medium text-black">
                    El comprador deberá abonar un nuevo envío para el reenvío del paquete.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    EMBALAJE
                  </h3>
                  <p className="leading-relaxed">
                    Todos los pedidos se despachan correctamente protegidos para evitar daños durante el transporte.
                  </p>
                  <p className="leading-relaxed">
                    Store by Pauli no se responsabiliza por daños ocasionados por mala manipulación del correo, pero acompañaremos al cliente en el proceso de reclamo si fuera necesario.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ - PREGUNTAS FRECUENTES */}
            <div className="space-y-6 border-b border-gray-200 pb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8" style={{ fontWeight: 500 }}>
                PREGUNTAS FRECUENTES
              </h2>
              <div className="space-y-8 text-gray-700">

                <div className="space-y-3">
                  <p className="font-medium text-black text-lg">
                    ⭐ ¿Los productos son originales?
                  </p>
                  <p className="leading-relaxed">
                    Nuestros productos son réplicas de calidad premium. En excepción, los body splash de Victoria&apos;s Secret son 100% ORIGINALES.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-black text-lg">
                    ⭐ ¿Hacen envíos a todo el país?
                  </p>
                  <p className="leading-relaxed">
                    Sí, enviamos mediante Andreani.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-black text-lg">
                    ⭐ ¿Puedo cambiar mi compra?
                  </p>
                  <p className="leading-relaxed">
                    Sí, aceptamos cambios de carteras y gafas (NO BODY SPLASH) dentro de los 7 días. El producto debe estar sin uso y en su estado original. Los costos de envío corren por cuenta del comprador.
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-black text-lg">
                    ⭐ ¿Qué medios de pago aceptan?
                  </p>
                  <p className="leading-relaxed">
                    Transferencia y Mercado Pago (TODAS LAS TARJETAS).
                  </p>
                </div>

                <div className="space-y-3">
                  <p className="font-medium text-black text-lg">
                    ⭐ ¿Cómo los contacto?
                  </p>
                  <div className="leading-relaxed">
                    <p>WhatsApp: <a href="https://wa.me/5493492267140" className="text-black underline hover:text-gray-600 transition-colors">+54 9 3492 267140</a></p>
                    <p>Instagram: <a href="https://instagram.com/storebypauli_" className="text-black underline hover:text-gray-600 transition-colors">@Storebypauli_</a></p>
                  </div>
                </div>

              </div>
            </div>

            {/* TÉRMINOS Y CONDICIONES */}
            <div className="space-y-6 border-b border-gray-200 pb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8" style={{ fontWeight: 500 }}>
                TÉRMINOS Y CONDICIONES
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  Bienvenidos a Store by Pauli. Al acceder y realizar una compra en nuestra tienda online, usted acepta los términos y condiciones que se detallan a continuación. Le recomendamos leerlos atentamente.
                </p>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    INFORMACIÓN DE LA TIENDA
                  </h3>
                  <p className="leading-relaxed">
                    Store by Pauli es un emprendimiento dedicado a la venta de carteras, gafas y body splash originales, seleccionados cuidadosamente para ofrecer calidad, tendencia y una experiencia accesible.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    PRODUCTOS
                  </h3>
                  <p className="leading-relaxed">
                    Todos los productos publicados cuentan con:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Fotografías reales</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Descripciones detalladas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Información de medidas, colores y características</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed italic text-gray-600 mt-4">
                    Los colores pueden variar ligeramente según la pantalla del dispositivo del usuario.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    PRECIOS Y FORMAS DE PAGO
                  </h3>
                  <p className="leading-relaxed">
                    Los precios están expresados en pesos argentinos (ARS) e incluyen IVA.
                  </p>
                  <p className="leading-relaxed mt-3">
                    Medios de pago disponibles:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Transferencia bancaria</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Efectivo (para entregas presenciales)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Mercado Pago (ACEPTAMOS TODAS LAS TARJETAS)</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Las promociones pueden variar sin previo aviso.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    ENVÍOS
                  </h3>
                  <p className="leading-relaxed">
                    Realizamos envíos a todo el país a través de:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Andreani</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Retiro presencial (coordinar previamente)</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Los tiempos de entrega varían según localidad y operador logístico. Store by Pauli no se responsabiliza por demoras ajenas al servicio.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    CAMBIOS (CARTERAS Y GAFAS)
                  </h3>
                  <p className="leading-relaxed">
                    Aceptamos cambios dentro de los 7 días corridos desde la recepción del producto, según la Ley de Defensa del Consumidor.
                  </p>
                  <p className="leading-relaxed mt-3">Requisitos:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Producto sin uso</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>En su estado original, con etiquetas y packaging</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Presentación del comprobante de compra</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed font-medium text-black mt-4">
                    NO SE REALIZAN CAMBIOS POR MAL USO O DESGASTE NATURAL.
                  </p>
                  <p className="leading-relaxed mt-4">
                    Los costos de envío para realizar el cambio corren por cuenta del comprador.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    DERECHO DE ARREPENTIMIENTO (COMPRAS ONLINE)
                  </h3>
                  <p className="leading-relaxed">
                    El cliente tiene derecho a arrepentirse de la compra dentro de los 10 días corridos desde la recepción del producto.
                  </p>
                  <p className="leading-relaxed mt-3">Condiciones para ejercer este derecho:</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>El producto debe estar sin uso y en perfecto estado</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>El cliente debe notificar a Store by Pauli dentro del plazo establecido</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Una vez recibido el producto y verificado su estado, se realizará el reembolso total</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Los costos de envío por devolución corren por cuenta del comprador.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    CANCELACIONES DE PEDIDOS
                  </h3>
                  <p className="leading-relaxed">
                    Los pedidos pueden cancelarse antes del despacho. Si ya fue enviado, el cliente deberá esperar su recepción y gestionar un arrepentimiento o devolución según corresponda.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    DATOS PERSONALES Y PRIVACIDAD
                  </h3>
                  <p className="leading-relaxed">
                    La información brindada por el usuario se utiliza exclusivamente para:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Procesar compras</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Realizar envíos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-black font-bold">•</span>
                      <span>Brindar atención al cliente</span>
                    </li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    Store by Pauli no comparte datos con terceros, salvo obligación legal.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-serif text-xl md:text-2xl text-black mt-8" style={{ fontWeight: 500 }}>
                    CONTACTO
                  </h3>
                  <p className="leading-relaxed">
                    Para cambios, devoluciones o consultas, comunicarse a través de:
                  </p>
                  <p className="leading-relaxed mt-3">
                    WhatsApp: <a href="https://wa.me/5493492267140" className="text-black underline hover:text-gray-600 transition-colors">+54 9 3492 267140</a>
                  </p>
                </div>
              </div>
            </div>

            {/* POLÍTICAS DE CAMBIOS Y DEVOLUCIONES */}
            <div className="space-y-6 border-b border-gray-200 pb-16">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-8" style={{ fontWeight: 500 }}>
                POLÍTICAS DE CAMBIOS Y DEVOLUCIONES
              </h2>
              <div className="space-y-6 text-gray-700">
                <p className="leading-relaxed">
                  En Store by Pauli queremos que tu experiencia de compra sea clara, segura y transparente. A continuación detallamos nuestras políticas oficiales de cambios y devoluciones, aplicables exclusivamente a gafas y carteras.
                </p>

                {/* CAMBIOS */}
                <div className="space-y-4 mt-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-black" style={{ fontWeight: 500 }}>
                    CAMBIOS
                  </h3>
                  <p className="leading-relaxed">
                    Los cambios se pueden solicitar dentro de los <strong className="text-black">7 días hábiles</strong> desde la recepción del producto.
                  </p>

                  <div className="bg-gray-50 p-6 rounded-lg mt-6">
                    <h4 className="font-medium text-black mb-3 text-lg">Condiciones para efectuar un cambio</h4>
                    <p className="leading-relaxed mb-3">
                      Para aprobar un cambio, el producto debe cumplir todas estas condiciones:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Estar sin uso, sin marcas, manchas, rayones, olores o señales de desgaste</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Conservar packaging original, etiquetas, protectores y accesorios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Presentar comprobante de compra o número de pedido</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>No ser un artículo de higiene ni un producto adquirido en liquidación u oferta</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>No presentar daños por mal uso</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mt-4">
                      Los cambios se realizan por otro modelo, color o producto disponible, dentro de la misma categoría (gafas → gafas / carteras → carteras).
                    </p>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium text-black text-lg">COSTOS DE ENVÍOS Y REENVÍOS</h4>
                    <p className="leading-relaxed">
                      Los gastos asociados al cambio son 100% a cargo del comprador, incluyendo:
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Envío del producto hacia Store by Pauli</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Envío del nuevo producto (reenvío) hacia el comprador</span>
                      </li>
                    </ul>

                    <div className="bg-gray-50 p-6 rounded-lg mt-4">
                      <p className="font-medium text-black mb-3">IMPORTANTE!</p>
                      <p className="leading-relaxed">
                        El reenvío solo se realiza cuando el producto original:
                      </p>
                      <ol className="space-y-2 mt-3 list-decimal list-inside">
                        <li className="leading-relaxed">Sea recibido, evaluado, y aprobado por el equipo de Store by Pauli.</li>
                      </ol>
                      <p className="leading-relaxed mt-3">
                        Si el artículo presenta uso, daños o no cumple las condiciones, el cambio será rechazado y el comprador deberá abonar un nuevo envío para recuperarlo.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium text-black text-lg">PROCEDIMIENTO PARA SOLICITAR UN CAMBIO</h4>
                    <ol className="space-y-3 list-decimal list-inside">
                      <li className="leading-relaxed">Contactarse por WhatsApp indicando número de pedido</li>
                      <li className="leading-relaxed">Enviar fotos o videos claros del producto</li>
                      <li className="leading-relaxed">Nuestro equipo evaluará si cumple con los requisitos</li>
                      <li className="leading-relaxed">Se informarán los datos para el envío hacia Store by Pauli</li>
                      <li className="leading-relaxed">Una vez aprobado, se coordinará el pago del reenvío y el despacho del nuevo producto</li>
                    </ol>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium text-black text-lg">PRODUCTOS SIN POSIBILIDAD DE CAMBIOS</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Artículos usados o manipulados</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Productos dañados por mal uso</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Body splash</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Productos en liquidación, ofertas especiales o promociones</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* DEVOLUCIONES */}
                <div className="space-y-4 mt-12">
                  <h3 className="font-serif text-2xl md:text-3xl text-black" style={{ fontWeight: 500 }}>
                    DEVOLUCIONES
                  </h3>
                  <p className="leading-relaxed">
                    Las devoluciones se aceptan únicamente en los siguientes casos:
                  </p>

                  <div className="space-y-6 mt-6">
                    <h4 className="font-medium text-black text-lg">DEVOLUCIONES POR FALLA O DEFECTO DE FÁBRICA</h4>
                    <p className="leading-relaxed">
                      Aceptamos devoluciones por fallas comprobables de origen.
                    </p>

                    <div className="bg-green-50 p-6 rounded-lg mt-4">
                      <p className="font-medium text-black mb-3">✔ Se consideran fallas:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Defectos de costura</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Herrajes o cierres defectuosos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Fallas estructurales en gafas</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Imperfecciones de origen que afecten el uso normal</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-6 rounded-lg mt-4">
                      <p className="font-medium text-black mb-3">✖ No se consideran fallas:</p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Golpes, caídas o mal uso</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Daños por humedad, calor o productos químicos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Desgaste natural por uso</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Variaciones de color menores</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Olores propios del material</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4 mt-6">
                      <h5 className="font-medium text-black">Procedimiento para devolución por falla</h5>
                      <ol className="space-y-2 list-decimal list-inside">
                        <li className="leading-relaxed">Contactarse dentro de las 48 horas de recibido el producto</li>
                        <li className="leading-relaxed">Enviar fotos o videos evidenciando la falla</li>
                        <li className="leading-relaxed">Enviar el producto con su empaque original</li>
                        <li className="leading-relaxed">Evaluaremos el caso en un plazo de 24 a 48 horas hábiles</li>
                      </ol>

                      <h5 className="font-medium text-black mt-6">Opciones si la falla es confirmada</h5>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Reembolso total</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Cambio por el mismo producto</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Cambio por otro producto del mismo valor</span>
                        </li>
                      </ul>

                      <h5 className="font-medium text-black mt-6">Costos</h5>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Envío hacia Store by Pauli: a cargo del comprador</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-black font-bold">•</span>
                          <span>Si la falla es confirmada, el costo será reintegrado o descontado del reembolso</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6 mt-8">
                    <h4 className="font-medium text-black text-lg">DEVOLUCIÓN POR DERECHO DE ARREPENTIMIENTO (COMPRAS ONLINE)</h4>
                    <p className="leading-relaxed">
                      El cliente puede arrepentirse de la compra dentro de los <strong className="text-black">10 días corridos</strong> desde la recepción.
                    </p>

                    <p className="leading-relaxed mt-3">Requisitos:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Producto sin uso, sin daños y en perfecto estado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Mantener packaging original, etiquetas y accesorios</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Notificar dentro del plazo legal</span>
                      </li>
                    </ul>

                    <p className="leading-relaxed mt-4">
                      Los costos de envío por arrepentimiento corren por cuenta del comprador.
                    </p>
                    <p className="leading-relaxed mt-2">
                      Una vez recibido y verificado el producto, se realizará el reembolso total mediante el mismo medio de pago.
                    </p>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h4 className="font-medium text-black text-lg">PRODUCTOS SIN POSIBILIDAD DE DEVOLUCIÓN</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Body splash</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Cualquier producto usado o dañado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Artículos en liquidación o promoción (excepto por falla)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Productos que no cuenten con su packaging original</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h4 className="font-medium text-black text-lg">PLAZOS DE PROCESAMIENTO</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Evaluación del producto: 2 a 5 días hábiles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Reembolso: depende del medio de pago utilizado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Cambios: se procesan una vez verificado el estado del producto y abonado el reenvío</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4 mt-8">
                    <h4 className="font-medium text-black text-lg">¿CÓMO INICIAR UN CAMBIO O DEVOLUCIÓN?</h4>
                    <p className="leading-relaxed">Contactanos por:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>WhatsApp: <a href="https://wa.me/5493492267140" className="text-black underline hover:text-gray-600 transition-colors">+54 9 3492 267140</a></span>
                      </li>
                    </ul>

                    <p className="leading-relaxed mt-4">Debés indicar:</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Nombre y apellido</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Número de pedido</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Motivo (cambio o devolución)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-black font-bold">•</span>
                        <span>Fotos o videos del producto</span>
                      </li>
                    </ul>

                    <p className="leading-relaxed mt-4">
                      Nuestro equipo te guiará en cada paso del proceso.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-gray-50 p-8 md:p-12 text-center space-y-6 rounded-lg">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl md:text-3xl text-black" style={{ fontWeight: 500 }}>
                  🤍 NUESTRO COMPROMISO
                </h2>
                <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                  En Store by Pauli nos comprometemos a ofrecer calidad, seguridad y acompañamiento en cada compra. Trabajamos con responsabilidad y transparencia para cuidar tu experiencia y tu confianza.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <h3 className="font-serif text-xl text-black" style={{ fontWeight: 500 }}>
                  CONTACTO
                </h3>
                <div className="space-y-2 text-gray-700">
                  <p>
                    WhatsApp: <a href="https://wa.me/5493492267140" className="text-black underline hover:text-gray-600 transition-colors">+54 9 3492 267140</a>
                  </p>
                  <p>
                    Instagram: <a href="https://instagram.com/storebypauli_" className="text-black underline hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">@Storebypauli_</a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
