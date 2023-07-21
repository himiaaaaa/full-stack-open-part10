import { StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useSingleRepository from '../hooks/useSingleRepository';
import { useParams } from 'react-router-native';

import * as Linking from 'expo-linking';
import { FlatList, View, Text } from 'react-native';
import { format } from 'date-fns';

import theme from '../theme';

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

const RepositoryInfo = ({ repository }) => {

    const pressHandle = () => Linking.openURL(repository.url)

    return (
        <>
            <RepositoryItem 
                fullName={repository?.fullName}
                description={repository?.description}
                language={repository?.language}
                stars={repository?.stargazersCount}
                forks={repository?.forksCount}
                reviews={repository?.reviewCount}
                rating={repository?.ratingAverage}
                url={repository?.ownerAvatarUrl}
                singleView={true}
                pressHandle={pressHandle}
            />
        </>
    )
  };

const ItemSeparator = () => <View style={styles.separator} />;


  
const ReviewItem = ({ review }) => {
    console.log('review', review)
    const time = format(new Date(review.createdAt), 'dd.MM.yyyy')

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{review.rating}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{review.user.username}</Text>
                <Text style={styles.date}>{time}</Text>
                <Text style={styles.description}>{review.text}</Text>
            </View>
        </View>
    )
};

const singleRepository = () => {
  const {id} = useParams();
  const {repository} = useSingleRepository(id);

  console.log('singleRepositoryId', id)

  const reviews = repository
    ? repository.reviews.edges.map(edge => edge.node) 
    : null

  return (
    <>  
        <FlatList 
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item}/> }
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryInfo repository={repository}/>}
        />
    </>
  );
};

export default singleRepository;