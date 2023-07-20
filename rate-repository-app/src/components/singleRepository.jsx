
import RepositoryItem from './RepositoryItem';
import useSingleRepository from '../hooks/useSingleRepository';
import { useParams } from 'react-router-native';

import * as Linking from 'expo-linking';



const singleRepository = () => {
  const {id} = useParams();
  const {repository} = useSingleRepository(id);

  console.log('singleRepositoryId', id)

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
  );
};

export default singleRepository;