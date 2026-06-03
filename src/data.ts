import { Pokemon } from "./types";

export const initialPokemonDatabase: Pokemon[] = [
  {
    id: 1,
    indexStr: "#0001",
    name: "BULBASAUR",
    types: ["Grass", "Poison"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      speed: 45,
      total: 318
    },
    description: "A macro photography style depiction of a Bulbasaur in a sun-drenched jungle. Sharp focus on its large green seed and moist, textured teal skin. Glistening water droplets cover its surface.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJM5_FR4cBWCgbQ_UCuuNIOHKS6F8Y50dvcheWOiV9ut3i3OxrHuAR23VGbbZV5y5CWUCyK6fYzbwWr2VjWj9TVOnMscHF2Vhtxtskpykug_mZ7dnwARvX2js7qElweE3wRhU_c2VhBbGq_-puceuhHw8oGfJhF1cc21CLD4E-MHpmg_txGAv58ugOOl_mqDj6m-zx-t33g7TJVaUEL3QidNvK7oQVwZ0M1l_mrnsrBkhWfRiFFpwXclEbSF_UaE29oswH5CvDcE",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJM5_FR4cBWCgbQ_UCuuNIOHKS6F8Y50dvcheWOiV9ut3i3OxrHuAR23VGbbZV5y5CWUCyK6fYzbwWr2VjWj9TVOnMscHF2Vhtxtskpykug_mZ7dnwARvX2js7qElweE3wRhU_c2VhBbGq_-puceuhHw8oGfJhF1cc21CLD4E-MHpmg_txGAv58ugOOl_mqDj6m-zx-t33g7TJVaUEL3QidNvK7oQVwZ0M1l_mrnsrBkhWfRiFFpwXclEbSF_UaE29oswH5CvDcE", // Fallback, we'll style with color filters for shiny
    isLegendary: false,
    height: "0.7m",
    weight: "6.9kg",
    abilities: ["Overgrow", "Chlorophyll (Hidden)"],
    abilityDescriptions: [
      "Powers up Grass-type moves when the Pokémon's HP is low.",
      "Boosts the Pokémon's Speed stat in harsh sunlight."
    ],
    evolutionaryChain: [
      { name: "BULBASAUR", stage: 1, id: 1, isCurrent: true },
      { name: "IVYSAUR", stage: 2, isMockPlaceholder: true },
      { name: "VENUSAUR", stage: 3, isMockPlaceholder: true }
    ],
    region: "Kanto",
    isCaptured: true,
    isFavorite: false
  },
  {
    id: 6,
    indexStr: "#0006",
    name: "CHARIZARD",
    types: ["Fire", "Flying"],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      spAtk: 109,
      speed: 100,
      total: 534
    },
    description: "A majestic, realistic depiction of a Charizard flying over a volcanic landscape at dusk. Features intricate reptilian orange scales and massive wings with deep teal undersides. Tail flame casts a powerful atmospheric crimson light.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNNLFpiHKdJS1IHC8UDiytWaGEJTiLEspdh9EIDqUHr6Js2QktBInzs5m5vAMmUPN_7yq2K2VoK46WkGwy5b8EoW5AgqtZ4cBN0Z4Rysqk785xVYbW5gxMK9zL08WHhy_vJBqFcmgM5HBDdHyq73577hO3MTPQOxsLYVU5w9asSKob6a8JQvGnTFUKaNc4t5zgRbegqIjUAoDmwR3MmYszJMeDY9T4-cYFpEKyPUmcveElvhS7wcmVK3UYG36RpG0l7HMqgTX0fOU",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEf_NG_ygOg6gkpBfJVY4sG_IOrk11TjDmykNDkqFRyzN7ezEbpNKexjlix4gzU8Zh1NhWypbxfirCXyzqmZzriB4dEhx1LrxYJ-HYfcpk7qDy0jzgHDRnANxvHAE-BvDWD_ANwrbCtqVFpPXNjJXSlLksv3mGIVC0S6NOljjExPQzFHrPmNrEQ9pVFEVWV-xCQqppD8maVRaYSZ0LCQnFC1KeBgdJPih2thbLRiJDwv0OkEBdMj78yaKNA6Xe71BKUobpZul68A8",
    isLegendary: false,
    height: "1.7m",
    weight: "90.5kg",
    abilities: ["Blaze", "Solar Power (Hidden)"],
    abilityDescriptions: [
      "Powers up Fire-type moves when the Pokémon's HP is low.",
      "In harsh sunlight, the Pokémon's Sp. Atk stat is boosted, but its HP decreases each turn."
    ],
    evolutionaryChain: [
      { name: "CHARMANDER", stage: 1, isMockPlaceholder: true },
      { name: "CHARMELEON", stage: 2, isMockPlaceholder: true },
      { name: "CHARIZARD", stage: 3, id: 6, isCurrent: true }
    ],
    region: "Kanto",
    isCaptured: true,
    isFavorite: true
  },
  {
    id: 25,
    indexStr: "#0025",
    name: "PIKACHU",
    types: ["Electric"],
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      spAtk: 50,
      speed: 90,
      total: 320
    },
    description: "A detailed, realistic portrait of Pikachu sitting in a lush forest clearing during a thunderstorm. Tiny neon electric sparks dance across its vibrant golden fur and rosy red cheek pouches, illuminated by atmospheric background lightning.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwfXhQrr_YAAj694tC8zso5wcQkwX5uX16ERUPpxPgz0VzlvISCF3do9Gxanhuf9li6VLvaUOw5OtJvQtMvQ042pCI1cw-R9Q3N0RKYHS_WLuRuAJqi2BibgLJyjYey9yBOfQKCQ7ycTi3rGmbCXaxC6L-Uc64J6FyC-VANhkIEgEcSX9uGfolDXUhzDUgWeWPJUKPqEsrqekqBbjQE-AVi2HT26mgGsd0RF8eO7TlCAZRBBA_JYA_Mbc45qTU4Jii-3W7Kh7ZuYU",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwfXhQrr_YAAj694tC8zso5wcQkwX5uX16ERUPpxPgz0VzlvISCF3do9Gxanhuf9li6VLvaUOw5OtJvQtMvQ042pCI1cw-R9Q3N0RKYHS_WLuRuAJqi2BibgLJyjYey9yBOfQKCQ7ycTi3rGmbCXaxC6L-Uc64J6FyC-VANhkIEgEcSX9uGfolDXUhzDUgWeWPJUKPqEsrqekqBbjQE-AVi2HT26mgGsd0RF8eO7TlCAZRBBA_JYA_Mbc45qTU4Jii-3W7Kh7ZuYU", // fallback
    isLegendary: false,
    height: "0.4m",
    weight: "6.0kg",
    abilities: ["Static", "Lightning Rod (Hidden)"],
    abilityDescriptions: [
      "The Pokémon is charged with static electricity. Contact with it may cause paralysis.",
      "Draws in all Electric-type moves to boost its own Sp. Atk stat."
    ],
    evolutionaryChain: [
      { name: "PICHU", stage: 1, isMockPlaceholder: true },
      { name: "PIKACHU", stage: 2, id: 25, isCurrent: true },
      { name: "RAICHU", stage: 3, isMockPlaceholder: true }
    ],
    region: "Kanto",
    isCaptured: true,
    isFavorite: false
  },
  {
    id: 94,
    indexStr: "#0094",
    name: "GENGAR",
    types: ["Ghost", "Poison"],
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      spAtk: 130,
      speed: 110,
      total: 500
    },
    description: "A hauntingly cool digital painting of Gengar emerging from a dark, brick-lined urban alleyway at midnight. Its malicious red glowing eyes and wide toothy grin emanate paranormal energy with swirling mist.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnU0NoDn3K88oOM4t07MdO4YcCRGQP-wQkvk3NADJuYNQ12WYuyF1us6LLl2Dw2sxnwDc3iWEXsrGBxF-PmJN3e9oWzKsMvzyDE_mRB5vDQNlFAQlw2ih7H-T0Tso-IHEkYNppzB-Ic60XimuLZbZ4TBpsrhgY3NvbzSDDXA323pfSEYu4gXKETkTAgOSMOIl6lK3EcQuuqAYYNQuXo1K2aFok5XheBJ-nGNXdwmYN4RAsVdGqpM_zTitx6cl85kOs7SB2zNKemc0",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnU0NoDn3K88oOM4t07MdO4YcCRGQP-wQkvk3NADJuYNQ12WYuyF1us6LLl2Dw2sxnwDc3iWEXsrGBxF-PmJN3e9oWzKsMvzyDE_mRB5vDQNlFAQlw2ih7H-T0Tso-IHEkYNppzB-Ic60XimuLZbZ4TBpsrhgY3NvbzSDDXA323pfSEYu4gXKETkTAgOSMOIl6lK3EcQuuqAYYNQuXo1K2aFok5XheBJ-nGNXdwmYN4RAsVdGqpM_zTitx6cl85kOs7SB2zNKemc0", // fallback
    isLegendary: false,
    height: "1.5m",
    weight: "40.5kg",
    abilities: ["Cursed Body"],
    abilityDescriptions: [
      "May disable a move used on the Pokémon if hit by an attack."
    ],
    evolutionaryChain: [
      { name: "GASTLY", stage: 1, isMockPlaceholder: true },
      { name: "HAUNTER", stage: 2, isMockPlaceholder: true },
      { name: "GENGAR", stage: 3, id: 94, isCurrent: true }
    ],
    region: "Kanto",
    isCaptured: true,
    isFavorite: false
  },
  {
    id: 150,
    indexStr: "#0150",
    name: "MEWTWO",
    types: ["Psychic"],
    stats: {
      hp: 106,
      attack: 110,
      defense: 100,
      spAtk: 154,
      speed: 130,
      total: 680
    },
    description: "Genetically engineered super-lifeform. Created by gene splicing experiments, its psychic capabilities are measured at levels exceeding all known database entries. Floating in stasis, extreme caution is permanently advised.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48", // fallback
    isLegendary: true,
    height: "2.0m",
    weight: "122.0kg",
    abilities: ["Pressure", "Unnerve (Hidden)"],
    abilityDescriptions: [
      "Puts pressure on the opposing Pokémon, raising their PP usage.",
      "Unnerves opposing Pokémon and makes them unable to eat Berries."
    ],
    evolutionaryChain: [
      { name: "CLONE METRIC", stage: 1, isMockPlaceholder: true },
      { name: "MEWTWO", stage: 2, id: 150, isCurrent: true }
    ],
    region: "Kanto",
    isCaptured: true,
    isFavorite: true
  },
  {
    id: 376,
    indexStr: "#0376",
    name: "METAGROSS",
    types: ["Steel", "Psychic"],
    stats: {
      hp: 80,
      attack: 135,
      defense: 130,
      spAtk: 95,
      speed: 70,
      total: 600
    },
    description: "A highly sophisticated machine-like supercomputer with four brains. Its steel skin and magnetic charges generate psychic tracking forces capable of crushing heavy targets from afar.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgIsBc20cM_4xkLaLP32TUI8wGPiBIryEkrCP0nKYvWxJPa-HwQGqIeCpFA2MgXgBzi25ORvaidWw5ZN9VieKMKiTGKYvXWPrwvdwEPN-UpNMcRrJaNQU7qavPVegA_JBTeUWKFQM-OWxUzgtr-ROtFLLFxaziSPFJVBRrrLlY9OYC27VrF1e-tVICMYO0tYHjxlD6i4ae4say3mG3KasASEX5_4L92E1cXPLcCqRARqUOjk8tWfG0WUYF6_MDRaUIWPuJkQp73BY",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgIsBc20cM_4xkLaLP32TUI8wGPiBIryEkrCP0nKYvWxJPa-HwQGqIeCpFA2MgXgBzi25ORvaidWw5ZN9VieKMKiTGKYvXWPrwvdwEPN-UpNMcRrJaNQU7qavPVegA_JBTeUWKFQM-OWxUzgtr-ROtFLLFxaziSPFJVBRrrLlY9OYC27VrF1e-tVICMYO0tYHjxlD6i4ae4say3mG3KasASEX5_4L92E1cXPLcCqRARqUOjk8tWfG0WUYF6_MDRaUIWPuJkQp73BY",
    isLegendary: false,
    height: "1.6m",
    weight: "550.0kg",
    abilities: ["Clear Body", "Light Metal (Hidden)"],
    abilityDescriptions: [
      "Prevents other Pokémon from lowering its stats.",
      "Halves the Pokémon's weight."
    ],
    evolutionaryChain: [
      { name: "BELDUM", stage: 1, isMockPlaceholder: true },
      { name: "METANG", stage: 2, isMockPlaceholder: true },
      { name: "METAGROSS", stage: 3, id: 376, isCurrent: true }
    ],
    region: "Hoenn",
    isCaptured: true,
    isFavorite: true
  },
  {
    id: 384,
    indexStr: "#0384",
    name: "RAYQUAZA",
    types: ["Dragon", "Flying"],
    stats: {
      hp: 105,
      attack: 150,
      defense: 90,
      spAtk: 150,
      speed: 95,
      total: 680
    },
    description: "An ancient sky deity that has lived for hundreds of millions of years in the ozone layer. It flies infinitely through gravity, consuming meteorites to fuels its core, glowing with neon green markings.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhEF7Ut_1AgHMWEjYQLgycdpaaSaVraZkD2WrFOvaI6tWwwjXJSU5Y70L2Hw6EnnJs-vUcgdkzBrGXrBW2t_sXllSOZFHge_WyKbvpI4-iisn71Z2KuNOl1mtjzuc7ooXH1DYFe2LYf3eGzjPRxi5xe0nZYn78Jm1c3XlpR8cTtPNfe7TUrFIW0lyfZWhackzCKmiD5THs-2GmRtjbKKjA6IFDm2hGV58qOwOhZwhyu2s1q3cVij2vjbItcNqmjAwY2qiGOYITZ90",
    shinyImageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhEF7Ut_1AgHMWEjYQLgycdpaaSaVraZkD2WrFOvaI6tWwwjXJSU5Y70L2Hw6EnnJs-vUcgdkzBrGXrBW2t_sXllSOZFHge_WyKbvpI4-iisn71Z2KuNOl1mtjzuc7ooXH1DYFe2LYf3eGzjPRxi5xe0nZYn78Jm1c3XlpR8cTtPNfe7TUrFIW0lyfZWhackzCKmiD5THs-2GmRtjbKKjA6IFDm2hGV58qOwOhZwhyu2s1q3cVij2vjbItcNqmjAwY2qiGOYITZ90",
    isLegendary: true,
    height: "7.0m",
    weight: "206.5kg",
    abilities: ["Air Lock"],
    abilityDescriptions: [
      "Eliminates the effects of all weather conditions."
    ],
    evolutionaryChain: [
      { name: "RESONANCE CORE", stage: 1, isMockPlaceholder: true },
      { name: "RAYQUAZA", stage: 2, id: 384, isCurrent: true }
    ],
    region: "Hoenn",
    isCaptured: true,
    isFavorite: true
  },

  // Additional Pokémon for Johto, so all three tabs have excellent, premium data
  {
    id: 152,
    indexStr: "#0152",
    name: "CHIKORITA",
    types: ["Grass"],
    stats: {
      hp: 45,
      attack: 49,
      defense: 65,
      spAtk: 49,
      speed: 45,
      total: 318
    },
    description: "A sweet-natured Pokémon with a pale green body and a large dark green leaf on its head. It uses the leaf to sense temperature and humidity, releasing a gentle soothing fragrance in battle.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJM5_FR4cBWCgbQ_UCuuNIOHKS6F8Y50dvcheWOiV9ut3i3OxrHuAR23VGbbZV5y5CWUCyK6fYzbwWr2VjWj9TVOnMscHF2Vhtxtskpykug_mZ7dnwARvX2js7qElweE3wRhU_c2VhBbGq_-puceuhHw8oGfJhF1cc21CLD4E-MHpmg_txGAv58ugOOl_mqDj6m-zx-t33g7TJVaUEL3QidNvK7oQVwZ0M1l_mrnsrBkhWfRiFFpwXclEbSF_UaE29oswH5CvDcE", // Reuse Bulbasaur art styled as light plant
    isLegendary: false,
    height: "0.9m",
    weight: "6.4kg",
    abilities: ["Overgrow", "Leaf Guard (Hidden)"],
    abilityDescriptions: [
      "Powers up Grass-type moves when the Pokémon's HP is low.",
      "Prevents status conditions in sunny weather."
    ],
    evolutionaryChain: [
      { name: "CHIKORITA", stage: 1, id: 152, isCurrent: true },
      { name: "BAYLEEF", stage: 2, isMockPlaceholder: true },
      { name: "MEGANIUM", stage: 3, isMockPlaceholder: true }
    ],
    region: "Johto",
    isCaptured: false,
    isFavorite: false
  },
  {
    id: 155,
    indexStr: "#0155",
    name: "CYNDAQUIL",
    types: ["Fire"],
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      spAtk: 60,
      speed: 65,
      total: 309
    },
    description: "Cyndaquil protects itself by flaring flames from its back. The flames burn vigorously if the Pokémon is angry, sending strong bursts of bright fiery warmth.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNNLFpiHKdJS1IHC8UDiytWaGEJTiLEspdh9EIDqUHr6Js2QktBInzs5m5vAMmUPN_7yq2K2VoK46WkGwy5b8EoW5AgqtZ4cBN0Z4Rysqk785xVYbW5gxMK9zL08WHhy_vJBqFcmgM5HBDdHyq73577hO3MTPQOxsLYVU5w9asSKob6a8JQvGnTFUKaNc4t5zgRbegqIjUAoDmwR3MmYszJMeDY9T4-cYFpEKyPUmcveElvhS7wcmVK3UYG36RpG0l7HMqgTX0fOU", // Reuse Charizard art stylized
    isLegendary: false,
    height: "0.5m",
    weight: "7.9kg",
    abilities: ["Blaze", "Flash Fire (Hidden)"],
    abilityDescriptions: [
      "Powers up Fire-type moves when the Pokémon's HP is low.",
      "Powers up Fire-type moves if hit by one."
    ],
    evolutionaryChain: [
      { name: "CYNDAQUIL", stage: 1, id: 155, isCurrent: true },
      { name: "QUILAVA", stage: 2, isMockPlaceholder: true },
      { name: "TYPHLOSION", stage: 3, isMockPlaceholder: true }
    ],
    region: "Johto",
    isCaptured: false,
    isFavorite: false
  },
  {
    id: 249,
    indexStr: "#0249",
    name: "LUGIA",
    types: ["Psychic", "Flying"],
    stats: {
      hp: 106,
      attack: 90,
      defense: 130,
      spAtk: 90,
      speed: 110,
      total: 680
    },
    description: "The guardian of the seas. It is said to spend its life deeply sheltered in the ocean trench, as its wings are powerful enough to trigger 40-day hurricanes with a single flap.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48", // Mewtwo-like experimental aesthetic fits Lugia beautifully
    isLegendary: true,
    height: "5.2m",
    weight: "220.0kg",
    abilities: ["Pressure", "Multiscale (Hidden)"],
    abilityDescriptions: [
      "Puts pressure on the opposing Pokémon, raising their PP usage.",
      "Reduces damage taken when the Pokémon is at full HP."
    ],
    evolutionaryChain: [
      { name: "DEEP OCEAN RESIDENCE", stage: 1, isMockPlaceholder: true },
      { name: "LUGIA", stage: 2, id: 249, isCurrent: true }
    ],
    region: "Johto",
    isCaptured: true,
    isFavorite: true
  }
];

