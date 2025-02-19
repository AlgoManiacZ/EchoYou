"use client";

import { ArrowDownIcon, GithubIcon, SparklesIcon, CodeIcon, BookIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReadmeForm from "@/components/readme-form";
import { ThemeProvider } from "@/components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className="min-h-screen bg-background relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-4 space-y-8 relative">
          <div className="flex items-center space-x-4 animate-float">
            <GithubIcon className="w-20 h-20 text-primary animate-pulse" />
            <SparklesIcon className="w-8 h-8 text-purple-400 animate-spin-slow" />
          </div>
          
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 animate-gradient">
              README Generator
            </h1>
            <p className="text-xl text-muted-foreground text-center max-w-2xl leading-relaxed">
              Create beautiful GitHub profile READMEs in minutes. Showcase your skills, projects, and experience with our modern template.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 animate-float"
              onClick={() => {
                document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get Started <ArrowDownIcon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-all duration-300 animate-float animation-delay-150"
            >
              <CodeIcon className="mr-2 h-4 w-4" /> View Examples
            </Button>
          </div>

          <div className="absolute bottom-8 animate-bounce">
            <ArrowDownIcon className="h-6 w-6 text-muted-foreground" />
          </div>
        </section>

        {/* Form Section */}
        <section id="form-section" className="min-h-screen py-20 px-4 relative">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <BookIcon className="h-6 w-6 text-purple-400" />
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Create Your README
              </h2>
            </div>
            <ReadmeForm />
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}