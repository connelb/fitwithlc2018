var xhr = new XMLHttpRequest();
xhr.open('POST', ' https://ugdthwgm7a.execute-api.us-east-2.amazonaws.com/dev')
xhr.onreadystatechange = function(event){
    console.log(event.target.response);
}
xhr.send();