Сервис cryptoRestAPI раз в 5 минут делает запросы на пять бирж с целью получить актуальную цену пятидесяти криптовалют, подсчитывает средние значения курсов валют по всем биржам и сохраняее все в базу данных.

Список бирж можно получить по ссылке https://intense-cove-10787.herokuapp.com/market, где {"id":999,"name":"AverageValue"} означает средние значения курсов валют.

Список валют можно получить по ссылке https://intense-cove-10787.herokuapp.com/currency.

По ссылке https://intense-cove-10787.herokuapp.com/data можно получить все данные, накопленные за время работы сервиса.

Так же есть возможность получить данные по:

- выбранной валюте, для этого необходимо передать параметр currency, присвоив ему символ выбранной валюты. Например: https://intense-cove-10787.herokuapp.com/data?currency=BTC.
- выбранной бирже или среднее значение курсов, для этого необходимо передать параметр market, присвоив ему имя биржи из списка или AverageValue. Например https://intense-cove-10787.herokuapp.com/data?market=Kucoin или https://intense-cove-10787.herokuapp.com/data?market=AverageValue.
- выбранному интервалу времени, для этого необходимо передать параметры dateMin и (или) dateMax в формате YYYY-MM-DDTHH:mm:ss Например: https://intense-cove-10787.herokuapp.com/data?dateMin=2022-08-25T11:00:00&dateMax=2022-08-25T11:25:30.

Если передать все параметры будут получены данные по выбранной валюте, выбранной бирже и интервалу времени: https://intense-cove-10787.herokuapp.com/data?market=Kucoin&currency=BTC&dateMin=2022-08-15T11:00:00&dateMax=2022-08-15T11:30:00.

[{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24273.2,"date":"2022-08-15T11:00:01.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24296.8,"date":"2022-08-15T11:05:01.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24281.6,"date":"2022-08-15T11:10:00.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24240.4,"date":"2022-08-15T11:15:01.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24237.9,"date":"2022-08-15T11:20:01.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24173.5,"date":"2022-08-15T11:25:01.000Z"},{"currencySymbol":"BTC","marketName":"Kucoin","price_usd":24191.1,"date":"2022-08-15T11:30:01.000Z"}]

Время указано во временной зоне UTC.
