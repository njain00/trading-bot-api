'use strict';

export default class CandlestickService
{
    constructor({ candlestickRepository })
    {
        this.candlestickRepository = candlestickRepository;
    }

    async postCandlestickAnalysis(candlestickAnalysis)
    {
        await this.candlestickRepository.postCandlestickAnalysis(candlestickAnalysis);
    }
}