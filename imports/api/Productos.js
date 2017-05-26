import {Mongo} from 'meteor/mongo';
import xlsx from 'node-xlsx'

export const Productos = new Mongo.Collection('productos')
const producto_schema = new SimpleSchema({
  nombre: {type: String},
  codigo: {type: String, optional: true},
  cantidad: {type: Number},
  ubicacion: {type: String, optional: true},
  tipo: {type: String},
  nombre_tipo: {type: String},
  precio_base: {type: Number, decimal: true},
  precio_venta: {type: Number, decimal: true},
})

Productos.schema = producto_schema

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('productos', function productosPublication(query) {
    var queryRegexp = new RegExp(query, 'i')
    return Productos.find({
      $or: [
        {nombre: queryRegexp},
        {_id: queryRegexp},
        {codigo: queryRegexp},
        {tipo: queryRegexp},
      ]
    });
  });
}


export function cargarProductos () {
  const workSheetsFromFile = xlsx.parse(`/media/sf_VM_Shared/INVENTARIO MI PAPELERIA COFRADIA 29-ABR-17 Total.xlsx`);
  productos = workSheetsFromFile[2]['data'];
  headers = productos[0]
  headerIndexes = {}
  for(i=0; i< headers.length; i++) {
    headerIndexes[headers[i]] = i
  }
  console.log(headerIndexes)
  for(i=1; i<productos.length; i++) {
    fila = productos[i]
    if(fila.length < 8) {
      console.log(fila)
      console.log('La fila está incompleta, los datos no fueron cargados')
    }
    producto_modifier = {
      $inc: {
        cantidad: fila[headerIndexes['cantidad']],
      },
      $set: {
        ubicacion: fila[headerIndexes['ubicacion']],
        nombre: fila[headerIndexes['nombre']],
        tipo: fila[headerIndexes['tipo']],
        nombre_tipo: fila[headerIndexes['nombre']] + ' - ' + fila[headerIndexes['tipo']],
        precio_base: fila[headerIndexes['precio_base']],
        precio_venta: fila[headerIndexes['precio_venta']],
        codigo: fila[headerIndexes['codigo']],
      }
    }
    producto_selector = {
      tipo: fila[headerIndexes['tipo']], nombre: fila[headerIndexes['nombre']], precio_base: fila[headerIndexes['precio_base']]
    }
    Productos.schema.clean(producto_selector)
    Productos.schema.clean(producto_modifier)
    console.log(producto_modifier)
    try {
      Productos.schema.validate(producto_modifier, {modifier:true})

      upsert_result = Productos.upsert(
        producto_selector,
        producto_modifier)
      console.log(upsert_result)
      console.log('El producto fue insertado satisfactoriamente')
    }
    catch(err){
      console.log(err)
    }
  }
  console.log(headerIndexes)
}
