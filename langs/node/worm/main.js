import db, { connect } from "./db.js";

import GradeLevel from "./GradeLevel.js";
import School from "./School.js";
import Student from "./Student.js";

(async () => {
  await connect({
    connectionString: "postgres://postgres:postgres@postgres:5432/postgres",
  });

  await db().begin();

  const k = await GradeLevel.findByCode("K");
  console.log(k.getData());
  k.setData({ grade_level_name: "Kindergartening" });
  await k.update();

  const grades = await GradeLevel.fetchAll();
  console.log(grades.map((gl) => gl.getData("grade_level_name")));

  const school = await School.find(1);
  await school.updateGradeLevels(await GradeLevel.fetchAll());
  console.log(school.getData());
  console.log(
    (await school.getGradeLevels()).map((gl) => gl.getData("grade_level_name")),
  );

  const student = await Student.create({
    student_name: "Alice",
    school_id: school.getId(),
    grade_level_id: k.getId(),
  });

  console.log({
    student: student.getData("student_name"),
    school: (await student.getSchool()).getData("school_name"),
    gradeLevel: (await student.getGradeLevel()).getData("grade_level_name"),
  });

  await db().rollback();

  await db().end();
})();
