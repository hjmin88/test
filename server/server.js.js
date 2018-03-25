var http = require('http');

var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(request, response) {
  console.log('--- log start ---');
  //브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
  var parsedUrl = url.parse(request.url);
  console.log(parsedUrl);
  //객체화된 url 중에 Query String 부분만 따로 객체화 후 출력
  var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
  console.log(parsedQuery);
  console.log('--- log end ---');

  //parsing 된 url 중에 서버URI에 해당하는 pathname 만 따로 저장
  var resource = parsedUrl.pathname;
  console.log('resource path=%s', resource);

  //리소스에 해당하는 문자열이 아래와 같은 경우
  if (resource == '/survey.html') {

    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8;'
    });

    var fs = require('fs');
    var data = 'var1의 값은 ' + parsedQuery.var1

    //비동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩, 콜백함수
    var timestamp = +new Date();
    fs.writeFile('sa_' + timestamp + '.txt', data, 'utf-8', function(e) {
      if (e) {
        //파일생성 중 오류가 발생하면 오류출력
        console.log(e);
      } else {
        //파일생성 중 오류가 없으면 완료 문자열 출력
        console.log('WRITE DONE! sa_' + timestamp + '.txt');
      }
    });
  }
});

server.listen(8080, function() {
  console.log('Server is running...');
});
