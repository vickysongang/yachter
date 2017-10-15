/**
 * Created by songang on 2017/10/15.
 */
const INSERT_USER_SQL = 'insert into user(nickname,gender,avatar_url,' +
  'open_id,school_id,college_id,major_id,grade_id,province_id,phone,' +
  'created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?)'
const UPDATE_USER_SQL = 'update user set nickname=?, gender=?, avatar_url=? ' +
  'where open_id=?'
const QUERY_USER_SQL = 'select * from user where open_id = ?'
const QUERY_USERINFO_SQL = 'select u.open_id, s.name school_name, c.name college_name, m.name major_name, ' +
  'g.name grade_name from user u ,school s, college c, major m, grade g ' +
  'where u.school_id = s.id and u.college_id = c.id and u.major_id = m.id and u.grade_id = g.id and u.open_id = ?'

const QUERY_SCHOOLS_SQL = 'select * from school'
const QUERY_COLLEGES_SQL = 'select * from college where school_id = ?'
const QUERY_MAJORS_SQL = 'select * from major where college_id = ?'
const QUERY_GRADES_SQL = 'select * from grade'
const QUERY_PROVINCES_SQL = 'select * from province'

module.exports = {
  INSERT_USER_SQL: INSERT_USER_SQL,
  UPDATE_USER_SQL: UPDATE_USER_SQL,
  QUERY_USER_SQL: QUERY_USER_SQL,
  QUERY_SCHOOLS_SQL: QUERY_SCHOOLS_SQL,
  QUERY_COLLEGES_SQL: QUERY_COLLEGES_SQL,
  QUERY_MAJORS_SQL: QUERY_MAJORS_SQL,
  QUERY_GRADES_SQL: QUERY_GRADES_SQL,
  QUERY_PROVINCES_SQL: QUERY_PROVINCES_SQL,
  QUERY_USERINFO_SQL: QUERY_USERINFO_SQL
}