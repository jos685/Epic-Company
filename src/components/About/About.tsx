'use client'

import { motion } from 'framer-motion'

const team = [
  {
    name: 'Joseph Owang',
    role: 'Founder & Full-Stack Developer',
    desc: 'Passionate about scalable software and solving real-world problems with code.',
  },
  {
    name: 'Jane Kimani',
    role: 'UI/UX Designer',
    desc: 'Designs user-first experiences with attention to detail and modern design trends.',
  },
  {
    name: 'Eric Otieno',
    role: 'DevOps & Cloud Engineer',
    desc: 'Handles CI/CD, cloud infrastructure and smooth deployment workflows.',
  },
]

const timeline = [
  { year: '2022', event: 'Epic Solutions Founded' },
  { year: '2023', event: 'Launched 10+ Client Projects' },
  { year: '2024', event: 'Expanded into Mobile & Cloud Development' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-gray-100 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Meet the Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{member.role}</p>
              <p className="mt-2 text-gray-600 text-sm">{member.desc}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-3xl font-semibold mb-4">Our Journey</h3>
        <div className="flex flex-col items-center space-y-6 border-l-4 border-blue-500 pl-6 max-w-xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className="relative"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-7 top-1.5"></div>
              <h4 className="font-bold">{item.year}</h4>
              <p className="text-gray-600 text-sm">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
