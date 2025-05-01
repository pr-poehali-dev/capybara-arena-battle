
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/Icon";

export type ElementType = "fire" | "water" | "earth" | "air" | "lightning";
export type ClassType = "warrior" | "mage" | "archer";

export interface CapybaraStats {
  health: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface CapybaraProps {
  name: string;
  element: ElementType;
  classType: ClassType;
  stats: CapybaraStats;
  isEnemy?: boolean;
  currentHealth: number;
}

const elementIcons: Record<ElementType, string> = {
  fire: "Flame",
  water: "Droplets",
  earth: "Mountain",
  air: "Wind",
  lightning: "Zap"
};

const classIcons: Record<ClassType, string> = {
  warrior: "Sword",
  mage: "Wand",
  archer: "Target"
};

const elementColors: Record<ElementType, string> = {
  fire: "bg-red-500",
  water: "bg-blue-500",
  earth: "bg-amber-700",
  air: "bg-cyan-300",
  lightning: "bg-yellow-400"
};

const CapybaraCard: React.FC<CapybaraProps> = ({
  name,
  element,
  classType,
  stats,
  isEnemy = false,
  currentHealth
}) => {
  const healthPercentage = (currentHealth / stats.health) * 100;
  
  return (
    <Card className={`w-64 transition-all duration-300 ${isEnemy ? "border-red-400" : "border-green-400"}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{name}</h3>
          <Badge variant="outline" className={`${elementColors[element]} text-white`}>
            <Icon name={elementIcons[element]} className="mr-1" size={16} />
            {element}
          </Badge>
        </div>
        
        <div className="mb-3">
          <Badge variant="secondary">
            <Icon name={classIcons[classType]} className="mr-1" size={16} />
            {classType}
          </Badge>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>HP: {currentHealth}/{stats.health}</span>
            <span>{healthPercentage.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${healthPercentage > 50 ? 'bg-green-500' : healthPercentage > 20 ? 'bg-yellow-500' : 'bg-red-500'}`} 
              style={{ width: `${healthPercentage}%` }}>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>⚔️ Атака: {stats.attack}</div>
          <div>🛡️ Защита: {stats.defense}</div>
          <div>⚡ Скорость: {stats.speed}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapybaraCard;
