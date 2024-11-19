'use client'

import React, { useState } from 'react'
import { 
  Bed, Clock, Camera, GalleryHorizontalEnd, 
  ShoppingBag, Utensils, Ticket, Smartphone, CreditCard, 
  ChevronDown, Euro, QrCode, Wallet, Facebook, Instagram, Crown, Home, Hotel, Users, Search,
  ChevronsDown
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollAnimation } from '@/components/animations/scroll-animation'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface MenuItem {
  title: string;
  icon: JSX.Element;
  image: string;
  description: string;
  tags: string[];
}

interface Filter {
  id: string;
  label: string;
  icon: JSX.Element;
}

const filters: Filter[] = [
  { id: 'tours', label: 'GUIDED TOURS', icon: <Ticket className="h-4 w-4" /> },
  { id: 'vip-tours', label: 'VIP TOURS', icon: <Crown className="h-4 w-4" /> },
  { id: 'art', label: 'ART GALLERY', icon: <GalleryHorizontalEnd className="h-4 w-4" /> },
  { id: 'events', label: 'EVENTS', icon: <Camera className="h-4 w-4" /> },
  { id: 'accommodation', label: 'ACCOMMODATION', icon: <Bed className="h-4 w-4" /> },
  { id: 'shop', label: 'SHOP', icon: <ShoppingBag className="h-4 w-4" /> },
  { id: 'dining', label: 'RESTAURANT', icon: <Utensils className="h-4 w-4" /> },
]

const menuItems: MenuItem[] = [
  {
    title: "Individual Tour",
    icon: <Ticket className="h-6 w-6" />,
    image: "/images/Cantacuzino-exterior2.jpg",
    description: "Explore the castle at your own pace, with access to all public areas",
    tags: ['tours']
  },
  {
    title: "Group Tour",
    icon: <Ticket className="h-6 w-6" />,
    image: "/images/castel-cantacuzino-gallery-6.jpg",
    description: "Guided tour for groups, with detailed presentation of castle history",
    tags: ['tours']
  },
  {
    title: "VIP Tours",
    icon: <Crown className="h-6 w-6" />,
    image: "/images/09e58b0d6b41579f5b525b587929f897.jpg",
    description: "Exclusive experience with dedicated guide and access to special areas",
    tags: ['vip-tours']
  },
  { 
    title: "Private Events", 
    icon: <Camera className="h-6 w-6" />, 
    image: "/images/ev-5.png", 
    description: "Organize private events in a unique historical setting",
    tags: ['events']
  },
  { 
    title: "Weddings", 
    icon: <Camera className="h-6 w-6" />, 
    image: "/images/image.png", 
    description: "The perfect location for your fairy tale wedding",
    tags: ['events']
  },
  { 
    title: "Corporate Events", 
    icon: <Camera className="h-6 w-6" />, 
    image: "/images/ev-2.png", 
    description: "Versatile spaces for conferences and business events",
    tags: ['events']
  },
  { 
    title: "Art Gallery", 
    icon: <GalleryHorizontalEnd className="h-6 w-6" />, 
    image: "/images/bdc678_aedf3baf27dc467f82dea2cbb56189b2mv2.jpg", 
    description: "Experience 'Bestiar' - featuring works by Picasso and Salvador Dali from the Adrian Șocu Collection",
    tags: ['art']
  },
  { 
    title: "Hunter's Lodge", 
    icon: <Home className="h-6 w-6" />, 
    image: "/images/camera-1.png", 
    description: "Exclusive villa in the castle gardens",
    tags: ['accommodation', 'hunters-lodge']
  },
  { 
    title: "Garden Suite", 
    icon: <Hotel className="h-6 w-6" />, 
    image: "/images/camera-4.png", 
    description: "Elegant apartment inside the castle",
    tags: ['accommodation', 'garden-suite']
  },
  { 
    title: "Shop", 
    icon: <ShoppingBag className="h-6 w-6" />, 
    image: "/images/bdc678_60ce07aa20024959abdedc8188360fad.jpeg", 
    description: "Browse our curated collection of castle souvenirs and local artisanal pieces",
    tags: ['shop']
  },
  { 
    title: "Canta Cuisine", 
    icon: <Utensils className="h-6 w-6" />, 
    image: "/images/Foto-209-1030x687.jpg", 
    description: "Savor our delightful culinary offerings",
    tags: ['dining']
  }
]

