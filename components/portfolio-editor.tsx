// "use client"

// import { useState, useRef, useEffect, useCallback } from "react"
// import { Button } from "@/components/ui/button"
// import { FileText, Eye, Edit3, ExternalLink, Monitor, Smartphone, Loader2, AlertCircle } from "lucide-react"
// import type { Portfolio } from "@/types/portfolio"
// import { BasicInformation } from "./BasicInformation"
// import { WorkExperienceSection } from "./WorkExperience"
// import { ProjectsSection } from "./ProjectsSection"
// import { SkillsSection } from "./SkillsSection"
// import { SocialLinksSection } from "./SocialLinksSection"
// import { SEOKeywordsSection } from "./SEOKeywordsSection"
// import { PreviewSidebar } from "./PreviewSidebar"

// // A self-contained loader component to display while the iframe prepares.
// const IframeLoader = () => (
//   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-10">
//     <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
//     <p className="mt-4 text-white">Initializing Preview...</p>
//   </div>
// );

// // Error component for preview issues
// const PreviewError = ({ onRetry }: { onRetry: () => void }) => (
//   <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-10">
//     <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
//     <p className="text-white text-center mb-4">
//       Preview is currently unavailable.<br />
//       The preview file may be missing or corrupted.
//     </p>
//     <Button onClick={onRetry} variant="outline" className="mb-2">
//       Retry Preview
//     </Button>
//     <p className="text-gray-400 text-sm text-center">
//       Please ensure /portfolio-preview/index.html exists and is accessible
//     </p>
//   </div>
// );

// interface PortfolioEditorProps {
//   portfolio: Portfolio
//   onBack: () => void
// }

// export default function PortfolioEditor({ portfolio: initialPortfolio, onBack }: PortfolioEditorProps) {
//   const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio)
//   const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit' as const)
//   const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop' as const)
//   const iframeRef = useRef<HTMLIFrameElement>(null)

//   const [isLoadingPreview, setIsLoadingPreview] = useState(false);
//   const [previewError, setPreviewError] = useState(false);
//   const [iframeLoaded, setIframeLoaded] = useState(false);
//   const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const updatePortfolio = (updates: Partial<Portfolio>) => {
//     setPortfolio((prev) => ({ ...prev, ...updates }));
//   };

//   // Send updated data to preview iframe dynamically
//   useEffect(() => {
//     const sendDataToIframes = () => {
//       if (iframeRef.current?.contentWindow && iframeLoaded) {
//         try {
//           iframeRef.current.contentWindow.postMessage({
//             type: 'updatePortfolio',
//             payload: portfolio
//           }, '*');
//           console.log('Portfolio data sent to main iframe:', portfolio.name);
//         } catch (error) {
//           console.error('Error sending data to main iframe:', error);
//         }
//       }
//     };

//     if (iframeLoaded) {
//       const timer = setTimeout(sendDataToIframes, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [portfolio, iframeLoaded]);

//   useEffect(() => {
//     if (activeTab === 'preview') {
//       setIsLoadingPreview(true);
//       setPreviewError(false);
//       setIframeLoaded(false);
//     }
//     return () => {
//       if (revealTimeoutRef.current) {
//         clearTimeout(revealTimeoutRef.current);
//       }
//     };
//   }, [activeTab]);

//   const handleIframeLoad = useCallback(() => {
//     const iframe = iframeRef.current;
//     // Ensure the iframe and its content window are accessible
//     if (!iframe?.contentWindow) {
//       console.error("Parent: iframe contentWindow is not available on load.");
//       setPreviewError(true);
//       setIsLoadingPreview(false);
//       return;
//     }

//     console.log("Parent: iframe `onLoad` event has fired. Triggering data send via useEffect.");
//     setIframeLoaded(true);

//     const GRACE_PERIOD_MS = 5000;

//     if (revealTimeoutRef.current) {
//       clearTimeout(revealTimeoutRef.current);
//     }

