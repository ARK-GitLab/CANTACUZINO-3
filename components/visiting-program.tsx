'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Clock, Mail, Languages, Send, Phone } from 'lucide-react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { PageTransition } from '@/components/layout/page-transition'
import { BackButton } from '@/components/ui/back-button'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ScrollAnimation } from '@/components/animations/scroll-animation'
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  visitType: z.string().min(1, { message: "Tipul vizitei este obligatoriu" }),
  date: z.string().min(1, { message: "Data vizitei este obligatorie" }),
  time: z.string().min(1, { message: "Ora vizitei este obligatorie" }),
  adults: z.number().min(0, { message: "Numărul de adulți trebuie să fie pozitiv" }),
  children: z.number().min(0, { message: "Numărul de copii trebuie să fie pozitiv" }),
  name: z.string().min(2, { message: "Numele este obligatoriu" }),
  email: z.string().email({ message: "Email invalid" }),
  phone: z.string().min(10, { message: "Număr de telefon invalid" }),
})

const individualPrices = [
  {
    title: "CASTEL + GALERIE + PARC",
    prices: [
      { category: "ADULT", price: "75 RON" },
      { category: "PENSIONAR", price: "50 RON" },
      { category: "STUDENT", price: "50 RON" },
      { category: "COPIL sub 5 ani", price: "GRATUIT" },
      { category: "5-12 ani", price: "35 RON" },
      { category: "13-18 ani", price: "40 RON" },
      { category: "PERSOANĂ CU DEZABILITĂȚI", price: "GRATUIT" },
      { category: "ADULT ÎNSOȚITOR", price: "35 RON" },
    ]
  },
  {
    title: "CASTEL + PARC",
    prices: [
      { category: "ADULT", price: "55 RON" },
      { category: "PENSIONAR", price: "40 RON" },
      { category: "STUDENT", price: "40 RON" },
      { category: "COPIL sub 5 ani", price: "GRATUIT" },
      { category: "5-12 ani", price: "25 RON" },
      { category: "13-18 ani", price: "30 RON" },
      { category: "PERSOANĂ CU DEZABILITĂȚI", price: "GRATUIT" },
      { category: "ADULT ÎNSOȚITOR", price: "25 RON" },
    ]
  },
  {
    title: "GALERIE + PARC",
    prices: [
      { category: "ADULT", price: "55 RON" },
      { category: "PENSIONAR", price: "40 RON" },
      { category: "STUDENT", price: "40 RON" },
      { category: "COPIL sub 5 ani", price: "GRATUIT" },
      { category: "5-12 ani", price: "25 RON" },
      { category: "13-18 ani", price: "30 RON" },
      { category: "PERSOANĂ CU DEZABILITĂȚI", price: "GRATUIT" },
      { category: "ADULT ÎNSOȚITOR", price: "25 RON" },
    ]
  }
]

const groupPrices = [
  {
    title: "CASTEL + GALERIE + PARC",
    prices: [
      { category: "ADULT", price: "60 RON" },
      { category: "PENSIONAR", price: "45 RON" },
      { category: "STUDENT", price: "45 RON" },
      { category: "GRĂDINIȚĂ", price: "25 RON" },
      { category: "COPIL 5-12 ani", price: "25 RON" },
      { category: "13-18 ani", price: "35 RON" },
      { category: "PROFESOR ÎNSOȚITOR", price: "30 RON" },
    ]
  },
  {
    title: "CASTEL + PARC",
    prices: [
      { category: "ADULT", price: "45 RON" },
      { category: "PENSIONAR", price: "35 RON" },
      { category: "STUDENT", price: "35 RON" },
      { category: "GRĂDINIȚĂ", price: "15 RON" },
      { category: "COPIL 5-12 ani", price: "15 RON" },
      { category: "13-18 ani", price: "25 RON" },
      { category: "PROFESOR ÎNSOȚITOR", price: "20 RON" },
    ]
  },
  {
    title: "GALERIE + PARC",
    prices: [
      { category: "ADULT", price: "45 RON" },
      { category: "PENSIONAR", price: "35 RON" },
      { category: "STUDENT", price: "35 RON" },
      { category: "GRĂDINIȚĂ", price: "15 RON" },
      { category: "COPIL 5-12 ani", price: "15 RON" },
      { category: "13-18 ani", price: "25 RON" },
      { category: "PROFESOR ÎNSOȚITOR", price: "20 RON" },
    ]
  }
]

