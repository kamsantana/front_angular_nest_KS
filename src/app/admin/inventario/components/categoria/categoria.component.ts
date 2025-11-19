import { Component, OnInit, inject } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';

interface Categoria {
  id?: number,
  nombre: string;
  detalle?: string
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit{

  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = []
  dialog_visible: boolean = false;
  categoriaForm = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });

  
  visible: boolean =false

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias(){
    this.categoriaService.funListar().subscribe(
      (res: Categoria[]) => {
        this.categorias = res; 
      },
      (error: any) => {
        console.error(error);
      }
    )
  }

  mostrarDialogo(){
    this.visible = true
  }

  guardarCategoria(){
    this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
      (res:any) => {
        this.visible=false;
        this.getCategorias();
      },
      (error:any) => {
        console.log(error);
      }
    )
  }
}