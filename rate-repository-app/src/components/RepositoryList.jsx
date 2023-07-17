import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories} = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => 
        <RepositoryItem 
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            stars={item.stargazersCount}
            forks={item.forksCount}
            reviews={item.reviewCount}
            rating={item.ratingAverage}
            url={item.ownerAvatarUrl}
        />}
    />
  );
};

export default RepositoryList;