export function VisitingProgramComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const [selectedVisitType, setSelectedVisitType] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const visitType = searchParams.get('type')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adults: 1,
      children: 0,
    },
  })

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

  useEffect(() => {
    if (visitType) {
      setTimeout(() => {
        form.setValue("visitType", visitType, {
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
  }, [visitType, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const handleCardClick = (type: string) => {
    form.setValue("visitType", type, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    
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
  };

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
                  Program de Vizitare
                </h1>
                <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
              </div>
              <p className="text-lg text-white/80 font-light italic">
                Explorează istoria fascinantă a castelului într-un tur ghidat
              </p>
            </header>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-24">
          <ScrollAnimation>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-32">
              <div className="text-center">
                <p className="text-lg text-white/80 mb-4">
                  Vizitatorii beneficiază de asistență cu ghid profesionist în limba română.
                </p>
                <p className="text-lg text-white/80">
                  Tururile ghidate au loc la fiecare oră.
                </p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                  Program
                </h2>
                <p className="text-lg text-white/80">Lun - Joi 10:00 - 19:00</p>
                <p className="text-lg text-white/80">Vin - Dum 10:00 - 20:00</p>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                  Informații & Rezervări
                </h2>
                <p className="text-lg text-white/80">+40 244 320 520</p>
                <p className="text-lg text-white/80">office@cantacuzinocastle.ro</p>
              </div>
            </div>
          </ScrollAnimation>

          <section id="individual" className="mb-32 sm:mb-40 md:mb-56">
            <ScrollAnimation>
              <div className="text-center mb-16">
                <p className="text-lg text-[rgb(201,171,129)] font-['EB_Garamond'] italic">Tarife</p>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                  <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                    Acces Individual
                  </h2>
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                </div>
                <p className="text-lg text-white/80">până la 20 de persoane</p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-16">
              {individualPrices.map((section, idx) => (
                <ScrollAnimation key={idx} delay={idx * 0.2}>
                  <div
                    className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 cursor-pointer"
                    onClick={() => handleCardClick(
                      idx === 0 ? 'castel-galerie-parc' : 
                      idx === 1 ? 'castel-parc' : 
                      'galerie-parc'
                    )}
                  >
                    <div className="relative h-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ 
                          backgroundImage: idx === 0 
                            ? `url('/images/event.jpg')`
                            : idx === 1
                            ? `url('/images/event-3.jpg')`
                            : `url('/images/mount.jpg')`
                        }}
                      />
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                      <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8">
                        <h3 className="text-base sm:text-lg lg:text-xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase text-center mb-4 sm:mb-6 lg:mb-8">
                          {section.title}
                        </h3>
                        <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                          {section.prices.map((price, priceIdx) => (
                            <div key={priceIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 border-b border-[rgb(201,171,129)]/20 pb-1 sm:pb-2 transition-all duration-300 group-hover:border-[rgb(201,171,129)]/40">
                              <span className="text-white/90 text-xs sm:text-sm transition-all duration-300 group-hover:text-white font-medium">
                                {price.category}
                              </span>
                              <span className="text-[rgb(201,171,129)] font-semibold text-xs sm:text-sm lg:text-base">
                                {price.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          <section id="grup" className="mb-32 sm:mb-40 md:mb-56">
            <ScrollAnimation>
              <div className="text-center mb-16">
                <p className="text-lg text-[rgb(201,171,129)] font-['EB_Garamond'] italic">Tarife</p>
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                  <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                    Acces Grupuri
                  </h2>
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                </div>
                <p className="text-lg text-white/80">minimum 20 de persoane</p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-16">
              {groupPrices.map((section, idx) => (
                <ScrollAnimation key={idx} delay={idx * 0.2}>
                  <div
                    className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 cursor-pointer"
                    onClick={() => handleCardClick(
                      idx === 0 ? 'castel-galerie-parc-grup' : 
                      idx === 1 ? 'castel-parc-grup' : 
                      'galerie-parc-grup'
                    )}
                  >
                    <div className="relative h-full">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ 
                          backgroundImage: idx === 0 
                            ? `url('/images/09e58b0d6b41579f5b525b587929f897.jpg')`
                            : idx === 1
                            ? `url('/images/castel-cantacuzino-gallery-6.jpg')`
                            : `url('/images/interior-castel-cantacuzino-busteni-1024x768.jpg')`
                        }}
                      />
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                      <CardContent className="relative z-10 p-4 sm:p-6 lg:p-8">
                        <h3 className="text-base sm:text-lg lg:text-xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase text-center mb-4 sm:mb-6 lg:mb-8">
                          {section.title}
                        </h3>
                        <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                          {section.prices.map((price, priceIdx) => (
                            <div key={priceIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2 border-b border-[rgb(201,171,129)]/20 pb-1 sm:pb-2 transition-all duration-300 group-hover:border-[rgb(201,171,129)]/40">
                              <span className="text-white/90 text-xs sm:text-sm transition-all duration-300 group-hover:text-white font-medium">
                                {price.category}
                              </span>
                              <span className="text-[rgb(201,171,129)] font-semibold text-xs sm:text-sm lg:text-base">
                                {price.price}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          <section id="vip" className="mb-32 sm:mb-40 md:mb-56">
            <ScrollAnimation>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                  <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                    Acces VIP
                  </h2>
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                </div>
                <p className="text-lg text-white/80 max-w-3xl mx-auto">
                  Descoperiți întregul castel și expoziția noastră într-un tur privat, ghidat de un expert dedicat.
                </p>
              </div>
            </ScrollAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
              <ScrollAnimation delay={0.2}>
                <div 
                  className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick('vip-5plus')}
                >
                  <div className="relative h-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('/images/DSC04889-Enhanced-NR-2-1536x1024.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                    <div className="relative z-10 p-8">
                      <p className="text-lg text-white/80 mb-2 transition-all duration-300 group-hover:text-white">minim 5 persoane</p>
                      <p className="text-4xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">120 RON</p>
                      <p className="text-white/60 transition-all duration-300 group-hover:text-white/80">/pers</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation delay={0.4}>
                <div 
                  className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 cursor-pointer"
                  onClick={() => handleCardClick('vip-sub5')}
                >
                  <div className="relative h-full">
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('/images/Foto-209-1030x687.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                    <div className="relative z-10 p-8">
                      <p className="text-lg text-white/80 mb-2 transition-all duration-300 group-hover:text-white">sub 5 persoane</p>
                      <p className="text-4xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">200 RON</p>
                      <p className="text-white/60 transition-all duration-300 group-hover:text-white/80">/pers</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
              {[0, 1, 2].map((idx) => (
                <ScrollAnimation key={idx} delay={idx * 0.2}>
                  <div className="text-center">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgb(201,171,129)] flex items-center justify-center mx-auto mb-4">
                      {idx === 0 && <Clock className="h-6 w-6 text-black" />}
                      {idx === 1 && <Mail className="h-6 w-6 text-black" />}
                      {idx === 2 && <Languages className="h-6 w-6 text-black" />}
                    </div>
                    <h3 className="text-xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-2">
                      {idx === 0 ? "50 Minute" : idx === 1 ? "Rezervare" : "Disponibil În"}
                    </h3>
                    <p className="text-white/80">
                      {idx === 0 ? "fără timp de așteptare" : idx === 1 ? "Necesită rezervare pe email, sau fără rezervare direct in locație daca exista personal disponibil" : "Română sau Engleză"}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </section>

          <section className="mb-32 sm:mb-40 md:mb-56">
            <div className="text-center mb-16">
              <p className="text-lg text-[rgb(201,171,129)] font-['EB_Garamond'] italic">Tarife</p>
              <div className="flex items-center justify-center gap-16 mb-2">
                <div className="h-[1px] w-32 bg-[rgb(201,171,129)]" />
                <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                  Foto Video
                </h2>
                <div className="h-[1px] w-32 bg-[rgb(201,171,129)]" />
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                  Uz Personal
                </h3>
                <p className="text-center text-white/80 mb-4">
                  semi-profesionist – maximum 3h – nu include fotograf
                </p>
                <p className="text-center text-white/80 mb-8">
                  trash the dress / love the dress / save the date / inainte-după nuntă, album absolvire, etc
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                <ScrollAnimation delay={0.2}>
                  <div 
                    className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 p-6 text-center cursor-pointer"
                    onClick={() => handleCardClick('foto-interior')}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('/images/bdc678_b97304c884e4402a8bd5fd7e17d80a41mv2.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                    <div className="relative z-10">
                      <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">600 RON</p>
                      <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">interior</p>
                    </div>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={0.4}>
                  <div 
                    className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 p-6 text-center cursor-pointer"
                    onClick={() => handleCardClick('foto-exterior')}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('/images/bdc678_561ba47a7df748d2bb8eb6e1d1ec1826mv2.jpeg')` }}
                    />
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                    <div className="relative z-10">
                      <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">600 RON</p>
                      <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">exterior</p>
                    </div>
                  </div>
                </ScrollAnimation>
                <ScrollAnimation delay={0.6}>
                  <div 
                    className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300 p-6 text-center cursor-pointer"
                    onClick={() => handleCardClick('foto-interior-exterior')}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url('/images/camera-1.png')` }}
                    />
                    <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                    <div className="relative z-10">
                      <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">1000 RON</p>
                      <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">interior + exterior</p>
                    </div>
                  </div>
                </ScrollAnimation>
              </div>

              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
                  Profesionist
                </h3>
                <p className="text-center text-white/80">
                  pentru oferta de pret sedinte foto / video profesioniste (fashion, auto, etc) apelati la 0735 15 13 18 sau transmiteti solicitarea pe email la events@cantacuzinocastle.ro
                </p>
              </div>
            </div>
          </section>

          <section className="mb-32 sm:mb-40 md:mb-56">
            <ScrollAnimation>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                  <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                    Acces în Parcul Castelului
                  </h2>
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                </div>
                <p className="text-lg text-white/80 max-w-3xl mx-auto mb-8">
                  grotă, fântânile, turnul de vânătoare, curtea interioară, biserica.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <ScrollAnimation delay={0.2}>
                    <div className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('/images/Cantacuzino-exterior2.jpg')` }}
                      />
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                      <div className="relative z-10 p-6 text-center">
                        <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">20 RON</p>
                        <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">acces individual</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation delay={0.4}>
                    <div className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('/images/mount.jpg')` }}
                      />
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                      <div className="relative z-10 p-6 text-center">
                        <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">GRATUIT</p>
                        <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">sub 5 ani</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                  <ScrollAnimation delay={0.6}>
                    <div className="group relative overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] hover:shadow-[0_0_15px_rgba(201,171,129,0.4)] transition-all duration-300">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url('/images/event.jpg')` }}
                      />
                      <div className="absolute inset-0 bg-black/80 transition-opacity duration-300 group-hover:opacity-70" />
                      <div className="relative z-10 p-6 text-center">
                        <p className="text-3xl text-[rgb(201,171,129)] font-['EB_Garamond'] mb-2">10 RON</p>
                        <p className="text-white/80 text-sm transition-all duration-300 group-hover:text-white">parcare</p>
                      </div>
                    </div>
                  </ScrollAnimation>
                </div>
              </div>
            </ScrollAnimation>
          </section>

          <section id="form" className="mb-32 sm:mb-40 md:mb-56" ref={formRef}>
            <ScrollAnimation>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                  <h2 className="text-4xl font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-[0.2em] uppercase">
                    Rezervare Vizită
                  </h2>
                  <div className="h-[1px] w-24 bg-[rgb(201,171,129)]" />
                </div>
              </div>
            </ScrollAnimation>

            <div className="max-w-2xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="visitType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[rgb(201,171,129)]">Tip vizită*</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]">
                              <SelectValue placeholder="Selectează tipul vizitei" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black text-white border-white/20">
                            <SelectItem value="castel-galerie-parc">Individual - Castel + Galerie + Parc</SelectItem>
                            <SelectItem value="castel-parc">Individual - Castel + Parc</SelectItem>
                            <SelectItem value="galerie-parc">Individual - Galerie + Parc</SelectItem>
                            <SelectItem value="castel-galerie-parc-grup">Grup - Castel + Galerie + Parc</SelectItem>
                            <SelectItem value="castel-parc-grup">Grup - Castel + Parc</SelectItem>
                            <SelectItem value="galerie-parc-grup">Grup - Galerie + Parc</SelectItem>
                            <SelectItem value="vip-5plus">VIP (5+ persoane)</SelectItem>
                            <SelectItem value="vip-sub5">VIP (sub 5 persoane)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[rgb(201,171,129)]">Data vizitei*</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[rgb(201,171,129)]">Ora vizitei*</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} className="bg-black text-white border-white/20 focus:border-[rgb(201,171,129)] focus:ring-1 focus:ring-[rgb(201,171,129)]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="adults"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[rgb(201,171,129)]">Nr. Adulți*</FormLabel>
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
                      name="children"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[rgb(201,171,129)]">Nr. Copii</FormLabel>
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
                  </div>
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
                  <Button type="submit" className="bg-[rgb(201,171,129)] hover:bg-[rgb(201,171,129)]/80 w-full">Trimite</Button>
                </form>
              </Form>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}