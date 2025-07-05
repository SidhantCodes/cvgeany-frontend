import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Archive, Terminal, Download, Play, Github, Rocket, Coffee, ExternalLink, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowToDeployPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
            <Rocket className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-purple-300">Deployment Guide</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Launch Your <span className="text-purple-400">CVGeany</span> Portfolio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Follow these simple steps to get your professional portfolio live on the web. No technical expertise
            required – we'll guide you through everything.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Unzip */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  1
                </div>
                <Archive className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Unzip Your Portfolio</span>
                  <Badge variant="secondary" className="ml-3 bg-purple-500/20 text-purple-300">
                    30 seconds
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4 text-lg">
              <p>
                Locate the <strong className="text-white">portfolio.zip</strong> file you downloaded from CVGeany
                (usually in your Downloads folder).
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-purple-200">
                  <strong>💡 Tip:</strong> Right-click the zip file and select "Extract All" (Windows) or double-click
                  it (Mac) to unzip.
                </p>
              </div>
              <p>
                This creates a folder containing your complete Next.js portfolio project – everything needed to run your
                website!
              </p>
            </CardContent>
          </Card>

          {/* Step 2: Terminal Navigation */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  2
                </div>
                <Terminal className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Open Terminal & Navigate</span>
                  <Badge variant="secondary" className="ml-3 bg-blue-500/20 text-blue-300">
                    1 minute
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4 text-lg">
              <p>Open your terminal or command prompt:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="font-semibold text-blue-300 mb-2">🪟 Windows:</p>
                  <p>
                    Press <kbd className="bg-gray-700 px-2 py-1 rounded text-sm">Win + R</kbd>, type{" "}
                    <code className="bg-gray-700 px-2 py-1 rounded">cmd</code>, press Enter
                  </p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="font-semibold text-blue-300 mb-2">🍎 Mac:</p>
                  <p>
                    Press <kbd className="bg-gray-700 px-2 py-1 rounded text-sm">Cmd + Space</kbd>, type{" "}
                    <code className="bg-gray-700 px-2 py-1 rounded">terminal</code>, press Enter
                  </p>
                </div>
              </div>
              <p>Navigate to your unzipped portfolio folder:</p>
              <pre className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-green-400 overflow-x-auto">
                <code>cd path/to/your/portfolio-folder</code>
              </pre>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <p className="text-amber-200">
                  <strong>📁 Example:</strong> If your folder is on Desktop, type: <br />
                  <code className="bg-gray-800 px-2 py-1 rounded mt-1 inline-block">cd Desktop/my-portfolio</code>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Install Dependencies */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  3
                </div>
                <Download className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Install Dependencies</span>
                  <Badge variant="secondary" className="ml-3 bg-orange-500/20 text-orange-300">
                    <Coffee className="h-3 w-3 mr-1" />
                    5-10 minutes
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4 text-lg">
              <p>
                First, ensure you have <strong className="text-white">Node.js</strong> installed. If not, download it
                from{" "}
                <Link
                  href="https://nodejs.org"
                  target="_blank"
                  className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                >
                  nodejs.org <ExternalLink className="h-4 w-4" />
                </Link>
              </p>

              <p>Run this command to install all required packages:</p>
              <pre className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-green-400 overflow-x-auto">
                <code>npm install --force</code>
              </pre>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coffee className="h-5 w-5 text-purple-400" />
                  <span className="font-semibold text-purple-200">Perfect time for a coffee break!</span>
                </div>
                <p className="text-purple-200">
                  This process downloads all the libraries your portfolio needs. It might take 5-10 minutes depending on
                  your internet speed.
                </p>
              </div>

              <div className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-5 w-5" />
                <span>You'll see "npm install complete" when it's finished</span>
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Run Development Server */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  4
                </div>
                <Play className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Launch Your Portfolio</span>
                  <Badge variant="secondary" className="ml-3 bg-green-500/20 text-green-300">
                    Instant
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4 text-lg">
              <p>Start your portfolio's development server:</p>
              <pre className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-green-400 overflow-x-auto">
                <code>npm run dev</code>
              </pre>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="text-green-200 font-semibold mb-2">🎉 Success!</p>
                <p className="text-green-200">Your portfolio is now running! Open your browser and visit:</p>
                <div className="mt-2">
                  <Link
                    href="http://localhost:3000"
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    http://localhost:3000
                  </Link>
                </div>
              </div>

              <p className="text-sm text-gray-400">
                <strong>Note:</strong> If port 3000 is busy, Next.js will automatically use the next available port
                (3001, 3002, etc.)
              </p>
            </CardContent>
          </Card>

          {/* Step 5: Publish to GitHub */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  5
                </div>
                <Github className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Publish to GitHub</span>
                  <Badge variant="secondary" className="ml-3 bg-gray-500/20 text-gray-300">
                    3 minutes
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6 text-lg">
              <p>To deploy your portfolio online, you need to upload your code to GitHub first.</p>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">📝 Step 5.1: Create GitHub Repository</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-300">
                    <li>
                      Go to{" "}
                      <Link
                        href="https://github.com/new"
                        target="_blank"
                        className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                      >
                        github.com/new <ExternalLink className="h-4 w-4" />
                      </Link>
                    </li>
                    <li>Enter a repository name (e.g., "my-portfolio")</li>
                    <li>
                      Keep it <strong>Public</strong> and <strong>don't</strong> initialize with README
                    </li>
                    <li>
                      Click <strong>"Create repository"</strong>
                    </li>
                  </ol>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">💻 Step 5.2: Upload Your Code</h4>
                  <p className="mb-3">Run these commands in your terminal (one by one):</p>
                  <pre className="bg-gray-900 border border-gray-700 p-4 rounded-lg text-green-400 overflow-x-auto space-y-2">
                    <code className="block"># Initialize git repository</code>
                    <code className="block">git init -b main</code>
                    <code className="block"></code>
                    <code className="block"># Add all your files</code>
                    <code className="block">git add .</code>
                    <code className="block"></code>
                    <code className="block"># Create your first commit</code>
                    <code className="block">git commit -m "Initial portfolio commit"</code>
                    <code className="block"></code>
                    <code className="block"># Connect to your GitHub repository</code>
                    <code className="block">
                      git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
                    </code>
                    <code className="block"></code>
                    <code className="block"># Upload to GitHub</code>
                    <code className="block">git push -u origin main</code>
                  </pre>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <p className="text-amber-200">
                    <strong>🔄 Replace:</strong> Change{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded">YOUR_USERNAME</code> and{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded">YOUR_REPO_NAME</code> with your actual GitHub
                    username and repository name.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 6: Deploy with Vercel */}
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl shadow-lg">
                  6
                </div>
                <Rocket className="h-7 w-7 text-purple-400" />
                <div>
                  <span className="text-2xl">Deploy with Vercel</span>
                  <Badge variant="secondary" className="ml-3 bg-purple-500/20 text-purple-300">
                    2 minutes
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6 text-lg">
              <p>Vercel is the fastest way to deploy Next.js applications. It's free and incredibly easy!</p>

              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">🚀 Deployment Steps:</h4>
                  <ol className="list-decimal list-inside space-y-3 text-gray-300">
                    <li>
                      Visit{" "}
                      <Link
                        href="https://vercel.com/signup"
                        target="_blank"
                        className="text-purple-400 hover:text-purple-300 underline inline-flex items-center gap-1"
                      >
                        vercel.com/signup <ExternalLink className="h-4 w-4" />
                      </Link>{" "}
                      and sign up with your GitHub account
                    </li>
                    <li>
                      Click <strong>"Add New..."</strong> → <strong>"Project"</strong> from your dashboard
                    </li>
                    <li>Find and select your portfolio repository from the list</li>
                    <li>Vercel automatically detects it's a Next.js project – no configuration needed!</li>
                    <li>
                      Click <strong>"Deploy"</strong> and wait about 1-2 minutes
                    </li>
                  </ol>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-semibold text-green-200">Congratulations!</span>
                  </div>
                  <p className="text-green-200">
                    Your portfolio is now live! Vercel provides a URL like{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded">your-portfolio.vercel.app</code>
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-200">
                    <strong>🔄 Auto-Deploy:</strong> Every time you push changes to GitHub, Vercel automatically updates
                    your live site. No manual redeployment needed!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Your Portfolio is Live!</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Share your professional portfolio with the world. Your unique URL is ready to impress potential employers,
              clients, and collaborators.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
