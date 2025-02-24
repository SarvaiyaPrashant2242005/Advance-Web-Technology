const db = require("../helper/db.helper");
const { Op } = require("sequelize");

module.exports = {
  create,
  fetchAll,
  findOne,
  deleteCourse,
  update,
};
async function create(params) {
  if (await db.Course.findOne({ where: { course_name: params.course_name } })) {
    return "Course " + params.course_name + " is already exists";
  }
  const course = new db.Course(params);

  await course.save();
  return course;
}
async function fetchAll() {
  return await db.Course.findAll({
    include: {
      model: db.Student,
    },
  });
}
async function findOne(id, callback) {
  getCourse(id)
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}
async function update(id, params) {
  const course = await getCourse(id);
  const nameChanged =
    params.course_name && params.course_name !== course.course_name;
  if (
    nameChanged &&
    (await db.Course.findOne({ where: { course_name: params.course_name } }))
  ) {
    return "Course with name " + params.course_name + " is already exists";
  }
  Object.assign(course, params);
  await course.save();
  return course;
}
async function deleteCourse(id) {
  const course = await getCourse(id);

  if (course.course_status) {
    course.course_status = false;
  } else {
    course.course_status = true;
  }
  await course.save();
  return course;
}
async function getCourse(id) {
  const course = await db.Course.findByPk(id);
  if (!course) return "Course not found";
  return course;
}
