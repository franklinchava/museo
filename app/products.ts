import mongoose = require("mongoose");
import {IProveedor, getProveedor} from "./Proveedores"
import {connectMongoDB} from "./helpers"

interface IProducts extends mongoose.Document { 
    correoProveedor: string;
    descripcion: string;
    categoria: string;
    precio_venta: number;
    cantidad: number;
    proveedor: IProveedor
}

const ProductoSchema = new mongoose.Schema({
    correoProveedor: {type: String, required: true},
    descripcion: { type: String, required: true},
    categoria:{type: String, required: true},
    precio_venta: {type: Number, required: true},
    cantidad: {type: Number, required: true},
    _id: { type: String, required: true},
    proveedor: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" }
});


export const Producto = mongoose.model<IProducts>("Producto", ProductoSchema);

export const CreateProduct = async function(correProv:string, categoria:string, descripcion: string, precio_venta:number, cantidad:number, id:string){
    //Conectar con la base de datos
    await connectMongoDB;
    //Obtener el proveedor en funcion del nombre
    const prov:any = await getProveedor(correProv);
    
    //persistencia de nuestro producto
    const p = new Producto();
    p.correoProveedor = correProv;
    p.descripcion = descripcion;
    p.categoria = categoria;
    p.precio_venta = precio_venta;
    p.cantidad =  cantidad;
    p._id = id;
    p.proveedor = prov;

    p.save((err:any)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(p);
        }
    });
}

export const DeleteProducto = async function(id:string){
    await connectMongoDB;

    Producto.deleteOne({_id:id}, (err:any,result:any) => {

        if(err){
            console.log(err.message);
        }else{
            console.log(result);
        }
    });
}
//borrar producto por tipo 
export const DeleteProductoTipo = async function(filter:any){
    await connectMongoDB;

    Producto.deleteOne(filter, (err:any,result:any) => {

        if(err){
            console.log(err.message);
        }else{
            console.log(result);
        }
    });
}
//borrar todos los productos de dicho pobeedor utilizando el objeto para localizar todos los porductos de ese proveedor 
export const DeleteProductos = async function(correprov:any){
    await connectMongoDB;

    Producto.deleteMany({ correoProveedor : correprov}, (err:any,result:any) => {

        if(err){
            console.log(err.message);
        }else{
            console.log(result);
        }
    });
}

export const DeleteProductos2 = async function(filter:any){
    await connectMongoDB;

    Producto.deleteMany(filter, (err:any,result:any) => {

        if(err){
            console.log(err.message);
        }else{
            console.log(result);
        }
    });
}

export const UpdateProducto = async function(filter:any,update:any){
    await connectMongoDB;
    Producto.updateMany(filter,update,(err:any,result:any)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }

    });
}
