import { Github, Linkedin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Nitish Chunduru</h1>
                <div className="max-w-[600px] text-muted-foreground md:text-xl space-y-4">
                  <p>Full Stack Developer, Expertise in Python, JavaScript, React Passionate about AI</p>
                  <p>
                    Motivated and ambitious entry-level professional with a passion for leveraging technical expertise
                    and innovative problem-solving to drive impactful results. Prepared to contribute meaningfully to
                    organizational goals while continuously learning and growing in a dynamic environment.
                  </p>
                  <p>
                    I know I haven't worked in an office before and I don't have a lot of experience but I'm a
                    goal-oriented person, very eager to learn - Nitish ch
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button onClick={() => (window.location.href = "mailto:chundurunitish2001@gmail.com")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://github.com/nitishchunduru" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0">
              <div className="overflow-hidden rounded-full border-4 border-primary">
                <img
                  alt="Profile"
                  className="aspect-square object-cover"
                  height={400}
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240423-WA0058.jpg-6sJv021mEQQoWUDKjGMbQSiZjR59nP.jpeg"
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 md:py-24 bg-muted/50">
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
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Certifications</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">TCS iON Career Edge - Young Professional</h3>
                <p className="text-muted-foreground mb-4">TCS ION</p>
                <Button asChild variant="outline">
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
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Python Full Stack Developer</h3>
                <p className="text-muted-foreground mb-4">SSSIT COMPUTER EDUCATION</p>
                <Button asChild variant="outline">
                  <a
                    href="https://drive.google.com/file/d/1M6G1W1kZc3Dq7vaSoMQjtEbu0CYlVI7E/view?usp=sharing"
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
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Skills</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Python</Badge>
                <Badge>JavaScript</Badge>
                <Badge>HTML</Badge>
                <Badge>CSS</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>React.js</Badge>
                <Badge>Django</Badge>
                <Badge>Node.js</Badge>
                <Badge>Bootstrap</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Oracle SQL</Badge>
                <Badge>PL/SQL</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Projects</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">Leaf Disease Detection and Recognition</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Machine Learning</Badge>
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">Jupyter Notebook</Badge>
                  <Badge variant="outline">HTML</Badge>
                  <Badge variant="outline">CSS</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Implemented Convolutional Neural Networks (CNN's) for plant disease classification</li>
                  <li>Enabled early detection of diseases and timely application of pesticides</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-xl mb-2">AI-Powered Chatbot</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Python (FastAPI)</Badge>
                  <Badge variant="outline">LangGraph</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">MySQL/PostgreSQL</Badge>
                </div>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Developed an AI-powered chatbot using Python and NLP</li>
                  <li>Integrated with database for real-time product information</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter mb-8">Contact</h2>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 items-center justify-center">
            <a
              href="mailto:chundurunitish2001@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <Mail className="h-5 w-5" />
              chundurunitish2001@gmail.com
            </a>
            <a href="tel:+918074300526" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
              <Phone className="h-5 w-5" />
              +91 8074300526
            </a>
            <a
              href="https://github.com/nitishchunduru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nitish-chunduru/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

