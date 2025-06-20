'use client'

import { motion } from 'framer-motion'
import { Code2, PenTool, ServerCog } from 'lucide-react'

const team = [
  {
    name: 'Oduor Joseph Owang',
    role: 'Founder & Full-Stack Developer',
    icon: <Code2 className="inline-block w-4 h-4 mr-1 text-blue-500" />,
    desc: 'Passionate about scalable software and solving real-world problems by turning code into solutions that matter.',
    tagline: '"Engineering ideas into real world impact."',
  },
  {
    name: 'Jane Kimani',
    role: 'UI/UX Designer',
    icon: <PenTool className="inline-block w-4 h-4 mr-1 text-pink-500" />,
    desc: 'Designs user-first experiences with attention to detail and modern design trends.',
    tagline: '"Designs that don’t just look good — they feel right."',
  },
  {
    name: 'Eric Kipngetich',
    role: 'DevOps & Cloud Engineer',
    icon: <ServerCog className="inline-block w-4 h-4 mr-1 text-green-500" />,
    desc: 'Handles CI/CD, cloud infrastructure and smooth deployment workflows.',
    tagline: '"Keeping the pipeline flowing and the cloud smiling."',
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
        <h2 className="text-4xl font-bold mb-10">👥 Meet the Humans Behind the Code</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-left hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-2 flex items-center">
                {member.icon}
                {member.role}
              </p>
              <p className="text-gray-600 text-sm mb-3">{member.desc}</p>
              <p className="text-xs italic text-gray-500">💬 {member.tagline}</p>
            </motion.div>
          ))}
        </div>

        <h3 className="text-3xl font-semibold mb-6">📈 Our Journey</h3>
        <div className="flex flex-col items-center space-y-6 border-l-4 border-blue-500 pl-6 max-w-xl mx-auto">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              className="relative text-left w-full"
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
