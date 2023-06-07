import pool from "../../pool"

export default async function updateStaff(req, res){
    const staff = JSON.parse(req.body)

    const query = `UPDATE "Staff" SET
        "Name"=$1,
        "Email"=$2,
        "Store"=$3
        WHERE "Id"=$4`

    const update = pool.query(query, [
        staff.Name, staff.Email, staff.Store, staff.Id
    ]);
    try {
        const rs = await update
        res.send("ok")
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}