export function DesktopApp() {
  const router = useRouter()
  const [activeSection, setActiveSection] = React.useState('menu')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showQR, setShowQR] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState(3);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const resetFilters = () => {
    setActiveFilters([])
  }

  const filteredMenuItems = menuItems.filter(item => {
    const matchesFilter = activeFilters.length === 0 || item.tags.some(tag => activeFilters.includes(tag))
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const handleExplore = (title: string) => {
    switch(title) {
      case "Individual Tour":
        router.push('/visiting-program?type=castel-galerie-parc#form')
        break;
      case "Group Tour":
        router.push('/visiting-program?type=castel-galerie-parc-grup#form')
        break;
      case "VIP Tours":
        router.push('/visiting-program?type=vip-5plus#form')
        break;
      case "Private Events":
        router.push('/events?type=privat#form')
        break;
      case "Weddings":
        router.push('/events?type=nunta#form')
        break;
      case "Corporate Events":
        router.push('/events?type=lansare#form')
        break;
      case "Art Gallery":
        router.push('/events?type=cultural#form')
        break;
      case "Hunter's Lodge":
        router.push('/accommodation?type=hunters-lodge#form')
        break;
      case "Garden Suite":
        router.push('/accommodation?type=garden-suite#form')
        break;
      case "Canta Cuisine":
        router.push('/canta-cuisine#form')
        break;
      default:
        console.log('No route defined for:', title)
    }
  }

  const handleLearnMore = (title: string) => {
    switch(title) {
      case "Individual Tour":
        router.push('/visiting-program#individual')
        break;
      case "Group Tour":
        router.push('/visiting-program#grup')
        break;
      case "VIP Tours":
        router.push('/visiting-program#vip')
        break;
      case "Private Events":
      case "Weddings":
      case "Corporate Events":
        router.push('/events')
        break;
      case "Hunter's Lodge":
      case "Garden Suite":
        router.push('/accommodation')
        break;
      case "Canta Cuisine":
        router.push('/canta-cuisine')
        break;
      default:
        console.log('No route defined for:', title)
    }
  }

  const loadMoreCards = () => {
    setVisibleCards(prev => prev + 3);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <ScrollAnimation>
          <header className="mt-8 sm:mt-12 mb-8 sm:mb-12 text-center relative">
            <Image
              src="/images/logo_colored2.png"
              alt="Cantacuzino Castle Logo"
              width={60}
              height={60}
              className="mx-auto mb-6"
            />
            <p className="text-[rgb(201,171,129)] text-sm font-['EB_Garamond'] italic mb-4">Welcome to</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              <h1 className="text-4xl font-light text-white font-['EB_Garamond'] tracking-[0.2em] uppercase">
                Castelul Cantacuzino
              </h1>
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
            </div>
            <p className="text-3xl text-[rgb(201,171,129)] font-light font-christopher italic">
              Explore and book your visit
            </p>
          </header>
        </ScrollAnimation>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 max-w-4xl mx-auto">
          <ScrollAnimation delay={0.1}>
            <div className="text-center p-2 sm:p-3 group hover:bg-[rgb(201,171,129)]/5 transition-all duration-300 rounded-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-[rgb(201,171,129)] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Ticket className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xs sm:text-base font-plus-jakarta">BOOK ONLINE</h3>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={0.2}>
            <div className="text-center p-2 sm:p-3 group hover:bg-[rgb(201,171,129)]/5 transition-all duration-300 rounded-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-[rgb(201,171,129)] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xs sm:text-base font-plus-jakarta">SAVE TIME</h3>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={0.3}>
            <div className="text-center p-2 sm:p-3 group hover:bg-[rgb(201,171,129)]/5 transition-all duration-300 rounded-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-[rgb(201,171,129)] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xs sm:text-base font-plus-jakarta">MOBILE BOOKING</h3>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={0.4}>
            <div className="text-center p-2 sm:p-3 group hover:bg-[rgb(201,171,129)]/5 transition-all duration-300 rounded-lg">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 bg-[rgb(201,171,129)] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
              </div>
              <h3 className="text-xs sm:text-base font-plus-jakarta">CARD PAYMENT</h3>
            </div>
          </ScrollAnimation>
        </div>

        <Separator className="max-w-4xl mx-auto mb-16 sm:mb-24 bg-[rgba(255,255,255,0.08)]" />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-8">
              <Button 
                variant="outline" 
                className="w-full bg-transparent text-white hover:bg-[rgb(201,171,129)]/10 flex items-center gap-2 border-[rgba(255,255,255,0.08)] mb-4"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <span>Filter Services</span>
                <ChevronDown className={`h-4 w-4 text-[rgb(201,171,129)] transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </Button>

              <div className="relative w-full mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[rgb(201,171,129)]" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent text-white border border-[rgba(255,255,255,0.08)] rounded-md focus:outline-none focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)] placeholder:text-white/50"
                />
              </div>

              {isFilterOpen && (
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <Button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                      className={`w-full justify-start gap-2 text-xs sm:text-sm h-auto py-2 border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 ${
                        activeFilters.includes(filter.id)
                          ? 'bg-[rgb(201,171,129)] text-black hover:bg-[rgb(201,171,129)]/90'
                          : 'bg-black text-white hover:bg-[rgb(201,171,129)]/10'
                      }`}
                    >
                      {React.cloneElement(filter.icon, { 
                        className: `w-3 h-3 sm:w-4 sm:h-4 ${activeFilters.includes(filter.id) ? 'text-black' : 'text-[rgb(201,171,129)]'}` 
                      })}
                      <span className="truncate">{filter.label}</span>
                    </Button>
                  ))}
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="w-full text-xs sm:text-sm text-white hover:bg-[rgb(201,171,129)]/10 border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {activeSection === 'menu' && (
            <div className="flex-1">
              <div className="space-y-12 sm:space-y-16">
                <div className="md:max-w-none max-w-sm mx-auto space-y-12">
                  {filteredMenuItems.slice(0, window.innerWidth < 768 ? visibleCards : filteredMenuItems.length).map((item, index) => (
                    <div key={index} className="relative z-10">
                      <ScrollAnimation delay={index * 0.2}>
                        <Card 
                          className="overflow-hidden bg-black border-[rgba(255,255,255,0.08)] hover:border-[rgb(201,171,129)]/20 hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300"
                          onClick={() => setOpenCardIndex(openCardIndex === index ? null : index)}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Mobile view */}
                            <div className="md:hidden">
                              <div 
                                className={`relative h-[400px] transition-all duration-500 ease-in-out ${
                                  openCardIndex === index ? 'h-auto' : ''
                                }`}
                              >
                                <div className={`relative transition-all duration-500 ease-in-out ${
                                  openCardIndex === index ? 'h-[200px]' : 'h-[400px]'
                                }`}>
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className={`object-cover transition-transform duration-500 ease-in-out ${
                                      openCardIndex === index ? 'scale-105' : ''
                                    }`}
                                  />
                                  <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ease-in-out ${
                                    openCardIndex === index ? 'opacity-0' : ''
                                  }`} />
                                  <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ease-in-out ${
                                    openCardIndex === index ? 'opacity-0' : ''
                                  }`} />
                                  <div className={`absolute top-4 right-4 w-12 h-12 bg-black/80 rounded-full flex items-center justify-center transition-opacity duration-500 ease-in-out ${
                                    openCardIndex === index ? 'opacity-0' : ''
                                  }`}>
                                    {React.cloneElement(item.icon, { className: "w-6 h-6 text-[rgb(201,171,129)]" })}
                                  </div>
                                  <div className={`absolute bottom-4 left-4 right-4 transition-opacity duration-500 ease-in-out ${
                                    openCardIndex === index ? 'opacity-0' : ''
                                  }`}>
                                    <div className="flex items-center gap-2 mb-2">
                                      {item.tags.map((tag, idx) => {
                                        const filter = filters.find(f => f.id === tag);
                                        if (!filter) return null;
                                        return (
                                          <Badge 
                                            key={idx} 
                                            variant="outline" 
                                            className="text-[10px] bg-black/50 text-[rgb(201,171,129)] border-[rgb(201,171,129)]/20 backdrop-blur-sm"
                                          >
                                            {filter.label}
                                          </Badge>
                                        );
                                      })}
                                    </div>
                                    <h3 className="text-2xl font-light text-white font-['EB_Garamond'] tracking-wider">
                                      {item.title}
                                    </h3>
                                  </div>
                                </div>
                                <div className={`p-4 border-t border-dotted border-[rgb(201,171,129)]/50 [border-top-width:1px] [border-style:dotted] [border-image:linear-gradient(to_right,transparent_0%,rgb(201,171,129)_50%,transparent_100%)_100%_1] [border-image-slice:0_0_1_0] [border-spacing:20px] bg-black transition-all duration-500 ${
                                  openCardIndex === index ? 'opacity-100' : 'opacity-0 hidden'
                                }`}>
                                  <CardTitle className="text-xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                                    {item.title}
                                  </CardTitle>
                                  
                                  <CardDescription className="text-sm text-white/80 font-plus-jakarta mb-4">
                                    {item.description}
                                  </CardDescription>
                                  
                                  <div className="flex flex-wrap gap-2 mb-4">
                                    {item.tags.map((tag, idx) => {
                                      const filter = filters.find(f => f.id === tag);
                                      if (!filter) return null;
                                      return (
                                        <Badge key={idx} variant="outline" className="text-xs bg-[rgb(201,171,129)]/10 text-[rgb(201,171,129)] border-[rgb(201,171,129)]/20">
                                          {React.cloneElement(filter.icon, { className: "w-3 h-3 mr-1" })}
                                          {filter.label}
                                        </Badge>
                                      );
                                    })}
                                  </div>

                                  <div className="space-y-3 mb-4">
                                    {item.tags.includes('tours') || item.tags.includes('vip-tours') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 h-4 text-[rgb(201,171,129)]" />
                                          <span className="text-sm text-white">
                                            <span className="font-plus-jakarta">Duration: </span>
                                            <span className="font-montserrat">50</span>
                                            <span className="font-plus-jakarta"> minutes</span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Euro className="w-4 h-4 text-[rgb(201,171,129)]" />
                                          <div className="text-sm text-white font-montserrat">
                                            <div>Adults: 75 RON</div>
                                            <div>Children (from 6 years): 35 RON</div>
                                          </div>
                                        </div>
                                      </>
                                    ) : item.tags.includes('events') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Capacity: up to 200 people</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Events available 24/7</span>
                                        </div>
                                      </>
                                    ) : item.tags.includes('accommodation') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Bed className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">
                                            {item.title === "Hunter's Lodge" ? "2 bedrooms with double beds" : "1 bedroom with double bed"}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Check-in: 14:00 / Check-out: 12:00</span>
                                        </div>
                                      </>
                                    ) : item.tags.includes('dining') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 12:00 - 23:00</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Capacity: 60 indoor seats</span>
                                        </div>
                                      </>
                                    ) : item.tags.includes('art') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 10:00 - 18:00</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <GalleryHorizontalEnd className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Permanent exhibition</span>
                                        </div>
                                      </>
                                    ) : item.tags.includes('shop') ? (
                                      <>
                                        <div className="flex items-center gap-3">
                                          <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 10:00 - 18:00</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                          <span className="text-sm sm:text-base text-white font-plus-jakarta">Souvenirs and local crafts</span>
                                        </div>
                                      </>
                                    ) : null}
                                  </div>

                                  <div className="flex flex-col gap-2">
                                    <Button 
                                      variant="outline" 
                                      className="w-full bg-transparent text-[rgb(201,171,129)] border-[rgb(201,171,129)]/30 hover:bg-[rgb(201,171,129)]/5 hover:border-[rgb(201,171,129)]/50 transition-all duration-300 text-xs font-plus-jakarta"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleLearnMore(item.title);
                                      }}
                                    >
                                      LEARN MORE
                                    </Button>
                                    <Button 
                                      className="w-full bg-[rgb(201,171,129)]/80 text-black hover:bg-[rgb(201,171,129)]/60 transition-all duration-300 text-xs font-plus-jakarta"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleExplore(item.title);
                                      }}
                                    >
                                      BUY TICKETS
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Desktop view remains unchanged */}
                            <div className="hidden md:block relative h-full">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="hidden md:block">
                              <CardContent className="p-4 sm:p-6">
                                <CardHeader className="px-0">
                                  <CardTitle className="text-xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-2">
                                    {item.title}
                                  </CardTitle>
                                  <CardDescription className="text-sm text-white/80 font-plus-jakarta">
                                    {item.description}
                                  </CardDescription>
                                </CardHeader>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {item.tags.map((tag, idx) => {
                                    const filter = filters.find(f => f.id === tag);
                                    if (!filter) return null;
                                    return (
                                      <Badge key={idx} variant="outline" className="text-xs sm:text-sm bg-[rgb(201,171,129)]/10 text-[rgb(201,171,129)] border-[rgb(201,171,129)]/20">
                                        {React.cloneElement(filter.icon, { className: "w-3 h-3 mr-1" })}
                                        {filter.label}
                                      </Badge>
                                    );
                                  })}
                                </div>

                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                  {item.tags.includes('tours') || item.tags.includes('vip-tours') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white">
                                          <span className="font-plus-jakarta">Duration: </span>
                                          <span className="font-montserrat">50</span>
                                          <span className="font-plus-jakarta"> minutes</span>
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Euro className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <div className="text-sm sm:text-base text-white font-montserrat">
                                          <div>Adults: 75 RON</div>
                                          <div>Children (from 6 years): 35 RON</div>
                                        </div>
                                      </div>
                                    </>
                                  ) : item.tags.includes('events') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Capacity: up to 200 people</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Events available 24/7</span>
                                      </div>
                                    </>
                                  ) : item.tags.includes('accommodation') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Bed className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">
                                          {item.title === "Hunter's Lodge" ? "2 bedrooms with double beds" : "1 bedroom with double bed"}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Check-in: 14:00 / Check-out: 12:00</span>
                                      </div>
                                    </>
                                  ) : item.tags.includes('dining') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 12:00 - 23:00</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Users className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Capacity: 60 indoor seats</span>
                                      </div>
                                    </>
                                  ) : item.tags.includes('art') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 10:00 - 18:00</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <GalleryHorizontalEnd className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Permanent exhibition</span>
                                      </div>
                                    </>
                                  ) : item.tags.includes('shop') ? (
                                    <>
                                      <div className="flex items-center gap-3">
                                        <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Schedule: 10:00 - 18:00</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 text-[rgb(201,171,129)]" />
                                        <span className="text-sm sm:text-base text-white font-plus-jakarta">Souvenirs and local crafts</span>
                                      </div>
                                    </>
                                  ) : null}
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-4">
                                  <Button 
                                    variant="outline" 
                                    className="w-full sm:w-auto bg-transparent text-[rgb(201,171,129)] border-[rgb(201,171,129)] hover:bg-[rgb(201,171,129)]/10 text-xs sm:text-sm font-plus-jakarta"
                                    onClick={() => handleLearnMore(item.title)}
                                  >
                                    LEARN MORE
                                  </Button>
                                  <Button 
                                    className="w-full sm:w-auto bg-[rgb(201,171,129)] text-black hover:bg-[rgb(201,171,129)]/80 text-xs sm:text-sm font-plus-jakarta"
                                    onClick={() => handleExplore(item.title)}
                                  >
                                    BUY TICKETS
                                  </Button>
                                </div>
                              </CardContent>
                            </div>
                          </div>
                        </Card>
                      </ScrollAnimation>
                    </div>
                  ))}
                  
                  {/* Show "Load More" button only on mobile if there are more cards to show */}
                  {window.innerWidth < 768 && visibleCards < filteredMenuItems.length && (
                    <div className="flex justify-center pt-8">
                      <Button
                        variant="outline"
                        onClick={loadMoreCards}
                        className="w-12 h-12 rounded-full p-0 bg-transparent border border-[rgb(201,171,129)]/30 hover:bg-[rgb(201,171,129)]/5 hover:border-[rgb(201,171,129)]/50 transition-all duration-300"
                      >
                        <ChevronsDown className="h-6 w-6 text-[rgb(201,171,129)]" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {activeSection === 'booking' && (
          <Card className="max-w-4xl mx-auto bg-black">
            <CardHeader>
              <CardTitle className="text-2xl text-[rgb(201,171,129)] font-['EB_Garamond'] font-light">Booking Details</CardTitle>
              <CardDescription className="text-white">Please fill in your information below</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Your booking form content */}
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-sm text-[rgb(201,171,129)] font-plus-jakarta">
                For inquiries: +40 244 320 520
              </p>
            </CardFooter>
          </Card>
        )}

        {showQR && (
          <Card className="max-w-md mx-auto bg-black">
            <CardHeader>
              <CardTitle className="text-center text-[rgb(201,171,129)] font-['EB_Garamond'] font-light">Booking Confirmed!</CardTitle>
              <CardDescription className="text-center text-white">Your ticket is ready</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mx-auto mb-6 w-48 h-48 bg-white p-4 rounded-xl">
                <QrCode className="w-full h-full text-[rgb(201,171,129)]" />
              </div>
              <div className="space-y-4">
                <Button variant="outline" className="w-full bg-black text-[rgb(201,171,129)] border-[rgb(201,171,129)] hover:bg-[rgb(201,171,129)] hover:text-black" onClick={() => {}}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Add to Apple Wallet
                </Button>
                <Button variant="outline" className="w-full bg-black text-[rgb(201,171,129)] border-[rgb(201,171,129)] hover:bg-[rgb(201,171,129)] hover:text-black" onClick={() => {}}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Add to Google Wallet
                </Button>
              </div>
            </CardContent>
            <CardFooter className="text-center text-sm text-[rgb(201,171,129)]">
              You will receive a confirmation email with your ticket details
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}