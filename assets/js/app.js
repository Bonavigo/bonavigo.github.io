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
	}
}

SITE.startup();