/**
 * Created by songang on 2017/10/15.
 */
// user
const INSERT_USER_SQL = 'insert into user(nickname,gender,avatar_url,' +
  'open_id,school_id,college_id,major_id,year,class_id,place_id,phone,' +
  'created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?)'
const UPDATE_USER_SQL = 'update user set nickname=?, gender=?, avatar_url=? ' +
  'where open_id=?'
const QUERY_USER_SQL = 'select * from user where open_id = ?'
const QUERY_USERINFO_SQL = 'select u.open_id, u.school_id,s.name school_name, u.college_id,' +
  'c.name college_name, u.major_id, m.name major_name, u.grade_id, ' +
  'g.name grade_name, u.status from user u ,school s, college c, major m, grade g ' +
  'where u.school_id = s.id and u.college_id = c.id and u.major_id = m.id and u.grade_id = g.id and u.open_id = ?'

//common
const QUERY_SCHOOLS_SQL = 'select * from school order by rank'
const QUERY_COLLEGES_SQL = 'select c.id, c.name from college c, school_to_college sc' +
  ' where sc.college_id = c.id and sc.school_id = ? order by sc.rank'
const QUERY_MAJORS_SQL = 'select m.id, m.name from major m, college_to_major cm where m.id = cm.major_id' +
  ' and cm.college_id = ? and cm.year = ? order by rank'
const QUERY_YEARS_SQL = 'select * from year'
const QUERY_DEFAULT_CLASSES_SQL = 'select * from class where type="default"'
const QUERY_ALL_CLASSES_SQL = 'select * from class'
const QUERY_PROVINCES_SQL = 'select * from province'
const QUERY_PLACES_SQL = 'select p.id,p.name from place p, school_to_place sp ' +
  'where p.id = sp.place_id and sp.school_id = ? order by rank'
const QUERY_CATEGORY_SQL = 'select * from category where module = ?'
const INSERT_CLASS_SQL = 'insert into class(name,type) values (?,?)'
const QUERY_CLASS_BYNAME_SQL = 'select * from class where name = ?'
//notice
const INSERT_NOTICE_SQL = 'insert into notice(title,open_id,category_name,content,type,images,school_id,' +
  'college_id,grade_id,approve_flag,read_count,created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?,?)'

const QUERY_NOTICES_SQL = 'select n.id, n.title,substr(n.content, 1, 100) abstract,' +
  'n.read_count readCount,n.category_name categoryName,date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime,u.nickname creatorName from notice n left join user u on n.open_id = u.open_id where n.type = ?' +
  ' and n.college_id = ? and n.grade_id = ? and approve_flag = ? order by rank,n.created_at desc limit ?, ?'

const GET_NOTICE_DETAIL_SQL = 'select n.id, n.title,n.content,n.images,n.read_count, date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime, u.nickname creatorName, n.open_id openId from notice n left join user u on n.open_id = u.open_id where n.id = ?'

const DELETE_NOTICE_SQL = 'delete from notice where id = ?'

const INCR_NOTICE_READCOUNT_SQL = 'update notice set read_count = read_count + 1 where id = ?'


//schedule
const INSERT_SCHEDULE_SQL = 'insert into schedule(open_id,college_id,school_id,content,year,season_id,images,' +
  'created_at,updated_at) values (?,?,?,?,?,?,?,?,?)'

const QUERY_SCHEDULES_SQL = 'select s.id,c.name collegeName,s.year,s.season_id seasonId, se.code seasonCode, ' +
  'se.name seasonName from schedule s left join user u on s.open_id = u.open_id, season se, college c where s.season_id = se.id' +
  ' and s.college_id = c.id and s.college_id = ? limit ?, ?'

const GET_SCHEDULE_DETAIL_SQL = 'select s.id,s.content,s.year, s.images, s.open_id openId, date_format(s.created_at,"%Y-%m-%d") pubTime,s.season_id,' +
  ' u.nickname creatorName, se.code seasonCode, se.name seasonName from schedule s left join user u on s.open_id = u.open_id,' +
  ' season se where s.season_id = se.id and s.id = ? '

