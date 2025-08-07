// filepath: ronin-character-generator/src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Character {
  id: string;
  name: string;
  attributes: {
    strength: number;
    agility: number;
    intelligence: number;
  };
}

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};