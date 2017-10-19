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

const INSERT_NOTICE_SQL = 'insert into notice(title,open_id,category_id,content,type,' +
  'images,created_at,updated_at) values (?,?,?,?,?,?,?,?)'
const QUERY_NOTICES_SQL = 'select n.id, n.title,substr(n.content, 1, 100) abstract,' +
  'n.read_count readCount,c.name categoryName,c.code categoryCode,date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime,u.nickname creatorName from notice n, user u,category c' +
  ' where n.category_id = c.id and n.open_id = ' +
  'u.open_id and n.type = ? order by n.created_at desc limit ?, ?'
const GET_NOTICE_DETAIL_SQL = 'select n.id, n.title,n.content,n.images,n.read_count, date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime, u.nickname creatorName from notice n,user u where n.open_id = u.open_id and n.id = ?'
const DELETE_NOTICE_SQL = 'delete from notice where id = ?'
const INCR_NOTICE_READCOUNT_SQL = 'update notice set read_count = read_count + 1 where id = ?'

const INSERT_EXAM_SQL = 'insert into exam(title,open_id,category_id,content,type,' +
  'images,created_at,updated_at) values (?,?,?,?,?,?,?,?)'
const QUERY_EXAMS_SQL = 'select n.id, n.title,substr(n.content, 1, 100) abstract,' +
  'n.read_count readCount,c.name categoryName,c.code categoryCode,date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime,u.nickname creatorName from exam n, user u,category c' +
  ' where n.category_id = c.id and n.open_id = ' +
  'u.open_id and n.type = ? order by n.created_at desc limit ?, ?'
const GET_EXAM_DETAIL_SQL = 'select n.id, n.title,n.content,n.images,n.read_count, date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime, u.nickname creatorName from exam n,user u where n.open_id = u.open_id and n.id = ?'
const DELETE_EXAM_SQL = 'delete from exam where id = ?'
const INCR_EXAM_READCOUNT_SQL = 'update exam set read_count = read_count + 1 where id = ?'

const INSERT_FEEDBACK_SQL = 'insert into feedback(open_id,content,created_at,updated_at' +
  ') values (?,?,?,?)'

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
  QUERY_NOTICES_SQL: QUERY_NOTICES_SQL,
  GET_NOTICE_DETAIL_SQL: GET_NOTICE_DETAIL_SQL,
  DELETE_NOTICE_SQL: DELETE_NOTICE_SQL,
  INCR_NOTICE_READCOUNT_SQL: INCR_NOTICE_READCOUNT_SQL,
  INSERT_EXAM_SQL: INSERT_EXAM_SQL,
  QUERY_EXAMS_SQL: QUERY_EXAMS_SQL,
  GET_EXAM_DETAIL_SQL: GET_EXAM_DETAIL_SQL,
  DELETE_EXAM_SQL: DELETE_EXAM_SQL,
  INCR_EXAM_READCOUNT_SQL: INCR_EXAM_READCOUNT_SQL,
  INSERT_FEEDBACK_SQL: INSERT_FEEDBACK_SQL
}