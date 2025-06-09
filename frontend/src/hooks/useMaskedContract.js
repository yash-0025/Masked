import {useReadContract , useWriteContract} from 'wagmi';
import {maskedAddress, maskedTokenAddress} from '../utils/constants'
import { maskedAbi, maskedTokenAbi } from '../utils/abis';


export const useMaskedContract = () => {
    const read = {
        address: maskedAddress,
        abi: maskedAbi,
    };

    read.usernames = (args) => useReadContract({
        address: maskedAddress,
        abi: maskedAbi,
        functionName: 'usernames',
        args: args,
        query: {enabled: !!args[0]}
    }).data;

    read.isRegistered = (args) => useReadContract({
        address: maskedAddress,
        abi: maskedAbi,
        functionName: 'isRegistered',
        args: args,
        query: {enabled: !!args[0]}
    }).data;

    read.getPostsCount = () => useReadContract9({
        address: maskedAddress,
        abi: maskedAbi,
        functionName:'getPostsCount',
    }).data;

    read.getPost = (args) => ({
        address: maskedAddress,
        abi: maskedAbi,
        functionName: 'getPost',
        args : args,
        query: {enabled: !!args[0] || args[0] === 0n}
    }).data;

    read.getFriends = (args) => ({
        address: maskedAddress,
        abi: maskedAbi,
        functionName: 'getFriends',
        args: args,
        query: {enabled: !!args[0]}
    }).data


    const {writeContract , data, isPending, isSuccess, error} = useWriteContract();

    const write = {
        writeContract,
        data,
        isPending,
        isSuccess,
        error,

        register: (args) => writeContract({
            address: maskedAddress,
            abi: maskedAbi,
            functionName: 'register',
            args: args
        }),

        createPost: (args) => writeContract({
            address: maskedAddress,
            abi: maskedAbi,
            functionName: 'createPost',
            args: args
        }),

        sendFriendRequest: (args) => writeContract({
            address: maskedAddress,
            abi: maskedAbi,
            functionName: 'sendFriendRequest',
            args: args
        }),

        acceptFriendRequest: (args) => writeContract({
            address: maskedAddress,
            abi: maskedAbi,
            functionName: 'acceptFriendRequest',
            args:args
        }),

        removeFriend: (args) => writeContract({
            address: maskedAddress,
            abi: maskedAbi,
            functionName: 'removeFriend',
            args: args
        }),


        maskedToken: {
            transferFrom: (args) => writeContract({
                address: maskedTokenAddress,
                abi: maskedTokenAbi,
                functionName: 'maskedToken.transferFrom',
                args:args
            }),
        }
    }

    return {read, write};

}