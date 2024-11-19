import Image from 'next/image'
import { Facebook, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[rgb(201,171,129)]/20 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
              Contact
            </h3>
            <div className="space-y-2">
              <p className="text-white/80 font-plus-jakarta">+40 244 320 520</p>
              <p className="text-white/80 font-plus-jakarta">office@cantacuzinocastle.ro</p>
              <p className="text-white/80 font-plus-jakarta">Str. Zamora 1, Buțeni 105500</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
              Schedule 
            </h3>
            <div className="space-y-2">
              <p className="text-white/80 font-plus-jakarta">Monday - Thurdsay: 10:00 - 19:00</p>
              <p className="text-white/80 font-plus-jakarta">Friday - Sunday: 10:00 - 20:00</p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-lg font-light text-[rgb(201,171,129)] font-['EB_Garamond'] tracking-wider uppercase mb-4">
              Social Media
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a href="#" className="text-white/80 hover:text-[rgb(201,171,129)] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-[rgb(201,171,129)] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <Image
              src="/images/logo_colored2.png"
              alt="Cantacuzino Castle Logo"
              width={60}
              height={60}
              className="mx-auto md:mx-0 mb-4"
            />
            <p className="text-white/60 text-sm font-plus-jakarta">
              © 2024 Castelul Cantacuzino. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 