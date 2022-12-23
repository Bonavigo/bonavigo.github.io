/* Feito por Bruno Bonavigo em 2022. */
/* https://github.com/Bonavigo - https://twitter.com/BrunoBonavigo - https://www.instagram.com/brunobonavigo/*/
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
		document.getElementById("frase").innerHTML = this.gerarFrase();
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
	"Comecei a programar por causa do Habbo Hotel! Na Instituição que eu fazia parte, virei amigo do <a href=\"https://github.com/SuperNando144\" target=\"_blank\">Nando</a> e ele me ensinou o básico e me ajudou a começar.",
	"Sou ítalo-brasileiro!",
	"Tenho mais de mil horas de jogo e 190 vitórias competitivas em Counter-Strike: Global Offensive, mas não jogo mais frequentemente, cansei de cair com pessoas malucas que ficam gritando e xingando durante o jogo 😔.",
	"Tenho 121 jogos na Steam, e a grande maioria destes são jogos que peguei de graça em sites que distribuem chaves de jogos. A grande maioria nunca joguei porque são ruins!",
	"Sou católico tradicionalista!"
]

const FRASES = [
	{
		foto: "https://i.imgur.com/dpNN1oS.jpg",
		frase: "“Porventura não odiei eu, Senhor, os que te odiavam? E não me consumia, por causa dos teus inimigos? Com ódio perfeito eu os odiei; e eles tornaram-se meus inimigos.”",
		autor: "Rei Davi"
	},
	{
		foto: "https://i.imgur.com/dpNN1oS.jpg",
		frase: "“O pecador observará o justo, e rangerá com os dentes contra ele. Mas o Senhor zombará dele, porque vê que há-de chegar o seu dia.”",
		autor: "Rei Davi"
	},
	{
		foto: "https://i.imgur.com/lhL1J3O.png",
		frase: "“E eu digo-te que tu és Pedro, e sobre esta pedra edificarei a minha Igreja, e as portas do inferno não prevalecerão contra ela. E eu te darei as chaves do reino dos céus; e tudo o que ligares sobre a terra, será ligado também nos céus; e tudo o que desatares sobre a terra, será desatado também nos céus.”",
		autor: "Nosso Senhor Jesus Cristo"
	},
	{
		foto: "https://i.imgur.com/YQ4fhH2.jpg",
		frase: "“A tolerância é a virtude do homem sem convicções”",
		autor: "G. K. Chesterton"
	},
	{
		foto: "https://i.imgur.com/xHt9UOt.jpg",
		frase: "“Os verdadeiros amigos do povo não são revolucionários, nem inovadores, mas tradicionalistas.”",
		autor: "São Pio X"
	},
	{
		foto: "https://i.imgur.com/xHt9UOt.jpg",
		frase: "“A doutrina católica nos ensina que o primeiro dever da caridade não está na tolerância das convicções errôneas.”",
		autor: "São Pio X"
	},
	{
		foto: "https://i.imgur.com/aUdRUjL.jpg",
		frase: "“Todos os que estão no inferno tinham a esperança de se corrigir mais tarde.”",
		autor: "São João Bosco"
	},
	{
		foto: "https://i.imgur.com/Kh14xfi.jpg",
		frase: "“Dê-me apenas uma geração de boas mães cristãs e eu mudarei o mundo.”",
		autor: "São João Crisóstomo"
	},
	{
		foto: "https://i.imgur.com/wwXMOxt.jpg",
		frase: "“A violência não é necessária para destruir uma civilização. Cada civilização morre pela indiferença aos valores únicos que a criaram.”",
		autor: "Nicolás Gómez Dávila"
	},
	{
		foto: "https://i.imgur.com/rqJa1Xh.jpg",
		frase: "“Se nós temos tamanho horror à morte, é porque amamos pouco ao Senhor.”",
		autor: "Santo Afonso Maria de Ligório"
	},
	{
		foto: "https://i.imgur.com/Wv6cSDf.jpg",
		frase: "“A misericórdia de Deus será sempre maior que a tua ingratidão.”",
		autor: "Padre Pio"
	},
	{
		foto: "https://i.imgur.com/Wv6cSDf.jpg",
		frase: "“Lembre-se de que você tem no Céu não somente um pai, mas também uma Mãe.”",
		autor: "Padre Pio"
	},
	{
		foto: "https://i.imgur.com/yTneXTB.jpg",
		frase: "“Que não se perturbe o seu rosto, nem seu coração. Não temas esta doença nem nenhuma outra, não fiques aflito, não estou eu aqui, que sou sua mãe? Você não está debaixo da minha sombra e sob o meu cuidado? Não sou eu a fonte da sua alegria?”",
		autor: "Nossa Senhora de Guadalupe"
	},
	{
		foto: "https://i.imgur.com/gBmPoUx.jpg",
		frase: "“Se meu povo não se quer submeter, sou forçada a deixar cair o braço de meu Filho. É tão forte e tão pesado que não o posso mais.”",
		autor: "Nossa Senhora de La Salette"
	},
	{
		foto: "https://i.imgur.com/gBmPoUx.jpg",
		frase: "“Paris será incendiada, e Marselha submergida; muitas grandes cidades serão abaladas e soterradas por terremotos: crer-se-á que tudo está perdido; não se verão a não ser homicídios, não se ouvirão senão ruídos de armas e blasfêmias.”",
		autor: "Nossa Senhora de La Salette"
	},
	{
		foto: "https://i.imgur.com/gBmPoUx.jpg",
		frase: "“Roma perderá a fé e tornar-se-á a sede do anticristo.”",
		autor: "Nossa Senhora de La Salette"
	},
	{
		foto: "https://i.imgur.com/9FUROVK.jpg",
		frase: "“Se atenderem a meus pedidos, a Rússia se converterá e terão paz; se não, espalhará seus erros pelo mundo, promovendo guerras e perseguições à Igreja; os bons serão martirizados, o Santo Padre terá muito que sofrer, várias nações serão aniquiladas; por fim, o meu Imaculado Coração triunfará.”",
		autor: "Nossa Senhora de Fátima"
	},
	{
		foto: "https://i.imgur.com/XlPTmaP.jpg",
		frase: "“A Igreja Conciliar é uma Igreja cismática, porque rompe com a Igreja Católica qual sempre foi. Ela tem os seus novos dogmas, o seu novo sacerdócio, as suas novas instituições, o seu novo culto, todos já condenados pela Igreja em muitos documentos, oficiais e definitivos. (...) Esta Igreja Conciliar é, portanto, não católica.”",
		autor: "Monsenhor Marcel Lefebvre"
	},
	{
		foto: "https://i.imgur.com/XlPTmaP.jpg",
		frase: "“Roma perdeu a Fé, meus caros amigos. Roma está na apostasia. Não é uma maneira de dizer, não são palavras ao vento as que vos digo... é a verdade.”",
		autor: "Monsenhor Marcel Lefebvre"
	},
	{
		foto: "https://i.imgur.com/XlPTmaP.jpg",
		frase: "“Não fundamos uma religião nova, não criamos novos sacramentos, não criamos uma nova missa, não inventamos liturgia própria, apenas queremos conservar, seguir e ensinar aquilo que a Igreja sempre ensinou.”",
		autor: "Monsenhor Marcel Lefebvre"
	},
]

SITE.startup();