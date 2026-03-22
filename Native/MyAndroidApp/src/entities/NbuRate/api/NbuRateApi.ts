import INbuRate from "../model/INbuRate";

export default class NbuRateApi
{
    static getCurrentRates():Promise<Array<INbuRate>> 
    {
        return new Promise((resolve, reject) => 
        {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
    static getCurrentRatesToDate(date: Date):Promise<Array<INbuRate>>
    {
        let year = date.getFullYear();
        let month = String(date.getMonth() + 1).padStart(2, '0');
        let day = String(date.getDate()).padStart(2, '0');

        return new Promise((resolve, reject) =>
        {
            fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${year}${month}${day}&json`)
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
}