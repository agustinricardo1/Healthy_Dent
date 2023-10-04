const pool = require('../db');

const getListTurn = async (req, res, next) => {

try {
  const { id } = req.params
  
  const result = await pool.query(`SELECT us.user_id 
                                    ,ur.name
                                    ,ur.last_name
                                      , t.date
                                      , t.hour 
                                      , t.treatment
                                  FROM "User" AS us
                                  LEFT JOIN "Turn" AS t 
                                  ON us.user_id = t.user_id
                                  LEFT JOIN "Professional" AS p
                                  ON p.prof_id = t.prof_id
                                  LEFT JOIN "User" AS ur
                                  ON ur.user_id = p.user_id 
                                  WHERE us.user_id = $1
                                  AND t.date >= CURRENT_DATE
                                  ORDER BY t.date ASC, t.hour ASC`,[id])
  if(result.rows.length === 0){
    return res.status(404).json({
      message: "No hay turnos",
    })
  }
  res.json(result.rows);
} catch (error) {
  next(error)
  return res.status(500).json({
    error: error.message,
  })
}
};

module.exports = {
  getListTurn
};