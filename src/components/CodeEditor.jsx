import { useState } from 'react';
import { motion } from 'framer-motion';

const CodeEditor = () => {
  const [activeTab, setActiveTab] = useState('react');
  
  const codeExamples = {
    react: `const Portfolio = () => {
  const [skills, setSkills] = useState([
    'React', 'TypeScript', 'Node.js'
  ]);
  
  return (
    <div className="portfolio">
      {skills.map(skill => (
        <SkillCard key={skill} name={skill} />
      ))}
    </div>
  );
};`,
    javascript: `class DataProcessor {
  constructor(data) {
    this.data = data;
  }
  
  async process() {
    const result = await this.data
      .filter(item => item.active)
      .map(item => this.transform(item));
    
    return result;
  }
}`,
    python: `def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Usage
fib_sequence = list(fibonacci_generator(10))
print(fib_sequence)`
  };

  const tabs = [
    { id: 'react', name: 'React', color: 'text-blue-400' },
    { id: 'javascript', name: 'JavaScript', color: 'text-yellow-400' },
    { id: 'python', name: 'Python', color: 'text-green-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl"
    >
      <div className="flex bg-gray-800 px-4 py-2">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex space-x-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 text-sm rounded ${
                activeTab === tab.id 
                  ? `${tab.color} bg-gray-700` 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-6">
        <pre className="text-gray-300 text-sm leading-relaxed overflow-x-auto">
          <code>{codeExamples[activeTab]}</code>
        </pre>
      </div>
    </motion.div>
  );
};

export default CodeEditor;