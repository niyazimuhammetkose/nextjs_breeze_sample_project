const FormatDate = ({ dateString }) => {
    const date = new Date(dateString)
    return date.toLocaleString() // Yerel tarih ve saat formatında döndürür
}

export default FormatDate
