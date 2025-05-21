"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Search, BarChart3, Layers, HelpCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"

export default function LandingPage() {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic URL validation
    if (!url) {
      setError("Please enter a URL")
      return
    }

    try {
      setIsLoading(true)
      const urlObj = new URL(url)

      // Start the analysis process
      router.push(`/analyze?url=${encodeURIComponent(url)}`)
    } catch (err) {
      setError("Please enter a valid URL")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6">
              No Ad Experience Required
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Create Professional Google Ads Campaigns <span className="text-blue-600">Without the Guesswork</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Simply enter your website URL and let our AI analyze your content to build optimized Google Ads campaigns
              for your B2B service
            </p>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-lg shadow-md border border-gray-100">
                <Input
                  type="text"
                  placeholder="Paste your landing page URL (e.g., https://yourcompany.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                />
                <Button type="submit" disabled={isLoading} size="lg" className="bg-blue-600 hover:bg-blue-700">
                  {isLoading ? "Analyzing..." : "Generate Campaign"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white border shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Search className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Content Analysis</h3>
                  <p className="text-gray-600 mb-4">
                    Our AI identifies your key selling points, target audience, and unique value proposition
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-1 mb-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Extracts key topics</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Identifies audience</span>
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Keyword Research</h3>
                  <p className="text-gray-600 mb-4">
                    Generate relevant keywords organized by topic and analyze search volume trends
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-1 mb-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Organized by topic</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Trend analysis</span>
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border shadow-md hover:shadow-lg transition-shadow duration-300 text-left">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Layers className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Campaign Builder</h3>
                  <p className="text-gray-600 mb-4">
                    Get ready-to-use ad groups, compelling ad copy, and campaign settings
                  </p>
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center gap-1 mb-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Export to Google Ads</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      <span>Optimized structure</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">How It Works</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Four simple steps to create professional Google Ads campaigns, even if you've never run ads before
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600 font-bold">
                    1
                  </div>
                  <h4 className="text-lg font-medium mb-2">Enter URL</h4>
                  <p className="text-gray-600 text-sm">
                    Paste your website URL. We'll analyze your content to understand your business.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600 font-bold">
                    2
                  </div>
                  <h4 className="text-lg font-medium mb-2">Review Analysis</h4>
                  <p className="text-gray-600 text-sm">
                    See what our AI found about your business, audience, and selling points.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600 font-bold">
                    3
                  </div>
                  <h4 className="text-lg font-medium mb-2">Explore Keywords</h4>
                  <p className="text-gray-600 text-sm">
                    Browse keywords and trends that will help potential customers find you.
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600 font-bold">
                    4
                  </div>
                  <h4 className="text-lg font-medium mb-2">Get Your Campaign</h4>
                  <p className="text-gray-600 text-sm">Export your complete campaign ready to upload to Google Ads.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 bg-blue-50">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-6">
              <HelpCircle className="h-4 w-4" />
              <span>New to Google Ads?</span>
            </div>
            <h3 className="text-2xl font-bold mb-6">We've Made Advertising Simple</h3>
            <p className="text-lg mb-8">
              Our tool guides you through each step with clear explanations and helpful tips. No technical knowledge
              required.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 text-gray-600 py-12 border-t">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-blue-600">AdGenius</h4>
              <p className="text-gray-500">AI-powered Google Ads campaign generator for B2B service companies</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-500">
                <li>Google Ads Guide</li>
                <li>Keyword Research Tips</li>
                <li>Ad Copy Examples</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-500">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Feedback</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-500">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} AdGenius. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
