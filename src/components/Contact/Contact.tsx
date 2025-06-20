'use client';

import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (form.current) {
      emailjs.sendForm(
        'service_pfgetgo',
        'template_etywp1v',
        form.current,
        'ZevJhQLmgRc0W-eel'
      )
      .then(() => {
        setStatus('sent');
        toast.success('Message sent successfully!');
        form.current?.reset();
      })
      .catch((error) => {
        console.error(error.text);
        setStatus('error');
        toast.error('Failed to send message. Try again later.');
      });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          <input type="text" name="name" placeholder="Your Name" className="p-4 border rounded-xl" required />
          <input type="email" name="email" placeholder="Your Email" className="p-4 border rounded-xl" required />
          <textarea name="message" placeholder="Your Message" rows={5} className="p-4 border rounded-xl" required />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