//     revealTimeoutRef.current = setTimeout(() => {
//       console.log(`Parent: ${GRACE_PERIOD_MS}ms grace period has finished. Revealing the iframe.`);
//       if (iframeRef.current) {
//         iframeRef.current.style.opacity = '1';
//       }
//       setIsLoadingPreview(false);
//     }, GRACE_PERIOD_MS);

//   }, []);

//   const handleIframeError = useCallback(() => {
//     console.error("Parent: iframe failed to load");
//     setPreviewError(true);
//     setIsLoadingPreview(false);
//   }, []);

//   const generatePreviewUrl = () => {
//     return "/portfolio-preview/index.html";
//   }

//   const handleOpenInNewTab = useCallback(() => {
//     const previewUrl = generatePreviewUrl();
//     const newWindow = window.open(previewUrl, '_blank');

//     if (newWindow) {
//       const checkIfLoaded = setInterval(() => {
//         try {
//           if (newWindow.document.readyState === 'complete') {
//             clearInterval(checkIfLoaded);
//             setTimeout(() => {
//               try {
//                 newWindow.postMessage({ type: 'updatePortfolio', payload: portfolio }, '*');
//               } catch (error) {
//                 console.error('Error sending message to new tab:', error);
//               }
//             }, 1000);
//           }
//         } catch (e) {
//           console.error('Error communicating with new tab:', e);
//           clearInterval(checkIfLoaded);
//         }
//       }, 100);

//       setTimeout(() => clearInterval(checkIfLoaded), 10000);
//     } else {
//       console.error('Failed to open new tab - popup may be blocked');
//     }
//   }, [portfolio]);

//   const retryPreview = useCallback(() => {
//     setPreviewError(false);
//     setIsLoadingPreview(true);
//     setIframeLoaded(false);

//     const iframe = iframeRef.current;
//     if (iframe) {
//       const currentSrc = iframe.src;
//       iframe.src = '';
//       setTimeout(() => {
//         iframe.src = currentSrc;
//       }, 100);
//     }
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto space-y-8">
//       {/* Header - Always visible */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="h-10 w-10 bg-purple-600 rounded-lg flex items-center justify-center">
//             <FileText className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold text-white">
//               <span className="text-purple-500">CV</span>Geany Editor
//             </h1>
//             <p className="text-gray-400">Make any adjustments before generating your portfolio. <br /> Please verify all generated Links</p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-4">
//           <Button variant="outline" onClick={onBack}>
//             Upload New Resume
//           </Button>
//         </div>
//       </div>

//       {/* Tab Navigation - Always visible */}
//       <div className="flex items-center justify-between">
//         <div className="flex space-x-1 p-1 rounded-lg w-fit">
//           <Button
//             variant={activeTab === 'edit' ? 'default' : 'ghost'}
//             onClick={() => setActiveTab('edit')}
//             className="flex items-center space-x-2"
//           >
//             <Edit3 className="h-4 w-4" />
//             <span>Edit</span>
//           </Button>
//           <Button
//             variant={activeTab === 'preview' ? 'default' : 'ghost'}
//             onClick={() => setActiveTab('preview')}
//             className="flex items-center space-x-2"
//           >
//             <Eye className="h-4 w-4" />
//             <span>Preview</span>
//           </Button>
//         </div>

//         {/* Preview Controls - Only visible when preview tab is active */}
//         {activeTab === 'preview' && (
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2 bg-gray-800 p-1 rounded-lg">
//               <Button
//                 variant={previewDevice === 'desktop' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => setPreviewDevice('desktop')}
//                 className="flex items-center space-x-1"
//               >
//                 <Monitor className="h-4 w-4" />
//                 <span>Desktop</span>
//               </Button>
//               <Button
//                 variant={previewDevice === 'mobile' ? 'default' : 'ghost'}
//                 size="sm"
//                 onClick={() => setPreviewDevice('mobile')}
//                 className="flex items-center space-x-1"
//               >
//                 <Smartphone className="h-4 w-4" />
//                 <span>Mobile</span>
//               </Button>
//             </div>

