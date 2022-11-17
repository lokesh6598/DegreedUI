import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'


@Injectable({  
    providedIn: 'root'  
  })  
export class AppService {

    public randomJokeApiUrl : string = "https://localhost:44342/api/DadJoke/GetRandomJokes";
    public searchRandomJokeUrl = "https://localhost:44342/api/DadJoke/GetSearchJokes";

    constructor(private httpClient: HttpClient){}

    getRandonJoke(): Observable<any> {
        return this.httpClient.get(`${this.randomJokeApiUrl}`)
    }  
    searchJokes(params): Observable<any> {
        let modifiedSearchUrl = '';       
        modifiedSearchUrl = this.searchRandomJokeUrl + '?'+"searchTerm="+params["searchTerm"]+"&limit="+params["limit"]+"&page="+params["page"];
        return this.httpClient.get(modifiedSearchUrl)
    }
}
