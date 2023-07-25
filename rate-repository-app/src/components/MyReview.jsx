import { Text, View } from "react-native"
import { FlatList, StyleSheet } from "react-native"
import theme from "../theme"
import { format } from "date-fns"
import useMeReview from "../hooks/useMeReview"

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexGrow: 1,
        backgroundColor: 'white',
    },
    separator: {
        height: 10,
    },
    avatarContainer: {
        flexGrow: 0,
        paddingLeft: 15,
        paddingTop: 20,
    },
    infoContainer: {
        flexGrow: 1,
        padding: 15,
    },
    avatar: {
        color: '#4169e1',
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#4169e1'
    },
    name: {
        fontSize: 18,
        fontWeight: '700',
        padding: 5
    },
    date: {
        fontSize: theme.fontSizes.body,
        padding: 5,
        marginRight: 5,
        color: theme.colors.textSecondary
    },
    description: {
        padding: 5,
        marginRight: 60
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const MeReviewItem = ({ review }) => {
    console.log('myreviewitem', review)
 
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')

    return (
       
         <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{review.rating}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{review.repository.fullName}</Text>
                <Text style={styles.date}>{time}</Text>
                <Text style={styles.description}>{review.text}</Text>
            </View>
        </View> 
    ) 
}

const MyReview = () => {
    const { reviews } = useMeReview()

    console.log('myreviewme', reviews)

    const myReviews = reviews
        ? reviews.edges.map(edge => edge.node)
        : null

    return(
        <>
            <FlatList 
                data={myReviews}
                renderItem={({item}) => <MeReviewItem review={item} />}
                ItemSeparatorComponent={ItemSeparator}
            />
        </>
    )
}

export default MyReview;