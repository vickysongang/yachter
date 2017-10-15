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
const QUERY_CATEGORY_SQL = 'select * from category where module = ?'

const INSERT_NOTICE_SQL = 'insert into notice(title,open_id,category_id,content,' +
  'images,created_at,updated_at) values (?,?,?,?,?,?,?)'
const QUERY_NOTICES_SQL = 'SELECT n.id, n.title,substr(n.content, 1, 100) content,' +
  'n.read_count,c.name category_name,n.created_at,u.nickname' +
  ' from notice n, user u,category c' +
  ' where n.category_id = c.id and n.open_id = ' +
  'u.open_id order by n.created_at desc limit ?, ?'

module.exports = {
  INSERT_USER_SQL: INSERT_USER_SQL,
  UPDATE_USER_SQL: UPDATE_USER_SQL,
  QUERY_USER_SQL: QUERY_USER_SQL,
  QUERY_SCHOOLS_SQL: QUERY_SCHOOLS_SQL,
  QUERY_COLLEGES_SQL: QUERY_COLLEGES_SQL,
  QUERY_MAJORS_SQL: QUERY_MAJORS_SQL,
  QUERY_GRADES_SQL: QUERY_GRADES_SQL,
  QUERY_CATEGORY_SQL: QUERY_CATEGORY_SQL,
  QUERY_PROVINCES_SQL: QUERY_PROVINCES_SQL,
  QUERY_USERINFO_SQL: QUERY_USERINFO_SQL,
  INSERT_NOTICE_SQL: INSERT_NOTICE_SQL,
  QUERY_NOTICES_SQL: QUERY_NOTICES_SQL
}