function TruncarTexto({ text, maxLength }) {
    // Si el texto es menor o igual al máximo permitido, se muestra completo sin truncar nada
    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }

    // Si el texto es mayor al máximo permitido, se trunca y se añade "..." al final del texto
    const truncated = text.substring(0, maxLength) + '...';
    return <span>{truncated}</span>;
}

export default TruncarTexto;
