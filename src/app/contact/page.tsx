"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:barhamagm@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="max-w-3xl mx-auto py-16 px-6 sm:px-8 pb-24">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-white mb-6 sm:mb-8 text-center tracking-tight">Contact</h1>
      <p className="text-base sm:text-lg text-gray-400 text-center mb-10 sm:mb-12">
        For bookings, collaborations, or inquiries, please get in touch.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3 tracking-tight">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 tracking-tight">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 tracking-tight">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
            placeholder="Your message..."
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3.5 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90 tracking-tight"
          style={{ background: '#9b3437' }}
        >
          Send Message
        </button>
      </form>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full mt-8">
        <a href="https://www.instagram.com/iambarhama/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent font-semibold">Instagram</a>
        <a href="https://www.facebook.com/iambarhama/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent font-semibold">Facebook</a>
        <a href="https://www.youtube.com/channel/UC0QVYoLaOy0rE2fm5c-2lqA" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent font-semibold">YouTube</a>
        <a href="https://open.spotify.com/artist/0jTXrnQV2eR82q1EBCUwVJ" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-accent font-semibold">Spotify</a>
      </div>
    </main>
  );
} 