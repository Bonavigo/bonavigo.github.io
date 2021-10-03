const SITE = {
	init() {
		easyAJAX.GET('https://raw.githubusercontent.com/Bonavigo/Bonavigo/main/README.md', function(response) {document.querySelector('[data-readme="true"]').innerHTML = response;}, function() {document.querySelector('[data-readme="true"]').innerHTML = "Um erro aconteceu. Tente novamente mais tarde."});

		easyAJAX.GET('https://api.github.com/users/Bonavigo/repos', function(response) {
			response = JSON.parse(response);
			let elementos = '';
			for (let i = 0; i < response.length; i++) {
				var repo = response[i];
				if (repo.description == null) {
					repo.description = '';
				}
				if (typeof repo.homepage != 'undefined' && repo.homepage) {
					repo.html_url = repo.homepage;
				}
				elementos += `<a href="${repo.html_url}" target="_blank"><li>${repo.name}<br>${repo.description}</li></a>`;
			}
			document.querySelector('[data-repos="true"]').innerHTML = elementos;
		}, function() {});
		
		var fatos = ["Eu gosto de história! É uma das minhas matérias preferidas. Também por influência disso, gosto de um jogo de estratégia chamado \"Hearts of Iron IV\".", "Comecei a programar por causa do Habbo Hotel! Na Instituição que eu fazia parte, virei amigo do <a href=\"https://github.com/SuperNando144\" target=\"_blank\">Nando</a> e ele me ensinou o básico e me ajudou a começar.", "Sou ítalo-brasileiro!", "Tenho mais de mil horas de jogo e mais de 170 vitórias competitivas em Counter-Strike: Global Offensive, mas não jogo mais infelizmente, cansei de cair com pessoas malucas que ficam gritando e xingando durante o jogo 😔.", "Tenho 118 jogos na Steam, e a grande maioria destes são jogos que peguei de graça em sites que distribuem chaves de jogos. A grande maioria nunca joguei porque são ruins <img src=\"https://pbs.twimg.com/profile_images/1289324739794735104/mQoHcZfq_400x400.jpg\" class=\"emoji_fatos\""];
		var fato = fatos[Math.floor(Math.random() * fatos.length)];
		document.querySelector('[data-fatos="true"]').innerHTML = `<p>${fato}</p>`;
	}
}

SITE.init();