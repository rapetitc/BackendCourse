class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }
  addMascota(nuevaMascota) {
    this.mascotas.push(nuevaMascota)
  }
  countMascotas() {
    return this.mascotas.length
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre, autor })
  }
  getBookNames() {
    let nombresDeLibros = []
    if (this.libros.length > 0) {
      this.libros.forEach(libro => {
        nombresDeLibros.push(libro.nombre)
      });
    }
    return nombresDeLibros
  }
}

// Creating new Users
const usuarios = [
  new Usuario("Matias", "Fernandez"),
  new Usuario("Armando", "Casas"),
  new Usuario("Torino", "Ruiz")
]

// Setting some books/pets
usuarios[0].addMascota("Gato")
usuarios[0].addMascota("Serpiente")

usuarios[1].addBook("Periodico de ayer", "Hector Lavoe")

usuarios[2].addMascota("Perro")
usuarios[2].addBook("Lluvia", "Los Adolescentes")
usuarios[2].addBook("Classy 101", "Feid")

// Printing results
usuarios.forEach((usuario) => {
  //Personalized Scripting
  let mascotas = "no tengo mascotas"
  if (usuario.countMascotas() > 0) mascotas = `tengo ${usuario.countMascotas() > 1 ? `${usuario.countMascotas()} mascotas` : `${usuario.countMascotas()} mascota`}`
  let libros = "no leo libros"
  if (usuario.getBookNames().length > 0) libros = `${usuario.getBookNames().length > 1 ? `mis libros favoritos son ${usuario.getBookNames().map((name) => ` ${name}`)}` : `mi libro favorito es ${usuario.getBookNames()[0]}`}`

  //Full print
  console.log(`Hola mi nombre completo es ${usuario.getFullName()}, ${mascotas} y ${libros}`)
})