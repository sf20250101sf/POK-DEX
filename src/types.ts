export interface Pokemon {
  id: number;
  indexStr: string;
  name: string;
  types: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    spAtk: number;
    speed: number;
    total: number;
  };
  description: string;
  imageUrl: string;
  shinyImageUrl?: string;
  isLegendary: boolean;
  height: string;
  weight: string;
  abilities: string[];
  abilityDescriptions?: string[];
  evolutionaryChain: {
    name: string;
    stage: number;
    imageUrl?: string;
    isCurrent?: boolean;
    isMockPlaceholder?: boolean;
    id?: number;
  }[];
  region: "Kanto" | "Johto" | "Hoenn";
  isCaptured?: boolean;
  isFavorite?: boolean;
  capturedAt?: string;
}

export interface Trainer {
  trainerId: string;
  accessKey: string;
  name: string;
  avatarUrl: string;
  isAwaitingVerification: boolean;
  systemLogs: string[];
  uptimeSeconds: number;
}