const DELETE_SCHEDULE_SQL = 'delete from schedule where id = ?'


//exam
const INSERT_EXAM_SQL = 'insert into exam(title,open_id,category_name,content,type,images,school_id,' +
  'college_id,approve_flag,read_count,created_at,updated_at) values (?,?,?,?,?,?,?,?,?,?,?,?)'

const QUERY_EXAMS_SQL = 'select n.id, n.title,substr(n.content, 1, 100) abstract,' +
  'n.read_count readCount,n.category_name categoryName,date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime,u.nickname creatorName from exam n left join user u on n.open_id = u.open_id where ' +
  'n.type = ? and n.college_id = ? and approve_flag = ? order by n.rank, n.created_at desc limit ?, ?'

const GET_EXAM_DETAIL_SQL = 'select n.id, n.title,n.content,n.images,n.read_count, date_format(n.created_at,"%Y-%m-%d") ' +
  'pubTime, u.nickname creatorName, n.open_id openId from exam n left join user u on n.open_id = u.open_id where n.id = ?'

const DELETE_EXAM_SQL = 'delete from exam where id = ?'

const INCR_EXAM_READCOUNT_SQL = 'update exam set read_count = read_count + 1 where id = ?'


//banner
const QUERY_BANNERS_SQL = 'select id, cover from banner where module = ? and type = ? and college_id = ? and grade_id = ?'
const GET_BANNER_DETAIL_SQL = 'select b.id, b.title,b.content,b.images,date_format(b.created_at,"%Y-%m-%d") pubTime, ' +
  'u.nickname creatorName, b.open_id openId from banner b left join user u on b.open_id = u.open_id where b.id = ?'
const DELETE_BANNER_SQL = 'delete from banner where id = ?'

//feedback
const INSERT_FEEDBACK_SQL = 'insert into feedback(open_id,content,created_at,updated_at' +
  ') values (?,?,?,?)'

//config
const GET_CONFIG_SQL = 'select * from config limit 1'

module.exports = {
  INSERT_USER_SQL: INSERT_USER_SQL,
  UPDATE_USER_SQL: UPDATE_USER_SQL,
  QUERY_USER_SQL: QUERY_USER_SQL,
  QUERY_SCHOOLS_SQL: QUERY_SCHOOLS_SQL,
  QUERY_COLLEGES_SQL: QUERY_COLLEGES_SQL,
  QUERY_MAJORS_SQL: QUERY_MAJORS_SQL,
  QUERY_YEARS_SQL: QUERY_YEARS_SQL,
  QUERY_DEFAULT_CLASSES_SQL: QUERY_DEFAULT_CLASSES_SQL,
  QUERY_ALL_CLASSES_SQL: QUERY_ALL_CLASSES_SQL,
  QUERY_CATEGORY_SQL: QUERY_CATEGORY_SQL,
  QUERY_PROVINCES_SQL: QUERY_PROVINCES_SQL,
  QUERY_PLACES_SQL: QUERY_PLACES_SQL,
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
  INSERT_SCHEDULE_SQL: INSERT_SCHEDULE_SQL,
  QUERY_SCHEDULES_SQL: QUERY_SCHEDULES_SQL,
  GET_SCHEDULE_DETAIL_SQL: GET_SCHEDULE_DETAIL_SQL,
  DELETE_SCHEDULE_SQL: DELETE_SCHEDULE_SQL,
  QUERY_BANNERS_SQL: QUERY_BANNERS_SQL,
  GET_BANNER_DETAIL_SQL: GET_BANNER_DETAIL_SQL,
  DELETE_BANNER_SQL: DELETE_BANNER_SQL,
  INSERT_FEEDBACK_SQL: INSERT_FEEDBACK_SQL,
  GET_CONFIG_SQL: GET_CONFIG_SQL,
  INSERT_CLASS_SQL: INSERT_CLASS_SQL,
  QUERY_CLASS_BYNAME_SQL:QUERY_CLASS_BYNAME_SQL
}