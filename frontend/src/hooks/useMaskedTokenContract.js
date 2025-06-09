import {useReadContract, useWriteContract} from 'wagmi';
import { maskedTokenAddress } from '../utils/constants';
import { maskedTokenAbi } from '../utils/abis';

export const useMaskedTokenContract = () => {
    const read = {
        address: maskedTokenAddress,
        abi: maskedTokenAbi,
    }

    read.balanceOf = (args) => ({
        address: maskedTokenAddress,
        abi: maskedTokenAbi,
        functionName: 'balanceOf',
        args: args,
        query: {enabled: !!args[0]}
    }).data;

    read.allowance = (args) => ({
        address: maskedTokenAddress,
        abi: maskedTokenAbi,
        functionName: 'allowance',
        args: args,
        query: {enabled: !!args[0] && !!args[1]}
    }).data;


    const {writeContract, data, isPending, isSuccess, error} = useWriteContract();


    const write = {
        writeContract,
        data,
        isPending,
        isSuccess,
        error,

        buyToken: (value) => writeContract({
            address: maskedTokenAddress,
            abi: maskedTokenAbi,
            functionName: 'buyTokens',
            value: value
        }),

        mint: (args) => writeContract({
            address: maskedTokenAddress,
            abi: maskedTokenAbi,
            functionName: 'mint',
            args: args
        }),

        approve: (args) => writeContract({
            address: maskedTokenAddress,
            abi: maskedTokenAbi,
            functionName: 'approve',
            args: args
        }),
    }

    return {read, write};

}