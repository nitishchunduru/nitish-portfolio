import { Linkedin, Mail, Phone, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-yellow-400/20 z-50 transition-all duration-300">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Nitish Chunduru</h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#experience" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group">
              Experience
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#skills" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group">
              Skills
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-gray-900">Nitish Chunduru</h1>
                <h2 className="text-2xl font-semibold text-red-600">SAP MM Consultant</h2>
                <p className="text-lg text-gray-700 font-medium border-l-4 border-yellow-400 pl-4">SAP S4HANA | SAP Fiori | Procurement | Inventory Management | P2P Cycle</p>
                <div className="max-w-[650px] text-gray-600 md:text-lg space-y-3 leading-relaxed">
                  <p>
                    Aspiring SAP MM Consultant with 1 year of hands-on experience in SAP S4HANA migration and support projects. Skilled in procurement processes, inventory management, material master, and Procure to Pay (P2P) cycle activities. Experienced in PR, PO, GR, GI, and inventory management processes with exposure to SAP MM migration support, testing, and post-migration activities.
                  </p>
                  <p>
                    Dedicated professional committed to delivering excellence in Materials Management, driving process optimization, and supporting organizational success through expertise in SAP systems and business processes.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row pt-4">
                <Button 
                  onClick={() => (window.location.href = "mailto:chundurunitish2001@gmail.com")}
                  className="bg-gray-900 hover:bg-red-600 border-2 border-yellow-400 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Button 
                  asChild 
                  className="bg-gray-900 hover:bg-red-600 border-2 border-yellow-400 text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
                >
                  <a href="https://www.linkedin.com/in/nitish-chunduru/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button 
                  className="bg-transparent hover:bg-red-600/10 border-2 border-gray-900 text-gray-900 hover:text-red-600 font-semibold py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:border-red-600 shadow-md"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 animate-fade-in-delay">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative overflow-hidden rounded-2xl border-2 border-gray-900 shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <img
                    alt="Nitish Chunduru - SAP MM Consultant"
                    className="aspect-square object-cover"
                    height={400}
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240423-WA0058.jpg-6sJv021mEQQoWUDKjGMbQSiZjR59nP.jpeg"
                    width={400}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-red-600" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-28 bg-white relative">
        <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-red-600 via-yellow-400 to-red-600"></div>
        <div className="container px-4 md:px-6">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">→</span>
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">Professional Experience</h2>
          </div>
          <div className="max-w-3xl ml-0 md:ml-8 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-yellow-400 border-4 border-white shadow-lg hidden md:block"></div>
            <Card className="border-2 border-gray-900 hover:border-red-600 transition-all shadow-lg hover:shadow-2xl hover:bg-gray-50">
              <CardContent className="pt-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-2xl text-gray-900">SAP MM Intern Trainee Consultant</h3>
                        <p className="text-lg text-red-600 font-semibold mt-1">Proven Tech</p>
                      </div>
                      <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold text-sm">Aug 2025 - Present</Badge>
                    </div>
                    <p className="text-yellow-600 font-semibold mb-4">1 Year of Hands-on Experience</p>
                  </div>
                  <div className="border-t-2 border-yellow-400/30 pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3 text-gray-700 ml-2">
                      <li className="flex gap-3">
                        <span className="text-red-600 font-bold text-xl leading-none mt-0.5">•</span>
                        <span>Supported SAP S4HANA migration and SAP MM support activities in live production environments</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-600 font-bold text-xl leading-none mt-0.5">•</span>
                        <span>Worked on PR, PO, GR, GI, and inventory management processes with complete process lifecycle understanding</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-600 font-bold text-xl leading-none mt-0.5">•</span>
                        <span>Assisted in MM master data validation, maintenance, and issue resolution during migration phases</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-red-600 font-bold text-xl leading-none mt-0.5">•</span>
                        <span>Supported procurement and post-migration support activities ensuring smooth system transition</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 text-gray-900">Education</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Bapatla Engineering College</h3>
                <p className="text-gray-600 font-medium">Computer Science and Engineering</p>
                <p className="text-sm text-red-600 font-semibold mt-2">2019 - 2023</p>
                <p className="mt-3 text-gray-700 font-semibold">CGPA: <span className="text-yellow-600">7.5</span></p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">Pamulapati Butchi Naidu College</h3>
                <p className="text-gray-600 font-medium">High School</p>
                <p className="text-sm text-red-600 font-semibold mt-2">2017 - 2019</p>
                <p className="mt-3 text-gray-700 font-semibold">GPA: <span className="text-yellow-600">7.5</span></p>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2 text-gray-900">NNT Public School</h3>
                <p className="text-gray-600 font-medium">School</p>
                <p className="text-sm text-red-600 font-semibold mt-2">2016 - 2017</p>
                <p className="mt-3 text-gray-700 font-semibold">GPA: <span className="text-yellow-600">8.8</span></p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-gray-900">Professional Certifications</h2>
          <div className="grid gap-6 lg:grid-cols-2 max-w-3xl">
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Business Processes in SAP S4HANA - Sourcing and Procurement</h3>
                <p className="text-red-600 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-red-100 text-red-900 border border-red-300">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">Exploring SAP Cloud ERP</h3>
                <p className="text-red-600 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-red-100 text-red-900 border border-red-300">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">SAP Ariba Sourcing Overview</h3>
                <p className="text-red-600 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-red-100 text-red-900 border border-red-300">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">TCS iON Career Edge - Young Professional</h3>
                <p className="text-red-600 font-medium mb-4">Tata Consultancy Services</p>
                <Button asChild className="bg-gray-900 hover:bg-red-600 border-2 border-yellow-400 text-white font-semibold rounded-lg transition-all duration-300">
                  <a
                    href="https://drive.google.com/file/d/1ScZmy8j4uLqru2uqm_Dny1tKENjPqX1A/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-28 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-gray-900">Core Competencies</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  SAP Systems
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP MM</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP S4HANA</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP Fiori</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP ERP</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  Materials Management
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Procurement</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">P2P Cycle</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Purchase Orders</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Goods Receipt</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  Process Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Inventory Management</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Material Master</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Goods Issue</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Vendor Management</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                  System Integration
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP SD Integration</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">SAP FI Integration</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-white hover:bg-gradient-to-br hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-2">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                  Implementation
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">S4HANA Migration</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Testing</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400/50">Data Validation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-gray-900">Featured Project</h2>
          <div className="grid gap-8 lg:grid-cols-1 max-w-3xl">
            <Card className="border-2 border-gray-900 hover:border-red-600 bg-gradient-to-br from-gray-50 to-white hover:from-red-50 hover:to-yellow-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 backdrop-blur-sm">
              <CardContent className="pt-8">
                <h3 className="font-bold text-2xl mb-3 text-gray-900">Cohance Migration Support - SAP MM S4HANA</h3>
                <div className="border-l-4 border-yellow-400 pl-4 mb-6">
                  <p className="text-red-600 font-semibold">SAP S4HANA Migration Project</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400">SAP MM</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400">S4HANA Migration</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400">Data Validation</Badge>
                  <Badge className="bg-gray-900 text-white hover:bg-red-600 border border-yellow-400">Testing</Badge>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Supported comprehensive SAP MM migration activities for procurement and inventory management processes in a complex enterprise environment. Assisted in Purchase Order processing, executed data validation testing, and resolved inventory issues during migration support phase.
                </p>
                <div className="bg-gray-100 rounded-lg p-4 mb-6 border-l-4 border-red-600">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                    Key Accomplishments
                  </h4>
                  <ul className="space-y-2 text-gray-700 ml-2">
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Executed detailed data validation and testing for MM master data during migration</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Assisted in Purchase Order processing and GR/GI transaction handling</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Identified and resolved inventory management issues during migration support</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-red-600 font-bold">✓</span>
                      <span>Supported post-migration activities ensuring system stability and process compliance</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Get In Touch</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-2xl mx-auto">
            <Card className="bg-white/5 border-2 border-yellow-400/30 hover:border-red-600 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a
                  href="mailto:chundurunitish2001@gmail.com"
                  className="text-gray-200 hover:text-red-400 transition break-all"
                >
                  chundurunitish2001@gmail.com
                </a>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-2 border-yellow-400/30 hover:border-red-600 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a href="tel:+918074300526" className="text-gray-200 hover:text-red-400 transition">
                  +91 8074300526
                </a>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-2 border-yellow-400/30 hover:border-red-600 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <Linkedin className="h-8 w-8 mx-auto mb-4 text-yellow-400" />
                <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/nitish-chunduru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-200 hover:text-red-400 transition"
                >
                  Connect with me
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-block px-6 py-3 border-2 border-yellow-400 rounded-lg bg-white/5 backdrop-blur-sm">
              <p className="text-gray-200">Open to SAP MM consulting opportunities and interesting projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-6 border-t-2 border-yellow-400/30">
        <div className="container px-4 md:px-6 text-center text-sm">
          <p>&copy; 2025 Nitish Chunduru. All rights reserved.</p>
          <p className="mt-2 text-yellow-400">SAP MM Consultant | Materials Management Specialist</p>
        </div>
      </footer>
    </div>
  )
}

