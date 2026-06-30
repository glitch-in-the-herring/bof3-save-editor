export const fish: Fish[] = [
  "Jellyfish",
  "Piranha",
  "Puffer",
  "Trout",
  "RainbowTrout",
  "Red Catfish",
  "Bass",
  "MartianSquid",
  "Black Bass",
  "Barandy",
  "Man-o'-War",
  "Flying Fish",
  "Blowfish",
  "Sea Bream",
  "Sea Bass",
  "Black Porgy",
  "Octopus",
  "Angler",
  "Devilfish",
  "Spearfish",
  "Whale",
  "Mackerel",
  "Manillo",
]

export type Fish =
  | "Jellyfish"
  | "Piranha"
  | "Puffer"
  | "Trout"
  | "RainbowTrout"
  | "Red Catfish"
  | "Bass"
  | "MartianSquid"
  | "Black Bass"
  | "Barandy"
  | "Man-o'-War"
  | "Flying Fish"
  | "Blowfish"
  | "Sea Bream"
  | "Sea Bass"
  | "Black Porgy"
  | "Octopus"
  | "Angler"
  | "Devilfish"
  | "Spearfish"
  | "Whale"
  | "Mackerel"
  | "Manillo"

export interface Fishing {
  lengths: Record<Fish, number>
}
