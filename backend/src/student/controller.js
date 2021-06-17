const { query } = require("express");
const pool = require("../../db");
const querys = require("./querys");

const getStateData = async (req, res) => {
  try {
    const AllData = await pool.query(querys.getMstateDAta);
    res.json(AllData.rows);
  } catch (err) {
    console.error(err);
  }
};

const getStateByCode = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dataById = await pool.query(querys.getMstateByCode, [id]);
    if (!dataById.rows.length) {
      res.send("No code exits");
    }
    res.status(200).json(dataById.rows);
  } catch (err) {
    console.log(err);
  }
};

const createStateData = async (req, res) => {
  try {
    const { statecode, statename, id } = req.body;
    if (statecode.length !== 0 && statename.length !== 0) {
      const existData = await pool.query(querys.validateInputData, [
        statecode,
        statename,
        id,
      ]);
      if (existData.rows.length > 0) {
        res
          .status(200)
          .json({ success: false, message: "Record is Already Exist" });
      } else {
        await pool.query(querys.createMstateDAta, [statecode, statename, id]);

        res.status(201).json({
          success: true,
          message: "Record inserted succesflly",
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};
const removeState = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const removeData = await pool.query(querys.removeState, [id]);
    res
      .status(200)
      .json({ success: true, message: "Record Remove Succesfully" });
  } catch (err) {
    console.error(err);
  }
};
const updateState = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { statecode, statename } = req.body;

    const checkCodeInput = await pool.query(querys.validateStateCodeInput, [
      statecode,
      id,
    ]);
    if (checkCodeInput.rows.length > 0) {
      console.log(checkCodeInput.rows);
      res
        .status(200)
        .json({ success: false, message: "State Code is Already Exist" });
    } else {
      const checkNameInput = await pool.query(querys.validateStateNameInput, [
        statename,
        id,
      ]);
      if (checkNameInput.rows.length > 0) {
        console.log(checkNameInput.rows);
        res
          .status(200)
          .json({ success: false, message: "State Name is Already Exist" });
      } else {
        const updateData = await pool.query(querys.updateMstateData, [
          statecode,
          statename,
          id,
        ]);
        res
          .status(200)
          .json({ success: true, message: "Record Update Successfully" });
      }
    }
  } catch (error) {
    console.error(err);
  }
};

const getStateNameData = async (req, res) => {
  try {
    const getStateName = await pool.query(querys.getStateFormName);
    res.json(getStateName.rows);
  } catch (err) {
    console.log(err);
  }
};
const getCityName = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const getCityName = await pool.query(querys.getCityData, [id]);
    res.json(getCityName.rows);
  } catch (err) {
    console.log(err);
  }
};
const createCity = async (req, res) => {
  const { city_id, city_code, city_name, state_id } = req.body;
  try {
    const checkData = await pool.query(querys.checkInsertedDataQuery, [
      city_code,
      city_name,
    ]);
    if (checkData.rows.length > 0) {
      res.send("Record already exist");
    } else {
      await pool.query("insert into city values($1,$2,$3,$4)", [
        city_id,
        city_code,
        city_name,
        state_id,
      ]);
      res.status(201).send("Record inserted succesflly");
    }
  } catch (err) {
    console.log(err);
  }
};
const removecity = async (req, res) => {
  const city_Id = parseInt(req.params.id);
  try {
    await pool.query(querys.removeCityData, [city_Id]);
    console.log(res);
    res.status(200).send("Delete City Record");
  } catch (err) {
    console.log(err);
  }
};
const updateCity = async (req, res) => {
  try {
    const city_id = parseInt(req.params.id);
    const { city_code, city_name, state_id } = req.body;
    const checkCityCode = await pool.query(querys.validateCityCodeInput, [
      city_code,
      city_id,
    ]);
    if (checkCityCode.rows.length > 0) {
      console.log(checkCityCode);
      res.send("City Code is Already Exist");
    } else {
      const checkCityName = await pool.query(querys.validateCityNameInput, [
        city_name,
        city_id,
      ]);
      if (checkCityName.rows.length > 0) {
        console.log(checkCityName);
        res.send("City Name is Alredy Exitst");
      } else {
        await pool.query(querys.updateData, [
          city_code,
          city_name,
          state_id,
          city_id,
        ]);
        res.status(200).send("Record update Succesfully");
      }
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getStateData,
  createStateData,
  getStateByCode,
  removeState,
  updateState,
  getStateNameData,
  getCityName,
  createCity,
  removecity,
  updateCity,
};
