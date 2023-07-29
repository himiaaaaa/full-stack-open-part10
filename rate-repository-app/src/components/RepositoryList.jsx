import { FlatList, View, StyleSheet } from 'react-native';
import React,{ useState } from 'react';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Link } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    color: 'white',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, order, setOrder, onEndReach }) => {
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => 
          <Link to={`/${item.id}`}>
            <RepositoryItem 
                fullName={item.fullName}
                description={item.description}
                language={item.language}
                stars={item.stargazersCount}
                forks={item.forksCount}
                reviews={item.reviewCount}
                rating={item.ratingAverage}
                url={item.ownerAvatarUrl}
            />
          </Link>
          }
        ListHeaderComponent={() => (
          <Picker
            style={styles.picker}
            selectedValue={order}
            onValueChange={(itemValue) =>
              setOrder(itemValue)
            }
          >
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item label="Higest rated repositories" value="highestRated" />
            <Picker.Item label="Lowest rated repositories" value="lowestRated" />
          </Picker>
        )}  
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
}

const RepositoryList = () => {
  const [ order, setOrder ] = useState('latest');
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ searchKeyword ] = useDebounce(searchQuery, 1000);

  const onChangeSearch = query => setSearchQuery(query)

  let orderBy;
  let orderDirection;
  let first;

  switch(order){
    case 'latest':
    
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC'; 
      first = 4;
      break;

    case 'highestRated':

      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      first = 4;
      break;

    case 'lowestRated':

      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      first = 4;
      break;
      
    }
  
  const { repositories, fetchMore } = useRepositories(
      orderBy, 
      orderDirection, 
      searchKeyword,  
      first,
  );


  console.log('repositoryListFilter', orderBy, orderDirection, order, searchKeyword, first)

  const onEndReach = () => { 
    fetchMore();
  }

  return (
    <>
        <Searchbar 
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
       <RepositoryListContainer 
          repositories={repositories} 
          order={order} 
          setOrder={setOrder}
          onEndReach={onEndReach}
        />
    </>
   
  );
};

export default RepositoryList;