'use client'

const VideoSection = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="content-container">
        {/* Layout Mobile: Video arriba, texto abajo a la derecha */}
        <div className="flex flex-col lg:hidden gap-8">
          {/* Video */}
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/video1.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Frase - Centrada en mobile */}
          <div className="flex justify-center px-8">
            <h2 className="font-serif text-4xl tracking-wide text-black leading-tight uppercase text-center" style={{ fontWeight: 500 }}>
              BAGS<br />
              ON<br />
              TRENDS
            </h2>
          </div>
        </div>

        {/* Layout Desktop: Video izquierda, texto derecha */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video - Lado Izquierdo */}
          <div className="relative w-full overflow-hidden flex items-center justify-center">
            <video
              className="w-full h-auto"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/video1.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>
          </div>

          {/* Frase - Lado Derecho */}
          <div className="flex flex-col justify-center items-center px-8 lg:px-16">
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl tracking-wide text-black leading-tight uppercase text-center" style={{ fontWeight: 500 }}>
              BAGS<br />
              SET<br />
              TRENDS
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
