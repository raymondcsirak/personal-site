'use client';

import { motion } from 'framer-motion';
import { Check, Copy, Container, GitBranch, GitFork, GithubIcon, LinkedinIcon, MailIcon, Terminal } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TerminalIntro from './TerminalIntro';

const TechIcon = ({ icon: Icon, label, className = "", delay = 0 }: { icon: any, label: string, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="group relative"
  >
    <Icon className={`w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors ${className}`} />
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-gray-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800/50">
      {label}
    </div>
  </motion.div>
);

export default function AnimatedHero() {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'hello@raymi.xyz';
  const emailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emailContainerRef.current && !emailContainerRef.current.contains(event.target as Node)) {
        setEmailRevealed(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!emailRevealed) {
      setEmailRevealed(true);
      return;
    }
    window.location.href = `mailto:${email}`;
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center"
      >
        {/* Profile Image */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          className="w-48 h-48 rounded-full overflow-hidden mb-8 ring-4 ring-blue-500/20"
        >
          <img 
            src="/profile.jpg" 
            alt="Raymond Csirak"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Name and Title */}
        <h1 className="text-4xl font-bold mb-4">Raymond Csirak</h1>
        <h2 className="text-xl text-gray-400 mb-6">DevOps Engineer & SRE</h2>

        {/* Social Links */}
        <div className="flex gap-4 mb-12">
          <div 
            ref={emailContainerRef}
            onClick={handleEmailClick}
            className="text-gray-400 hover:text-blue-500 transition-colors relative group cursor-pointer"
            title={emailRevealed ? email : "Click to reveal email"}
          >
            <MailIcon className="w-6 h-6" />
            {emailRevealed && (
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-gray-300 px-3 py-2 rounded-lg shadow-xl flex items-center gap-2 whitespace-nowrap border border-gray-800/50">
                <span>{email}</span>
                <button
                  onClick={handleCopy}
                  className="hover:text-blue-400 transition-colors"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
          <a href="https://linkedin.com/in/raymondcsirak" className="text-gray-400 hover:text-blue-500 transition-colors">
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a href="https://github.com/raymondcsirak" className="text-gray-400 hover:text-blue-500 transition-colors">
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>

        {/* Technology Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 max-w-2xl">
          <TechIcon icon={Container} label="Kubernetes" delay={0.1} />
          <TechIcon 
            icon={() => (
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-400 group-hover:text-blue-400 transition-colors">K</div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-400/30 group-hover:text-blue-400/30 transition-colors translate-x-0.5 translate-y-0.5">K</div>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-400/20 group-hover:text-blue-400/20 transition-colors translate-x-1 translate-y-1">K</div>
              </div>
            )}
            label="Kustomize"
            delay={0.3}
          />
          <TechIcon 
            icon={() => (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors fill-current">
                <path d="M12.292 7.702L8.039 6.227v2.547l4.254 2.459 4.254-2.459V6.227z"/>
                <path d="M12.292 7.702l4.255 1.476v2.547l-4.255 1.476-4.253-1.476V9.178z"/>
              </svg>
            )}
            label="Helm"
            delay={0.2}
          />
          <TechIcon 
            icon={() => (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors fill-current">
                <path d="M12 22s8.029-5.56 8-12c0-4.411-3.589-8-8-8S4 5.589 4 9.995C3.971 16.44 11.696 21.784 12 22zM8 9h3V6h2v3h3v2h-3v3h-2v-3H8V9z"/>
              </svg>
            )}
            label="ArgoCD"
            delay={0.4}
          />
          <TechIcon icon={GitBranch} label="Git" delay={0.5} />
          <TechIcon icon={GitFork} label="CI/CD" delay={0.6} />
          <TechIcon 
            icon={() => (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors fill-current">
                <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202-.01-.065-.016-.132-.018-.199v-.02a1.844 1.844 0 01.082-.402c.05-.134.066-.199.151-.334.053-.066.146-.132.183-.198.108-.135.233-.2.366-.333.02-.02.037-.042.054-.064.015-.02.03-.04.044-.06.016-.02.031-.04.047-.06.033.026.066.052.098.078a.57.57 0 00.157.097c.185.135.334.2.583.2zm-2.587 5.557c.5 0 .999.199 1.499.599.416.466.672.935.837 1.4.165.466.27.935.27 1.402v.018c0 .467-.096.935-.27 1.402-.165.466-.421.935-.837 1.4-.5.401-1 .6-1.499.6s-.999-.199-1.499-.6c-.416-.465-.672-.934-.837-1.4-.165-.467-.27-.935-.27-1.402v-.018c0-.467.096-.936.27-1.402.165-.465.421-.934.837-1.4.5-.4.999-.599 1.499-.599zm5.173 0c.5 0 1 .199 1.499.599.416.466.672.935.837 1.4.165.466.27.935.27 1.402v.018c0 .467-.096.935-.27 1.402-.165.466-.421.935-.837 1.4-.499.401-.999.6-1.499.6s-.999-.199-1.499-.6c-.416-.465-.672-.934-.837-1.4-.165-.467-.27-.935-.27-1.402v-.018c0-.467.096-.936.27-1.402.165-.465.421-.934.837-1.4.5-.4.999-.599 1.499-.599zm-2.003 1.734c-.136.008-.263.025-.39.067-.105.04-.21.088-.314.142-.104.054-.207.113-.31.178-.103.065-.205.134-.307.207-.103.073-.205.15-.307.232-.102.082-.203.17-.305.262-.101.092-.202.19-.303.295-.1.104-.2.215-.3.33-.099.117-.198.24-.297.367-.098.128-.196.262-.294.402-.097.14-.195.285-.293.437-.097.152-.195.31-.293.474-.098.164-.196.335-.295.513-.098.178-.197.364-.296.556-.1.193-.2.393-.3.6-.101.206-.202.42-.304.64-.102.22-.203.448-.305.68-.103.234-.206.475-.31.722-.103.246-.207.5-.312.76-.104.26-.209.527-.314.8-.106.273-.212.553-.32.838-.106.285-.214.577-.321.875-.108.299-.217.604-.326.915-.109.31-.219.628-.329.95-.11.324-.221.654-.332.99-.112.336-.224.68-.337 1.03-.112.35-.226.708-.34 1.073-.113.365-.228.737-.342 1.115-.115.378-.23.764-.346 1.155-.116.39-.233.79-.35 1.236-.117.405-.235.817-.354 1.28-.118.42-.237.847-.357 1.33-.12.435-.241.878-.362 1.374-.123.467-.246.94-.37 1.424-.123.483-.248.974-.372 1.472-.125.498-.25 1.004-.376 1.518h.75c.124-.514.248-1.02.37-1.518.124-.498.247-.989.37-1.472.122-.483.245-.957.367-1.424.122-.466.244-.924.365-1.374.121-.452.242-.895.362-1.33.12-.433.239-.86.357-1.28.119-.419.236-.83.354-1.236.117-.404.234-.803.35-1.194.116-.39.231-.777.346-1.155.114-.378.229-.75.342-1.115.114-.365.228-.723.34-1.073.113-.35.225-.694.337-1.03.111-.336.222-.666.332-.99.11-.322.22-.64.329-.95.109-.31.218-.616.326-.915.107-.298.215-.59.321-.875.108-.285.214-.565.32-.838.105-.273.21-.54.314-.8.105-.26.209-.514.312-.76.104-.247.207-.488.31-.722.102-.232.203-.46.305-.68.102-.22.203-.434.304-.64.1-.207.2-.407.3-.6.099-.192.198-.378.296-.556.099-.178.197-.349.295-.513.098-.164.196-.322.293-.474.098-.152.196-.297.293-.437.098-.14.196-.274.294-.402.099-.127.198-.25.297-.367.1-.115.2-.226.3-.33.101-.105.202-.203.303-.295.102-.092.203-.18.305-.262.102-.082.204-.159.307-.232.102-.073.204-.142.307-.207.103-.065.206-.124.31-.178.104-.054.209-.102.314-.142.127-.042.254-.059.39-.067.136-.007.27.005.4.04.13.034.255.089.375.166.12.076.235.173.345.29.109.117.213.254.312.41.099.157.193.332.282.527.09.195.174.408.253.64.08.232.154.482.223.75.069.267.132.552.189.854.057.302.107.62.151.956.044.336.081.688.111 1.057.03.37.052.755.067 1.157.015.401.022.82.022 1.254 0 .434-.007.852-.022 1.254-.015.402-.037.787-.067 1.157-.03.369-.067.72-.111 1.057-.044.336-.094.654-.151.956-.057.302-.12.587-.189.854-.069.268-.143.518-.223.75-.079.232-.163.445-.253.64-.089.195-.183.37-.282.527-.099.156-.203.293-.312.41-.11.117-.225.214-.345.29-.12.077-.245.132-.375.166-.13.035-.264.047-.4-.04-.136-.008-.263-.025-.39-.067-.105-.04-.21-.088-.314-.142-.104-.054-.207-.113-.31-.178-.103-.065-.205-.134-.307-.207-.103-.073-.205-.15-.307-.232-.102-.082-.203-.17-.305-.262-.101-.092-.202-.19-.303-.295-.1-.104-.2-.215-.3-.33-.099-.117-.198-.24-.297-.367-.098-.128-.196-.262-.294-.402-.097-.14-.195-.285-.293-.437-.097-.152-.195-.31-.293-.474-.098-.164-.196-.335-.295-.513-.098-.178-.197-.364-.296-.556-.1-.193-.2-.393-.3-.6-.101-.206-.202-.42-.304-.64-.102-.22-.203-.448-.305-.68-.103-.234-.206-.475-.31-.722-.103-.246-.207-.5-.312-.76-.104-.26-.209-.527-.314-.8-.106-.273-.212-.553-.32-.838-.106-.285-.214-.577-.321-.875-.108-.299-.217-.604-.326-.915-.109-.31-.219-.628-.329-.95-.11-.324-.221-.654-.332-.99-.112-.336-.224-.68-.337-1.03-.112-.35-.226-.708-.34-1.073-.113-.365-.228-.737-.342-1.115-.115-.378-.23-.764-.346-1.155-.116-.39-.233-.79-.35-1.194-.117-.405-.235-.817-.354-1.236-.118-.42-.237-.847-.357-1.28-.12-.435-.241-.878-.362-1.33-.122-.45-.244-.908-.366-1.374-.123-.467-.246-.94-.37-1.424-.123-.483-.248-.974-.372-1.472-.125-.498-.25-1.004-.376-1.518h-.75c.126.514.251 1.02.376 1.518.124.498.249.989.372 1.472.124.483.247.957.37 1.424.122.466.244.924.366 1.374.121.452.242.895.362 1.33.12.433.239.86.357 1.28.119.419.237.83.354 1.236.117.404.234.803.35 1.194.116.39.231.777.346 1.155.114.378.229.75.342 1.115.114.365.228.723.34 1.073.113.35.225.694.337 1.03.111.336.222.666.332.99.11.322.22.64.329.95.109.31.218.616.326.915.107.298.215.59.321.875.108.285.214.565.32.838.105.273.21.54.314.8.105.26.209.514.312.76.104.247.207.488.31.722.102.232.203.46.305.68.102.22.203.434.304.64.1.207.2.407.3.6.099.192.198.378.296.556.099.178.197.349.295.513.098.164.196.322.293.474.098.152.196.297.293.437.098.14.196.274.294.402.099.127.198.25.297.367.1.115.2.226.3.33.101.105.202.203.303.295.102.092.203.18.305.262.102.082.204.159.307.232.102.073.204.142.307.207.103.065.206.124.31.178.104.054.209.102.314.142.127.042.254.059.39.067.136.007.27-.005.4-.04.13-.034.255-.089.375-.166.12-.076.235-.173.345-.29.109-.117.213-.254.312-.41.099-.157.193-.332.282-.527.09-.195.174-.408.253-.64.08-.232.154-.482.223-.75.069-.267.132-.552.189-.854.057-.302.107-.62.151-.956.044-.337.081-.688.111-1.057.03-.37.052-.755.067-1.157.015-.402.022-.82.022-1.254 0-.434-.007-.853-.022-1.254-.015-.402-.037-.787-.067-1.157-.03-.369-.067-.72-.111-1.057-.044-.336-.094-.654-.151-.956-.057-.302-.12-.587-.189-.854-.069-.268-.143-.518-.223-.75-.079-.232-.163-.445-.253-.64-.089-.195-.183-.37-.282-.527-.099-.156-.203-.293-.312-.41-.11-.117-.225-.214-.345-.29-.12-.077-.245-.132-.375-.166-.13-.035-.264-.047-.4-.04z"/>
              </svg>
            )}
            label="Linux"
            delay={0.7}
          />
          <TechIcon icon={Terminal} label="Bash" delay={0.8} />
          <TechIcon 
            icon={() => (
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-400 hover:text-blue-400 transition-colors fill-current">
                <path d="M21.177 11.625c.016-.093.023-.186.023-.28 0-.466-.37-.846-.83-.846-.093 0-.186.016-.28.047l-3.857.928c-.466.116-.836.512-.836.99 0 .466.37.846.836.846h.093l3.857-.928c.466-.116.836-.512.836-.99 0-.093-.016-.186-.047-.28l.205.513zM14.48 8.837c.093-.466-.186-.928-.65-1.045l-3.857-.928c-.093-.023-.186-.047-.28-.047-.466 0-.836.37-.836.846 0 .093.016.186.047.28l.928 3.857c.116.466.512.836.99.836.466 0 .846-.37.846-.836v-.093l-.928-3.857c-.116-.466.186-.928.65-1.045l3.857.928c.093.023.186.047.28.047.466 0 .836-.37.836-.846 0-.093-.016-.186-.047-.28l-.928-3.857c-.116-.466-.512-.836-.99-.836-.466 0-.846.37-.846.836v.093l.928 3.857zM9.575 15.482l-3.857.928c-.093.023-.186.047-.28.047-.466 0-.836-.37-.836-.846 0-.093.016-.186.047-.28l.928-3.857c.116-.466.512-.836.99-.836.466 0 .846.37.846.836v.093l-.928 3.857c-.116.466.186.928.65 1.045l3.857-.928c.093-.023.186-.047.28-.047.466 0 .836.37.836.846 0 .093-.016.186-.047.28l-.928 3.857c-.116.466-.512.836-.99.836-.466 0-.846-.37-.846-.836v-.093l.928-3.857z"/>
              </svg>
            )}
            label="Virtualization"
            delay={0.9}
          />
        </div>

        {/* Terminal Style Intro and Description Container */}
        <div className="w-full max-w-4xl">
          {/* Terminal Style Intro */}
          <TerminalIntro />

          {/* Brief Description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-gray-300 leading-relaxed text-left space-y-6"
          >
            <p>
              With over a decade of experience in the IT industry, I am a seasoned DevOps Engineer and Site Reliability Engineer (SRE) with a proven track record of optimizing infrastructure and enhancing system reliability. At Hitter Technologies, I spearhead the modernization of infrastructure, leveraging my expertise in Kubernetes orchestration, Infrastructure as Code (IaC), and CI/CD automation to deliver robust and scalable solutions. My deep-rooted proficiency in Linux system administration and network engineering underpins my ability to design and implement efficient, secure, and high-availability systems.
            </p>
            
            <p>
              In my role as CIO and Head of Infrastructure at noLimits Technologies, I've demonstrated strong leadership in IT project management and infrastructure optimization. I excel in designing and implementing virtualization solutions, managing complex network architectures, and providing high-level technical support. My experience spans from hands-on system administration to strategic IT planning, enabling me to bridge the gap between technical implementation and business objectives.
            </p>

            <p>
              I am passionate about automation and cloud-native technologies, continuously exploring innovative ways to improve performance and reliability. Fluent in multiple languages (Hungarian, Romanian, English) and equipped with a diverse technical skill set, I am a relentless autodidact and problem-solver. My commitment to excellence, combined with my eagerness to embrace new challenges and drive technological advancements, makes me a valuable asset to any forward-thinking organization looking to modernize their infrastructure and streamline their operations.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Dotted Line Separator */}
      <div className="flex items-center justify-center mt-16 mb-0">
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
        <div className="px-6">
          <span className="text-gray-600 font-mono">&lt;/&gt;</span>
        </div>
        <div className="flex-1 border-t border-dashed border-gray-700"></div>
      </div>
    </>
  );
} 