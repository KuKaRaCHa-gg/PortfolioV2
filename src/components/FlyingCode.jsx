import React, { useEffect } from 'react'

// Snippets de code volants personnalisés (gaming + tech)
const codeSnippets = [
  // Snippets simples
  'KuKaRaCHa-gg',
  'ULTRAKILL - HEADSHOT',
  'DOOM - RIP AND TEAR',
  'APEX LEGENDS - CHAMPION',
  'Java: public static void main',
  'Python: print("Hello World")',
  'C: int main() { return 0; }',
  'Bash: ls -la',
  'SQL: SELECT * FROM users',
  'HTML: <h1>Daniil Minevich</h1>',
  'CSS: .retro { color: #00FF00; }',
  'GitHub: KuKaRaCHa-gg',
  'React + Vite Portfolio',
  'BUT Informatique - IUT Laval',
  'FPS Master',
  'Musculation - 3x10 reps',
  'Anime Fan',
  'Arduino: digitalWrite(13, HIGH)',
  'GIT: commit -m "Update"',
  'Ethernet: 192.168.1.1',

  // Gros pavés
  `public class UltraKill {
  public static void main(String[] args) {
    System.out.println("Headshot!");
    int kills = 666;
    while (kills > 0) {
      System.out.println("Demon slain!");
      kills--;
    }
  }
}`,
  `#!/bin/bash
# Script by KuKaRaCHa-gg
echo "Starting DOOM server..."
if [ $(whoami) == "daniil" ]; then
  echo "Rip and Tear!"
  sudo apt install doom-engine
fi`,
  `const apexLegends = {
  player: "KuKaRaCHa-gg",
  rank: "Apex Predator",
  kills: 420,
  drop: function() {
    console.log(this.player + " lands!");
  }
};`,
  `<!-- Portfolio -->
<html>
<head>
  <title>Daniil Minevich</title>
  <style>
    body { background: #000; color: #00FF00; }
  </style>
</head>
<body>
  <h1>Compétences</h1>
  <ul>
    <li>Java</li>
    <li>Javascript</li>
    <li>Python</li>
    <li>SQL</li>
  </ul>
</body>
</html>`,
  `class ArduinoProject {
  private int pin = 13;
  public void setup() {
    pinMode(pin, OUTPUT);
    Serial.begin(9600);
  }
  public void loop() {
    digitalWrite(pin, HIGH);
    delay(1000);
    digitalWrite(pin, LOW);
    delay(1000);
  }
}`,
  `CREATE TABLE Etudiant (
  id INT PRIMARY KEY,
  nom VARCHAR(50) DEFAULT 'Daniil Minevich',
  pseudo VARCHAR(20) DEFAULT 'KuKaRaCHa-gg',
  formation VARCHAR(50) DEFAULT 'BUT Informatique',
  github VARCHAR(50) DEFAULT 'github.com/KuKaRaCHa-gg'
);
INSERT INTO Etudiant (id) VALUES (1);`,
  `# Expérience - KuKaRaCHa-gg
- Stagiaire @ ESIEA (2019)
  * Entretien PC
  * Support technique
- Stagiaire @ ASGL Conseil
  * Gestion serveurs
  * Réparation borne arcade
# Formation
- Bac STI2D (2020-2023)
- BUT Informatique (Depuis 2023)`,
  `const gameStats = {
  player: "KuKaRaCHa-gg",
  games: ["Ultrakill", "Doom", "Apex Legends"],
  hours: 1337,
  play: function() {
    this.games.forEach(game => {
      console.log("Playing " + game + " like a pro!");
    });
  }
};`
]

export default function FlyingCode() {
  useEffect(() => {
    // Désactiver sur mobile pour performances
    const isMobile = window.innerWidth <= 768
    if (isMobile) return
    
    const container = document.getElementById('flying-code')
    if (!container) return

    function createCode() {
      const span = document.createElement('span')
      const isBig = Math.random() > 0.7
      const snippetIndex = Math.floor(Math.random() * codeSnippets.length)

      span.textContent = codeSnippets[snippetIndex]
      span.className = 'flying-code-snippet' + (isBig ? ' big-code' : '')

      // Positionnement horizontal aléatoire
      span.style.left = `${Math.random() * 100}vw`

      // Durée d'animation aléatoire entre 3s et 9s
      const duration = isBig ? Math.random() * 6 + 3 : Math.random() * 5 + 3
      span.style.animationDuration = `${duration}s`

      // Taille de police variable pour les gros snippets
      if (isBig) {
        span.style.fontSize = `${Math.random() * 0.4 + 0.8}em`
      }

      container.appendChild(span)

      // Suppression après la fin de l'animation
      setTimeout(() => {
        if (span && span.parentNode) {
          span.remove()
        }
      }, duration * 1000)
    }

    // Créer un nouveau morceau de code toutes les 300ms
    const interval = setInterval(createCode, 300)

    return () => {
      clearInterval(interval)
      const snippets = container.querySelectorAll('.flying-code-snippet')
      snippets.forEach(snippet => snippet.remove())
    }
  }, [])

  return <div id="flying-code" />
}
