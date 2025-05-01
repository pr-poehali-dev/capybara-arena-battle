
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CharacterCreation from "@/components/game/CharacterCreation";
import BattleArena from "@/components/game/BattleArena";
import Icon from "@/components/ui/Icon";

interface CapybaraCharacter {
  name: string;
  element: any;
  classType: any;
  stats: {
    health: number;
    attack: number;
    defense: number;
    speed: number;
  };
  currentHealth: number;
  abilities: string[];
}

const CapybaraArena: React.FC = () => {
  const [gameState, setGameState] = useState<"intro" | "creation" | "battle">("intro");
  const [playerCharacter, setPlayerCharacter] = useState<CapybaraCharacter | null>(null);

  const handleCharacterCreated = (character: CapybaraCharacter) => {
    setPlayerCharacter(character);
    setGameState("battle");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 pt-6 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-4 absolute top-4 left-4">
              <Icon name="Home" size={18} /> На главную
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-2">🥔 Арена Капибар 🥔</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Сражайтесь магическими капибарами разных стихий и классов! 
            Используйте особые способности и побеждайте противников на арене.
          </p>
        </div>

        {gameState === "intro" && (
          <div className="max-w-lg mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Добро пожаловать на Арену Капибар!</h2>
              <p className="mb-4">
                Создайте своего уникального бойца-капибару, выберите стихию и класс, и сразитесь с противниками!
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <Icon name="Wand" className="mx-auto mb-2" />
                  <p className="text-sm">Выберите стихию</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <Icon name="Sword" className="mx-auto mb-2" />
                  <p className="text-sm">Выберите класс</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg text-center">
                  <Icon name="Swords" className="mx-auto mb-2" />
                  <p className="text-sm">Сражайтесь!</p>
                </div>
              </div>
            </div>
            <Button onClick={() => setGameState("creation")} size="lg">
              Начать игру
            </Button>
          </div>
        )}

        {gameState === "creation" && (
          <CharacterCreation onCharacterCreated={handleCharacterCreated} />
        )}

        {gameState === "battle" && playerCharacter && (
          <BattleArena playerCapybara={playerCharacter} />
        )}
      </div>
    </div>
  );
};

export default CapybaraArena;
