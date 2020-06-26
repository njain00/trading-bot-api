import StockService from '../../service/stockService.js'

describe('getAllStockUsers', () => {
    test('should return empty array when repo call returns empty array', async () => {
        // Arrange
        var stockRepository = {
            getAllStockUsers: () => {
                return [];
            }
        }
        var logger = null;
        var expectedStockWithUsers = [];

        var stockService = new StockService({ logger, stockRepository });

        // Act
        var actualStockWithUsers = await stockService.getAllStockUsers();

        // Assert
        expect(actualStockWithUsers).toStrictEqual(expectedStockWithUsers);
    });

    test('should return one stock object with one user array when repo call returns only one stock with one user record', async () => {
        // Arrange
        var stockRepository = {
            getAllStockUsers: () => {
                return [{
                    Ticker: 'MSFT',
                    CompanyName: 'Microsoft Corporation',
                    FirstName: 'Test',
                    LastName: 'McTest',
                    EmailAddress: 'test@tester.com'
                }];
            }
        }
        var logger = null;
        var expectedStockWithUsers = [{
            ticker: 'MSFT',
            companyName: 'Microsoft Corporation',
            users: [{
                    firstName: 'Test',
                    lastName: 'McTest',
                    emailAddress: 'test@tester.com'
                }]
        }];

        var stockService = new StockService({ logger, stockRepository });

        // Act
        var actualStockWithUsers = await stockService.getAllStockUsers();

        // Assert
        expect(actualStockWithUsers).toStrictEqual(expectedStockWithUsers);
    });

    test('should return one stock object with array of two users when repo call returns two records of same stock', async () => {
        // Arrange
        var stockRepository = {
            getAllStockUsers: () => {
                return [{
                    Ticker: 'MSFT',
                    CompanyName: 'Microsoft Corporation',
                    FirstName: 'Test',
                    LastName: 'McTest',
                    EmailAddress: 'test@tester.com'
                },
                {
                    Ticker: 'MSFT',
                    CompanyName: 'Microsoft Corporation',
                    FirstName: 'Nishant',
                    LastName: 'Jain',
                    EmailAddress: 'nishant@jain.com'
                }];
            }
        }
        var logger = null;
        var expectedStockWithUsers = [{
            ticker: 'MSFT',
            companyName: 'Microsoft Corporation',
            users: [{
                        firstName: 'Test',
                        lastName: 'McTest',
                        emailAddress: 'test@tester.com'
                    },
                    {
                        firstName: 'Nishant',
                        lastName: 'Jain',
                        emailAddress: 'nishant@jain.com'
                    }
            ]
        }];

        var stockService = new StockService({ logger, stockRepository });

        // Act
        var actualStockWithUsers = await stockService.getAllStockUsers();

        // Assert
        expect(actualStockWithUsers).toStrictEqual(expectedStockWithUsers);
    });

    test('should return array of two stocks with one user each when repo call returns two different stocks', async () => {
        // Arrange
        var stockRepository = {
            getAllStockUsers: () => {
                return [{
                    Ticker: 'MSFT',
                    CompanyName: 'Microsoft Corporation',
                    FirstName: 'Test',
                    LastName: 'McTest',
                    EmailAddress: 'test@tester.com'
                },
                {
                    Ticker: 'AMZN',
                    CompanyName: 'Amazon',
                    FirstName: 'Nishant',
                    LastName: 'Jain',
                    EmailAddress: 'nishant@jain.com'
                }];
            }
        }
        var logger = null;
        var expectedStockWithUsers = [{
            ticker: 'MSFT',
            companyName: 'Microsoft Corporation',
            users: [{
                        firstName: 'Test',
                        lastName: 'McTest',
                        emailAddress: 'test@tester.com'
                    }]
        },
        {
            ticker: 'AMZN',
            companyName: 'Amazon',
            users: [{
                        firstName: 'Nishant',
                        lastName: 'Jain',
                        emailAddress: 'nishant@jain.com'
                    }]
        }];

        var stockService = new StockService({ logger, stockRepository });

        // Act
        var actualStockWithUsers = await stockService.getAllStockUsers();

        // Assert
        expect(actualStockWithUsers).toStrictEqual(expectedStockWithUsers);
    });

    test('should return array of two stocks with one user each when repo call returns two different stocks with same user', async () => {
        // Arrange
        var stockRepository = {
            getAllStockUsers: () => {
                return [{
                    Ticker: 'MSFT',
                    CompanyName: 'Microsoft Corporation',
                    FirstName: 'Test',
                    LastName: 'McTest',
                    EmailAddress: 'test@tester.com'
                },
                {
                    Ticker: 'AMZN',
                    CompanyName: 'Amazon',
                    FirstName: 'Test',
                    LastName: 'McTest',
                    EmailAddress: 'test@tester.com'
                }];
            }
        }
        var logger = null;
        var expectedStockWithUsers = [{
            ticker: 'MSFT',
            companyName: 'Microsoft Corporation',
            users: [{
                        firstName: 'Test',
                        lastName: 'McTest',
                        emailAddress: 'test@tester.com'
                    }]
        },
        {
            ticker: 'AMZN',
            companyName: 'Amazon',
            users: [{
                        firstName: 'Test',
                        lastName: 'McTest',
                        emailAddress: 'test@tester.com'
                    }]
        }];

        var stockService = new StockService({ logger, stockRepository });

        // Act
        var actualStockWithUsers = await stockService.getAllStockUsers();

        // Assert
        expect(actualStockWithUsers).toStrictEqual(expectedStockWithUsers);
    });
});

describe('postCandlestickData', () => {
    test('should post candlestick data on a ticker that already exists in the database', async () => {
        // Arrange
        var stockRepository = {
            getStockTicker: () => {
                return 'MSFT';
            },
            postStockMetadata: () => {},
            postCandlestickData: () => {}
        }
        var logger = null;
        var stockService = new StockService({ logger, stockRepository });
        var stockData = { ticker:'MSFT' }

        // Act
        await stockService.postCandlestickData(stockData);

        // Assert
        // TODO: Mock functions and measure how many times they have been as the verification
    });
});