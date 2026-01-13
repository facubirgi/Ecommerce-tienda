import Image from "next/image"

const Hero = () => {
  return (
    <>
      {/* Banner para Mobile - se muestra hasta 768px (incluye iPhone 14 Pro Max: 430px) */}
      <div className="relative w-full h-[45vh] overflow-hidden block md:hidden">
        <Image
          src="/bannerhomerdefmobile.png"
          alt="Store by Pauli - Hero Banner"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Banner para Desktop - se muestra desde 768px en adelante */}
      <div className="relative w-full h-[50vh] overflow-hidden hidden md:block">
        <Image
          src="/bannerhomedef.png"
          alt="Store by Pauli - Hero Banner"
          fill
          className="object-cover object-center"
          priority
          quality={100}
          style={{ objectPosition: 'center' }}
        />
      </div>
    </>
  )
}

export default Hero
