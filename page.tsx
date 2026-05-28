'use client'

import { Linkedin, Mail, Phone, Download, ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  const handleResumeDownload = () => {
    // Create a link to download resume
    const link = document.createElement('a')
    link.href = '/resume.txt'
    link.download = 'Nitish_Chunduru_Resume.txt'
    link.click()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-xl border-b border-primary/10 z-50 transition-all duration-300">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">
            Nitish<span className="text-accent">.dev</span>
          </h1>
          <div className="hidden md:flex gap-8 items-center">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-foreground/70 hover:text-primary transition-colors duration-300 font-medium text-sm relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-in fade-in duration-1000">
              <div className="space-y-4">
                <Badge variant="outline" className="w-fit border-accent/30 bg-accent/5 text-primary hover:bg-accent/10">
                  Enterprise Solutions
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black leading-tight text-primary">
                  Nitish <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Chunduru</span>
                </h1>
                <p className="text-xl md:text-2xl font-semibold text-secondary">SAP MM Consultant</p>
              </div>

              <p className="text-lg text-foreground/70 max-w-lg leading-relaxed">
                Enterprise resource planning specialist with proven expertise in SAP S4HANA migration, materials management, and procurement processes. Delivering transformation through technical excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2 group"
                >
                  Get In Touch
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  onClick={handleResumeDownload}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Button>
              </div>

              <div className="flex gap-6 pt-4">
                <a href="https://www.linkedin.com/in/nitish-chunduru/" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-accent transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="mailto:chundurunitish2001@gmail.com" className="text-foreground/60 hover:text-accent transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent via-secondary to-accent/30 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-500"></div>
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl group-hover:shadow-2xl group-hover:shadow-accent/20 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-secondary/5 z-10"></div>
                <img
                  alt="Nitish Chunduru"
                  className="aspect-square object-cover relative z-0"
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240423-WA0058.jpg-6sJv021mEQQoWUDKjGMbQSiZjR59nP.jpeg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-foreground/[0.02]">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8">About</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-foreground/80 text-lg leading-relaxed">
                <p>
                  I&apos;m a dedicated SAP MM Consultant with 1+ year of hands-on experience in enterprise resource planning systems. My expertise spans SAP S4HANA migrations, procurement optimization, and materials management processes.
                </p>
                <p>
                  I specialize in transforming complex business requirements into scalable technical solutions. My background includes extensive work with PR, PO, GR, GI transactions and inventory management across production environments.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Experience', value: '1+ Years' },
                  { label: 'Projects', value: 'Cohance' },
                  { label: 'Systems', value: 'S4HANA' },
                  { label: 'Focus', value: 'MM & P2P' },
                ].map((item) => (
                  <div key={item.label} className="border-l-2 border-accent pl-4">
                    <p className="text-sm text-foreground/60 mb-1">{item.label}</p>
                    <p className="text-2xl font-bold text-primary">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">Experience</h2>

            <Card className="border-primary/10 bg-foreground/[0.02] hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-primary">SAP MM Intern Trainee Consultant</h3>
                    <p className="text-lg text-accent font-semibold mt-2">Proven Tech</p>
                  </div>
                  <Badge className="w-fit bg-accent text-background font-bold px-4 py-1">
                    Aug 2025 - Present
                  </Badge>
                </div>

                <p className="text-foreground/70 mb-6">1 Year of hands-on SAP S4HANA migration and support experience</p>

                <div className="space-y-4 text-foreground/80">
                  {[
                    'Supported SAP S4HANA migration and MM support in live production environments',
                    'Managed PR, PO, GR, GI, and inventory processes with full lifecycle understanding',
                    'Executed MM master data validation and issue resolution during migration phases',
                    'Ensured smooth post-migration support and system stability across procurement processes',
                  ].map((point, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-foreground/[0.02]">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">Skills & Expertise</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'SAP Systems',
                  skills: ['SAP MM', 'SAP S4HANA', 'SAP Fiori', 'SAP ERP'],
                },
                {
                  title: 'Materials Management',
                  skills: ['Procurement', 'P2P Cycle', 'Purchase Orders', 'Goods Receipt'],
                },
                {
                  title: 'Process Expertise',
                  skills: ['Inventory Management', 'Material Master', 'Goods Issue', 'Vendor Mgmt'],
                },
                {
                  title: 'Integration',
                  skills: ['SAP SD', 'SAP FI', 'API Integration', 'Data Sync'],
                },
                {
                  title: 'Implementation',
                  skills: ['S4HANA Migration', 'Testing', 'Data Validation', 'Support'],
                },
                {
                  title: 'Business Skills',
                  skills: ['Problem Solving', 'Process Optimization', 'Documentation', 'Training'],
                },
              ].map((category) => (
                <Card key={category.title} className="border-primary/10 bg-background hover:border-accent/30 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-foreground/70 group-hover:text-foreground/90 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          <span className="text-sm">{skill}</span>
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
      <section id="projects" className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">Featured Project</h2>

            <Card className="border-primary/10 bg-gradient-to-br from-foreground/[0.02] to-accent/5 hover:border-accent/30 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-primary mb-2">Cohance Migration Support</h3>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {['SAP MM', 'S4HANA', 'Migration', 'Data Validation', 'Testing'].map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-foreground/80 leading-relaxed">
                    Led comprehensive SAP MM migration activities for procurement and inventory management. Executed data validation testing, managed Purchase Order processing, and resolved critical inventory issues during migration support phase.
                  </p>

                  <div className="space-y-3 text-foreground/80">
                    <p className="font-semibold text-primary">Key Achievements:</p>
                    {[
                      'Executed detailed MM master data validation during migration',
                      'Managed Purchase Order and GR/GI transaction processing',
                      'Identified and resolved inventory management issues',
                      'Ensured post-migration system stability and compliance',
                    ].map((achievement, idx) => (
                      <div key={idx} className="flex gap-3">
                        <span className="text-accent font-bold flex-shrink-0">✓</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 md:py-32 bg-foreground/[0.02]">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">Education</h2>

            <div className="space-y-6">
              {[
                { school: 'Bapatla Engineering College', degree: 'Computer Science & Engineering', year: '2019 - 2023', score: '7.5 CGPA' },
                { school: 'Pamulapati Butchi Naidu College', degree: 'High School', year: '2017 - 2019', score: '7.5 GPA' },
                { school: 'NNT Public School', degree: 'School', year: '2016 - 2017', score: '8.8 GPA' },
              ].map((edu) => (
                <Card key={edu.school} className="border-primary/10 bg-background hover:border-accent/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-primary">{edu.school}</h3>
                        <p className="text-foreground/70">{edu.degree}</p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-sm text-foreground/60">{edu.year}</p>
                        <p className="font-semibold text-accent">{edu.score}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">Certifications</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Business Processes in SAP S4HANA', issuer: 'SAP Learning', status: 'Completed' },
                { title: 'Exploring SAP Cloud ERP', issuer: 'SAP Learning', status: 'Completed' },
                { title: 'SAP Ariba Sourcing Overview', issuer: 'SAP Learning', status: 'Completed' },
                { title: 'TCS iON Career Edge - Young Professional', issuer: 'Tata Consultancy Services', status: 'Verified' },
              ].map((cert) => (
                <Card key={cert.title} className="border-primary/10 bg-foreground/[0.02] hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-2">{cert.title}</h3>
                    <p className="text-foreground/70 text-sm mb-4">{cert.issuer}</p>
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      {cert.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-primary">Let&apos;s Work Together</h2>
              <p className="text-lg text-foreground/70">
                Open to SAP MM consulting opportunities, enterprise transformation projects, and interesting challenges.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:chundurunitish2001@gmail.com"
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-background font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                Send Email
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/nitish-chunduru/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8 border-t border-primary/10">
              {[
                { label: 'Email', value: 'chundurunitish2001@gmail.com' },
                { label: 'Phone', value: '+91 8074300526' },
                { label: 'Location', value: 'India' },
              ].map((contact) => (
                <div key={contact.label} className="space-y-2">
                  <p className="text-sm text-foreground/60 font-semibold">{contact.label}</p>
                  <p className="font-semibold text-primary">{contact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-background py-12 border-t border-primary/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-black mb-2">
                Nitish<span className="text-accent">.dev</span>
              </h3>
              <p className="text-background/80">SAP MM Consultant | Enterprise Solutions</p>
            </div>
            <div className="flex gap-6">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/in/nitish-chunduru/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:chundurunitish2001@gmail.com', label: 'Email' },
                { icon: Phone, href: 'tel:+918074300526', label: 'Phone' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="hover:text-accent transition-colors"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-background/80 text-sm">
            <p>&copy; 2025 Nitish Chunduru. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
