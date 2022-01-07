import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { PokemonFull } from '../interfaces/pokemon.interfaces';
import { FadeInImage } from './FadeInImage';

interface Props {
    pokemon: PokemonFull
}

const PokemonDetails = ({ pokemon }: Props) => {
    return (
        <ScrollView
            style={{
                ...StyleSheet.absoluteFillObject
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* types y peso */}
            <View
                style={{
                    ...styles.container,
                    marginTop: 370
                }}
            >
                <Text style={styles.title}>Types</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.types.map(({ type }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={type.name}
                            >
                                {type.name}
                            </Text>
                        ))
                    }
                </View>

                <Text style={styles.title}>Peso</Text>
                <Text style={styles.regularText}>{pokemon.weight} Kg</Text>
            </View>

            {/* Sprites */}
            <View style={styles.container}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_shiny}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.front_default}
                    style={styles.basicSprite}
                />
                <FadeInImage
                    uri={pokemon.sprites.back_default}
                    style={styles.basicSprite}
                />
            </ScrollView>

            {/* Base abilities */}
            <View style={styles.container}>
                <Text style={styles.title}>Base Abilities</Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={ability.name}
                            >
                                {ability.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Movements */}
            <View style={styles.container}>
                <Text style={styles.title}>Movements</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        pokemon.moves.map(({ move }) => (
                            <Text
                                style={{
                                    ...styles.regularText,
                                    marginRight: 10
                                }}
                                key={move.name}
                            >
                                {move.name}
                            </Text>
                        ))
                    }
                </View>
            </View>

            {/* Stats */}
            <View style={styles.container}>
                <Text style={styles.title}>Stats</Text>
                <View style={{}}>
                    {
                        pokemon.stats.map((stat, i) => (
                            <View
                                key={stat.stat.name + i}
                                style={{ flexDirection: 'row' }}
                            >
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        marginRight: 10,
                                        width: 150
                                    }}
                                >
                                    {stat.stat.name}
                                </Text>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        fontWeight: 'bold'
                                    }}
                                >
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                {/* Final Sprite */}
                <View
                    style={{
                        marginBottom: 20,
                        alignItems: 'center'
                    }}
                >
                    <FadeInImage
                        uri={pokemon.sprites.front_shiny}
                        style={styles.basicSprite}
                    />
                </View>
            </View>

        </ScrollView>
    )
}

export default PokemonDetails

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 100,
        height: 100
    }
})