export const mockNearbyWildList: Partial<Pokemon>[] = [
  {
    id: 9,
    indexStr: "#0009",
    name: "BLASTOISE",
    types: ["Water"],
    stats: { hp: 79, attack: 83, defense: 100, spAtk: 85, speed: 78, total: 530 },
    description: "A bipedal, tortoise-like Pokémon with two water cannons protruding from its shell. Ideal for crushing heavy obstacles with high pressure hydraulic blasts.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48",
    height: "1.6m",
    weight: "85.5kg",
    abilities: ["Torrent"],
    region: "Kanto"
  },
  {
    id: 4,
    indexStr: "#0004",
    name: "CHARMANDER",
    types: ["Fire"],
    stats: { hp: 39, attack: 52, defense: 43, spAtk: 60, speed: 65, total: 309 },
    description: "The flame on its tail indicates its physical health and emotions. If the flame goes out, its lifecycle is complete.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNNLFpiHKdJS1IHC8UDiytWaGEJTiLEspdh9EIDqUHr6Js2QktBInzs5m5vAMmUPN_7yq2K2VoK46WkGwy5b8EoW5AgqtZ4cBN0Z4Rysqk785xVYbW5gxMK9zL08WHhy_vJBqFcmgM5HBDdHyq73577hO3MTPQOxsLYVU5w9asSKob6a8JQvGnTFUKaNc4t5zgRbegqIjUAoDmwR3MmYszJMeDY9T4-cYFpEKyPUmcveElvhS7wcmVK3UYG36RpG0l7HMqgTX0fOU",
    height: "0.6m",
    weight: "8.5kg",
    abilities: ["Blaze"],
    region: "Kanto"
  },
  {
    id: 143,
    indexStr: "#0143",
    name: "SNORLAX",
    types: ["Normal"],
    stats: { hp: 160, attack: 110, defense: 65, spAtk: 65, speed: 30, total: 540 },
    description: "It is not satisfied unless it eats over 400kg of food every day. When it is full, it immediately falls asleep and begins digesting.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwfXhQrr_YAAj694tC8zso5wcQkwX5uX16ERUPpxPgz0VzlvISCF3do9Gxanhuf9li6VLvaUOw5OtJvQtMvQ042pCI1cw-R9Q3N0RKYHS_WLuRuAJqi2BibgLJyjYey9yBOfQKCQ7ycTi3rGmbCXaxC6L-Uc64J6FyC-VANhkIEgEcSX9uGfolDXUhzDUgWeWPJUKPqEsrqekqBbjQE-AVi2HT26mgGsd0RF8eO7TlCAZRBBA_JYA_Mbc45qTU4Jii-3W7Kh7ZuYU",
    height: "2.1m",
    weight: "460.0kg",
    abilities: ["Immunity", "Thick Fat"],
    region: "Kanto"
  },
  {
    id: 150,
    indexStr: "#0150",
    name: "SHINY MEWTWO",
    types: ["Psychic"],
    stats: { hp: 106, attack: 110, defense: 100, spAtk: 154, speed: 130, total: 680 },
    description: "Extremely rare mutation of Mewtwo. Glowing with distinct jade-green tails and an overwhelming telepathic signal range.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48",
    height: "2.1m",
    weight: "125kg",
    abilities: ["Pressure"],
    region: "Kanto"
  },
  {
    id: 251,
    indexStr: "#0251",
    name: "CELEBI",
    types: ["Grass", "Psychic"],
    stats: { hp: 100, attack: 100, defense: 100, spAtk: 100, speed: 100, total: 600 },
    description: "An ancient guardian known as the Voice of the Forest. It is said to travel through dimensions across time itself to replenish ecosystems.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDJM5_FR4cBWCgbQ_UCuuNIOHKS6F8Y50dvcheWOiV9ut3i3OxrHuAR23VGbbZV5y5CWUCyK6fYzbwWr2VjWj9TVOnMscHF2Vhtxtskpykug_mZ7dnwARvX2js7qElweE3wRhU_c2VhBbGq_-puceuhHw8oGfJhF1cc21CLD4E-MHpmg_txGAv58ugOOl_mqDj6m-zx-t33g7TJVaUEL3QidNvK7oQVwZ0M1l_mrnsrBkhWfRiFFpwXclEbSF_UaE29oswH5CvDcE",
    height: "0.6m",
    weight: "5.0kg",
    abilities: ["Natural Cure"],
    region: "Johto"
  },
  {
    id: 250,
    indexStr: "#0250",
    name: "HO-OH",
    types: ["Fire", "Flying"],
    stats: { hp: 106, attack: 130, defense: 90, spAtk: 110, speed: 90, total: 680 },
    description: "It is said that Ho-Oh flies continuously through world skies with its magnificent rainbow wings, granting eternal happiness to trainers who capture sight of it.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNNLFpiHKdJS1IHC8UDiytWaGEJTiLEspdh9EIDqUHr6Js2QktBInzs5m5vAMmUPN_7yq2K2VoK46WkGwy5b8EoW5AgqtZ4cBN0Z4Rysqk785xVYbW5gxMK9zL08WHhy_vJBqFcmgM5HBDdHyq73577hO3MTPQOxsLYVU5w9asSKob6a8JQvGnTFUKaNc4t5zgRbegqIjUAoDmwR3MmYszJMeDY9T4-cYFpEKyPUmcveElvhS7wcmVK3UYG36RpG0l7HMqgTX0fOU",
    height: "3.8m",
    weight: "178kg",
    abilities: ["Pressure", "Regenerator"],
    region: "Johto"
  },
  {
    id: 382,
    indexStr: "#0382",
    name: "KYOGRE",
    types: ["Water"],
    stats: { hp: 100, attack: 100, defense: 90, spAtk: 150, speed: 90, total: 670 },
    description: "A titanic whale-like Pokémon of ancient lore. It is said to have expanded the oceans by bringing massive diluvial cloudbursts and torrential rainfall.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2UMZYJPJFm7r8ut0yjcCdPfyANa68006wxlOgYdHz7PRGrvVeuW6T5ym4-8R7OEph8sDP8KzPx6jqVtJMSMcZHY1YFkd-Tn1qWUK13Ecx7arA5qsA198HX5cdWuh1SXIEm1jPMB9B17t27WkTs0nQ7o6b_iCnXizQeu1n0XemfOKyBkz0lpJQ2Ja6drG44fZaMZccrMqRGpjIv5eTSS7HVvQ2ZGgvMDiHg3bfmdSGsCB3HQRIR6iR454UZ859hXmY6cssiVKO48",
    height: "4.5m",
    weight: "352kg",
    abilities: ["Drizzle"],
    region: "Hoenn"
  }
];
