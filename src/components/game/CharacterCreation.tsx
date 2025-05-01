
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ElementType, ClassType, CapybaraStats } from "@/components/game/CapybaraCard";
import Icon from "@/components/ui/Icon";

interface CharacterCreationProps {
  onCharacterCreated: (character: {
    name: string;
    element: ElementType;
    classType: ClassType;
    stats: CapybaraStats;
    currentHealth: number;
    abilities: string[];
  }) => void;
}

const elements: { value: ElementType; label: string; icon: string }[] = [
  { value: "fire", label: "Огонь", icon: "Flame" },
  { value: "water", label: "Вода", icon: "Droplets" },
  { value: "earth", label: "Земля", icon: "Mountain" },
  { value: "air", label: "Воздух", icon: "Wind" },
  { value: "lightning", label: "Молния", icon: "Zap" }
];

const classes: { value: ClassType; label: string; icon: string; description: string }[] = [
  { 
    value: "warrior", 
    label: "Воин", 
    icon: "Sword",
    description: "Сильный и выносливый боец ближнего боя"
  },
  { 
    value: "mage", 
    label: "Маг", 
    icon: "Wand",
    description: "Использует мощную элементальную магию"
  },
  { 
    value: "archer", 
    label: "Лучник", 
    icon: "Target",
    description: "Быстрый и точный боец дальнего боя"
  }
];

const classAbilities: Record<ClassType, Record<ElementType, string[]>> = {
  warrior: {
    fire: ["Огненный клинок", "Вулканический щит", "Пламенный рывок"],
    water: ["Ледяной клинок", "Водный щит", "Приливная волна"],
    earth: ["Каменный молот", "Земляной панцирь", "Землетрясение"],
    air: ["Ураганный клинок", "Вихревой щит", "Прыжок ветра"],
    lightning: ["Молниеносный меч", "Грозовой щит", "Шоковая атака"]
  },
  mage: {
    fire: ["Огненный шар", "Стена пламени", "Метеоритный дождь"],
    water: ["Водяная стрела", "Ледяная тюрьма", "Цунами"],
    earth: ["Камнепад", "Пещерный сталактит", "Песчаная буря"],
    air: ["Порыв ветра", "Воздушная ловушка", "Торнадо"],
    lightning: ["Разряд молнии", "Цепная молния", "Грозовая туча"]
  },
  archer: {
    fire: ["Огненная стрела", "Взрывчатая ловушка", "Залп пламени"],
    water: ["Ледяная стрела", "Замораживающий выстрел", "Ливень стрел"],
    earth: ["Каменная стрела", "Капкан", "Отравленный выстрел"],
    air: ["Ветряная стрела", "Прыжок назад", "Шквал стрел"],
    lightning: ["Молниеносная стрела", "Паралитический выстрел", "Электрический залп"]
  }
};

const classStats: Record<ClassType, CapybaraStats> = {
  warrior: { health: 120, attack: 15, defense: 12, speed: 8 },
  mage: { health: 80, attack: 20, defense: 5, speed: 10 },
  archer: { health: 90, attack: 18, defense: 8, speed: 15 }
};

const CharacterCreation: React.FC<CharacterCreationProps> = ({ onCharacterCreated }) => {
  const [name, setName] = useState("Моя Капибара");
  const [element, setElement] = useState<ElementType>("fire");
  const [classType, setClassType] = useState<ClassType>("warrior");

  const createCharacter = () => {
    const stats = { ...classStats[classType] };
    const abilities = classAbilities[classType][element];
    
    onCharacterCreated({
      name,
      element,
      classType,
      stats,
      currentHealth: stats.health,
      abilities
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Создание капибары</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Имя капибары</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя" 
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Выберите элемент</Label>
            <RadioGroup 
              value={element} 
              onValueChange={(value) => setElement(value as ElementType)}
              className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2"
            >
              {elements.map((elem) => (
                <div key={elem.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={elem.value} id={`element-${elem.value}`} />
                  <Label htmlFor={`element-${elem.value}`} className="cursor-pointer flex items-center">
                    <Icon name={elem.icon} className="mr-1" size={20} />
                    {elem.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <Label>Выберите класс</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {classes.map((cls) => (
                <Card 
                  key={cls.value}
                  className={`cursor-pointer transition-all ${
                    classType === cls.value ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setClassType(cls.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Icon name={cls.icon} size={24} />
                      <h3 className="font-bold">{cls.label}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{cls.description}</p>
                    <div className="mt-2 text-sm">
                      <div>HP: {classStats[cls.value].health}</div>
                      <div>⚔️: {classStats[cls.value].attack}</div>
                      <div>🛡️: {classStats[cls.value].defense}</div>
                      <div>⚡: {classStats[cls.value].speed}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <Label>Способности</Label>
            <div className="mt-2 p-3 bg-muted rounded-md">
              <ul className="space-y-1">
                {classAbilities[classType][element].map((ability, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>✨</span> {ability}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button onClick={createCharacter} className="w-full">
            Начать битву
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterCreation;
