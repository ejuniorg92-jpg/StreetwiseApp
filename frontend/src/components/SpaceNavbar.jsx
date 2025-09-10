// Streetwise App - By Ernest Gregory (05/27/1992) / NULLFIRE
import React from 'react';
import { Button } from '@/components/ui/button';
import { RocketIcon, StarIcon, CrownIcon, MapIcon } from 'lucide-react';

const SpaceNavbar = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center backdrop-blur-xl bg-black/30 border-b border-white/10 shadow-md">
      <div className="text-white text-2xl font-bold tracking-widest">
        $TREETWI$E
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" className="text-white hover:text-yellow-400">
          <RocketIcon className="mr-2 h-4 w-4" /> Missions
        </Button>
        <Button variant="ghost" className="text-white hover:text-green-400">
          <StarIcon className="mr-2 h-4 w-4" /> EXP
        </Button>
        <Button variant="ghost" className="text-white hover:text-purple-400">
          <CrownIcon className="mr-2 h-4 w-4" /> Godmode
        </Button>
        <Button variant="ghost" className="text-white hover:text-cyan-300">
          <MapIcon className="mr-2 h-4 w-4" /> Map
        </Button>
      </div>
    </div>
  );
};

export default SpaceNavbar;






