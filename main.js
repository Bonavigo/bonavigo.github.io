document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("year").innerHTML = new Date().getFullYear();
	var timestamp = 1114736400 * 1000;
	var diferenca = Date.now() - timestamp;
	var diferenca = new Date(diferenca);
	var resultado = Math.abs(diferenca.getUTCFullYear() - 1970);
	document.getElementById("idade").innerHTML = resultado;
});

//Meu README
var success = function success(response) {
	document.getElementById("readme").innerHTML = response;
}
var error = function error() {
	alert('Infelizmente ocorreu um erro.');
	location.href="https://github.com/Bonavigo";
}
easyAJAX.GET("https://raw.githubusercontent.com/Bonavigo/Bonavigo/main/README.md", success, error);

//Meus Repositórios
let elementos = '';
var success = function success(response) {
	response = JSON.parse(response);
	for (var i = response.length - 1; i >= 0; i--) {
		if (response[i].description === null) {
			response[i].description = '(Sem descrição)';
		}
		elementos += '<li class="collection-item avatar"><a class="black-text" target="_blank" href="'+response[i].html_url+'" data-repoid="'+response[i].id+'"><img src="'+response[i].owner.avatar_url+'" alt="'+response[i].owner.login+'" class="circle"><span class="title">'+response[i].name+'</span><p>'+response[i].description+'</p></a></li>';
	}
	document.getElementById("repos").innerHTML = elementos;
}
var error = function error() {
	alert('Infelizmente ocorreu um erro.');
	location.href="https://github.com/Bonavigo";
}
easyAJAX.GET("https://api.github.com/users/Bonavigo/repos", success, error);