var AWS = require('aws-sdk');
var fs = require('fs');
 
var s3client = new AWS.S3({
    accessKeyId:" ",    //required
    secretAccessKey:" " //required
});
 
var params = {
    Bucket:"cassia-data",        //required
    Key:" "            //required
}
var sessionParams = {
    // maxPartSize: ,//default 20MB
    // concurrentStreams: ,//default 5
    // maxRetries: ,//default 3
    totalObjectSize: 5000000 //required size of object being downloaded
}
var downloader = require('s3-download')(s3client);
 
var d = downloader.download(params,sessionParams);
d.on('error',function(err){
    console.log(err);
});
// dat = size_of_part_downloaded
d.on('part',function(dat){
    console.log(dat);
});
d.on('downloaded',function(dat){
    console.log(dat);
});
 
var w = fs.createWriteStream('../files/file.txt');
d.pipe(w);