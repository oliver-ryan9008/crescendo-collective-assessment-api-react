# Crescendo Collective - Frontend Skill Test

## Goals

For this javascript project we've provided a recipe API with two endpoints. With this API you'll need to complete the following objectives.

- Pull the data from the API
- Create a list view which includes all the recipes
- Create a recipe detail view to display each recipe
- Ingredients with a matching `ingredientId` listed in the specials response should also show the special `title`, `type` and `text` under the ingredient name
- _Bonus:_ Create a view to add and update recipes or specials. Image upload not required. Both endpoints support GET, POST and PATCH.

This project includes a API server (json-server) for you to use. To install and run, use the commands below:

- `npm i`
- `npm run start:api`

Once running, you can use the API endpoints listed in the following section from `http://localhost:3001`. More information about querying the server can be found on the [json-server github page](https://github.com/typicode/json-server).

#### Endpoints & Schema

##### GET `/recipes`

```JSON
[
  Recipe {
    uuid: String
    title: String
    description: String
    images: {
      full: String
      medium: String,
      small: String
    }
    servings: Number
    prepTime: Number
    cookTime: Number
    postDate: Date
    editDate: Date
    ingredients: [
      Ingredient {
        uuid: String
        amount: Number
        measurement: String
        name: String
      }
    ]
    directions: [
      Direction {
        instructions: String
        optional: Boolean
      }
    ]
  }
]
```

##### GET `/specials`

Specials on ingredients

```json
[
  Special {
    uuid: String
    ingredientId: String
    type: String
    title: String
    geo: String (optional)
    text: String (optional)
  }
]
```
