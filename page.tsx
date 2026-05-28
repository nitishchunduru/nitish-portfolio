import { Linkedin, Mail, Phone, Download, ChevronDown, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-yellow-400/20 z-50 transition-all duration-300 shadow-2xl">
        <div className="container px-4 md:px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-black text-white tracking-tight">Nitish<span className="text-red-600">.DEV</span></h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-bold relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#experience" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-bold relative group">
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#skills" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-bold relative group">
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-bold relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-600 to-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-black">
        {/* 3D Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large 3D circles with German colors */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-red-600/25 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-yellow-400/15 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br from-red-700/10 via-yellow-500/5 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* 3D Lines effect */}
          <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D32F2F" />
                <stop offset="50%" stopColor="#FBC02D" />
                <stop offset="100%" stopColor="#D32F2F" />
              </linearGradient>
            </defs>
            <path d="M0,200 Q250,100 500,200 T1000,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M0,400 Q250,300 500,400 T1000,400" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.3" />
            <path d="M0,600 Q250,500 500,600 T1000,600" stroke="url(#lineGradient)" strokeWidth="2" fill="none" opacity="0.2" />
          </svg>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_450px] items-center">
            <div className="flex flex-col justify-center space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-block">
                  <Badge className="bg-red-600/20 text-red-300 border border-red-500/50 px-4 py-2 rounded-full text-sm font-black">
                    SAP MM CONSULTANT
                  </Badge>
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
                  Nitish <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-400 to-red-500">Chunduru</span>
                </h1>
                <div className="space-y-3">
                  <p className="text-xl md:text-2xl font-black text-yellow-400 flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                    SAP S4HANA | Procurement | Materials Management
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                    Enterprise resource planning specialist with 1 year of hands-on experience in SAP MM migration, procurement processes, and inventory management. Proven expertise in P2P cycle, materials master data, and production support.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  onClick={() => (window.location.href = "mailto:chundurunitish2001@gmail.com")}
                  className="bg-red-600 hover:bg-red-700 text-white font-black py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center gap-2 group text-base"
                >
                  <Mail className="h-5 w-5" />
                  Get In Touch
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  asChild 
                  className="bg-gray-800 hover:bg-gray-700 border-2 border-yellow-400 text-white font-black py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg text-base"
                >
                  <a href="https://www.linkedin.com/in/nitish-chunduru/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 animate-fade-in-delay relative">
              <div className="relative group">
                {/* Animated 3D background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 rounded-3xl blur-2xl opacity-50 group-hover:opacity-80 transition-all duration-500 animate-pulse"></div>
                
                {/* Inner glow */}
                <div className="absolute -inset-1 bg-gradient-to-b from-red-500/50 to-yellow-400/30 rounded-2xl"></div>
                
                {/* Image container */}
                <div className="relative overflow-hidden rounded-2xl border-4 border-yellow-400 shadow-2xl group-hover:shadow-red-600/50 transition-all duration-500 transform group-hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-yellow-400/10 z-10"></div>
                  <img
                    alt="Nitish Chunduru - SAP MM Consultant"
                    className="aspect-square object-cover relative z-0"
                    height={450}
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240423-WA0058.jpg-6sJv021mEQQoWUDKjGMbQSiZjR59nP.jpeg"
                    width={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
          <ChevronDown className="h-8 w-8 text-yellow-400" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-red-600/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Experience</span></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400"></div>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-yellow-400/30 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl hover:border-yellow-400 transition-all duration-300 shadow-2xl hover:shadow-2xl hover:shadow-red-600/20">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-white">SAP MM Intern Trainee Consultant</h3>
                      <p className="text-xl text-yellow-400 font-black mt-2">Proven Tech</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-red-600 to-red-700 text-white font-black px-4 py-2 rounded-lg text-base whitespace-nowrap">
                      Aug 2025 - Present
                    </Badge>
                  </div>
                  <p className="text-yellow-300 font-black mb-6 text-lg">1 Year of Hands-on Experience in S4HANA Migration</p>
                  
                  <div className="border-t border-yellow-400/20 pt-6">
                    <h4 className="font-black text-white mb-4 text-lg flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-yellow-400 rounded-full"></div>
                      Key Responsibilities & Achievements
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex gap-3">
                        <span className="text-red-500 font-black text-2xl leading-none mt-1">▸</span>
                        <span className="text-gray-200">Supported SAP S4HANA migration and MM support in production environments</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-500 font-black text-2xl leading-none mt-1">▸</span>
                        <span className="text-gray-200">Managed PR, PO, GR, GI, and inventory processes with full lifecycle understanding</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-500 font-black text-2xl leading-none mt-1">▸</span>
                        <span className="text-gray-200">Executed MM master data validation and issue resolution during migration</span>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-red-500 font-black text-2xl leading-none mt-1">▸</span>
                        <span className="text-gray-200">Ensured smooth post-migration support and system stability</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-black relative">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3">Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Competencies</span></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "SAP Systems", skills: ["SAP MM", "SAP S4HANA", "SAP Fiori", "SAP ERP"], icon: "🖥️" },
                { title: "Materials Management", skills: ["Procurement", "P2P Cycle", "Purchase Orders", "Goods Receipt"], icon: "📦" },
                { title: "Process Expertise", skills: ["Inventory Management", "Material Master", "Goods Issue", "Vendor Management"], icon: "⚙️" },
                { title: "System Integration", skills: ["SAP SD Integration", "SAP FI Integration"], icon: "🔗" },
                { title: "Implementation", skills: ["S4HANA Migration", "Testing", "Data Validation"], icon: "🚀" },
                { title: "Business Skills", skills: ["Problem Solving", "Process Optimization", "Documentation", "Team Collaboration"], icon: "💼" },
              ].map((category, idx) => (
                <Card 
                  key={idx}
                  className="group border-2 border-yellow-400/20 bg-gradient-to-br from-gray-900/60 to-black/60 hover:from-gray-800/80 hover:to-gray-900/80 backdrop-blur-xl hover:border-red-500 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-red-600/30 transform hover:-translate-y-3 hover:scale-105 cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 text-4xl">{category.icon}</div>
                    <h3 className="font-black text-xl mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-yellow-400 transition-all">
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, sidx) => (
                        <div key={sidx} className="flex items-center gap-2 text-gray-300 group-hover:text-gray-100 transition-colors">
                          <span className="w-2 h-2 bg-gradient-to-r from-red-500 to-yellow-400 rounded-full group-hover:scale-150 transition-transform"></span>
                          <span className="font-bold">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-3">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Project</span></h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400"></div>
            </div>

            <Card className="group border-2 border-yellow-400/40 bg-gradient-to-br from-gray-800/40 via-gray-900/40 to-black/40 hover:border-yellow-400 backdrop-blur-xl transition-all duration-500 shadow-2xl hover:shadow-3xl hover:shadow-red-600/40">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-4xl font-black text-white mb-3">Cohance Migration Support</h3>
                    <div className="flex items-center gap-2 text-yellow-400 font-black text-lg mb-4">
                      <div className="w-1 h-6 bg-gradient-to-b from-red-600 to-yellow-400"></div>
                      SAP S4HANA Migration Project
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {["SAP MM", "S4HANA Migration", "Data Validation", "Testing", "Procurement"].map((badge, idx) => (
                      <Badge key={idx} className="bg-gradient-to-r from-red-600 to-red-700 text-white font-black px-4 py-2">
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    Led comprehensive SAP MM migration activities for procurement and inventory management processes. Executed data validation testing, assisted in Purchase Order processing, and resolved critical inventory issues during the migration support phase.
                  </p>

                  <div className="border-t border-yellow-400/20 pt-6">
                    <h4 className="font-black text-white mb-6 text-xl flex items-center gap-3">
                      <span className="text-red-500">▸</span>
                      Key Accomplishments
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Executed detailed MM master data validation during migration",
                        "Managed Purchase Order and GR/GI transaction processing",
                        "Identified and resolved inventory management issues",
                        "Ensured post-migration system stability and compliance"
                      ].map((achievement, idx) => (
                        <div key={idx} className="flex gap-3 text-gray-200 group-hover:text-gray-100 transition-colors">
                          <span className="text-yellow-400 font-black flex-shrink-0">✓</span>
                          <span className="font-semibold">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-black relative overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-red-600/20 rounded-full blur-3xl -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-yellow-400/15 rounded-full blur-3xl translate-y-1/2"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-3">Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Connect</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-400 mx-auto"></div>
            <p className="text-gray-300 text-lg mt-6">Open to SAP MM consulting opportunities and enterprise transformation projects</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: Mail, title: "Email", value: "chundurunitish2001@gmail.com", link: "mailto:chundurunitish2001@gmail.com" },
              { icon: Phone, title: "Phone", value: "+91 8074300526", link: "tel:+918074300526" },
              { icon: Linkedin, title: "LinkedIn", value: "Connect with me", link: "https://www.linkedin.com/in/nitish-chunduru/" }
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <a 
                  key={idx}
                  href={contact.link}
                  target={contact.title === "LinkedIn" ? "_blank" : undefined}
                  rel={contact.title === "LinkedIn" ? "noopener noreferrer" : undefined}
                  className="group"
                >
                  <Card className="border-2 border-yellow-400/30 bg-gradient-to-br from-gray-900/60 to-black/60 hover:border-red-500 backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-red-600/20 h-full hover:scale-105 transform">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-10 w-10 mx-auto mb-4 text-yellow-400 group-hover:text-red-500 transition-colors" />
                      <h3 className="font-black text-white text-lg mb-2">{contact.title}</h3>
                      <p className="text-gray-300 group-hover:text-gray-100 transition-colors break-all text-sm">{contact.value}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => (window.location.href = "mailto:chundurunitish2001@gmail.com")}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black py-4 px-10 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-lg inline-flex items-center gap-2 group text-base"
            >
              Start A Conversation
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 border-t-2 border-yellow-400/30">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-yellow-400/20">
            <div>
              <h4 className="text-2xl font-black text-white mb-2">Nitish<span className="text-red-600">.DEV</span></h4>
              <p className="text-gray-400">SAP MM Consultant & Enterprise Specialist</p>
            </div>
            <div>
              <h5 className="font-black text-white mb-3 text-yellow-400">Quick Links</h5>
              <div className="space-y-2 text-gray-400 text-sm font-semibold">
                <a href="#about" className="hover:text-yellow-400 transition block">About</a>
                <a href="#experience" className="hover:text-yellow-400 transition block">Experience</a>
                <a href="#skills" className="hover:text-yellow-400 transition block">Skills</a>
                <a href="#contact" className="hover:text-yellow-400 transition block">Contact</a>
              </div>
            </div>
            <div>
              <h5 className="font-black text-white mb-3 text-yellow-400">Follow</h5>
              <a href="https://www.linkedin.com/in/nitish-chunduru/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-400 transition font-semibold">
                LinkedIn Profile
              </a>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 Nitish Chunduru. All rights reserved.</p>
            <p className="mt-2 text-yellow-400 font-bold">SAP MM Consultant | Materials Management Specialist</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
