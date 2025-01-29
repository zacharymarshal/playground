import Model from "./Model.js";
import GradeLevel from "./GradeLevel.js";
import School from "./School.js";

class Student extends Model {
  static schema = {
    tableName: "students",
    primaryKey: "student_id",
    columns: {
      student_id: { usePostgresDefault: true },
      student_name: {},
      school_id: {},
      grade_level_id: {},
      updated_at: { usePostgresDefault: true },
      created_at: { usePostgresDefault: true },
    },
  };

  async getSchool() {
    return School.find(this.getData("school_id"));
  }

  async getGradeLevel() {
    return GradeLevel.find(this.getData("grade_level_id"));
  }
}

export default Student;
