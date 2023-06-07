import pool from "../../pool"

export default async function updateCostumer(req, res){
    const costumer = JSON.parse(req.body)

    const query = `UPDATE "Costumer" SET "Name"=$1 WHERE "Id"=$2`
    const update = pool.query(query, [costumer.Name, costumer.Id]);

    try {
        const rs = await update
        res.send("ok")
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}