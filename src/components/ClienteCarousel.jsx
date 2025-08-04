import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card" // Assuming shadcn/ui components are available

export default function ClientCarousel({ clients }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const carouselRef = useRef(null)
  const autoPlayRef = useRef()

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
      }, 4000)
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying, isDragging, clients.length])

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsDragging(true)
    setIsAutoPlaying(false)
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0))
    setScrollLeft(carouselRef.current?.scrollLeft || 0)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const x = e.touches[0].pageX - (carouselRef.current?.offsetLeft || 0)
    const walk = (x - startX) * 2
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    setTimeout(() => setIsAutoPlaying(true), 2000)
  }

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 336}px)`,
            width: `${clients.length * 2 * 336}px`,
          }}
        >
          {/* First set of clients */}
          {clients.map((client, index) => (
            <div key={index} className="flex-shrink-0 w-80 mx-4">
              <Card className="group border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 h-full select-none">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-[#00337F]/5 group-hover:to-[#127AFF]/5 transition-all duration-500">
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      width={140}
                      height={80}
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform pointer-events-none"
                      draggable={false}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#00337F] transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    Cliente desde 2023
                  </p>
                  <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {clients.map((client, index) => (
            <div key={`duplicate-${index}`} className="flex-shrink-0 w-80 mx-4">
              <Card className="group border-0 bg-white hover:bg-gray-50/50 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 p-8 h-full select-none">
                <CardContent className="flex flex-col items-center text-center p-0">
                  <div className="mb-6 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl group-hover:from-[#00337F]/5 group-hover:to-[#127AFF]/5 transition-all duration-500">
                    <img
                      src={client.logo || "/placeholder.svg"}
                      alt={client.name}
                      width={140}
                      height={80}
                      className="opacity-70 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110 transform pointer-events-none"
                      draggable={false}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#00337F] transition-colors">
                    {client.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">
                    Cliente desde 2023
                  </p>
                  <div className="flex items-center mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">5.0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {clients.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
              setTimeout(() => setIsAutoPlaying(true), 3000)
            }}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-[#127AFF]" : "bg-gray-300 hover:bg-[#127AFF]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
