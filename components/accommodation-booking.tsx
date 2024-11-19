'use client'

import React, { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Send, Wifi, Car, Ticket, Coffee, Utensils, Home } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { motion } from 'framer-motion'
import { PageTransition, FadeIn, StaggerChildren } from '@/components/layout/page-transition'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { BackButton } from '@/components/ui/back-button'
import { ScrollAnimation } from '@/components/animations/scroll-animation'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  accommodation: z.string().min(1, { message: "Tipul cazării este obligatoriu" }),
  checkIn: z.date({ required_error: "Data check-in este obligatorie" }),
  checkOut: z.date({ required_error: "Data check-out este obligatorie" }),
  guests: z.number().min(1, { message: "Numărul de oaspeți este obligatoriu" }),
  name: z.string().min(2, { message: "Numele este obligatoriu" }),
  email: z.string().email({ message: "Email invalid" }),
  phone: z.string().min(10, { message: "Număr de telefon invalid" }),
})

const accommodations = [
  {
    title: "HUNTER'S LODGE",
    subtitle: "VILA",
    description: "Dacă sunteți în căutarea unei experiențe de vacanță inedită, alături de familie sau prieteni, vă invităm la un răsfăț nobil.",
    details: "HUNTER'S LODGE este vila situată în grădina Castelului Cantacuzino, la circa 1000 metri altitudine, având o priveliște de neegalat asupra masivului Caraiman. Construcția datează dinaintea anului 1930 și a fost renovată integral în 2017, păstrând arhitectura originală.",
    amenities: [
      "2 dormitoare cu paturi matrimoniale",
      "2 băi cu încălzire în pardoseală",
      "1 cameră de zi cu șemineu",
      "1 bar bucătărie utilat cu mașină de cafea, frigider, ceainic etc."
    ],
    facilities: [
      { icon: <Wifi className="h-5 w-5" />, text: "Acces WiFi" },
      { icon: <Car className="h-5 w-5" />, text: "Parcare privată" },
      { icon: <Ticket className="h-5 w-5" />, text: "Tur ghidat al castelului (în limba română sau engleză)" },
      { icon: <Utensils className="h-5 w-5" />, text: "Voucher discount la restaurantul Canta Cuisine" },
      { icon: <Home className="h-5 w-5" />, text: "Acces la parcul de aventură din curtea castelului" }
    ],
    images: [
      "/images/camera-1.png",
      "/images/camera-2.png",
      "/images/camera-3.png"
    ]
  },
  {
    title: "GARDEN SUITE",
    subtitle: "APARTAMENT",
    description: "cu împrejurimile sale unice și farmecul aristocratic, este locul ideal pentru orice tip de eveniment.",
    details: "Dacă ți-ai dorit vreodată să dormi într-un castel, acum poți transforma acel vis în realitate. GARDEN SUITE este apartamentul situat în interiorul Castelului Cantacuzino, având acces direct din curtea interioară. Locația unică dispune de finisaje elegante și un ambient primitor.",
    amenities: [
      "1 dormitor cu pat matrimonial",
      "1 cameră de zi având canapea extensibilă",
      "1 baie"
    ],
    facilities: [
      { icon: <Wifi className="h-5 w-5" />, text: "Acces WiFi" },
      { icon: <Coffee className="h-5 w-5" />, text: "Încălzire în pardoseală" },
      { icon: <Car className="h-5 w-5" />, text: "Parcare privată" },
      { icon: <Ticket className="h-5 w-5" />, text: "Tur ghidat al castelului (în limba română sau engleză)" },
      { icon: <Utensils className="h-5 w-5" />, text: "Voucher discount la restaurantul Canta Cuisine" },
      { icon: <Home className="h-5 w-5" />, text: "Acces la parcul de aventură din curtea castelului" }
    ],
    images: [
      "/images/camera-4.png",
      "/images/camera-5.png",
      "/images/camera-6.png"
    ]
  }
]

type FieldProps = {
  field: {
    value: any;
    onChange: (value: any) => void;
  };
};

