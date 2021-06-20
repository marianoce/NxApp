const aliasTipoEnum = [
    { key: 1, value: 'ANON',desc: 'Anonimo' },
    { key: 2, value: 'UNIQUEID', desc: 'ID Unico', }, 
    { key: 3, value: 'NOMBRE', desc: 'Nombre Random' }
];

const categoriasEnum = [
    { key: 1, value: 'Anime', desc: 'Anime', codigo: 'ANM' },
    { key: 2, value: 'Comida', desc: 'Comida', codigo: 'COM' },
    { key: 3, value: 'Deportes', desc: 'Deportes', codigo: 'DEP' },
    { key: 4, value: 'Experiencias', desc: 'Experiencias', codigo: 'EXP' },
    { key: 5, value: 'Gay', desc: 'Gay', codigo: 'GAY' },
    { key: 6, value: 'Hentai', desc: 'Hentai', codigo: 'HEN' },
    { key: 7, value: 'Musica', desc: 'Musica', codigo: 'MUS' },
    { key: 8, value: 'Noticias', desc: 'Noticias', codigo: 'NOT' },
    { key: 9, value: 'Paranormal', desc: 'Paranormal', codigo: 'PAR' },
    { key: 10, value: 'Politica', desc: 'Politica', codigo: 'POL' },
    { key: 11, value: 'Porno', desc: 'Porno', codigo: 'POR' },
    { key: 12, value: 'Preguntas', desc: 'Preguntas', codigo: 'PRG' },
    { key: 13, value: 'Random', desc: 'Random', codigo: 'RND' },
    { key: 14, value: 'Redes', desc: 'Redes', codigo: 'RED' },
    { key: 15, value: 'Salud', desc: 'Salud', codigo: 'SAL' },
    { key: 16, value: 'Tecnologia', desc: 'Tecnologia', codigo: 'TEC' },
    { key: 17, value: 'Travas', desc: 'Travas', codigo: 'TRV' },
    { key: 18, value: 'TV/Cine', desc: 'TV/Cine', codigo: 'TVC' },
    { key: 19, value: 'Videojuegos', desc: 'Videojuegos', codigo: 'VID' }
];


const getCategoriaCodigo = (value) => {
    let codigo = '';
    if (value && categoriasEnum.length > 0)
        codigo = categoriasEnum.find(p => p.value === value).codigo;
    return codigo;
}


export {
    aliasTipoEnum,
    categoriasEnum,
    getCategoriaCodigo
}