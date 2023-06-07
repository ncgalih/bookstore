import pool from "../../pool"

export default async function updateBook(req, res){
    const book = JSON.parse(req.body)

    const query = `UPDATE "Book" SET
        "Name"=$1,
        "Publication_Year"=$2,
        "Pages"=$3,
        "Price"=$4,
        "Publisher"=$5
        WHERE "Id"=$6`

    const update = pool.query(query, [
        book.Name, book.Publication_Year, book.Pages, book.Price, book.Publisher, book.Id
    ]);
    try {
        const rs = await update
        res.send("ok")
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}