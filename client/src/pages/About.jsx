import React from "react";
import profile from "../assets/profile.jpeg"
export default function About() {
  return (
    <div className="p-6 bg-gray-50 overflow-y-auto h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">About</h1>
        <div className="flex flex-col  gap-6">
          <div className="bg-white rounded-xl shadow p-5 w-full md:w-[30%]">
            <div className="w-28 h-28 rounded-full border mx-auto mb-3 overflow-hidden">
              <img
                src={profile}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-center font-semibold text-gray-800 md:text-xl">
              Neelesh
            </h2>
            <p className="text-sm text-gray-600 text-center mt-2 md:text-lg">
              Full Stack Learner
            </p>
            <div className="flex justify-center gap-3 mt-4 text-sm">
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="text-gray-700 underline"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-5 w-full md:flex-1">
            <h2 className="font-semibold text-gray-800 mb-2 md:text-xl">About Me</h2>
            <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
              I’m currently working as a Senior Accounts Associate and learning
              Full Stack Development. I like building useful applications and
              working with real-world data.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              My interest lies in combining finance with technology. In my free
              time, I enjoy trading and listening to music.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              I have a strong foundation in accounting and financial workflows, which helps
              me understand how users interact with money-related applications in real life.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              Currently, I am focused on improving my skills in React, Node.js, and building
              full stack applications using the MERN stack. I enjoy solving practical problems
              and turning ideas into working products.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              I believe in learning by building, and every project I create is a step toward
              becoming a better developer.
            </p>
            <h2 className="font-semibold text-gray-800 mt-5 mb-2 text-xl">
              About this app
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed md:text-lg">
              myTracker is a simple MERN-based app to track income and expenses.
              It helps users manage daily transactions and stay aware of their
              financial habits.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              I built this project to practice full stack development and create
              something useful for everyday use.
            </p>
            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              The app allows users to add, categorize, and monitor their transactions in a
              structured way. It provides a clear overview of income and expenses, helping
              users make better financial decisions.
            </p>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              It is designed with a simple and clean interface so that anyone can use it
              without confusion. The focus is on usability rather than complexity.
            </p>

            <p className="text-gray-600 text-sm mt-2 leading-relaxed md:text-lg">
              While building this project, I worked on API integration, state management,
              and UI design to create a smooth user experience.
            </p>
          </div>
        </div> 
      </div>
    </div>
  );
}