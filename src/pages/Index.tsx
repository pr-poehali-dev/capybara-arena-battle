
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">🥔 Арена Капибар 🥔</h1>
        <p className="text-xl mb-8">
          Добро пожаловать в магический мир, где капибары сражаются элементальной магией! 
          Выберите свой класс, стихию и сразитесь с противниками!
        </p>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Icon name="Flame" size={48} className="mx-auto mb-3 text-red-500" />
            <h3 className="font-bold mb-1">Магические стихии</h3>
            <p className="text-gray-600">Огонь, вода, земля, воздух и молния</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Icon name="Swords" size={48} className="mx-auto mb-3 text-blue-500" />
            <h3 className="font-bold mb-1">Боевые классы</h3>
            <p className="text-gray-600">Маги, воины и лучники со своими уникальными способностями</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-md text-center">
            <Icon name="Sparkles" size={48} className="mx-auto mb-3 text-purple-500" />
            <h3 className="font-bold mb-1">Командные бои</h3>
            <p className="text-gray-600">Управляйте своей капибарой с помощью команд</p>
          </div>
        </div>
        
        <Link to="/capybara-arena">
          <Button size="lg" className="px-8 py-6 text-lg">
            <Icon name="SwordIcon" className="mr-2" size={20} />
            Начать игру
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
