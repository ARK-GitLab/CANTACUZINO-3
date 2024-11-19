'use client'

import React, { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Clock, Send, Users, Utensils, GlassWater, Shield, Briefcase, UserCheck } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { BackButton } from '@/components/ui/back-button'
import { ScrollAnimation } from '@/components/animations/scroll-animation'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  eventType: z.string().min(1, { message: "Tipul evenimentului este obligatoriu" }),
  guestCount: z.number().min(1, { message: "Numărul de invitați este obligatoriu" }),
  date: z.date({ required_error: "Data este obligatorie" }),
  time: z.string().min(1, { message: "Ora este obligatorie" }),
  name: z.string().min(2, { message: "Numele este obligatoriu" }),
  email: z.string().email({ message: "Email invalid" }),
  phone: z.string().min(10, { message: "Număr de telefon invalid" }),
  comments: z.string().optional(),
})

const eventTypes = [
  {
    title: "NUNTĂ SAU BOTEZ",
    subtitle: "într-un cadru de poveste",
    image: "/images/image.png"
  },
  {
    title: "PETRECERI PRIVATE",
    subtitle: "memorabile",
    image: "/images/ev-5.png"
  },
  {
    title: "LANSĂRI DE PRODUSE",
    subtitle: "într-o ambianță nobilă",
    image: "/images/ev-2.png"
  },
  {
    title: "EVENIMENTE CULTURALE",
    subtitle: "cu dichis",
    image: "/images/ev-3.png"
  }
]

const premiumServices = [
  { icon: <Users className="h-6 w-6" />, text: "Event planner și echipă de profesioniști implicați în organizarea evenimentului" },
  { icon: <Briefcase className="h-6 w-6" />, text: "Flexibilitate și personalizare până la cel mai mic detaliu" },
  { icon: <Utensils className="h-6 w-6" />, text: "Preparate gourmet, gătite la locație de echipa Restaurantului Canta Cuisine" },
  { icon: <GlassWater className="h-6 w-6" />, text: "Barman și băuturi rafinate" },
  { icon: <Shield className="h-6 w-6" />, text: "Pază permanentă; Parcare privată" },
  { icon: <UserCheck className="h-6 w-6" />, text: "Echipă administrativă pe toată durata evenimentului" }
]

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

export function EventBookingComponent() {
  const searchParams = useSearchParams()
  const eventType = searchParams.get('type')
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestCount: 1,
    },
  })

  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (eventType) {
      setTimeout(() => {
        form.setValue("eventType", eventType, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        });
        
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
  }, [eventType, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  // Function to handle event type selection and smooth scroll
  const handleEventTypeClick = (title: string) => {
    setSelectedEventType(title)
    const eventTypeMap: { [key: string]: string } = {
      "NUNTĂ SAU BOTEZ": "nunta",
      "PETRECERI PRIVATE": "privat",
      "LANSĂRI DE PRODUSE": "corporate",
      "EVENIMENTE CULTURALE": "cultural"
    }
    form.setValue("eventType", eventTypeMap[title])

    // Smoother scroll animation with adjusted duration
    if (formRef.current) {
      const yOffset = -100;
      const element = formRef.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + yOffset;
      
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // Changed to 1 second
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth animation
        const ease = (t: number) => t * t * (3 - 2 * t); // Smoother easing curve
        
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
        <motion.div 
          className="relative h-[70vh] w-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
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
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                <h1 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                  Castelul Cantacuzino
                </h1>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>
              <p className="text-lg text-white font-light italic">
                cu împrejurimile sale unice și farmecul aristocratic, este locul ideal pentru orice tip de eveniment.
              </p>
            </header>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-8 pt-24 pb-16">
          <ScrollAnimation>
            <div className="flex items-center justify-center gap-4 mb-16">
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                Evenimente
              </h2>
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {eventTypes.map((event, index) => (
              <ScrollAnimation key={index} delay={index * 0.2}>
                <motion.div
                  className={`group relative overflow-hidden cursor-pointer rounded-[6px] border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)]`}
                  onClick={() => handleEventTypeClick(event.title)}
                >
                  <div className="relative h-[400px] overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-0" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <h3 className="text-2xl font-light text-white font-['EB_Garamond'] tracking-wider mb-2">
                        {event.title}
                      </h3>
                      <p className="text-white/90 italic font-light">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={0.4}>
            <div className="mb-16">
              <div className="flex items-center justify-center gap-4 mb-16">
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                  Servicii Premium
                </h2>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {premiumServices.map((service, index) => (
                  <ScrollAnimation key={index} delay={index * 0.2}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgb(201,171,129)] flex items-center justify-center">
                        {React.cloneElement(service.icon, { className: "h-6 w-6 text-black" })}
                      </div>
                      <p className="text-white/80">{service.text}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={0.6}>
            <div className="max-w-2xl mx-auto" ref={formRef}>
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
                  Rezervă-ți Evenimentul
                </h2>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="eventType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Tip eveniment*</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]">
                              <SelectValue placeholder="Selectează tipul evenimentului" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-white border-white/20">
                            <SelectItem value="nunta">NUNTĂ SAU BOTEZ</SelectItem>
                            <SelectItem value="privat">PETRECERI PRIVATE</SelectItem>
                            <SelectItem value="lansare">LANSĂRI DE PRODUSE</SelectItem>
                            <SelectItem value="cultural">EVENIMENTE CULTURALE</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guestCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Nr. Invitați*</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value, 10))} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-[rgb(201,171,129)]">Data*</FormLabel>
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
                                  <span>Alege o dată</span>
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
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Ora*</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]">
                              <SelectValue placeholder="Selectează ora" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-white border-white/20">
                            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                              <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                                {`${hour.toString().padStart(2, '0')}:00`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Comentarii sau întrebări (opțional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
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
        </div>

        <footer className="mt-16 text-center text-[rgb(201,171,129)]">
          <p>Pentru detalii și rezervări:</p>
          <p className="font-bold">+40 735 15 13 18</p>
          <p>rf@zamora-estate.com</p>
        </footer>
      </div>
    </PageTransition>
  )
}