import Footer from "@/component/core/Footer"
import Link from "next/link"
import PageRoutes from "@/utilis/PageRoute"
import { ArrowRight, Calendar, Users, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-purple-700 text-white">
      <header className="p-6 flex justify-between items-center bg-black/10 backdrop-blur-sm fixed w-full z-50">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          EventManager
        </h1>
        <nav className="space-x-4">
          <Link href={PageRoutes.LOGIN()}>
            <button className="bg-white/90 text-blue-600 px-6 py-2.5 rounded-full font-semibold transition-all hover:bg-white hover:shadow-lg hover:shadow-white/20 active:scale-95">
              Login
            </button>
          </Link>
          <Link href={PageRoutes.SIGNUP()}>
            <button className="bg-purple-600 px-6 py-2.5 rounded-full font-semibold transition-all hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95">
              Register
            </button>
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-purple-700/20 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-8 leading-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent animate-fade-in">
            Elevate Your Events with EventManager
          </h1>
          <p className="max-w-3xl text-xl mb-12 text-white/90 leading-relaxed mx-auto">
            Transform your event planning experience with our cutting-edge management system. 
            From intimate gatherings to large-scale conferences, EventManager empowers you to create 
            unforgettable experiences with ease and precision.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="bg-white/95 text-blue-600 px-8 py-4 rounded-full font-bold transition-all hover:bg-white hover:shadow-xl hover:shadow-white/20 hover:transform hover:-translate-y-1 active:translate-y-0 flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </main>

      <section className="bg-white/[0.98] text-gray-800 py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why EventManager Stands Out
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-2xl shadow-xl bg-white hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">Intuitive Interface</h3>
              <p className="text-gray-600 leading-relaxed">
                Our user-friendly platform ensures smooth event management, whether you're a seasoned pro or new to planning.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-xl bg-white hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-purple-100 rounded-full p-3 w-fit mb-6">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">All-in-One Solution</h3>
              <p className="text-gray-600 leading-relaxed">
                From guest lists to schedules, our comprehensive tools cover every aspect of your event planning needs.
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-xl bg-white hover:transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-6">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-600">24/7 Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated team of event specialists is always ready to assist you, ensuring your events run flawlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Revolutionize Your Event Planning?</h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of successful event planners who trust EventManager to bring their visions to life.
          </p>
          <Link href={PageRoutes.SIGNUP()}>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold transition-all hover:bg-blue-50 hover:shadow-xl hover:shadow-blue-500/20 hover:transform hover:-translate-y-1 active:translate-y-0">
              Start Your Free Trial
            </button>
          </Link>
        </div>
      </section>
      <Footer/>
      </div>
  );
}

