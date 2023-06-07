import pool from "../../pool"

export default async function updateStore(req, res){
    const store = JSON.parse(req.body)
    const queryStore = `UPDATE "Store" SET "Name"=$1, "Manager"=$2 WHERE "Id"=$3 RETURNING "Address"`
    const queryAddrs = `UPDATE "Address" SET "Address"=$1, "City"=$2 WHERE "Id"=$3`

    try {
        await pool.query("BEGIN")
        await pool.query("SAVEPOINT update_store")
        const up_store = await pool.query(queryStore, [store.Name, store.Manager, store.Id])
        const up_addrs = await pool.query(queryAddrs, [store.Address, store.City ,up_store.rows[0].Address])
        await pool.query("COMMIT")
        res.send("ok")
    }
    catch (e) {
        await pool.query("ROLLBACK")
        res.status(400).send(e.message)
    }
}