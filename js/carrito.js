const listaproductos = [
    { id:1, img: src="./assets/img/pizza5.jpg" , nombre:"Pizza de Muzzarella" , descripcion:" Masa con salsa de tomates con queso muzzarella y reggianito" , precio: 6000},
    { id:2, img: src="./assets/img/pizza4.jpg ",nombre:"Fugazzeta" , descripcion:" Masa con cebolla y queso muzzarella " , precio: 7000},
    { id:3, img: src="./assets/img/pizza1.jpg",nombre:"Pizza de jamón y morrón" , descripcion:"Masa con salsa de tomates, muzzarella, jamón cocido y morrones asados" , precio: 8000},
]

let carrito = JSON.parse(localStorage.getItem('productarticle')) || [];

let preciototal = parseFloat(localStorage.getItem('totalPrice')) || 0;

let count = parseInt(localStorage.getItem('totalCount')) || 0;



const mostrarproductos = () => {

        const carrito = JSON.parse(localStorage.getItem('productarticle')) || [];
        const total = parseFloat(localStorage.getItem('totalPrice')) || 0;
        const carritoproducto = document.getElementById('itemproductos');
        

        if (!carritoproducto) return;

        if (carrito.length === 0){
            carritoproducto.innerHTML =
                '<p>El carrito está vacio</p>';
            return
        }

        const mensajevacio = document.querySelector('.carrito-empty');

        if (mensajevacio){
            mensajevacio.remove();
        }

        const tabla = document.createElement('table');
        tabla.classList.add('clase-tabla');

        let encabezado = `
        <thead>
            <tr>
                <th>Nombre del Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        `;

        let cuerpo = '<tbody>';

        carrito.forEach( producto => {
            cuerpo += `
                    <tr>
                        <td>${producto.nombre}</td>
                        <td>$${producto.precio}</td>
                        <td>${producto.count}</td>
                    </tr>
            `;
        });
        cuerpo += '</tbody>';
        
        tabla.innerHTML = encabezado + cuerpo;

        carritoproducto.appendChild(tabla);
};

function botonfinalizar(){
    alert("Gracias por su compra!!!")
    carrito=[];
    preciototal=0;
    count=0;
    localStorage.removeItem('productarticle');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalCount');
    location.reload();

};

function crearproductos () {
    const tarjetaproducto = document.getElementById('listaproductos');
    listaproductos.forEach(productos =>{

        const tarjeta = document.createElement('article');
        tarjeta.className = 'tarjetaproducto';

        tarjeta.innerHTML=`
                        <img src= "${productos.img}" alt=${productos.nombre} class="imagenproducto">
                    <div class="contenidoproducto">
                        <p class="nombreproducto"> 
                            ${productos.nombre}
                        </p>
                        <p class="descripcionproducto">
                            ${productos.descripcion}
                        </p>
                        <p class="precioproducto">
                            <span> Precio: </span> 
                            <span class="precio">$${productos.precio}</span>
                        </p>
                        <button type="button" class="Encargar">
                            Encargar
                        </button>
                    </div> 
        `;
        tarjetaproducto.appendChild(tarjeta);
    });

    const articles = document.querySelectorAll('.tarjetaproducto');
    articles.forEach(article => { 

        const button = article.querySelector('.Encargar');
        const nombreproducto = article.querySelector('.nombreproducto').textContent;
        const descripcionproducto = article.querySelector('.descripcionproducto').textContent;
        const precioproducto = article.querySelector('.precioproducto .precio').textContent.slice(1);

        button.addEventListener('click', () => {
        const nombre = nombreproducto;
        const productoexiste = carrito.find (p => p.nombre === nombre);
        if (productoexiste){
            productoexiste.count+= 1;
            productoexiste.preciototal = productoexiste.precio*productoexiste.count;
        } else {
            const product = {
                        nombre : nombreproducto,
                        descripcion : descripcionproducto,
                        precio : precioproducto,
                        count : 1, 
                    };

                    carrito.push(product);
        }
        
                    
                    preciototal = carrito.reduce((acc, item) => acc + (item.precio * item.count), 0);
                    count = carrito.reduce((acc, item) => acc + item.count, 0);

                    localStorage.setItem('productarticle', JSON.stringify(carrito));
                    localStorage.setItem('totalPrice', preciototal.toFixed(2));
                    localStorage.setItem('totalCount', count);

                    document.querySelector('.count').textContent = count;
        });
});
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('listaproductos')){
        crearproductos();

        if (count > 0) {
            document.querySelector('.count').textContent = count;
        }
    }
    if (document.getElementById('itemproductos')){
        mostrarproductos();
    }
});

