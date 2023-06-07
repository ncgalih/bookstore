import pool from "../../pool"

export default async function createOrder(req, res){
    const order = JSON.parse(req.body)
    const items = order.Item

    const queryOrder = `INSERT INTO "Order" ("Costumer", "Staff", "Store") VALUES ($1, $2, $3) RETURNING "Id"`
    
    try {
        await pool.query("BEGIN")
        await pool.query("SAVEPOINT createOrder")
        const ord = await pool.query(queryOrder, [order.Costumer, order.Staff, order.Store])

        const queryItems = `INSERT INTO "Order_Item" ("Item_id", "Quantity", "Price", "Order_Id") 
            VALUES ${ items.map(i => `(${i.Item_id}, ${i.Quantity}, (SELECT "Price" FROM "Book" WHERE "Id"=${i.Item_id}), ${ord.rows[0].Id})`)}`

        const itm = await pool.query(queryItems)
        await pool.query("COMMIT")
        res.send("ok")
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}