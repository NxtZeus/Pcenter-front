function TruncarTexto({ text, maxLength }) {
    if (text.length <= maxLength) {
        return <span>{text}</span>;
    }

    const truncated = text.substring(0, maxLength) + '...';
    return <span>{truncated}</span>;
}

export default TruncarTexto;