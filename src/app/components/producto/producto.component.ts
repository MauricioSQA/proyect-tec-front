import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa} from '../../models/empresa';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { Compra } from '../../models/compra';
import { CompraService } from '../../services/compra.service';
import { Favorito } from '../../models/favorito';
import { FavoritosService } from '../../services/favoritos.service';
import { PedidoService } from '../../services/pedido.service';
import { PedidoResumen } from '../../models/pedido';
import { Producto } from '../../models/producto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css',
})
export class ProductoComponent implements OnInit {
  id: number = 0;

  empresa: Empresa = {
    nombre: '',
    direccion: '',
    horario: '',
    username: '',
    password:'',
    telefono: '',
    tipo: '',
    logo: '',
  };

  producto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    codProducto: '',
    precioOriginal: 0,
    precioOferta: 0,
    cant_disponible: 0,
    tipoProducto: '',
    empresa: {
      id: 0,
    },
  };

  productos: Producto[] = [];

  pedidos: PedidoResumen[] = [];

  isDelivered: boolean = false;

  getImagenProducto(tipoProducto: string): string {
    switch (tipoProducto.toUpperCase()) {
      case 'CAFE':
        return 'https://images.unsplash.com/photo-1611564494260-6f21b80af7ea?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'SANGUCHES':
        return 'https://images.unsplash.com/photo-1592415499556-74fcb9f18667?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'ENSALADAS':
        return 'https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'PASTAS':
        return 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'POSTRES':
        return 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'PIZZAS':
        return 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      case 'SUSHI':
        return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      default:
        return 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    }
  }

  tipoProductos = [
    { value: 'CAFE', label: 'Café' },
    { value: 'SANGUCHES', label: 'Sanguches' },
    { value: 'ENSALADAS', label: 'Ensaladas' },
    { value: 'PASTAS', label: 'Pastas' },
    { value: 'POSTRES', label: 'Postres' },
    { value: 'BEBIDAS', label: 'Bebidas' },
    { value: 'ENTRADAS', label: 'Entradas' },
    { value: 'PIZZAS', label: 'Pizzas' },
    { value: 'SUSHI', label: 'Sushi' },
  ];

  nombreProducto: string = '';
  descripcionProducto: string = '';
  precioProducto: number = 0;
  precioProductoOferta: number = 0;
  stockProducto: number = 0;
  selectedTipoProducto: string = 'CAFE';
  adminPermission: boolean = false;
  userPermission: boolean = false;

  filtrarTipoProductos: Set<string> = new Set<string>();

  productosOriginales: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: EmpresaService,
    private productoService: ProductoService,
    private userService: UserService,
    private compraService: CompraService,
    private favoritoService: FavoritosService,
    private pedidoService: PedidoService,
    private router: Router,
    private servicio:AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');
      if (id > 0) {
        this.service.findById(id).subscribe((res) => {
          this.empresa = res;
          this.id = res.id!;
          this.refreshProductsAndFilters();
        });
      }
      this.pedidos = this.pedidoService.pedidos;
    });



    const storedCompras = localStorage.getItem('compras');
    if (storedCompras) {
      this.compraService.compras = JSON.parse(storedCompras);
    }
  }

  fetchEmpresaAndProducts(id: number): void {
    this.service.findById(id).subscribe((res) => {
      this.empresa = res;
      this.id = res.id!;
      localStorage.setItem('empresaId', String(this.id));
      this.refreshProducts();
    });
  }

  //* Create Method
  onCreate() {
    const newProduct: Producto = {
      nombre: this.nombreProducto,
      descripcion: this.descripcionProducto,
      precioOriginal: this.precioProducto,
      precioOferta: this.precioProductoOferta,
      cant_disponible: this.stockProducto,
      tipoProducto: this.selectedTipoProducto,
      empresa: {
        id: this.id,
      },
    };
    this.productoService.createProduct(newProduct).subscribe(
      (res) => {
        Swal.fire({
          title: 'Producto Creado',
          text: 'Producto ' + newProduct.nombre + ' creado con éxito',
          icon: 'success',
        });

        this.refreshProductsAndFilters();
      },
      (error) => {
        console.log('Error creating product: ', error);
      }
    );
    this.refreshForm();
  }

  //* Delete Method
  onDelete(id: number) {
    this.productoService.deleteProduct(id).subscribe(
      (res) => {
        console.log('Success, ', res);
      },
      (error) => {
        console.log('Error: ', error);
        Swal.fire({
          title: 'Producto Eliminado',
          text: 'Producto eliminado con éxito',
          icon: 'success',
        });
        this.refreshProductsAndFilters();
      }
    );
  }

  getRol(): string | null {
    return this.servicio.getRol();
  }

  //* OnBuy Method
  onBuy(producto: Producto) {
    const newProducto: Compra = {
      id: uuidv4(),
      nombre: producto.nombre,
      tipoProducto: producto.tipoProducto,
      codigoProducto: producto.codProducto!,
      cantidad: 1,
      precio: producto.precioOferta,
    };

    const productResumen: PedidoResumen = {
      pedidoId: uuidv4(),
      nombre: producto.nombre,
      precio: producto.precioOferta,
      isDelivered: false,
    };

    this.pedidoService.pedidos.push(productResumen);

    Swal.fire({
      title: 'Producto Agregado',
      text:
        'El producto ' +
        newProducto.nombre +
        ' ha sido agregado al carrito con éxito',
      icon: 'success',
    });
    this.compraService.compras.push(newProducto);
    localStorage.setItem('compras', JSON.stringify(this.compraService.compras));
  }

  //* Filter Method
  filterProducts(productType: string) {
    console.log('Product Type: ', productType);
    if (productType) {
      this.productos = this.productosOriginales.filter(
        (producto) => producto.tipoProducto === productType
      );
    } else {
      this.productos = [...this.productosOriginales];
    }
  }

  mostrarTodos() {
    this.productos = [...this.productosOriginales];
  }

  refreshProducts() {
    this.productoService.findAll(this.id).subscribe((allProducts) => {
      this.productos = allProducts;
    });
  }

  //* Refresh Products and Filters
  refreshProductsAndFilters() {
    this.productoService.getProductosByEmpresa(this.id).subscribe(
      (productos) => {
        this.productos = productos;
        this.productosOriginales = [...this.productos];
        this.filtrarTipoProductos.clear();
        this.productos.forEach((item) => {
          this.filtrarTipoProductos.add(item.tipoProducto);
        });
      },
      (error) => {
        console.log('Error fetching products', error);
      }
    );
  }

  refreshForm() {
    this.nombreProducto = '';
    this.descripcionProducto = '';
    this.precioProducto = 0;
    this.precioProductoOferta = 0;
    this.stockProducto = 0;
    this.selectedTipoProducto = 'CAFE';
  }

  addToFavorite(producto: Producto) {
    const newFavProduct: Favorito = {
      id: uuidv4(),
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precioOferta,
      tipoProducto: producto.tipoProducto,
    };

    this.favoritoService.agregarFavorito(newFavProduct);

    Swal.fire({
      title: 'Producto Agregado',
      text:
        'El producto ' +
        newFavProduct.nombre +
        ' ha sido agregado a tus favoritos con éxito',
      icon: 'success',
    });

    this.router.navigate(['home']);
  }

  onDelivery(index: number) {
    this.pedidos[index].isDelivered = true;
    Swal.fire({
      title: 'Producto Entregado',
      text:
        'El producto ' +
        this.pedidos[index].nombre +
        ' ha sido entregado con éxito',
      icon: 'success',
    });
  }
}
