USE  trailerflix;
DROP VIEW IF EXISTS Vista_Trailerflix;
CREATE VIEW Vista_Trailerflix AS

select con.id as 'id', con.titulo ,con.poster,con.resumen,con.temporadas,con.trailer,
 cat.nombre as 'categoria', group_concat(distinct g.nombre) as 'genero',
 group_concat(distinct a.nombre) as 'reparto' from contenido as con join categorias as cat on  cat.id = con.idCategoria
 join generoscontenido as gc on gc.idContenido = con.id
 join generos as g on g.id = gc.idGenero
 join actorescontenido as ac on ac.idContenido =con.id
 join actores as a on a.id = ac.idActor
 group by con.id, con.titulo,con.poster,con.resumen,con.temporadas,cat.nombre;