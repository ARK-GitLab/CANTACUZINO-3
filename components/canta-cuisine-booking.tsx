'use client'

import React, { useEffect, useRef } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Send, Users, Clock, Utensils, Wine, ChefHat, Award, Star, Leaf, Coffee } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { BackButton } from '@/components/ui/back-button'

const formSchema = z.object({
  date: z.date({ required_error: "Data rezervării este obligatorie" }),
  time: z.string().min(1, { message: "Ora este obligatorie" }),
  guests: z.number().min(1, { message: "Numărul de persoane este obligatoriu" }),
  name: z.string().min(2, { message: "Numele este obligatoriu" }),
  email: z.string().email({ message: "Email invalid" }),
  phone: z.string().min(10, { message: "Număr de telefon invalid" }),
  specialRequests: z.string().optional(),
})

const restaurantFeatures = [
  { icon: <ChefHat className="h-6 w-6" />, title: "Bucătărie Gourmet", description: "Preparate rafinate cu influențe franțuzești" },
  { icon: <Wine className="h-6 w-6" />, title: "Vinuri Selecte", description: "Colecție vastă de vinuri românești și internaționale" },
  { icon: <Award className="h-6 w-6" />, title: "Chef Premiat", description: "Sub îndrumarea Chef Ionuț Tănase" },
  { icon: <Star className="h-6 w-6" />, title: "Fine Dining", description: "Experiență culinară nobiliară" },
  { icon: <Leaf className="h-6 w-6" />, title: "Ingrediente Premium", description: "Selecție atentă de ingrediente proaspete" },
  { icon: <Coffee className="h-6 w-6" />, title: "Patiserie", description: "Deserturi și produse de patiserie" },
  { icon: <Users className="h-6 w-6" />, title: "Evenimente", description: "Organizare evenimente speciale" }
]

const galleryImages = [
  "/images/cuisine-1.jpg",
  "/images/cuisine-2.jpg",
  "/images/cuisine-3.jpg",
  "/images/cuisine-4.jpg",
  "/images/cuisine-5.jpg",
  "/images/cuisine-6.jpg"
]

export function CantaCuisineBookingComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 2,
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <BackButton />
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute inset-0 bg-[url('/images/castel-39-1-1030x687.jpg')] bg-cover bg-center bg-no-repeat"
          style={{ height: '120%', top: '-10%' }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
          <div className="mb-12 text-center">
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
                Canta Cuisine
              </h1>
              <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
            </div>
          </div>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] italic mb-4">
              Auguste Escoffier
            </p>
            <p className="text-3xl text-white font-light font-['EB_Garamond'] tracking-wider">
              "MÂNCAREA BUNĂ ESTE FUNDAMENTUL FERICIRII AUTENTICE."
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-6">
              Experiență culinară nobiliară
            </h2>
            <p className="text-white/80 mb-6">
              Pasiunea pentru mâncăruri gourmet, rafinamentul și dragostea pentru artă și frumos sunt împletite cu măiestrie la Restaurant Canta Cuisine. Localizat în interiorul castelului și dispunând de o terasă exterioară de pe care se desfășoară cea mai frumoasă panoramă din Valea Prahovei, restaurantul cu specific franțuzesc și influențe internaționale vine în întâmpinarea oaspeților cu un regal culinar.
            </p>
            <p className="text-white/80">
              Restaurant Canta Cuisine, deschis pe tot parcursul anului, oferă, pe lângă preparatele franțuzești rafinate, deserturi delicioase și produse excelente de patiserie.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-6">
              Chef Ionuț Tănase
            </h2>
            <p className="text-white/80 mb-6">
              Chef Ionuț Tănase este un expert culinar cu o vastă experiență internațională, aducând acum expertiza sa incomparabilă la Canta Cuisine. Călătoria sa prin bucătăriile Europei și dincolo de acestea l-a transformat într-un bucătar versatil și inovator, pregătit să încânte oaspeții cu creațiile sale culinare rafinate.
            </p>
            <p className="text-white/80">
              De-a lungul carierei sale, Chef Ionuț a avut onoarea de a găti pentru oaspeți distinși, inclusiv pentru Președintele Taiwanului și membri ai familiei președintelui american Trump. Capacitatea sa de a oferi experiențe culinare excepționale sub presiune i-a adus recunoaștere și respect în industrie.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {restaurantFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full bg-[rgb(201,171,129)] flex items-center justify-center mx-auto mb-4">
                {React.cloneElement(feature.icon, { className: "h-6 w-6 text-black" })}
              </div>
              <h3 className="text-[rgb(201,171,129)] font-['EB_Garamond'] text-lg mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <Separator className="bg-[rgb(201,171,129)] mb-16" />

        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
            <h2 className="text-3xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase">
              Rezervă o Masă
            </h2>
            <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        {Array.from({ length: 9 }, (_, i) => i + 12).map((hour) => (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {`${hour}:00`}
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
                name="guests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[rgb(201,171,129)]">Nr. Persoane*</FormLabel>
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
              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[rgb(201,171,129)]">Cerințe speciale (opțional)</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[rgb(201,171,129)] hover:bg-[rgb(181,151,109)] text-black">
                Rezervă
                <Utensils className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>

        <footer className="mt-16 text-center text-[rgb(201,171,129)]">
          <p>Pentru detalii și rezervări:</p>
          <p className="font-bold">+40 244 320 520</p>
          <p>office@cantacuzinocastle.ro</p>
        </footer>
      </div>
    </div>
  )
}