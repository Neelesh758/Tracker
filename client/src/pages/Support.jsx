import React from "react";

export default function Support() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-5">

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Support
        </h1>
        <p className="text-gray-500 text-sm mb-5">
          Have an issue or suggestion? Send me a message.
        </p>

        <form
          action="https://formspree.io/f/xwvwvngj "
          method="POST"
          className="flex flex-col gap-4"
        >

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your name"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">
              Message
            </label>
            <textarea
              name="message"
              required
              placeholder="Write your message..."
              className="p-2 rounded-lg border border-gray-300 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-blue-900 hover:bg-blue-800 text-white py-2 rounded-lg shadow"
          >
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}