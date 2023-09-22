import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/countries';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService:CountriesService){ }

  public countries:Country[] =[];
  public regions:Region[] =['Africa', 'America','Asia', 'Europe', 'Oceania']
  public selectedRegion?:Region;

  public initialValue:string = '';

  ngOnInit(): void {
      this.countries = this.countriesService.cacheStore.byRegion.countries;
      this.initialValue = this.countriesService.cacheStore.byRegion.region;
    }

  searchByRegion(region:Region):void{

    this.selectedRegion = region;
    this.countriesService.searchRegion(region).subscribe(countries => {
      this.countries = countries;
    });
  }
}
