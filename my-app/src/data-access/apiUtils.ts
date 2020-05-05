export const baseUrl = 'http://localhost:3001';

export const getRecipes = () => {
    return fetch(`${baseUrl}/recipes`).then((response => response.json()));
}

export const getSpecials = () => {
    return fetch(`${baseUrl}/specials`).then((response => response.json()));
}