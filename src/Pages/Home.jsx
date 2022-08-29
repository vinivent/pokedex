import axios from 'axios';
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import NavBar from '../Components/NavBar';
import PokemonCard from '../Components/PokemonCard';
import React, { useEffect, useState } from 'react';
import { Skeletons } from '../Components/Skeletons';

import "./styles.css";

export const Home = () => {
    const [pokemons, setPokemon] = useState([]);
    useEffect(() => {
        getPokemon()
    }, []);

    const getPokemon = () => {
        var endpoints = []
        for (var i = 1; i < 200; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
        }
        axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemon(res)).catch((err) => console.log(err));
    };

    const pokemonFilter = (name) => {
        name = name.toLowerCase()
        var filterPokemons = []
        if (name === "") {
            getPokemon();
        }
        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filterPokemons.push(pokemons[i]);
            }
        }
        setPokemon(filterPokemons);
    }

    return (
        <div className="container">
            <NavBar pokemonFilter={pokemonFilter} />
            <Container maxWidth="false">
                <Grid container spacing={3}>
                    {pokemons.length === 0 ? <Skeletons /> :
                        pokemons.map((pokemon, key) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={key}>
                            <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types} />
                        </Grid>))}


                </Grid>


            </Container>
        </div>

    )
}
