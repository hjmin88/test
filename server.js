var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  console.log('--- log start ---');
  //브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
  var parsedUrl = url.parse(request.url);
  console.log('parsedUrl:' + JSON.stringify(parsedUrl));
  //console.log('parsedUrl:' + JSON.stringify(parsedUrl));
  //객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
  console.log('parsedQuery:' + JSON.stringify(parsedQuery));
  console.log('--- log end ---');

  //parsing 된 url 중에 서버URI에 해당하는 pathname 만 따로 저장
  var resource = parsedUrl.pathname;
  console.log('resource path=%s', resource);

  //리소스에 해당하는 문자열이 아래와 같은 경우
  if (resource == '/survey-cmplt.html') {

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8;'
    });

    var timestamp = + new Date();
    var data = parsedQuery.svI1 + "|" +
      parsedQuery.svI2 + "|" +
      parsedQuery.svI3 + "|" +
      parsedQuery.svI4 + "|" +
      parsedQuery.svI5 + "|" +
      parsedQuery.svC1 + "|" +
      parsedQuery.svC2 + "|" +
      parsedQuery.svC3 + "|" +
      parsedQuery.svC4 + "|" +
      parsedQuery.svQ1 + "|" +
      parsedQuery.svQ2 + "|" +
      parsedQuery.svQ3 + "|" +
      parsedQuery.svQ4;

    //비동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩, 콜백함수

    fs.writeFile('./data/sa_' + timestamp + '.txt', data, 'utf-8', function(e) {
      if (e) {
        //파일생성 중 오류가 발생하면 오류출력
        console.log(e);
      } else {
        //파일생성 중 오류가 없으면 완료 문자열 출력
        console.log('WRITE DONE! sa_' + timestamp + '.txt');
      }
      response.writeHead(301,
        {Location: 'http://ec2-13-125-207-14.ap-northeast-2.compute.amazonaws.com:80/survey-cmplt.html'}
      );
      /* response.write('------------------------'); */
      response.end();
    });
  } else if (resource == '/survey-query-count.html') {
    var dataFolderPath = path.join(__dirname, 'data');
    //passsing directoryPath and callback function
    fs.readdir(dataFolderPath, (err, files) => {
      //handling error
      if (err) {
        return response.write('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      response.write('list of files -----------');
      response.write('<br />');
      response.write('\n');
      files.forEach((fileName) => {
        // Do whatever you want to do with the file
        response.write(fileName);
        var fileContents = fs.readFileSync('./data/' + fileName, 'utf-8');
        // wait for the result, then use it
        response.write('|' + fileContents);
        response.write('<br />');
        response.write('\n');
      });
      response.write('------------------------');
      response.end();
    });

  } else if (resource == '/survey-download-csv.html') {

  }
});

server.listen(8080, function() {
  console.log('Server is running...');
});
