import * as React from 'react';
import * as apiUtils from '../../data-access/apiUtils';
import Grid from '@material-ui/core/Grid';
import { RecipeProps, SpecialsProps, Ingredient } from './Home.d';
import Recipe from '../Recipe/Recipe';

class Home extends React.Component {
    state = {
        recipeResults: [],
        specialsResults: []
    };

    componentDidMount() {
        apiUtils.getRecipes()
            .then(recipes => {
                const results: RecipeProps[] = recipes.map((result: RecipeProps) => {
                    return result;
                });
                this.setState({ recipeResults: results });
            });
        
        apiUtils.getSpecials()
            .then(specials => {
                const results: SpecialsProps[] = specials.map((result: SpecialsProps) => {
                    return result;
                });
                this.setState({ specialsResults: results });
            });
    }

    getMatchingSpecials = (ingredientId: string) => {
        const { specialsResults } = this.state;
        const matchList: SpecialsProps[] = [];

        specialsResults.map((special: SpecialsProps) => {
            if (special.ingredientId === ingredientId) {
                matchList.push(special);
            }
        });

        return matchList;
    }

    renderRecipes = () => {
        const { recipeResults } = this.state;

        const recipes = recipeResults.map((recipeProps: RecipeProps) => {
            const matchingSpecials: SpecialsProps[] = [];
            
            recipeProps.ingredients.map((ingredient: Ingredient) => {
                const matches = this.getMatchingSpecials(ingredient.uuid);
                if (matches && matches.length > 0) {
                    matches.map((special: SpecialsProps) => {
                        matchingSpecials.push(special);
                    });
                }
            });

            return <Recipe matchingSpecials={matchingSpecials} {...recipeProps} key={recipeProps.uuid} />;
        });

        return recipes;
    }

    render() {
        return (
            <Grid container>
                {this.renderRecipes()}
            </Grid>
        );
    }
}

export default Home;