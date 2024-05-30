const categories = require("../models/category");

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
};
const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "категория не найдена" }));
  }
};
const createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    req.category = await categories.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания категории" }));
  }
};
const updateCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления категории" }));
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch (err) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления категории" }));
  }
};
const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(
        JSON.stringify({
          message: "Категория с таким названием уже существует",
        })
      );
  } else {
    next();
  }
};
const checkEmptyName = async (req, res, next) => {
  if (req.body.name){
    next()
  }else{
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({message: "У категории должно быть имя",}))
  }
};
module.exports = {
  findAllCategories,
  createCategory,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkIsCategoryExists,
  checkEmptyName
};
