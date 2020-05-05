export interface Ingredient {
    uuid: string;
    amount: number;
    measurement: string;
    name: string;
}

export interface Direction {
    instructions: string;
    optional: boolean;
}

export interface Images {
    full: string;
    medium: string;
    small: string;
}

export interface RecipeProps {
    uuid: string;
    title: string;
    description: string;
    images: Images;
    servings: number;
    prepTime: number;
    cookTime: number;
    postDate: Date;
    editDate: Date;
    ingredients: [
        Ingredient
    ];
    directions: [
        Direction
    ];
}

export interface SpecialsProps {
    uuid: string;
    ingredientId: string;
    type: string;
    title: string;
    geo?: string;
    text?: string;
}