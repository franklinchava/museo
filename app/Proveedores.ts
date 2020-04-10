import mongoose = require("mongoose");
import {connectMongoDB} from "./helpers"
import {DeleteProductos,} from "./products"

export interface IProveedor extends mongoose.Document { 
    nombre: string;
    direccion: string;
    correo: string;
    telefono: number;

}

const ProveedorSchema = new mongoose.Schema({
    _id: { type: String, required: true},
    nombre: { type: String, required: true },
    correo: {type: String, required: true},
    direccion: { type: String, required: true },
    telefono: {type: Number, required: true},
});

export const Proveedor = mongoose.model<IProveedor>("Proveedor", ProveedorSchema);

export const CreateProveedor = async function(nom: string, direc: string, corr: string, telef: number){
    await connectMongoDB;

    const newProveedor = new Proveedor();
    newProveedor.nombre = nom;
    newProveedor.direccion = direc;
    newProveedor.correo = corr;
    newProveedor.telefono = telef;
    newProveedor._id = corr;

    newProveedor.save( (err:any) =>{
        if(err){
            console.log(err.message);
        }else{
            console.log(newProveedor);
        }
    } );
}

export const DeleteProveedor = async function(_correo:string){
     await connectMongoDB;

     Proveedor.deleteOne({_id:_correo}, (err:any,result:any)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log(result);
            }

     });
} 
//recordar para elminar todos utilizamos el deletemany
export const DeleteProveedorTipo = async function(filter:any){
    await connectMongoDB;

    Proveedor.deleteOne(filter, (err:any,result:any)=>{
           if(err){
               console.log(err.message);
           }else{
               console.log(result);
           }

    });
} 

export const DeleteProveedorProductos = async function(_correo:string){
    await connectMongoDB;

    const prov:any = await getProveedor(_correo);

    await DeleteProductos(prov);

    Proveedor.deleteOne({_id:_correo}, (err:any,result:any)=>{
           if(err){
               console.log(err.message);
           }else{
               console.log(result);
           }

    });
} 

export function getProveedor(_correo: string):Promise<any>{
    return new Promise<any>( resolve => {
        Proveedor.findOne({ _id:_correo}, (err:any,data:any) => {
            if(err){
                resolve({});
            }else{
                resolve(data);
            }
        } );
    });
}


