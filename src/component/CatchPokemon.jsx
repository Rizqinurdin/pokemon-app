import React from 'react';
import { useLocation } from 'react-router-dom';

const CatchPokemon = (props) => {
    const selectedPokemonImage = props.selectedImagePokemon

    console.log("tester", location.state);
    console.log("hallo", selectedPokemonImage);

    return (
        <div>
            <h2>Catch Pokemon Page</h2>
            {selectedPokemonImage && (
                <img src={selectedPokemonImage} alt="Selected Pokemon" />
            )}
        </div>
    );
};

export default CatchPokemon;