export function AccommodationBookingComponent() {
  const [selectedAccommodation, setSelectedAccommodation] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const accommodationType = searchParams.get('type')
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
    },
  })

  useEffect(() => {
    if (accommodationType) {
      setTimeout(() => {
        form.setValue("accommodation", accommodationType, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
        
        // Also update the selected accommodation state
        setSelectedAccommodation(accommodationType === 'hunters-lodge' ? "HUNTER'S LODGE" : "GARDEN SUITE");
        
        if (window.location.hash === '#form') {
          const formElement = formRef.current;
          if (formElement) {
            const yOffset = -100;
            const y = formElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [accommodationType, form]);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  // Function to handle accommodation selection and smooth scroll
  const handleAccommodationClick = (title: string) => {
    setSelectedAccommodation(title)
    
    // Map the accommodation titles to their corresponding form values
    const accommodationMap: { [key: string]: string } = {
      "HUNTER'S LODGE": "hunters-lodge",
      "GARDEN SUITE": "garden-suite"
    }
    
    // Force update the form value with validation
    form.setValue("accommodation", accommodationMap[title], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    });

    // Smooth scroll to form
    const formElement = formRef.current;
    if (formElement) {
      const startPosition = window.pageYOffset;
      const targetPosition = formElement.getBoundingClientRect().top + window.pageYOffset - 100;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = (t: number) => t * t * (3 - 2 * t);
        window.scrollTo(0, startPosition + (distance * ease(progress)));
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  }

  return (
    <PageTransition>
      <BackButton />
      <div className="min-h-screen bg-black text-white">
        <div className="relative h-[70vh] w-full overflow-hidden">
          <div 
            ref={parallaxRef}
            className="absolute inset-0 bg-[url('/images/castel-39-1-1030x687.jpg')] bg-cover bg-center bg-no-repeat"
            style={{ height: '120%', top: '-10%' }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
            <header className="mb-12 text-center">
              <Image
                src="/images/logo_colored2.png"
                alt="Cantacuzino Castle Logo"
                width={80}
                height={80}
                className="mx-auto mb-4"
              />
              <p className="text-[rgb(201,171,129)] text-sm font-['EB_Garamond'] italic mb-2">Bun venit la</p>
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                <h1 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                  Castelul Cantacuzino
                </h1>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>
              <p className="text-lg text-white font-light italic">
                cu împrejurimile sale unice și farmecul aristocratic, este locul ideal pentru orice tip de cazare.
              </p>
            </header>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                Cazare
              </h2>
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
            {accommodations.map((accommodation, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <div 
                  className="group relative overflow-hidden cursor-pointer rounded-[6px] border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)]"
                  onClick={() => handleAccommodationClick(accommodation.title)}
                >
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={accommodation.images[0]}
                      alt={accommodation.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-lg text-white/90 font-light mb-2">
                        {accommodation.subtitle}
                      </p>
                      <h3 className="text-2xl font-light text-white font-['EB_Garamond'] tracking-wider">
                        {accommodation.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {selectedAccommodation && (
            <ScrollAnimation delay={0.4}>
              <div className="mb-16">
                <FadeIn>
                  <div className="text-center mb-8">
                    <p className="text-lg text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-2 italic">
                      {accommodations.find(acc => acc.title === selectedAccommodation)?.subtitle}
                    </p>
                    <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                      {selectedAccommodation}
                    </h2>
                    <p className="text-lg text-white/80 font-light italic mt-4 max-w-3xl mx-auto">
                      {accommodations.find(acc => acc.title === selectedAccommodation)?.description}
                    </p>
                  </div>
                </FadeIn>

                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                >
                  {accommodations
                    .find(acc => acc.title === selectedAccommodation)
                    ?.images.map((image, index) => (
                      <motion.div key={index} className="relative h-[300px] overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`${selectedAccommodation} image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                </motion.div>

                <StaggerChildren>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-8">
                    <div>
                      <p className="text-white/80 mb-8">
                        {accommodations
                          .find(acc => acc.title === selectedAccommodation)?.details
                        }
                      </p>
                      <h3 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                        Dotări
                      </h3>
                      <ul className="space-y-2 text-white/80">
                        {accommodations
                          .find(acc => acc.title === selectedAccommodation)?.amenities.map((amenity, idx) => (
                            <li key={idx}>{amenity}</li>
                          ))
                        }
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                        Facilități
                      </h3>
                      <div className="grid gap-4">
                        {accommodations
                          .find(acc => acc.title === selectedAccommodation)?.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[rgb(201,171,129)] flex items-center justify-center">
                                {React.cloneElement(facility.icon, { className: "h-5 w-5 text-black" })}
                              </div>
                              <p className="text-white/80">{facility.text}</p>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </StaggerChildren>

                <Separator className="bg-[rgb(201,171,129)]/20 h-[1px] w-full my-8" />
              </div>
            </ScrollAnimation>
          )}

          <ScrollAnimation delay={0.6}>
            <div className="max-w-2xl mx-auto" ref={formRef}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                  Rezervă-ți Sejurul
                </h2>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="accommodation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Tip cazare*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]">
                              <SelectValue placeholder="Selectează tipul cazării" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-white border-white/20">
                            <SelectItem value="hunters-lodge">Hunter's Lodge</SelectItem>
                            <SelectItem value="garden-suite">Garden Suite</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-[rgb(201,171,129)]">Check-in*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    field.value.toLocaleDateString()
                                  ) : (
                                    <span>Alege data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                                className="bg-black text-white"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-[rgb(201,171,129)]">Check-out*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    field.value.toLocaleDateString()
                                  ) : (
                                    <span>Alege data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                                className="bg-black text-white"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Nr. Oaspeți*</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))} 
                            className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Nume*</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Email*</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Telefon*</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-[rgb(201,171,129)] hover:bg-[rgb(181,151,109)] text-black">
                    Trimite
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Form>
            </div>
          </ScrollAnimation>

          <footer className="mt-16 text-center text-[rgb(201,171,129)]">
            <p>Pentru detalii și rezervări:</p>
            <p className="font-bold">+40 244 320 520</p>
            <p>office@cantacuzinocastle.ro</p>
          </footer>
        </div>
      </div>
    </PageTransition>
  )
}

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8,
      ease: [0.165, 0.84, 0.44, 1]
    }
  }
}