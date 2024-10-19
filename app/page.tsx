'use client'

import { useState, useEffect, FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Instagram, Mail, MessageCircle } from 'lucide-react'
import Link from 'next/link'

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 bg-purple-900 rounded-full filter blur-3xl opacity-30"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [1, 2, 2, 1, 1],
              rotate: [0, 90, 180, 270, 0],
              opacity: [0.3, 0.1, 0.3],
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

type TypewriterTextProps = {
  text: string
}

const TypewriterText: FC<TypewriterTextProps> = ({ text }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [text])

  return <span>{displayText}</span>
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-black text-white font-sans relative overflow-hidden"
      >
        <BackgroundAnimation />

        <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
          <nav className="container mx-auto px-6 py-4">
            <ul className="flex justify-center space-x-6">
              {['about', 'skills', 'projects', 'contact'].map((section) => (
                <li key={section}>
                  <Link
                    href={`#${section}`}
                    className={`capitalize hover:text-purple-400 transition-colors ${
                      activeSection === section ? 'text-purple-400 border-b-2 border-purple-400' : ''
                    }`}
                  >
                    {section}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main className="relative z-10">
          <section id="hero" className="h-screen flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-4">David "de1v" Klíma</h1>
              <p className="text-xl mb-8">
                <TypewriterText text="Back-End Developer | Ethical Hacker" />
              </p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
              >
                <Link 
                  href="#contact" 
                  className="bg-purple-900 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-800 transition-colors"
                >
                  Get in touch
                </Link>
              </motion.div>
            </motion.div>
          </section>

          <section id="about" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-lg mb-4">
                    I'm a 16-year-old Back-End Developer from Czechia, passionate about programming and ethical hacking. 
                    Currently, I'm working as a Back-End developer at Atropol Hosting, where I utilize my skills in Go and C#.
                  </p>
                  <p className="text-lg">
                    In addition to my day job, I've developed GayShield.pro, a project that provides protection for Minecraft 
                    Servers against DDoS and bot attacks.
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-purple-900 p-6 rounded-lg shadow-lg"
                >
                  <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Based in Czechia</li>
                    <li>Specializes in Go and C#</li>
                    <li>Passionate about cybersecurity</li>
                    <li>Creator of GayShield.pro</li>
                    <li>Always learning and exploring new technologies</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="skills" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {['Go', 'C#', '.NET', 'SQL', 'Docker', 'Git', 'Linux', 'Network Security'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="border border-purple-800 p-4 rounded-lg text-center cursor-pointer"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-purple-800 p-6 rounded-lg flex flex-col h-full"
                >
                  <h3 className="text-xl font-semibold mb-2">GayShield.pro</h3>
                  <p className="mb-4 flex-grow">A robust protection system for Minecraft Servers, defending against DDoS and bot attacks.</p>
                  <a href="https://gayshield.pro" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 mt-auto inline-block">Visit GayShield.pro</a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border border-purple-800 p-6 rounded-lg flex flex-col h-full"
                >
                  <h3 className="text-xl font-semibold mb-2">Atropol Hosting</h3>
                  <p className="mb-4 flex-grow">Contributing to the backend infrastructure of a hosting service, ensuring reliability and performance.</p>
                  <a href="https://atropol.eu" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 mt-auto inline-block">Visit Atropol.eu</a>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-20">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
              <div className="flex justify-center space-x-6">
                <motion.a
                  href="https://github.com/mrde1v"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <Github size={32} />
                </motion.a>
                <motion.a
                  href="https://instagram.com/mrde1v"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <Instagram size={32} />
                </motion.a>
                <motion.a
                  href="mailto:your.email@example.com"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <Mail size={32} />
                </motion.a>
                <motion.a
                  href="https://discord.com/users/de1v"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-purple-400 transition-colors"
                >
                  <MessageCircle size={32} />
                </motion.a>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-6 relative z-10 bg-black bg-opacity-50">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2023 David Klíma. All rights reserved.</p>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  )
}