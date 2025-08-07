import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function ClientCarousel({ clients }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef()

  // Autoplay scroll
  useEffect(() => {
    if (isAutoPlaying && !isDragging && carouselRef.current) {
      autoPlayRef.current = setInterval(() => {
        const container = carouselRef.current
        const itemWidth = container.offsetWidth
        const nextIndex = (currentIndex + 1) % clients.length
        setCurrentIndex(nextIndex)
        container.scrollTo({
          left: nextIndex * itemWidth,
          behavior: "smooth",
        })
      }, 3000)
    }

    return () => clearInterval(autoPlayRef.current)
  }, [isAutoPlaying, isDragging, currentIndex, clients.length])

  // Drag / touch handlers
  const handleMouseDown = (e) => {
    return;
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e) => {
    return;
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleMouseUp = () => {
    return;
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  const handleTouchStart = (e) => {
    return;
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 1.5
    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        style={{ pointerEvents: 'none'}}
       /*  onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd} */
      >
        {clients.map((client, index) => (
          <div
            key={index}
            className="min-w-full sm:min-w-[80%] md:min-w-[50%] lg:min-w-[33.33%] px-4 snap-center"
          >
            <Card className="group border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 h-full select-none">
              <CardContent className="flex flex-col items-center text-center p-0">
                <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-[#00337F]/5 group-hover:to-[#127AFF]/5 transition-all duration-500">
                  <img
                    src={client.logo || "/placeholder.svg"}
                    alt={client.name}
                    width={140}
                    height={80}
                    className="group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform pointer-events-none"
                    draggable={false}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#00337F] transition-colors">
                  {client.name}
                </h3>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Bullets */}
      <div className="flex justify-center mt-6 space-x-2">
        {clients.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const container = carouselRef.current
              const itemWidth = container.offsetWidth
              setCurrentIndex(index)
              container.scrollTo({
                left: index * itemWidth,
                behavior: "smooth",
              })
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 2000)
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex
                ? "bg-[#127AFF]"
                : "bg-gray-300 hover:bg-[#127AFF]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
