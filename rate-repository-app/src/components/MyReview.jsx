import { Text, View, Pressable, Alert } from "react-native"
import { FlatList, StyleSheet } from "react-native"
import theme from "../theme"
import { format } from "date-fns"
import useMeReview from "../hooks/useMeReview"
import { useNavigate } from "react-router-native"
import useDeleteReview from "../hooks/useDeleteReview"

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
    },
    buttonBackGround: {
        backgroundColor: 'white'
    },
    button: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    blueButton: {
        backgroundColor: '#4169e1',
        padding: 10
    },
    redButton: {
        backgroundColor: '#d73a4a',
        padding: 10
    },
    buttonText: {
        color: 'white'
    }
})

const ItemSeparator = () => <View style={styles.separator} />;

const MeReviewItem = ({ review, refetch }) => {
    console.log('myreviewitem', review)
    const [ deleteReview ] = useDeleteReview()
 
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')

    const navigate = useNavigate()

    const handleDelete = () => {
        Alert.alert(
            'Delete Review',
            'Are you sure you want to delete this review?',
            [
              {
                text: 'Cancel',
                onPress: () => Alert.alert('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: async() => {
                    await deleteReview({id: review.id})
                    await refetch()
                },
                style: 'delete',
              },
            ],
            {
              cancelable: true,
              onDismiss: () =>
                Alert.alert(
                  'This alert was dismissed by tapping outside of the alert dialog.',
                ),
            },
        )
    }

    return (
       <>
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
        <View style={styles.buttonBackGround}>
            <View style={styles.button}>
                <Pressable style={styles.blueButton} onPress={() => navigate(`/${review.repositoryId}`)}>
                    <Text style={styles.buttonText}>View repository</Text>
                </Pressable>
                <Pressable style={styles.redButton} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete review</Text>
                </Pressable>
            </View>
            
        </View>
    </>
    ) 
}

const MyReview = () => {
    const { reviews, refetch } = useMeReview()

    console.log('myreviewme', reviews)

    const myReviews = reviews
        ? reviews.edges.map(edge => edge.node)
        : null

    return(
        <>
            <FlatList 
                data={myReviews}
                renderItem={({item}) => <MeReviewItem review={item} refetch={refetch}/>}
                ItemSeparatorComponent={ItemSeparator}
            />
        </>
    )
}

export default MyReview;