import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const useMe = () => {
    const { loading, data } = useQuery(ME, {
        fetchPolicy: 'cache-and-network',
    });

    if (loading) return <div>Loading...</div>;

    console.log('me', data)

    return { me: data?.me };
};

export default useMe;