app.controller("marcaController", function ($scope, requisicaoService, filterFilter, orderByFilter) {
	$scope.tela = "Produto > Marca";
	$scope.cadastrando = false;
	$scope.editando = false;
	$scope.marcas = [];

	carregarConteudo();
	
	//INCLUIR
	$scope.btnIncluir = function() {
		$scope.tela = "Produto > Marca > Incluir";
		$scope.cadastrando = true;
		$scope.cadastro = {};
		$scope.cadastro.status = 1;
		$scope.cadastro.id = null;
	}

	//VOLTAR
	$scope.btnVoltar = function() {
		$scope.tela = "Produto > Marca";
		$scope.cadastrando = false;
		delete $scope.objetoSelecionado;
		carregarConteudo();
	}

	//SALVAR
	$scope.btnSalvar = function(marca) {
				
		$scope.mensagemRodape = "";

		//VALIDAÇÕES 
		if (!marca) {
			$scope.mensagemRodape = "Por favor preencha os campos!";
			document.getElementById("cDescricao").focus();
			return;
		}
		if (!marca.descricao) {
			$scope.mensagemRodape = "Por favor preencha o campo Descrição!";
			document.getElementById("cDescricao").focus();
			return;
		}

		//SALVA O ITEM NA API
		requisicaoService.requisitarPOST("marca/salvar", marca, function(retorno){
    		if (!retorno.isValid) {
    			alert(retorno.msg);
				return;
    		} else {
				$scope.tela = "Produto > Marca";
				$scope.cadastrando = false;
				$scope.editando = false;
				delete $scope.cadastro;
			}
			carregarConteudo()
    	});

		$scope.tela = "Produto > Marca";
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
    	requisicaoService.requisitarPOST("marca/obterPorId", param , function(retorno) {
			if (!retorno.isValid) {
    			$scope.mostrarModal("Erro!", retorno.msg, "bg-danger", null);
        		return;
    		}
			$scope.cadastro = retorno.data;
	    	$scope.tela = "Produto > Marca > Editar";
			$scope.cadastrando = true;
			$scope.editando = true;
		});
    }

	//EXCLUIR
	$scope.btnExcluir = function() {
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
	    	requisicaoService.requisitarPOST("marca/removerPorId", param, function(retorno) {
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
		$scope.marcasFiltradas = orderByFilter(filterFilter($scope.marcas,{
			id:$scope.idFilter,
			descricao: $scope.descricaoFilter,
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
    	requisicaoService.requisitarGET("marca/obterTodos", function(retorno) {
    		if (!retorno.isValid) {
		    	$scope.mostrarModal("Erro!", retorno.msg, "bg-warning", null);
        		return;
    		}
			$scope.marcas = retorno.data;
			$scope.pesquisar();
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