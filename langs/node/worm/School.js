import db from "./db.js";
import Model from "./Model.js";
import GradeLevel from "./GradeLevel.js";

class School extends Model {
  static schema = {
    tableName: "schools",
    primaryKey: "school_id",
    columns: {
      school_id: { usePostgresDefault: true },
      school_name: {},
      updated_at: { usePostgresDefault: true },
      created_at: { usePostgresDefault: true },
      deleted_at: {},
    },
  };

  async updateGradeLevels(gradeLevels) {
    await db().begin();
    await db().query(
      `DELETE FROM school_grade_level_aff WHERE school_id = $1`,
      [this.getId()],
    );

    for (const gradeLevel of gradeLevels) {
      await db().query(
        `INSERT INTO school_grade_level_aff (school_id, grade_level_id)
        VALUES ($1, $2)`,
        [this.getId(), gradeLevel.getId()],
      );
    }
    await db().commit();
  }

  async getGradeLevels() {
    return GradeLevel.fetchAll({
      where:
        "grade_level_id IN (SELECT grade_level_id FROM school_grade_level_aff WHERE school_id = $1)",
      params: [this.getId()],
    });
  }
}

export default School;
