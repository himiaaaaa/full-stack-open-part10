import React from "react";
import { View, StyleSheet, Image, Pressable, Text as ButtonText } from "react-native";
import Text from './Text'
import theme from "../theme";


const CardHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    avatarContainer: {
        flexGrow: 0,
        paddingLeft: 15,
        paddingTop: 20
    },
    infoContainer: {
        flexGrow: 1,
        padding: 15,
    },
    description: {
        fontSize: theme.fontSizes.body,
        padding: 5,
        marginRight: 5,
        color: theme.colors.textSecondary
    },
    language: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textThird,
        padding: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4169e1',
        padding: 10,
        margin: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
});

const CardHeader = ({fullName, description, language, url}) => {
    return (
        <View style={CardHeaderStyles.container}>
            <View style={CardHeaderStyles.avatarContainer}>
                <Image style={CardHeaderStyles.avatar} source={{uri: url}}/>
            </View>
            <View style={CardHeaderStyles.infoContainer}>
                <Text fontSize='heading' fontWeight='bold' padding='normal'>{fullName}</Text>
                <Text style={CardHeaderStyles.description}>{description}</Text>
                <Text style={CardHeaderStyles.language}>{language}</Text>
            </View>
        </View>
    )
}

const CardBodyStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-around',
        padding: 5
    },
    align: {
        alignItems: 'center'
    }
})

const overThousand = (number) => {
   return number > 1000 ? `${Math.round(number / 100) / 10} k` : number
}

const CardBody = ({stars, forks, reviews, rating}) => {
    return (
        <View style={CardBodyStyles.container}>
            <View style={CardBodyStyles.align}>
               <Text fontWeight='bold'>{overThousand(stars)}</Text> 
               <Text padding='normal' color='textSecondary'>Stars</Text> 
            </View>
            <View style={CardBodyStyles.align}>
                <Text fontWeight='bold'>{overThousand(forks)}</Text>
                <Text padding='normal' color='textSecondary'>Forks</Text>
            </View>
            <View style={CardBodyStyles.align}>
                <Text fontWeight='bold'>{overThousand(reviews)}</Text>
                <Text padding='normal' color='textSecondary'>Reviews</Text>
            </View>
            <View style={CardBodyStyles.align}>
                <Text fontWeight='bold'>{overThousand(rating)}</Text>
                <Text padding='normal' color='textSecondary'>Rating</Text>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    }
})

const RepositoryItem = ({ fullName, description, language, url, stars, forks, reviews, rating, singleView, pressHandle}) => (
       <View testID="repositoryItem" style={styles.container}>
          <CardHeader fullName={fullName} description={description} language={language} url={url}/>
          <CardBody stars={stars} forks={forks} reviews={reviews} rating={rating} />
          { singleView ?
            <Pressable style={CardHeaderStyles.button} onPress={pressHandle}>
                <ButtonText style={CardHeaderStyles.buttonText}>Open in Github</ButtonText>
            </Pressable>
            :
            null
          }
      </View>   
)

export default RepositoryItem;
