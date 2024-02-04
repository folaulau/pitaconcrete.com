/* ProjectTag.js */
export const ResidentialTagList = [
    "Concrete Foundations",
    "Retaining Walls",
    "Concrete Paving",
    "Demolition and Haul Off",
    "Sidewalks",
    "Driveways",
    "Walkways",
    "Custom Concrete",
    "Concrete Patching and Overlay",
    "Pools",
    "Porches",
    "Patios",
    "Fire Pits and Places",
    "Grill Stations",
    "Interior Stamped Concrete",
    "Interior Concrete Stain"
]

export const CommercialTagList = [
    "Concrete Foundations",
    "Concrete Paving",
    "Tilt Wall Construction",
    "Retaining Walls",
    "Culverts",
    "Pavers",
    "Slab on Grade",
    "Flat Work",
    "Curp and Gutter",
    "Walkways",
    "Ramps",
    "Breach Pouring",
    "K-Rail Pouring",
    "White Paving"
]

export const AllTagList = [...new Set([...ResidentialTagList, ...CommercialTagList])];