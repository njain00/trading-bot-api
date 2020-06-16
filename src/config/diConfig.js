import awilix from 'awilix';
import StockRepository from '../repository/stockRepository.js';
import { getLogger } from './pinoLogger.js'
import StockApiController from '../api/controllers/stockController.js'
import StockService from '../service/stockService.js';
import StockRoute from '../api/routes/stockRoute.js';

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
            logger: awilix.asValue(getLogger()),
            stockService: awilix.asClass(StockService),
            stockApiController: awilix.asClass(StockApiController),
            stockRoute: awilix.asClass(StockRoute)
        })
    }
}