//             <Button
//               variant="outline"
//               onClick={handleOpenInNewTab}
//               className="flex items-center space-x-2"
//               disabled={previewError}
//             >
//               <ExternalLink className="h-4 w-4" />
//               <span>Open in New Tab</span>
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Content Area - Changes based on active tab */}
//       {activeTab === 'edit' ? (
//         // Edit Tab Content
//         <div className="grid lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-6">
//             <BasicInformation portfolio={portfolio} onUpdate={updatePortfolio} />
//             <WorkExperienceSection
//               workExperience={portfolio.workExperience}
//               onUpdate={(workExperience) => updatePortfolio({ workExperience })}
//             />
//             <ProjectsSection
//               projects={portfolio.projects}
//               onUpdate={(projects) => updatePortfolio({ projects })}
//             />
//             <SkillsSection
//               skillsData={portfolio.skillsData}
//               onUpdate={(skillsData) => updatePortfolio({ skillsData })}
//             />
//             <SocialLinksSection
//               socials={portfolio.socials}
//               onUpdate={(socials) => updatePortfolio({ socials })}
//             />
//             <SEOKeywordsSection
//               seoKeywords={portfolio.seoKeywords}
//               onUpdate={(seoKeywords) => updatePortfolio({ seoKeywords })}
//             />
//           </div>

//           <div className="space-y-6">
//             <PreviewSidebar portfolio={portfolio} />
//           </div>
//         </div>
//       ) : (
//         // Preview Tab Content
//         <div className="bg-gray-800 p-6 rounded-lg">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center space-x-2">
//               <div className="flex space-x-1">
//                 <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//               </div>
//             </div>
//             <div className="text-sm text-gray-400">
//               {portfolio.name}'s Portfolio
//             </div>
//           </div>

//           <div className={`mx-auto bg-white rounded-lg overflow-hidden shadow-2xl ${previewDevice === 'desktop' ? 'w-full' : 'w-96'}`}>
//             <div className={`relative transition-all duration-300 ${previewDevice === 'desktop' ? 'h-[800px]' : 'h-[600px]'}`}>

//               {isLoadingPreview && !previewError && <IframeLoader />}
//               {previewError && <PreviewError onRetry={retryPreview} />}

//               <iframe
//                 ref={iframeRef}
//                 src={generatePreviewUrl()}
//                 className="w-full h-full border-0"
//                 title="Portfolio Preview"
//                 sandbox="allow-scripts allow-same-origin"
//                 onLoad={handleIframeLoad}
//                 onError={handleIframeError}
//                 style={{
//                   opacity: previewError || isLoadingPreview ? 0 : 1,
//                   transition: 'opacity 0.4s ease-in-out'
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Edit3, ExternalLink, Monitor, Smartphone, Loader2, AlertCircle } from "lucide-react"
import type { Portfolio } from "@/types/portfolio"
import { BasicInformation } from "./BasicInformation"
import { WorkExperienceSection } from "./WorkExperience"
import { ProjectsSection } from "./ProjectsSection"
import { SkillsSection } from "./SkillsSection"
import { SocialLinksSection } from "./SocialLinksSection"
import { SEOKeywordsSection } from "./SEOKeywordsSection"
import { PreviewSidebar } from "./PreviewSidebar"

// A self-contained loader component to display while the iframe prepares.
const IframeLoader = () => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-10">
    <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-purple-500" />
    <p className="mt-4 text-white text-sm sm:text-base">Initializing Preview...</p>
  </div>
)

// Error component for preview issues
const PreviewError = ({ onRetry }: { onRetry: () => void }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 z-10 p-4">
    <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-red-500 mb-4" />
    <p className="text-white text-center mb-4 text-sm sm:text-base">
      Preview is currently unavailable.
      <br />
      The preview file may be missing or corrupted.
    </p>
    <Button onClick={onRetry} variant="outline" className="mb-2 bg-transparent">
      Retry Preview
    </Button>
    <p className="text-gray-400 text-xs sm:text-sm text-center">
      Please ensure /portfolio-preview/index.html exists and is accessible
    </p>
  </div>
)

