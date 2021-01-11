app.controller("produtoController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	$scope.tela = "Produto";
	$scope.cadastrando = false;
	$scope.editando = false;
	$scope.produtos = [];

	carregarConteudo();
	
	//INCLUIR
	$scope.btnIncluir = function() {
		$scope.tela = "Produto > Incluir";
		$scope.cadastrando = true;
		$scope.cadastro = {};
		$scope.cadastro.status = 1;
		$scope.cadastro.id = null;
		$scope.cadastro.cor = "null";
		$scope.cadastro.marca = "null";
		$scope.cadastro.tamanho = "null";
		$scope.cadastro.unidadeDeMedida = "null";
	}

	//VOLTAR
	$scope.btnVoltar = function() {
		$scope.tela = "Produto";
		$scope.cadastrando = false;
		delete $scope.objetoSelecionado;
		carregarConteudo();
	}

	//SALVAR
	$scope.btnSalvar = function(pcadastro) {
				
		$scope.mensagemRodape = "";

		//VALIDAÇÕES 
		if (!pcadastro) {
			$scope.mensagemRodape = "Por favor preencha os campos!";
			document.getElementById("cDescricao").focus();
		}
		if (!pcadastro.descricao) {
			$scope.mensagemRodape = "Por favor preencha o campo Descrição!";
			document.getElementById("cDescricao").focus();
		}

		//CONFIGURAR OBJETO
		let cad = {...pcadastro};
		cad.cor = {id: pcadastro.cor};
		cad.marca = {id: pcadastro.marca};
		cad.tamanho = {id: pcadastro.tamanho};
		cad.unidadeDeMedida = {id: pcadastro.unidadeDeMedida};
		//SALVA O ITEM NA API
		requisicaoService.requisitarPOST("produto/salvar", cad, function(retorno){
    		if (!retorno.isValid) {
    			$scope.mostrarModal("Erro!", retorno.msg, "bg-danger", null);
				return;
    		} else {
				$scope.tela = "Produto";
				$scope.cadastrando = false;
				$scope.editando = false;
				delete $scope.cadastro;
			}
			carregarConteudo()
    	});

		$scope.tela = "Produto";
		$scope.cadastrando = false;
		$scope.editando = false;
		
		carregarConteudo();
	}
	
	//EDITAR
	$scope.btnEditar = function() {
		//VALIDAÇÕES 	
    	if (!$scope.objetoSelecionado) {
    		$scope.mostrarModal("Atenção!", "É necessário selecionar o registro que deseja alterar!", "bg-warning", null);
    		return;
    	}
    	var param = {
			int1: $scope.objetoSelecionado.id
		}
    	//OBTER O TAMANHO DA API
    	requisicaoService.requisitarPOST("produto/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mostrarModal("Erro!", retorno.msg, "bg-danger", null);
        		return;
    		}
			$scope.cadastro = retorno.data;
			$scope.cadastro.cor = $scope.cadastro.cor.id;
			$scope.cadastro.marca = $scope.cadastro.marca.id;
			$scope.cadastro.tamanho = $scope.cadastro.tamanho.id;
			$scope.cadastro.unidadeDeMedida = $scope.cadastro.unidadeDeMedida.id;
	    	$scope.tela = "Produto > Editar";
			$scope.cadastrando = true;
			$scope.editando = true;
			$scope.carregarCores();
			$scope.carregarMarcas();
			$scope.carregarTamanhos();
			$scope.carregarUnidadeDeMedidas();			
		});
    }

	//EXCLUIR
	$scope.btnExcluir = function(){
    	$scope.mensagemRodape = "";
    	$scope.mensagemModal  = "";
    	if (!$scope.objetoSelecionado) {
    		$scope.mostrarModal("Atenção!", "É necessário selecionar o registro que deseja excluir!", "bg-warning", null);
    		return;
    	}

    	$scope.mostrarModal("Confirmar", "Deseja mesmo excluir este cadastro?", "bg-danger", function () {
			var param = {
				int1: $scope.objetoSelecionado.id
			};
			
			//DELETAR
	    	requisicaoService.requisitarPOST("produto/removerPorId", param, function(retorno) {
		    		if (!retorno.isValid) {
		    			$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
		        		return;
		    		}
	
		    		carregarConteudo();
	    	});
		});
    }

	//FILTRAR
	$scope.pesquisar = function(){
		$scope.produtosFiltrados = orderByFilter(filterFilter($scope.produtos,{
			id:$scope.idFilter,
			descricao: $scope.descricaoFilter,
			quantidadeMinima: $scope.quantidadeMinimaFilter,
			quantidadeMaxima: $scope.quantidadeMaximaFilter,
			quantidadeAtual: $scope.quantidadeAtualFilter,
			precoCusto: $scope.precoCustoFilter,
			precoVenda:	$scope.precoVendaFilter,
			cor: $scope.corFilter,
			marca: $scope.marcaFilter,
			tamanho: $scope.tamanhoFilter,
			unidadeDeMedida: $scope.unidadeDeMedida
		}), $scope.campoOrdenacao);
	}

	//SELECIONAR ITEM DA LISTA
	$scope.selecionarLinha = function(objeto) {
		$scope.objetoSelecionado = objeto;
	}

	//INVERTER|DEFINIR ORDENAÇÃO
	$scope.ordenacao = function (campo) {
		$scope.reverseOrdenacao = ($scope.campoOrdenacao == `+${campo}` || $scope.campoOrdenacao == `-${campo}`) ? !$scope.reverseOrdenacao:false;
    	$scope.campoOrdenacao = ($scope.reverseOrdenacao)?`-${campo}`:`+${campo}`;	
    	$scope.pesquisar();
	}
	
	//RECARREGA LISTA DA API
	function carregarConteudo() {
    	
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("produto/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
		    	$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
        		return;
    		}
			$scope.produtos = retorno.data;
			$scope.pesquisar();
		});
    
	}
	
	//CARREGA CORES
	$scope.carregarCores = function() {
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("cor/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
		    	$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
        		return;
    		}
			$scope.cores = retorno.data;
		});
	}
	
	//CARREGA MARCAS
	$scope.carregarMarcas = function() {
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("marca/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
				alert("Houve um problema!", retorno.msg);
        		return;
    		}
			$scope.marcas = retorno.data;
		});
	}
	
	//CARREGA TAMANHOS
	$scope.carregarTamanhos = function() {
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("tamanho/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
		    	$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
        		return;
    		}
			$scope.tamanhos = retorno.data;
		});
	}
	
	//CARREGA UNIDADE DE MEDIDAS
	$scope.carregarUnidadeDeMedidas = function() {
		//OBTER REGISTROS DA API
    	requisicaoService.requisitarGET("unidadeDeMedida/obterTodosAtivos", function(retorno) {
    		if (!retorno.isValid) {
		    	$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
        		return;
    		}
			$scope.unidadeDeMedidas = retorno.data;
		});
	}
	
	//MODAL
	//arg _type -> ['bg-danger' | 'bg-warning' | 'bg-alert' | 'bg-sucess']
	//arg onConfirm -> callback to 'CONFIRM' button, if null shows only 'OK' button
	$scope.mostrarModal = function (_title, _message, _type, _onConfirm) {
		$scope.modal = {};
		$scope.modal.title = _title;
		$scope.modal.message = _message;
		$scope.modal.onConfirm = _onConfirm;
		$scope.modal.type = _type;
		
		$('#modal-container').modal();
	}
})