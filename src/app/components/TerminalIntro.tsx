'use client';

import TypeWriter from 'typewriter-effect';

export default function TerminalIntro() {
  return (
    <div className="font-mono text-lg mb-8">
      <TypeWriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(75)
            .typeString('Hello Friend_')
            .pauseFor(999999999)
            .start();
        }}
      />
    </div>
  );
} 