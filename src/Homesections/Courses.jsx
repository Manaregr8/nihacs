"use client";
import React, { useState } from "react";

const sampleCourses = [
  {
    id: 1,
    title: "Web Penetration Testing And Bug Bounty Hunting",
    description: "Hands-on labs covering pen-testing, recon, and exploitation.",
    duration: "6 Months",
    image: "/Courses/6.png",
  },
  {
    id: 2,
    title: "Basic Ethical Hacking",
    description: "Core security concepts, network defense, and incident response.",
    duration: "3 Months",
    image: "/Courses/03.png",
  },
  {
    id: 3,
    title: "Bachelor in Cybersecurity",
    description: "OWASP top 10, secure coding and real-world exploit labs.",
    duration: "3 Years",
    image: "/Courses/3.png",
  },
  {
    id: 4,
    title: "Master in Cybersecurity And Ethical Hacking",
    description: "Secure architectures, IAM, and cloud incident response.",
    duration: "2 years",
    image: "/Courses/2.png",
  },
  {
    id: 5,
    title: "Diploma in Cybersecurity",
    description: "Python and tooling for automation, analysis, and tooling.",
    duration: "12 Months",
    image: "/Courses/12.png",
  },
 
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search and duration
  const filteredCourses = sampleCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDuration = durationFilter === "all" || course.duration === durationFilter;
    return matchesSearch && matchesDuration;
  });

  // Get unique durations for dropdown
  const uniqueDurations = ["all", ...new Set(sampleCourses.map((c) => c.duration))];

  return (
    <section id="courses" className="bg-black text-white py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Our Courses</h2>
          <p className="text-gray-300">Explore our hands-on courses designed to build job-ready skills in cybersecurity and development.</p>
        </div>

        {/* Sticky Filter Section */}
        <div className="sticky top-20 bg-black/95 backdrop-blur-sm z-40 py-4 px-4 rounded-lg border border-gray-800 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">

            {/* Search Bar */}
            <div className="relative md:col-span-1">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0b0b0b] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#ff1e00] focus:outline-none"
              />
              <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Duration Filter
            <div className="md:col-span-1">
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="w-full bg-[#0b0b0b] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#ff1e00] focus:outline-none"
              >
                {uniqueDurations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration === "all" ? "All Durations" : `${duration}`}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(true)}
              className="w-full bg-[#ff1e00] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#ff3333] transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>

          </div>

          {/* Results count */}
          {(searchTerm || durationFilter !== "all") && (
            <div className="mt-3 text-sm text-gray-400">
              Found <span className="text-[#ff1e00] font-semibold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
            <article key={c.id} className="bg-[#0b0b0b] rounded-xl overflow-hidden shadow-lg flex flex-col">
              <div className="h-50 bg-gray-800 overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm mb-4 flex-1">{c.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-300">{c.duration}</div>
                  <a href="#" className="bg-[#ff1e00] text-white px-4 py-2 rounded-full font-semibold">Enroll</a>
                </div>
              </div>
            </article>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No courses found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter Modal Overlay */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="bg-black border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-black border-b border-gray-800 p-6 flex items-center justify-between z-10">
              <h3 className="text-2xl font-extrabold text-white">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Duration Filter */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Duration</h4>
                <div className="space-y-2">
                  {uniqueDurations.map((duration) => (
                    <label key={duration} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="duration"
                        value={duration}
                        checked={durationFilter === duration}
                        onChange={(e) => setDurationFilter(e.target.value)}
                        className="w-4 h-4 accent-[#ff1e00]"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {duration === "all" ? "All Durations" : duration}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Search Filter
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Search</h4>
                <input
                  type="text"
                  placeholder="Search by course name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0b0b0b] text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-[#ff1e00] focus:outline-none"
                />
              </div> */}

              {/* Course Category Filter */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Course Type</h4>
                <div className="space-y-2">
                  {["All Types", "Certification", "Diploma", "Bachelor", "Master"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#ff1e00] rounded"
                      />
                      <span className="text-gray-300 group-hover:text-white transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-black border-t border-gray-800 p-6 flex gap-4">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDurationFilter("all");
                }}
                className="flex-1 bg-black border-2 border-white text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 bg-[#ff1e00] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#ff3333] transition-colors"
              >
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
