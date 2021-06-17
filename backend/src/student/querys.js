const getMstateDAta = "SELECT * from mstate order by id";
const getMstateByCode = "select * from mstate where id= $1;";

const createMstateDAta =
  "INSERT INTO mstate(statecode,statename,id) values($1,$2,$3)";
const removeState = "DELETE from mstate where id =$1";

const updateMstateData =
  "UPDATE mstate set statecode=$1 ,statename=$2 where id=$3";
const validateInputData =
  "select * from mstate where statecode=$1 or statename=$2 or id=$3 ;";

const validateUpdateInput =
  "select * from mstate where (statecode=$1 or statename=$2) and not  id=$3 ;";

const validateStateCodeInput =
  "select statecode from mstate where (statecode=$1) and not  id=$2 ;";
const validateStateNameInput =
  "select statename from mstate where (stateName=$1) and not  id=$2 ;";

const getStateFormName = "select id,statename from mstate order by id";

const getCityData =
  "select ROW_NUMBER() over(order by city_id) as RowNum,city_id, city_code,city_name,statename,state_id from city c inner join mstate m on c.state_id=m.id order by city_id offset $1 limit 10";

const removeCityData = "delete from city where city_id= $1";
const updateCityData =
  "update city set city_name=$1,state_id=$2 where city_id=$3";

const checkInsertedDataQuery =
  "select city_id,city_name from city where  city_code=$1 or city_name =$2";

const updateData =
  "update city set city_code=$1,city_name=$2,state_id=$3 where city_id=$4";

const validateCityCodeInput =
  "select city_code from city where (city_code=$1) and not  city_id=$2 ";
const validateCityNameInput =
  "select city_name from city where (city_name=$1) and not  city_id=$2 ";

module.exports = {
  getMstateDAta,
  createMstateDAta,
  getMstateByCode,
  removeState,
  updateMstateData,
  validateInputData,
  validateUpdateInput,
  validateStateCodeInput,
  validateStateNameInput,
  getStateFormName,
  getCityData,
  removeCityData,
  updateCityData,
  checkInsertedDataQuery,
  updateData,
  validateCityCodeInput,
  validateCityNameInput,
};
