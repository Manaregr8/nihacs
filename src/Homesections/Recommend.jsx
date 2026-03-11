"use client";
import React from "react";
import Link from "next/link";

const sampleCourses = [
  {
    id: 1,
    title: "Web Penetration Testing And Bug Bounty Hunting",
    description: "Hands-on labs covering pen-testing, recon, and exploitation.",
    duration: "6 Months",
    image: "/Courses/6.png",
    href: "/courses/web-penetration-testing-bug-bounty-hunting", // ✅ matches slug page
  },
  {
    id: 2,
    title: "Basic Ethical Hacking",
    description: "Core security concepts, network defense, and incident response.",
    duration: "3 Months",
    image: "/Courses/03.png",
    href: "/courses/basic-ethical-hacking", // ✅ matches slug page
  },
  {
    id: 3,
    title: "Bachelor in Cybersecurity",
    description: "OWASP top 10, secure coding and real-world exploit labs.",
    duration: "3 Years",
    image: "/Courses/3.png",
    href: "/courses/bachelor-in-cybersecurity", // ✅ matches slug page
  },
  {
    id: 4,
    title: "Master in Cybersecurity And Ethical Hacking",
    description: "Secure architectures, IAM, and cloud incident response.",
    duration: "4 Months",
    image: "/Courses/2.png",
    href: "/courses/master-in-cybersecurity-ethical-hacking", // ✅ matches slug page
  },
  {
    id: 5,
    title: "Diploma in Cybersecurity",
    description: "Python and tooling for automation, analysis, and tooling.",
    duration: "12 Months",
    image: "/Courses/12.png",
    href: "/courses/diploma-in-cybersecurity", // ✅ matches slug page
  },
];

export default function Recommend() {
  const recommendedCourses = sampleCourses.slice(0, 3);

  return (
    <section className="bg-black text-white py-10 md:py-28">
      <div className="max-w-[1350px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Courses Designed for the Real-World
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Start your journey with our top-rated courses. Perfect for beginners
            and professionals alike.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-[#0b0b0b] rounded-xl overflow-hidden border border-gray-800 hover:border-[#ff1e00] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff1e00]/50 flex flex-col group"
            >
              {/* Course Image */}
              <div className="relative h-54 bg-gray-800 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Course Content */}
              <div className="p-6 flex-1 flex flex-col">  
                <h3 className="text-lg font-semibold text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">
                  {course.description}
                </p>

                {/* Duration and Button */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <span className="text-sm text-gray-300">
                    {course.duration}
                  </span>
                  <Link
                    href={course.href}  // ✅ now points to correct course slug
                    className="bg-[#ff1e00] z-30 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#ff3333] transition-colors duration-200"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 relative z-50">
          <Link href="/courses">
            <button className="inline-block bg-[#ff1e00] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#ff3333] transition-colors duration-200 cursor-pointer">
              View All Courses
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}