
import * as React from "react";
import * as LucideIcons from "lucide-react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  color?: string;
  size?: number | string;
  fallback?: string;
}

const Icon = ({ name, color, size = 24, fallback = "HelpCircle", ...props }: IconProps) => {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] || 
                        LucideIcons[fallback as keyof typeof LucideIcons];
  
  return <IconComponent color={color} size={size} {...props} />;
};

export default Icon;
