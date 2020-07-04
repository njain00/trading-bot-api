'use strict';

export default class CandlestickController {

    constructor({ logger, candlestickService })
    {
        this.logger = logger;
        this.candlestickService = candlestickService;
    }

    async postCandlestickAnalysis(analysis, response) {
        try
        {
            await this.candlestickService.postCandlestickAnalysis(analysis);
            response.status(201).send("Request processed successfully");
        }
        catch (ex)
        {
            this.logger.error(ex);
            response.status(500).send({ error: 'Internal error when posting analysis'});
        }
    }
}

