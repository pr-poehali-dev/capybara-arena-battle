
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import CapybaraCard, { ElementType, ClassType, CapybaraStats } from "@/components/game/CapybaraCard";
import { useToast } from "@/components/ui/use-toast";

interface CapybaraCharacter {
  name: string;
  element: ElementType;
  classType: ClassType;
  stats: CapybaraStats;
  currentHealth: number;
  abilities: string[];
}

interface BattleArenaProps {
  playerCapybara: CapybaraCharacter;
}

const BattleArena: React.FC<BattleArenaProps> = ({ playerCapybara }) => {
  const { toast } = useToast();
  const [command, setCommand] = useState("");
  const [battleLog, setBattleLog] = useState<string[]>([
    "Битва началась! Введите команду для атаки..."
  ]);
  const [enemyCapybara, setEnemyCapybara] = useState<CapybaraCharacter>({
    name: "Вражеская Капибара",
    element: "fire",
    classType: "warrior",
    stats: {
      health: 100,
      attack: 15,
      defense: 10,
      speed: 8
    },
    currentHealth: 100,
    abilities: ["Огненный удар", "Огненный щит", "Рывок"]
  });
  
  const [playerHealth, setPlayerHealth] = useState(playerCapybara.currentHealth);
  const [enemyHealth, setEnemyHealth] = useState(enemyCapybara.currentHealth);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  const addToBattleLog = (message: string) => {
    setBattleLog(prevLog => [...prevLog, message]);
  };

  const executeCommand = () => {
    if (isBattleOver || !isPlayerTurn || command.trim() === "") return;
    
    // Базовый урон + случайный разброс
    let damage = playerCapybara.stats.attack + Math.floor(Math.random() * 5);
    // Уменьшаем на защиту противника
    damage = Math.max(1, damage - enemyCapybara.stats.defense / 2);
    
    // Проверяем упоминание способности
    let abilityUsed = false;
    playerCapybara.abilities.forEach(ability => {
      if (command.toLowerCase().includes(ability.toLowerCase())) {
        abilityUsed = true;
        damage = Math.floor(damage * 1.5); // Бонус урона при использовании способности
        addToBattleLog(`🪄 ${playerCapybara.name} использует способность "${ability}"!`);
      }
    });
    
    // Добавляем элементальный бонус
    if (command.toLowerCase().includes(playerCapybara.element)) {
      damage = Math.floor(damage * 1.3);
      addToBattleLog(`✨ Элементальный бонус ${playerCapybara.element}!`);
    }
    
    // Применяем урон к противнику
    const newEnemyHealth = Math.max(0, enemyHealth - damage);
    setEnemyHealth(newEnemyHealth);
    
    addToBattleLog(`👊 ${playerCapybara.name} атакует и наносит ${damage} урона!`);
    
    if (newEnemyHealth <= 0) {
      addToBattleLog(`🏆 Победа! ${enemyCapybara.name} повержен!`);
      setIsBattleOver(true);
    } else {
      setCommand("");
      setIsPlayerTurn(false);
      
      // ИИ ход с задержкой
      setTimeout(() => enemyTurn(), 1500);
    }
  };

  const enemyTurn = () => {
    if (isBattleOver) return;
    
    // Случайно выбираем способность врага
    const randomAbility = enemyCapybara.abilities[Math.floor(Math.random() * enemyCapybara.abilities.length)];
    
    // Базовый урон + случайный разброс
    let damage = enemyCapybara.stats.attack + Math.floor(Math.random() * 4);
    damage = Math.max(1, damage - playerCapybara.stats.defense / 2);
    
    addToBattleLog(`🔥 ${enemyCapybara.name} использует "${randomAbility}"!`);
    
    // Применяем урон к игроку
    const newPlayerHealth = Math.max(0, playerHealth - damage);
    setPlayerHealth(newPlayerHealth);
    
    addToBattleLog(`💥 ${enemyCapybara.name} наносит ${damage} урона!`);
    
    if (newPlayerHealth <= 0) {
      addToBattleLog(`💀 Поражение! ${playerCapybara.name} пал в бою.`);
      setIsBattleOver(true);
    } else {
      setIsPlayerTurn(true);
    }
  };

  const resetBattle = () => {
    setPlayerHealth(playerCapybara.stats.health);
    setEnemyHealth(enemyCapybara.stats.health);
    setBattleLog(["Новая битва началась! Введите команду для атаки..."]);
    setIsBattleOver(false);
    setIsPlayerTurn(true);
    setCommand("");
    
    toast({
      title: "Битва сброшена",
      description: "Начинается новый бой!",
    });
  };

  // Автоскролл для лога битвы
  useEffect(() => {
    const logElement = document.getElementById("battle-log");
    if (logElement) {
      logElement.scrollTop = logElement.scrollHeight;
    }
  }, [battleLog]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
        <div className="order-2 md:order-1">
          <CapybaraCard
            name={playerCapybara.name}
            element={playerCapybara.element}
            classType={playerCapybara.classType}
            stats={playerCapybara.stats}
            currentHealth={playerHealth}
          />
        </div>
        
        <div className="text-center order-1 md:order-2 flex items-center">
          <div className="text-4xl font-bold">⚔️</div>
        </div>
        
        <div className="order-3">
          <CapybaraCard
            name={enemyCapybara.name}
            element={enemyCapybara.element}
            classType={enemyCapybara.classType}
            stats={enemyCapybara.stats}
            isEnemy={true}
            currentHealth={enemyHealth}
          />
        </div>
      </div>
      
      <div className="mb-4 bg-gray-100 p-3 rounded-lg h-60 overflow-y-auto" id="battle-log">
        {battleLog.map((log, index) => (
          <div key={index} className="mb-1">
            {log}
          </div>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Textarea
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Введите команду (например: 'Атаковать огненным шаром' или 'Использовать водяную стрелу')"
          disabled={isBattleOver || !isPlayerTurn}
          className="flex-grow"
        />
        <div className="flex flex-col gap-2">
          <Button 
            onClick={executeCommand} 
            disabled={isBattleOver || !isPlayerTurn || command.trim() === ""}
          >
            Атаковать
          </Button>
          <Button 
            variant="outline" 
            onClick={resetBattle}
          >
            Сбросить
          </Button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-bold mb-2">Ваши способности:</h3>
        <div className="flex flex-wrap gap-2">
          {playerCapybara.abilities.map((ability, index) => (
            <Badge key={index} variant="secondary">{ability}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleArena;
