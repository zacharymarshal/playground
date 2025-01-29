CREATE TABLE IF NOT EXISTS grade_levels (
  grade_level_id serial PRIMARY KEY,
  grade_level_code varchar(10) NOT NULL,
  grade_level_name varchar(255) NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(grade_level_code)
);

INSERT INTO grade_levels (grade_level_code, grade_level_name) VALUES
  ('K', 'Kindergarten'),
  ('1', '1st Grade'),
  ('2', '2nd Grade'),
  ('3', '3rd Grade'),
  ('4', '4th Grade'),
  ('5', '5th Grade'),
  ('6', '6th Grade'),
  ('7', '7th Grade'),
  ('8', '8th Grade'),
  ('9', '9th Grade'),
  ('10', '10th Grade'),
  ('11', '11th Grade'),
  ('12', '12th Grade');

CREATE TABLE IF NOT EXISTS schools (
  school_id serial PRIMARY KEY,
  school_name varchar(255) NOT NULL,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamptz,
  UNIQUE(school_name)
);

INSERT INTO schools (school_name) VALUES
  ('Adams Elementary'),
  ('Baker Middle');

CREATE TABLE school_grade_level_aff (
  school_id integer NOT NULL REFERENCES schools,
  grade_level_id integer NOT NULL REFERENCES grade_levels,
  UNIQUE(school_id, grade_level_id)
);

INSERT INTO school_grade_level_aff (school_id, grade_level_id)
SELECT
  (SELECT school_id FROM schools WHERE school_name = 'Adams Elementary'),
  grade_level_id
FROM grade_levels
WHERE grade_level_code IN ('K', '1', '2', '3', '4', '5');

INSERT INTO school_grade_level_aff (school_id, grade_level_id)
SELECT
  (SELECT school_id FROM schools WHERE school_name = 'Baker Middle'),
  grade_level_id
FROM grade_levels
WHERE grade_level_code IN ('6', '7', '8');

CREATE TABLE IF NOT EXISTS students (
  student_id serial PRIMARY KEY,
  student_name varchar(255) NOT NULL,
  grade_level_id integer NOT NULL REFERENCES grade_levels,
  school_id integer NOT NULL REFERENCES schools,
  created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
  deleted_at timestamptz
);

CREATE INDEX idx_students_school_grade_level ON students (school_id, grade_level_id)
WHERE deleted_at IS NULL;