interface PortfolioEditorProps {
  portfolio: Portfolio
  onBack: () => void
}

export default function PortfolioEditor({ portfolio: initialPortfolio, onBack }: PortfolioEditorProps) {
  const [portfolio, setPortfolio] = useState<Portfolio>(initialPortfolio)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit" as const)
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop" as const)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const [isLoadingPreview, setIsLoadingPreview] = useState(false)
  const [previewError, setPreviewError] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const revealTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setPortfolio((prev) => ({ ...prev, ...updates }))
  }

  // Send updated data to preview iframe dynamically
  useEffect(() => {
    const sendDataToIframes = () => {
      if (iframeRef.current?.contentWindow && iframeLoaded) {
        try {
          iframeRef.current.contentWindow.postMessage(
            {
              type: "updatePortfolio",
              payload: portfolio,
            },
            "*",
          )
          console.log("Portfolio data sent to main iframe:", portfolio.name)
        } catch (error) {
          console.error("Error sending data to main iframe:", error)
        }
      }
    }

    if (iframeLoaded) {
      const timer = setTimeout(sendDataToIframes, 300)
      return () => clearTimeout(timer)
    }
  }, [portfolio, iframeLoaded])

  useEffect(() => {
    if (activeTab === "preview") {
      setIsLoadingPreview(true)
      setPreviewError(false)
      setIframeLoaded(false)
    }
    return () => {
      if (revealTimeoutRef.current) {
        clearTimeout(revealTimeoutRef.current)
      }
    }
  }, [activeTab])

  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current
    // Ensure the iframe and its content window are accessible
    if (!iframe?.contentWindow) {
      console.error("Parent: iframe contentWindow is not available on load.")
      setPreviewError(true)
      setIsLoadingPreview(false)
      return
    }

    console.log("Parent: iframe `onLoad` event has fired. Triggering data send via useEffect.")
    setIframeLoaded(true)

    const GRACE_PERIOD_MS = 5000

    if (revealTimeoutRef.current) {
      clearTimeout(revealTimeoutRef.current)
    }

    revealTimeoutRef.current = setTimeout(() => {
      console.log(`Parent: ${GRACE_PERIOD_MS}ms grace period has finished. Revealing the iframe.`)
      if (iframeRef.current) {
        iframeRef.current.style.opacity = "1"
      }
      setIsLoadingPreview(false)
    }, GRACE_PERIOD_MS)
  }, [])

  const handleIframeError = useCallback(() => {
    console.error("Parent: iframe failed to load")
    setPreviewError(true)
    setIsLoadingPreview(false)
  }, [])

  const generatePreviewUrl = () => {
    return "/portfolio-preview/index.html"
  }

  const handleOpenInNewTab = useCallback(() => {
    const previewUrl = generatePreviewUrl()
    const newWindow = window.open(previewUrl, "_blank")

    if (newWindow) {
      const checkIfLoaded = setInterval(() => {
        try {
          if (newWindow.document.readyState === "complete") {
            clearInterval(checkIfLoaded)
            setTimeout(() => {
              try {
                newWindow.postMessage({ type: "updatePortfolio", payload: portfolio }, "*")
              } catch (error) {
                console.error("Error sending message to new tab:", error)
              }
            }, 1000)
          }
        } catch (e) {
          console.error("Error communicating with new tab:", e)
          clearInterval(checkIfLoaded)
        }
      }, 100)

      setTimeout(() => clearInterval(checkIfLoaded), 10000)
    } else {
      console.error("Failed to open new tab - popup may be blocked")
    }
  }, [portfolio])

  const retryPreview = useCallback(() => {
    setPreviewError(false)
    setIsLoadingPreview(true)
    setIframeLoaded(false)

    const iframe = iframeRef.current
    if (iframe) {
      const currentSrc = iframe.src
      iframe.src = ""
      setTimeout(() => {
        iframe.src = currentSrc
      }, 100)
    }
  }, [])

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 px-4 sm:px-6">
      {/* Header - Always visible */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="h-8 w-8 sm:h-10 sm:w-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              <span className="text-purple-500">CV</span>Geany Editor
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Make any adjustments before generating your portfolio.
              <span className="hidden sm:inline">
                <br />
                Please verify all generated Links
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Button variant="outline" onClick={onBack} className="text-sm bg-transparent">
            Upload New Resume
          </Button>
        </div>
      </div>

      {/* Tab Navigation - Always visible */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex space-x-1 p-1 rounded-lg w-fit bg-gray-800/50">
          <Button
            variant={activeTab === "edit" ? "default" : "ghost"}
            onClick={() => setActiveTab("edit")}
            className="flex items-center space-x-2 text-sm"
            size="sm"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant={activeTab === "preview" ? "default" : "ghost"}
            onClick={() => setActiveTab("preview")}
            className="flex items-center space-x-2 text-sm"
            size="sm"
          >
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </Button>
        </div>

        {/* Preview Controls - Only visible when preview tab is active */}
        {activeTab === "preview" && (
          <div className="flex items-center sm:flex-row justify-around sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-1 bg-gray-800 p-1 rounded-lg">
              <Button
                variant={previewDevice === "desktop" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewDevice("desktop")}
                className="flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Monitor className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Desktop</span>
              </Button>
              <Button
                variant={previewDevice === "mobile" ? "default" : "ghost"}
                size="sm"
                onClick={() => setPreviewDevice("mobile")}
                className="flex items-center space-x-1 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Mobile</span>
              </Button>
            </div>

            <Button
              variant="outline"
              onClick={handleOpenInNewTab}
              className="flex items-center space-x-2 text-xs sm:text-sm bg-transparent"
              disabled={previewError}
              size="sm"
            >
              <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Open in New Tab</span>
              <span className="sm:hidden">New Tab</span>
            </Button>
          </div>
        )}
      </div>

      {/* Content Area - Changes based on active tab */}
      {activeTab === "edit" ? (
        // Edit Tab Content
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <BasicInformation portfolio={portfolio} onUpdate={updatePortfolio} />
            <WorkExperienceSection
              workExperience={portfolio.workExperience}
              onUpdate={(workExperience) => updatePortfolio({ workExperience })}
            />
            <ProjectsSection projects={portfolio.projects} onUpdate={(projects) => updatePortfolio({ projects })} />
            <SkillsSection
              skillsData={portfolio.skillsData}
              onUpdate={(skillsData) => updatePortfolio({ skillsData })}
            />
            <SocialLinksSection socials={portfolio.socials} onUpdate={(socials) => updatePortfolio({ socials })} />
            <SEOKeywordsSection
              seoKeywords={portfolio.seoKeywords}
              onUpdate={(seoKeywords) => updatePortfolio({ seoKeywords })}
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <PreviewSidebar portfolio={portfolio} />
          </div>
        </div>
      ) : (
        // Preview Tab Content
        <div className="bg-gray-800 p-3 sm:p-4 lg:p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-400 truncate ml-2">{portfolio.name}'s Portfolio</div>
          </div>

          <div className="w-full bg-white rounded-lg overflow-hidden shadow-2xl">
            <div
              className={`
                relative transition-all duration-300 w-full
                ${
                  previewDevice === "desktop"
                    ? "h-[400px] sm:h-[600px] lg:h-[800px]"
                    : "h-[500px] sm:h-[600px] max-w-sm mx-auto"
                }
              `}
            >
              {isLoadingPreview && !previewError && <IframeLoader />}
              {previewError && <PreviewError onRetry={retryPreview} />}

              <iframe
                ref={iframeRef}
                src={generatePreviewUrl()}
                className="w-full h-full border-0"
                title="Portfolio Preview"
                sandbox="allow-scripts allow-same-origin"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                style={{
                  opacity: previewError || isLoadingPreview ? 0 : 1,
                  transition: "opacity 0.4s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
