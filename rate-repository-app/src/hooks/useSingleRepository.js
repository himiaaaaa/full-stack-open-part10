import { useQuery } from "@apollo/client";
import { SINGLE_REPOSITORY } from "../graphql/queries";
import { Text } from "react-native";

const useSingleRepository = (id) => {
    const { loading, data, error } = useQuery(SINGLE_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: { id }
    })
    console.log('useSingleRepositoryid', id)

    if (loading) return <Text>Loading...</Text>;

    if (error) {
      console.log('errorre', error);
      return <Text>Error</Text>;
    }

    return { repository: data?.repository }
}

export default useSingleRepository;