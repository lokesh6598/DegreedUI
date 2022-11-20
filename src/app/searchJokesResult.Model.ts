import { RandomJokeModel } from "./randomJoke.Model";

export class SearchJokesModel extends RandomJokeModel{
    currentPage: string;
    limit:number;
    nextPage:Number;
    previousPage:number;
    result:RandomJokeModel[];
    searchTerm:string;
    totalJokes:number;   
}