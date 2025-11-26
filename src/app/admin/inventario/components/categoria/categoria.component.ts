import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

interface Categoria {
  id: number,
  nombre: string;
  detalle: string
}
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = []
  dialog_visible: boolean = false;
  categoria_id: number = -1;

  categoriaForm = new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });

  ngOnInit(): void {
    this.getCategorias()
  }

  getCategorias() {
    this.categoriaService.funListar().subscribe(
      (res: any) => {
        this.categorias = res;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  mostrarDialog() {
    this.dialog_visible = true;
  }

  guardarCategoria() {

    if (this.categoria_id > 0) {

      this.categoriaService.funModificar(this.categoria_id, this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias();
          this.categoria_id = -1;
          this.alerta("ACTUALIADO", "La categoria se modifico con exito", "success");
        },
        (error: any) => {
          this.alerta("ERROR AL ACTULIZAR", "Verifica los datos!", "error")
        }
      );
      this.categoriaForm.reset();

    } 
    else 
      {

      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res: any) => {
          this.dialog_visible = false;
          this.getCategorias();
          this.alerta("REGISTRADO", "La categoria se creo con exito", "success")
        },
        (error: any) => {
          this.alerta("ERROR AL REGISTRAR", "Verifica los datos!", "error")
        }
      );

    }

    this.categoriaForm.reset();
  }

  editarCategoria(categoria: Categoria) {
    this.dialog_visible = true;
    this.categoria_id = categoria.id;

    this.categoriaForm.setValue({
      nombre: categoria.nombre,
      detalle: categoria.detalle
    });
  }

  eliminarCategoria(id: number) {
    Swal.fire({
      title: "¿Está seguro de eliminar la categoría?",
      text: "Una vez eliminado no se podrá recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.funEliminar(id).subscribe(
          (res: any) => {
            Swal.fire({
              title: "ELIMINADO!",
              text: "Categoría eliminada.",
              icon: "success"
            });
            this.getCategorias();
            this.categoria_id = -1;
          },
          (error: any) => {
            Swal.fire({
              title: "ERROR!",
              text: "Error al intentar eliminar.",
              icon: "error"
            });
          }
        )
      }
    });
  }

  alerta(tittle: string, text: string, icon: 'success' | 'error' | 'info' | 'question') {
    Swal.fire({ title: tittle, text, icon });
  }
}