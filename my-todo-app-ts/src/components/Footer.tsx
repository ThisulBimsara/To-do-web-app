"use client";

import Link from "next/link";
import { assets, footerLinks } from "../assets/assets"; // make sure you have this

export default function Footer() {
  return (
    <footer className="bg-secondary w-full mt-24">
      {/* Inner container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
          
          {/* Logo & Description */}
          <div>
            {/* <img
              className="w-24 md:w-12"
              src={assets.CH} // your logo
              alt="logo"
            /> */}
            <p className="max-w-[410px] mt-6 text-gray-500">
              Discover timeless elegance and unparalleled quality with our
              exquisite collection of fine gems and custom jewelry. We believe
              in shining beyond every standard.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.url.startsWith("http") ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition"
                        >
                          {link.text}
                        </a>
                      ) : (
                        <Link
                          href={link.url}
                          className="hover:underline transition"
                        >
                          {link.text}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer bottom */}
        <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
          © {new Date().getFullYear()} Stack. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
