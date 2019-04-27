# rae
*A human interface for squat/drae*

## Motivation
As soon as I got into Linux I felt in love with the [dict](https://linux.die.net/man/1/dict) command and started missing something similar based on a Spanish dictionary.

Got lucky enough to find [squat/drae](https://github.com/squat/drae):
> A RESTful API for el Diccionario de la Real Academia Española

... but it returns data in JSON format (not very readable)

```
$ docker run squat/drae define violonchelo
[{"word":"violonchelo","etymology":"Del it. violoncello.","definitions":[{"category":"nombre masculino","definition":"Instrumento musical de cuerda tocado con arco más grande que la viola y más pequeño que el contrabajo y con un registro intermedio entre ambos El intérprete que está sentado lo coloca entre sus piernas para tocarlo","origin":[],"notes":[],"examples":[]},{"category":"nombre masculino y femenino","definition":"violonchelista.","origin":[],"notes":[],"examples":[]}],"variations":[]}]
```

so I made myself a simple parser to make it easier to call and read (nice colors not shown here):

```
$ rae violonchelo
violonchelo (Del it. violoncello.)
- Instrumento musical de cuerda tocado con arco más grande que la viola y más pequeño que el contrabajo y con un registro intermedio entre ambos El intérprete que está sentado lo coloca entre sus piernas para tocarlo (nombre masculino)
- violonchelista. (nombre masculino y femenino)
```


## Setup
You will need to have [Docker](https://www.docker.com/) and [Node.js](https://nodejs.org/en/) installed on your system.

* Clone this repo or download files in a local folder
* Go to that folder on a terminal window
* run ```npm install```

### Create a symlink for easier access
```
$ ln -s <rae_folder>/rae.js ~/bin/rae
```
With this you will be able to call `rae` from anywhere in your filesystem (assuming `~/bin` is in your `PATH`).

## Usage
With no parameters or with `-h` you get the help text
```
$ rae
rae.js: Human interface for squat/drae
Usage: rae.js [options] word(s)

Options:
  -h, --help         Show help
  -s, --short        Show short version
  -S, --supershort   Show super short version (one line per word)
  -a, --all          Show all available data
```

Give it a word and you'll get its definition
```
$ rae licántropo
licántropo (Del gr. λυκάνθρωπος lykánthrōpos.)
- Persona que según la tradición popular se convierte en lobo las noches de plenilunio (nombre masculino y femenino)
- Persona afectada de licantropía (nombre masculino y femenino) (Medicina)
- Perteneciente o relativo al licántropo. (adjetivo) (Leyenda licántropa.)
```

With `-s` you get the *short* definition
```
$ rae -s licántropo
licántropo (Del gr. λυκάνθρωπος lykánthrōpos.)
- Persona que según la tradición popular se convierte en lobo las noches de plenilunio (nombre masculino y femenino)
```

And with `-S` you get the *supershort* version
```
$ rae -S licántropo
licántropo Persona que según la tradición popular se convierte en lobo las noches de plenilunio
```

Sometimes you'll see a **[variations available]** message at the end of the result
```
$ rae mono
mono (De mona1, y este quizá acort. de maimona, f. de maimón1 'mico'.)
- Dicho de una persona De aspecto agradable por cierto atractivo físico por su gracia o por su arreglo y cuidado (adjetivo coloquial) (De niño era bastante mono. | Así van muy monas.)
- Dicho de una cosa Bonita o agradable de aspecto generalmente por su factura o por la manera en que está adornada (adjetivo) (coloquial) (Un vestido mono. | La sala ha quedado mona.)
- Dicho de una persona Que tiene el pelo rubio (adjetivo) (Colombia) (coloquial | Usado también como sustantivo)
- Dicho del pelo rubio de color parecido al del oro (adjetivo) (Colombia) (coloquial)
- Animal del suborden de los simios (nombre masculino y femenino) (Usado en masculino referido a la especie)
- Prenda de vestir de una sola pieza de tela fuerte que consta de cuerpo y pantalón especialmente la utilizada en diversos oficios como traje de faena (nombre masculino)
- Persona que hace gestos o figuras parecidas a las del mono. (nombre masculino) (coloquial)
- Dibujo rápido y poco elaborado (nombre masculino) (coloquial)
- síndrome de abstinencia. (nombre masculino) (coloquial)
- Necesidad deseo apremiante o añoranza de algo (nombre masculino) (coloquial)
- Joven de poco seso y afectado en sus modales (nombre masculino) (desusado)
- Mamífero cuadrumano de unos de altura con pelaje de color pardo amarillento grandes abazones nalgas sin pelo y callosas y cola muy corta que se cría en y en el peñón de y se domestica fácilmente (nombre femenino) (centímetro(s))
- Juego de naipes en que se reparten todas las cartas menos una y en el que los jugadores deben deshacerse de las que forman una pareja (nombre femenino)
- Refuerzo que se ponen los lidiadores de a caballo en la pierna derecha por ser la más expuesta a los golpes del toro (nombre femenino)
- Persona que hace las cosas por imitar a otra (nombre femenino) (coloquial)
- Embriaguez borrachera (nombre femenino) (coloquial)
- Persona ebria (nombre femenino) (coloquial)
[variations available]
```

Then you can repeat the call with `-a` to get all variations
```
$ rae -a mono
mono (De mona1, y este quizá acort. de maimona, f. de maimón1 'mico'.)
- Dicho de una persona De aspecto agradable por cierto atractivo físico por su gracia o por su arreglo y cuidado (adjetivo coloquial) (De niño era bastante mono. | Así van muy monas.)
- Dicho de una cosa Bonita o agradable de aspecto generalmente por su factura o por la manera en que está adornada (adjetivo) (coloquial) (Un vestido mono. | La sala ha quedado mona.)
- Dicho de una persona Que tiene el pelo rubio (adjetivo) (Colombia) (coloquial | Usado también como sustantivo)
- Dicho del pelo rubio de color parecido al del oro (adjetivo) (Colombia) (coloquial)
- Animal del suborden de los simios (nombre masculino y femenino) (Usado en masculino referido a la especie)
- Prenda de vestir de una sola pieza de tela fuerte que consta de cuerpo y pantalón especialmente la utilizada en diversos oficios como traje de faena (nombre masculino)
- Persona que hace gestos o figuras parecidas a las del mono. (nombre masculino) (coloquial)
- Dibujo rápido y poco elaborado (nombre masculino) (coloquial)
- síndrome de abstinencia. (nombre masculino) (coloquial)
- Necesidad deseo apremiante o añoranza de algo (nombre masculino) (coloquial)
- Joven de poco seso y afectado en sus modales (nombre masculino) (desusado)
- Mamífero cuadrumano de unos de altura con pelaje de color pardo amarillento grandes abazones nalgas sin pelo y callosas y cola muy corta que se cría en y en el peñón de y se domestica fácilmente (nombre femenino) (centímetro(s))
- Juego de naipes en que se reparten todas las cartas menos una y en el que los jugadores deben deshacerse de las que forman una pareja (nombre femenino)
- Refuerzo que se ponen los lidiadores de a caballo en la pierna derecha por ser la más expuesta a los golpes del toro (nombre femenino)
- Persona que hace las cosas por imitar a otra (nombre femenino) (coloquial)
- Embriaguez borrachera (nombre femenino) (coloquial)
- Persona ebria (nombre femenino) (coloquial)
mono, na araña
- mono de de cuerpo delgado y de patas y cola muy largas (nombre masculino y femenino) (Usado en masculino referido a la especie)
mono, na aullador, ra
- mono de de cola prensil y con el hueso hioides grande y hueco en comunicación con la laringe lo que le permite lanzar sonidos que se oyen a gran distancia (nombre masculino y femenino) (Usado en masculino referido a la especie)
mono, na capuchino, na
- mono americano de cola no prensil cabeza redondeada ojos grandes y cuerpo cubierto de pelo largo y abundante sobre todo en la cola (nombre masculino y femenino) (Usado en masculino referido a la especie)
mono de imitación
- Persona que imita lo que hacen otros (nombre masculino coloquial)
mono, na negro, gra
- mono capuchino. (nombre masculino y femenino) (Colombia)
mono, na sabio, bia
- mono adiestrado en varios ejercicios para exhibirlo en circos y barracas (nombre masculino y femenino)
- monosabio. (nombre masculino y femenino) (Tauromaquia)
a freír monas
- a freír espárragos. (locución adverbial coloquial)
a freír monos
- a freír espárragos. (locución adverbial coloquial) (Perú)
andar, o estar, alguien con los monos
- Estar enojado (locuciones verbales coloquiales) (Chile)
como la mona
- para indicar el mal resultado o estado de los negocios la salud cualquier actividad encargo situación (locución adverbial) (Argentina, Bolivia, Paraguay, Perú y Uruguay) (Usada | etcétera)
corrido, da como una mona
- hecho, cha una mona. (locución adjetiva) (coloquial)
estar de monos alguien
- Tener un enojo pasajero especialmente referido a los novios (locución verbal coloquial) (Usada)
hecho, cha una mona
- Dicho de una persona Que ha quedado burlada y avergonzada (locución adjetiva) (coloquial)
meterle los monos a alguien
- meterle las cabras en el corral. (locución verbal) (Colombia)
pegarse alguien una mona
- emborracharse beber hasta trastornarse los sentidos (locución verbal coloquial) (Perú)
quedarse hecho un mono
- Quedarse corrido o avergonzado (locución verbal)
ser alguien el último mono
- Ser insignificante no contar para nada (locución verbal coloquial)
tener monos en la cara
- frecuentemente en construcciones interrogativas para expresar enfado hacia quien mira insistentemente (locución verbal coloquial) (Usada) (¿Y tú qué miras?, ¿es que tengo monos en la cara?)
- la maza y la mona
```
