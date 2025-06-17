const MONGODB_URI = 'mongodb+srv://dangvietdev:o6mr0ZLNSvk4Bxq6@cluster0.1ib4hev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const DATABASE_NAME = 'trello-dangvietdev'
import { MongoClient, ServerApiVersion } from 'mongodb'
//khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null(vì chúng ta chưa connect)
let trelloDatabaseInstance = null

//khởi tạo một đối tượng Client Instance để connect tới mongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  //serverApi từ mongoDB ver5.0.0 trở lên
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//kết nối tới database
export const CONNECT_DB = async () => {
  await mongoClientInstance.connect()
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}

//function GET_DB (không async) này có nhiệm vụ export ra Trello Database Instance sau khi đã connect
//thành công tới mongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code
//Lưu ý: chỉ gọi hàm này sau khi kết nối thành công tới mongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) {
    throw new Error('Must connect to database first')
  }
  return trelloDatabaseInstance
}

//đóng kết nối database khi cần
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}