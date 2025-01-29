import Model from "./Model.js";

class GradeLevel extends Model {
  static schema = {
    tableName: "grade_levels",
    primaryKey: "grade_level_id",
    columns: {
      grade_level_id: { usePostgresDefault: true },
      grade_level_code: {},
      grade_level_name: {},
      updated_at: { usePostgresDefault: true },
      created_at: { usePostgresDefault: true },
    },
  };

  static async findByCode(code) {
    return this.findWhere({
      where: "grade_level_code = $1",
      params: [code],
    });
  }
}

export default GradeLevel;
