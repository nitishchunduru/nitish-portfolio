'use client'

import { useState } from 'react'
import { Linkedin, Mail, Phone, Download, ChevronDown, ArrowRight, Github, FileText, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Resume Configuration
const resumeConfig = {
  enabled: true,
  resumeUrl: "/resume/Nitish_Chunduru_SAP_MM_Resume.pdf",
};

// Personal Details
const personalDetails = {
  name: "Nitish Chunduru",
  headline: "SAP MM Consultant",
  subtitle: "SAP S4HANA | SAP Fiori | Procurement | Inventory Management | P2P Cycle",
  email: "chundurunitish2001@gmail.com",
  phone: "+91 8074300526",
  linkedin: "https://www.linkedin.com/in/nitish-chunduru",
  github: "https://github.com/nitishchunduru",
};

export default function Portfolio() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeMetadata, setResumeMetadata] = useState({
    name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
    uploadDate: new Date().toLocaleDateString(),
    fileSize: "2.4 MB"
  });

  const handleResumeUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResumeMetadata({
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + " MB"
      });
    }
  };

  const handleResumeDownload = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      const link = document.createElement('a');
      link.href = url;
      link.download = resumeMetadata.name;
      link.click();
      URL.revokeObjectURL(url);
    } else if (resumeConfig.enabled) {
      const link = document.createElement('a');
      link.href = resumeConfig.resumeUrl;
      link.download = resumeMetadata.name;
      link.click();
    }
  };

  const handleDeleteResume = () => {
    setResumeFile(null);
    setResumeMetadata({
      name: "Nitish_Chunduru_SAP_MM_Resume.pdf",
      uploadDate: new Date().toLocaleDateString(),
      fileSize: "2.4 MB"
    });
  };

  const handleViewResume = () => {
    if (resumeFile) {
      const url = URL.createObjectURL(resumeFile);
      window.open(url, '_blank');
      URL.revokeObjectURL(url);
    } else if (resumeConfig.enabled) {
      window.open(resumeConfig.resumeUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-slate-200 z-50 shadow-sm">
        <div className="container px-4 md:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Nitish<span className="text-emerald-600">.</span>Chunduru
          </h1>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#about" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-sm">About</a>
            <a href="#experience" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-sm">Experience</a>
            <a href="#skills" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-sm">Skills</a>
            <a href="#resume" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-sm">Resume</a>
            <a href="#contact" className="text-slate-600 hover:text-emerald-600 transition-colors font-medium text-sm">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] items-center">
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <Badge className="inline-block bg-emerald-100 text-emerald-700 font-semibold px-3 py-1 rounded-full text-xs">
                  SAP MM Consultant
                </Badge>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                  {personalDetails.name}
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-emerald-600">
                  {personalDetails.headline}
                </h2>
                <p className="text-lg text-slate-600 font-medium">
                  {personalDetails.subtitle}
                </p>
                <p className="text-base text-slate-700 leading-relaxed max-w-2xl">
                  Enterprise resource planning specialist with 1+ years of hands-on experience in SAP MM migration, procurement processes, and inventory management. Proven expertise in P2P cycle, materials master data, and production support.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={() => window.location.href = `mailto:${personalDetails.email}`}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group"
                >
                  <Mail className="h-5 w-5" />
                  Contact Me
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  asChild 
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
                >
                  <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button 
                  asChild 
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2"
                >
                  <a href={personalDetails.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
                {resumeConfig.enabled && (
                  <Button 
                    onClick={handleResumeDownload}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center gap-2 group"
                  >
                    <Download className="h-5 w-5" />
                    Resume
                  </Button>
                )}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-br from-emerald-200 to-slate-200 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300"></div>
              <div className="relative overflow-hidden rounded-2xl border-4 border-slate-200 shadow-xl bg-white">
                <img
                  alt={personalDetails.name}
                  className="w-full aspect-square object-cover"
                  src="/profile.jpg"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420'%3E%3Crect fill='%23e2e8f0' width='420' height='420'/%3E%3Ctext x='50%25' y='50%25' font-size='48' font-family='system-ui' fill='%23475569' text-anchor='middle' dy='.3em'%3EProfile Image%3C/text%3E%3C/svg%3E"
                  }}
                  width={420}
                  height={420}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-emerald-600" />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 bg-white border-y border-slate-200">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Professional Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
            </div>

            <Card className="border-slate-200 hover:border-emerald-200 transition-all shadow-sm hover:shadow-md">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">SAP MM Intern Trainee Consultant</h3>
                    <p className="text-lg text-emerald-600 font-semibold mt-2">Proven Tech</p>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 font-semibold text-sm">Aug 2025 - Present</Badge>
                </div>
                <p className="text-emerald-600 font-semibold mb-6">1 Year of Hands-on Experience in S4HANA Migration</p>
                
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-bold text-slate-900 mb-4 text-lg">Key Responsibilities & Achievements</h4>
                  <ul className="space-y-3 text-slate-700">
                    <li className="flex gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0">▸</span>
                      <span>Supported SAP S4HANA migration and MM support in production environments</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0">▸</span>
                      <span>Managed PR, PO, GR, GI, and inventory processes with full lifecycle understanding</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0">▸</span>
                      <span>Executed MM master data validation and issue resolution during migration</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-emerald-600 font-bold flex-shrink-0">▸</span>
                      <span>Ensured smooth post-migration support and system stability</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Core Competencies</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "SAP Systems", skills: ["SAP MM", "SAP S4HANA", "SAP Fiori", "SAP ERP"] },
                { title: "Materials Management", skills: ["Procurement", "P2P Cycle", "Purchase Orders", "Goods Receipt"] },
                { title: "Process Expertise", skills: ["Inventory Management", "Material Master", "Goods Issue", "Vendor Management"] },
                { title: "System Integration", skills: ["SAP SD Integration", "SAP FI Integration"] },
                { title: "Implementation", skills: ["S4HANA Migration", "Testing", "Data Validation"] },
                { title: "Business Skills", skills: ["Problem Solving", "Process Optimization", "Documentation", "Team Collaboration"] },
              ].map((category, idx) => (
                <Card 
                  key={idx}
                  className="border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all bg-white group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {category.title}
                    </h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, sidx) => (
                        <div key={sidx} className="flex items-center gap-2 text-slate-700">
                          <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                          <span className="text-sm font-medium">{skill}</span>
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

      {/* Resume Management Section */}
      {resumeConfig.enabled && (
        <section id="resume" className="py-20 md:py-32 bg-white border-y border-slate-200">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Resume Management</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Upload Resume</h3>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 hover:bg-emerald-50 transition-all cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <FileText className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 font-medium">Click to upload your resume</p>
                        <p className="text-sm text-slate-500 mt-1">PDF, DOC, or DOCX</p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                {/* Resume Preview & Actions */}
                <Card className="border-slate-200 shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Current Resume</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-sm text-slate-600 mb-1">File Name</p>
                        <p className="font-semibold text-slate-900 truncate">{resumeMetadata.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm text-slate-600 mb-1">Upload Date</p>
                          <p className="font-semibold text-slate-900 text-sm">{resumeMetadata.uploadDate}</p>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-4">
                          <p className="text-sm text-slate-600 mb-1">File Size</p>
                          <p className="font-semibold text-slate-900 text-sm">{resumeMetadata.fileSize}</p>
                        </div>
                      </div>
                      <div className="border-t border-slate-200 pt-4">
                        <p className="text-sm text-slate-600 mb-3 font-medium">Resume Actions</p>
                        <div className="space-y-2">
                          <Button
                            onClick={handleViewResume}
                            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold flex items-center justify-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View Resume
                          </Button>
                          <Button
                            onClick={handleResumeDownload}
                            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold flex items-center justify-center gap-2"
                          >
                            <Download className="h-4 w-4" />
                            Download Resume
                          </Button>
                          <Button
                            onClick={handleDeleteResume}
                            className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold flex items-center justify-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Resume
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 mx-auto"></div>
            <p className="text-slate-600 text-lg mt-6">Let&apos;s connect and discuss your SAP consulting needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {[
              { icon: Mail, title: "Email", value: personalDetails.email, link: `mailto:${personalDetails.email}` },
              { icon: Phone, title: "Phone", value: personalDetails.phone, link: `tel:${personalDetails.phone.replace(/\s/g, '')}` },
              { icon: Linkedin, title: "LinkedIn", value: "Connect with me", link: personalDetails.linkedin }
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
                  <Card className="border-slate-200 hover:border-emerald-200 hover:shadow-md transition-all bg-white h-full">
                    <CardContent className="p-6 text-center">
                      <Icon className="h-10 w-10 mx-auto mb-3 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                      <h3 className="font-bold text-slate-900 mb-2">{contact.title}</h3>
                      <p className="text-slate-600 break-all text-sm">{contact.value}</p>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => window.location.href = `mailto:${personalDetails.email}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-all inline-flex items-center gap-2 group"
            >
              Start A Conversation
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 border-t border-slate-800">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
            <div>
              <h4 className="text-xl font-bold mb-2">Nitish Chunduru</h4>
              <p className="text-slate-400">SAP MM Consultant & Enterprise Specialist</p>
            </div>
            <div>
              <h5 className="font-bold text-white mb-3">Quick Links</h5>
              <div className="space-y-2 text-slate-400 text-sm">
                <a href="#experience" className="hover:text-emerald-400 transition block">Experience</a>
                <a href="#skills" className="hover:text-emerald-400 transition block">Skills</a>
                <a href="#resume" className="hover:text-emerald-400 transition block">Resume</a>
                <a href="#contact" className="hover:text-emerald-400 transition block">Contact</a>
              </div>
            </div>
            <div>
              <h5 className="font-bold text-white mb-3">Follow</h5>
              <div className="space-y-2">
                <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition block text-sm">
                  LinkedIn
                </a>
                <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition block text-sm">
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="text-center text-slate-400 text-sm">
            <p>&copy; 2026 Nitish Chunduru. All rights reserved.</p>
            <p className="mt-2 text-emerald-400 font-semibold">SAP MM Consultant | Materials Management Specialist</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
