import { Component } from '@angular/core';
import {AppService} from './app.service';
import {RandomJokeModel} from './randomJoke.Model';
import {SearchJokesModel}from './searchJokesResult.Model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'degreedUI';
  randomJokeModel : RandomJokeModel;
  searchJokesModel : SearchJokesModel;  
  backupSearchJokesModel : SearchJokesModel;  
  searchWord:string;
  limit:number;
  page:number;
  isDataNotFound : boolean = true;
  showError:boolean=false;

  constructor(private appService:AppService){
    this.randomJokeModel = new RandomJokeModel();
    this.searchJokesModel = new SearchJokesModel();
    this.limit = 30;
    this.page = 1;
  }

  public getRandomJoke(){   
    this.appService.getRandonJoke().subscribe((res)=>{
      let result = res;
      if(res.statusCode == 200){
        this.randomJokeModel = res.result      
      }      
    });
  }
  public searchJokes()
  {
      var param = null;
      if(this.searchWord == undefined){
        this.searchWord = "";
      }
      let params = {"searchTerm":this.searchWord,"limit":this.limit,"page":this.page}
      this.appService.searchJokes(params).subscribe((res)=>{
      let result = res;
      if(res.statusCode == 200){
        this.searchJokesModel = res.result
        this.backupSearchJokesModel = Object.assign({}, res.result);
        this.isDataNotFound = false;           
      }
      else{
        this.showError = true;
        this.isDataNotFound = true;   
      }
    });
  }
  public ShortJokes(){
    this.searchJokesModel.result = this.backupSearchJokesModel.result.filter(x=>x.numberOfWords <=10);
  }
  public MediumJokes(){
    this.searchJokesModel.result = this.backupSearchJokesModel.result.filter(x=>x.numberOfWords >10 && x.numberOfWords <20);   
  }
  public LargeJokes(){
    this.searchJokesModel.result = this.backupSearchJokesModel.result.filter(x=>x.numberOfWords >=20);
  } 
}

