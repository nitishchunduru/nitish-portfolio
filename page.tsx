import { Linkedin, Mail, Phone, Download, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-700">Nitish Chunduru</h1>
          <div className="flex gap-4 items-center">
            <a href="#about" className="text-gray-600 hover:text-blue-700 transition">About</a>
            <a href="#experience" className="text-gray-600 hover:text-blue-700 transition">Experience</a>
            <a href="#skills" className="text-gray-600 hover:text-blue-700 transition">Skills</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-700 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-6 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-blue-900">Nitish Chunduru</h1>
                <h2 className="text-2xl font-semibold text-blue-700">SAP MM Consultant</h2>
                <p className="text-lg text-gray-700 font-medium">SAP S4HANA | SAP Fiori | Procurement | Inventory Management | P2P Cycle</p>
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
                  className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-6 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Me
                </Button>
                <Button 
                  asChild 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <a href="https://www.linkedin.com/in/nitish-chunduru/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn Profile
                  </a>
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-6 px-8 rounded-lg transition-all"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 animate-fade-in-delay">
              <div className="overflow-hidden rounded-2xl border-4 border-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-6 w-6 text-blue-700" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-blue-900">Professional Experience</h2>
          <div className="max-w-3xl">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl">
              <CardContent className="pt-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-2xl text-blue-900">SAP MM Intern Trainee Consultant</h3>
                        <p className="text-lg text-blue-700 font-semibold mt-1">Proven Tech</p>
                      </div>
                      <Badge className="bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm">Aug 2025 - Present</Badge>
                    </div>
                    <p className="text-gray-600 mb-4">1 Year of Hands-on Experience</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-3 text-lg">Key Responsibilities:</h4>
                    <ul className="space-y-2 text-gray-700 ml-2">
                      <li className="flex gap-3">
                        <span className="text-blue-700 font-bold">•</span>
                        <span>Supported SAP S4HANA migration and SAP MM support activities in live production environments</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-700 font-bold">•</span>
                        <span>Worked on PR, PO, GR, GI, and inventory management processes with complete process lifecycle understanding</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-700 font-bold">•</span>
                        <span>Assisted in MM master data validation, maintenance, and issue resolution during migration phases</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="text-blue-700 font-bold">•</span>
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
      <section className="py-12 md:py-24 bg-blue-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Education</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Bapatla Engineering College</h3>
                <p className="text-muted-foreground">Computer Science and Engineering</p>
                <p className="text-sm text-muted-foreground">2019 - 2023</p>
                <p className="mt-2">CGPA: 7.5</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Pamulapati Butchi Naidu College</h3>
                <p className="text-muted-foreground">High School</p>
                <p className="text-sm text-muted-foreground">2017 - 2019</p>
                <p className="mt-2">GPA: 7.5</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">NNT Public School</h3>
                <p className="text-muted-foreground">School</p>
                <p className="text-sm text-muted-foreground">2016 - 2017</p>
                <p className="mt-2">GPA: 8.8</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-blue-900">Professional Certifications</h2>
          <div className="grid gap-6 lg:grid-cols-2 max-w-3xl">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">Business Processes in SAP S4HANA - Sourcing and Procurement</h3>
                <p className="text-blue-700 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-green-100 text-green-900">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">Exploring SAP Cloud ERP</h3>
                <p className="text-blue-700 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-green-100 text-green-900">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">SAP Ariba Sourcing Overview</h3>
                <p className="text-blue-700 font-medium mb-4">SAP Learning</p>
                <Badge className="bg-green-100 text-green-900">Completed</Badge>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2 text-blue-900">TCS iON Career Edge - Young Professional</h3>
                <p className="text-blue-700 font-medium mb-4">Tata Consultancy Services</p>
                <Button asChild variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50">
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
      <section id="skills" className="py-16 md:py-28 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-blue-900">Core Competencies</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">SAP Systems</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP MM</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP S4HANA</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP Fiori</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP ERP</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">Materials Management</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Procurement</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">P2P Cycle</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Purchase Orders</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Goods Receipt</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">Process Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Inventory Management</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Material Master</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Goods Issue</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Vendor Management</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">System Integration</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP SD Integration</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">SAP FI Integration</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-md hover:shadow-lg">
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4 text-blue-900">Implementation</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">S4HANA Migration</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Testing</Badge>
                  <Badge className="bg-blue-100 text-blue-900 hover:bg-blue-200">Data Validation</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 md:py-28 bg-blue-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-blue-900">Projects</h2>
          <div className="grid gap-8 lg:grid-cols-1 max-w-3xl">
            <Card className="border-2 border-blue-200 hover:border-blue-400 transition-all shadow-lg hover:shadow-xl">
              <CardContent className="pt-8">
                <h3 className="font-bold text-2xl mb-3 text-blue-900">Cohance Migration Support - SAP MM S4HANA</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge className="bg-blue-700 hover:bg-blue-800 text-white">SAP MM</Badge>
                  <Badge className="bg-blue-700 hover:bg-blue-800 text-white">S4HANA Migration</Badge>
                  <Badge className="bg-blue-700 hover:bg-blue-800 text-white">Data Validation</Badge>
                  <Badge className="bg-blue-700 hover:bg-blue-800 text-white">Testing</Badge>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Supported comprehensive SAP MM migration activities for procurement and inventory management processes in a complex enterprise environment. Assisted in Purchase Order processing, executed data validation testing, and resolved inventory issues during migration support phase.
                </p>
                <ul className="space-y-2 text-gray-700 ml-2">
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">•</span>
                    <span>Executed detailed data validation and testing for MM master data during migration</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">•</span>
                    <span>Assisted in Purchase Order processing and GR/GI transaction handling</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">•</span>
                    <span>Identified and resolved inventory management issues during migration support</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">•</span>
                    <span>Supported post-migration activities ensuring system stability and process compliance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-28 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Get In Touch</h2>
          <div className="grid gap-8 md:grid-cols-3 max-w-2xl mx-auto">
            <Card className="bg-white/10 border-white/20 hover:border-white/40 transition-all">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-blue-200" />
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <a
                  href="mailto:chundurunitish2001@gmail.com"
                  className="text-blue-100 hover:text-white transition break-all"
                >
                  chundurunitish2001@gmail.com
                </a>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 hover:border-white/40 transition-all">
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-blue-200" />
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <a href="tel:+918074300526" className="text-blue-100 hover:text-white transition">
                  +91 8074300526
                </a>
              </CardContent>
            </Card>
            <Card className="bg-white/10 border-white/20 hover:border-white/40 transition-all">
              <CardContent className="pt-6 text-center">
                <Linkedin className="h-8 w-8 mx-auto mb-4 text-blue-200" />
                <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/nitish-chunduru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition"
                >
                  Connect with me
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center text-blue-100">
            <p className="text-sm">Open to SAP MM consulting opportunities and interesting projects</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-950 text-white py-6">
        <div className="container px-4 md:px-6 text-center text-sm">
          <p>&copy; 2025 Nitish Chunduru. All rights reserved.</p>
          <p className="mt-2 text-blue-200">SAP MM Consultant | Materials Management Specialist</p>
        </div>
      </footer>
    </div>
  )
}

