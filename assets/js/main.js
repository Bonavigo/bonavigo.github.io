document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("year").innerHTML = new Date().getFullYear();
	var timestamp = 1114736400 * 1000;
	var diferenca = Date.now() - timestamp;
	var diferenca = new Date(diferenca);
	var resultado = Math.abs(diferenca.getUTCFullYear() - 1970);
	document.getElementById("idade").innerHTML = resultado;

	var fatos = ["Eu gosto de história! É uma das minhas matérias preferidas. Também por influência disso, gosto de um jogo de estratégia chamado \"Hearts of Iron IV\".", "Comecei a programar por causa do Habbo Hotel! Na Instituição que eu faço parte, virei amigo do <a href=\"https://github.com/SuperNando144\" target=\"_blank\">Nando</a> e ele me ensinou o básico e me ajudou a começar.", "Sou descendente de italiano, espanhol e português!", "Tenho mais de mil horas de jogo e mais de 170 vitórias competitivas em Counter-Strike: Global Offensive, mas não jogo mais infelizmente, cansei de cair com pessoas malucas que ficam gritando e xingando durante o jogo 😔.", "Tenho 118 jogos na Steam, e a grande maioria destes são jogos que peguei de graça em sites que distribuem chaves de jogos. A grande maioria nunca joguei porque são ruins <img src=\"https://pbs.twimg.com/profile_images/1289324739794735104/mQoHcZfq_400x400.jpg\" class=\"emoji_fatos\""];
	var fato = fatos[Math.floor(Math.random() * fatos.length)];
	document.querySelector(".fato_meu").innerHTML = `<h1>${fato}</h1>`;
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