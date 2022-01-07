import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemon.interfaces';
import { FadeInImage } from './FadeInImage';

const windowWidth = Dimensions.get('window').width

interface Props {
    pokemon: SimplePokemon;
}

const PokemonCard = ({ pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('gray');
    const isMounted = useRef(true);
    const navigation = useNavigation<any>()

    useEffect(() => {
        const uri = pokemon.picture;
        ImageColors.getColors(uri, { fallback: 'gray' })
            .then((result) => {
                if(!isMounted.current) return
                switch (result.platform) {
                    case 'android':
                        setBgColor(result.dominant || 'gray');
                        break;
                    case 'ios':
                        setBgColor(result.background || 'gray');
                        break;
                    default:
                        break;
                }
            })
        return () => {
            isMounted.current = false
        }
    }, [])

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('PokemonScreen', {
                simplePokemon: pokemon,
                color: bgColor
            })}
        >
            <View style={{
                ...styles.cardContainer,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}>
                <View>
                    <Text style={styles.name}>
                        {pokemon.name}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokebolaContainer}>
                    <Image
                        source={require('../assets/pokebola-blanca.png')}
                        style={styles.pokebola}
                    />
                </View>
                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>
        </TouchableOpacity>
    )
}


export default PokemonCard

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokebola: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -20,
        bottom: -20,
        overflow: 'hidden'
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokebolaContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        overflow: 'hidden',
        opacity: 0.5
    }
})
