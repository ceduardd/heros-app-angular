import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
    `
      .result-container {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 32px;
      }
    `,
  ],
})
export class BuscarComponent implements OnInit {
  termino: string = '';

  heroeSeleccionado: Heroe | undefined;

  heroes: Heroe[] = [];

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService
      .getSugerencias(this.termino.trim())
      .subscribe((heroes) => (this.heroes = heroes));
  }

  seleccionarHeroe(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;

    this.termino = heroe.superhero;

    this.heroesService
      .getHeroePorId(heroe.id!)
      .subscribe((heroe) => (this.heroeSeleccionado = heroe));
  }
}
