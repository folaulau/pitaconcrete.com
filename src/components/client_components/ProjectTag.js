
export const ResidentialTagList = [
    "Concrete Foundations",
    "Retaining Walls",
    "Concrete Paving",
    "Sidewalks",
    "Demolition and Haul Off",
    "Driveways",
    "Concrete Patching",
    "Concrete Overlay",
    "Concrete Curving for Driveway",
    "Pools",
    "Concrete Water Features",
    "Porches",
    "Walkways",
    "Patios",
    "Fire pits and Fire places",
    "Grill Stations",
    "Custom Concrete",
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
    "Piers",
    "Flat work",
    "Curp and gutter",
    "City walkways",
    "City ADA Ramps",
    "Breach pouring",
    "K-rail pouring",
    "White paving"
]

export const AllTagList = [...new Set([...ResidentialTagList, ...CommercialTagList])];