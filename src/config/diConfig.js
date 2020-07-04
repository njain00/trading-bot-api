import awilix from 'awilix';
import StockRepository from '../repository/stockRepository.js';
import CandlestickRepository from '../repository/candlestickRepository.js'
import { getLogger } from './pinoLogger.js'
import StockApiController from '../api/controllers/stockController.js'
import CandlestickController from '../api/controllers/candlestickController.js'
import StockService from '../service/stockService.js';
import CandlestickService from '../service/candlestickService.js'
import StockRoute from '../api/routes/stockRoute.js';
import CandlestickRoute from '../api/routes/candlestickRoute.js'

export default class diConfig {

    InitializeDI() {
        
        const container = awilix.createContainer({
            injectionMode: awilix.InjectionMode.PROXY
        });

        this.RegisterContainer(container);

        return container;
    }

    RegisterContainer(container) {
        container.register({
            stockRepository: awilix.asClass(StockRepository),
            candlestickRepository: awilix.asClass(CandlestickRepository),
            logger: awilix.asValue(getLogger()),
            stockService: awilix.asClass(StockService),
            candlestickService: awilix.asClass(CandlestickService),
            stockApiController: awilix.asClass(StockApiController),
            candlestickController: awilix.asClass(CandlestickController),
            stockRoute: awilix.asClass(StockRoute),
            candlestickRoute: awilix.asClass(CandlestickRoute)
        })
    }
}