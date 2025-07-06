import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/30 mt-auto">
      <div className="container mx-auto px-4 py-5">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-xs md:text-sm ">
              © 2025 CVGeany. Made with 💖 and lots of ☕
            </p>
          </div>
          {/* Connect */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Link href="https://github.com/SidhantCodes" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link href="https://x.com/TotallySidhant" className="text-gray-400 hover:text-purple-400 transition-colors">
                <FaXTwitter className="h-5 w-5" />
              </Link>
              <Link href="mailto:mishrasidhant01@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors">
                <IoMdMail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}