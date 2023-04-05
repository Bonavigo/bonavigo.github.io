/* Feito por Bruno Bonavigo em 2022. */
/* https://github.com/Bonavigo - https://www.instagram.com/brunobonavigo/*/
/* Perfecto odio oderam illos inimici facti sunt mihi. */
/* P.S.: O timestamp está em GMT. */

const SITE = {
	data_nascimento: 1114722000,
	data_hoje: Math.floor(Date.now() / 1000),
	idade: null,
	startup() {
		this.gerarRepositorios();
		document.getElementById("idade").innerText = this.gerarIdade();
		document.getElementById("fato").innerHTML = `<p class="ultimo-paragrafo-caixa">${this.gerarFato()}</p>`;
	},
	gerarFato() {
		fato = FATOS[Math.floor(Math.random() * FATOS.length)];
		return fato;
	},
	gerarIdade() {
		idadeTimestamp = this.data_hoje - this.data_nascimento;
		data = new Date(idadeTimestamp * 1000);
		dataCompleta = data.toDateString();
		dataQuebrada = dataCompleta.split(' ');
		this.idade = parseInt(dataQuebrada[3]) - 1970;
		return this.idade;
	},
	gerarRepositorios() {
		const URL = 'https://api.github.com/users/Bonavigo/repos';
		const success = function data(response) {
			response = JSON.parse(response);
			comeco_elemento = `<div class="list-group w-auto">`;
			fim_elemento = `</div>`;
			elementos = "";
			for (let index = 0; index < response.length; index++) {
				dado = response[index];
				if (dado.description == null) {
					dado.description = '';
				}
				if (typeof dado.homepage != 'undefined' && dado.homepage) {
					dado.html_url = dado.homepage;
				}
				date = new Date(dado.created_at);
				mes = (date.getMonth() + 1);
				date = date.toDateString();
				date = date.split(' ');
				date = `${date[2]}/${mes}/${date[3]}`;
				elementos += `
				<a href="${dado.html_url}" target="_blank" class="list-group-item list-group-item-action d-flex gap-3 py-3 wave" aria-current="true">
					<img src="${dado.owner.avatar_url}" class="icon-repo flex-shrink-0">
					<div class="d-flex gap-2 w-100 justify-content-between">
						<div>
							<h6 class="mb-0">${dado.name}</h6>
							<p class="mb-0 opacity-75">${dado.description}</p>
						</div>
					</div>
					<small class="opacity-50 text-nowrap d-sm-none d-md-block">${date}</small>
				</a>
				`;
			}
			elemento = comeco_elemento + elementos + fim_elemento;
			repos_container = document.getElementById("repos");
			repos_container.classList.add("repos-container");
			repos_container.innerHTML = elemento;
			Waves.attach('.wave');
			Waves.init();
		}
		const error = function error() {
		}
		easyAJAX.GET(URL, success, error);
	},
	gerarFrase() {
		frase = FRASES[Math.floor(Math.random() * FRASES.length)];
		elemento = `
			<figure class="row frase-container">
				<div class="col-2 d-flex justify-content-center align-items-center">
					<img src="${frase.foto}" class="img-fluid rounded">
				</div>
				<div class="col-10 d-flex align-items-center">
					<div>
						<blockquote class="blockquote">
							<p class="fst-italic">${frase.frase}</p>
						</blockquote>
						<figcaption class="blockquote-footer fs-6">
							${frase.autor}
						</figcaption>
					</div>
				</div>
			</figure>
		`;
		return elemento;
	},
}

const FATOS = [
	"Eu gosto de história! É uma das minhas matérias preferidas. Também por influência disso, gosto de jogos de estratégia, como \"Hearts of Iron IV\" e outros da Paradox.",
	"Comecei a programar por causa de uma espécie de RP em um jogo online! Virei amigo do <a href=\"https://github.com/SuperNando144\" target=\"_blank\">Nando</a> e ele me ensinou o básico e me ajudou a começar.",
	"Sou ítalo-brasileiro!",
	"Tenho mais de mil horas de jogo e 190 vitórias competitivas em Counter-Strike: Global Offensive, mas não jogo mais frequentemente, cansei de cair com pessoas malucas que ficam gritando e xingando durante o jogo 😔.",
	"Tenho mais de cem jogos na Steam, e a grande maioria destes são jogos que peguei de graça em sites que distribuem chaves de jogos. A grande maioria nunca joguei porque são ruins!",
	"Sou católico tradicionalista!"
]

SITE.startup();