const AWS = require('aws-sdk')
const {Buffer} = require('buffer')

export async function saveToS3(Bucket, Key, obj) {
  let s3 = new AWS.S3()
  let Body = Buffer.from(JSON.stringify(obj, null, 2))
  let params = {Bucket, Key, Body}
  return await s3.putObject(params).promise()
}
